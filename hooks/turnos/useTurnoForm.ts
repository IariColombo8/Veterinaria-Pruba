import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  createTurno,
  createCliente,
  createMascota,
  updateCliente,
  updateMascota,
} from "@/lib/firebase/firestore";
import { enviarEmailConfirmacion } from "@/app/turno/confirmaciondeturno";
import { useClienteByDNI } from "./useClienteByDNI";
import { useDisponibilidadTurnos } from "./useDisponibilidadTurnos";

interface UseTurnoFormOptions {
  defaultDni?: string;
  lockDni?: boolean;
  redirectOnSuccess?: boolean;
  onSuccess?: () => void;
}

export function useTurnoForm(options: UseTurnoFormOptions = {}) {
  const {
    defaultDni,
    lockDni = false,
    redirectOnSuccess = true,
    onSuccess,
  } = options;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [datosEditados, setDatosEditados] = useState(false);
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    dni: "",
    domicilio: "",
    mascotaExistenteId: "",
    nombreMascota: "",
    tipoMascota: "",
    edadMascota: "",
    razaMascota: "",
    pesoMascota: "",
    servicio: "",
    motivo: "",
    fecha: "",
    hora: "",
    vacunas: [] as string[],
  });

  const {
    clienteExistente,
    mascotas,
    mostrarNuevaMascota,
    setMostrarNuevaMascota,
    loadingCliente,
  } = useClienteByDNI(formData.dni);

  const { diasBloqueados, turnosExistentes } = useDisponibilidadTurnos();

  // Autocompletar datos del cliente cuando se encuentra
  useEffect(() => {
    if (defaultDni && defaultDni !== formData.dni) {
      setFormData((prev) => ({ ...prev, dni: defaultDni }));
      setDatosEditados(false);
    }
  }, [defaultDni, formData.dni]);

  useEffect(() => {
    if (clienteExistente && !datosEditados) {
      setFormData((prev) => ({
        ...prev,
        nombre: clienteExistente.nombre || "",
        telefono: clienteExistente.telefono || "",
        email: clienteExistente.email || "",
        domicilio: clienteExistente.domicilio || "",
      }));
    }
  }, [clienteExistente, datosEditados]);

  // Actualizar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    if (selectedDate) {
      const fechaSeleccionada = format(selectedDate, "yyyy-MM-dd");
      const turnosDelDia = turnosExistentes.filter(
        (t: any) =>
          t.turno?.fecha === fechaSeleccionada && t.estado !== "cancelado"
      );

      const horariosOcupados = turnosDelDia.map((t: any) => t.turno?.hora);
      const todosLosHorarios = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
      ];

      const disponibles = todosLosHorarios.filter(
        (h) => !horariosOcupados.includes(h)
      );
      setHorariosDisponibles(disponibles);

      if (formData.hora && !disponibles.includes(formData.hora)) {
        handleChange("hora", "");
      }
    }
  }, [selectedDate, turnosExistentes]);

  const handleChange = (field: string, value: string) => {
    if (lockDni && field === "dni") {
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Detectar si el usuario editó datos del cliente
    if (["nombre", "telefono", "email", "domicilio"].includes(field) && clienteExistente) {
      setDatosEditados(true);
    }

    // Limpiar vacunas si cambia el servicio
    if (field === "servicio" && value !== "vacunacion") {
      setFormData(prev => ({ ...prev, vacunas: [] }));
    }

    if (field === "mascotaExistenteId") {
      setMostrarNuevaMascota(value === "nueva");
      
      // Si selecciona una mascota existente, cargar sus datos
      if (value !== "nueva") {
        const mascotaSeleccionada = mascotas.find(m => m.id === value);
        if (mascotaSeleccionada) {
          setFormData(prev => ({
            ...prev,
            nombreMascota: mascotaSeleccionada.nombre || "",
            tipoMascota: mascotaSeleccionada.tipo || "",
            edadMascota: mascotaSeleccionada.edad || "",
            razaMascota: mascotaSeleccionada.raza || "",
            pesoMascota: mascotaSeleccionada.peso || "",
          }));
        }
      } else {
        // Limpiar campos si selecciona "nueva"
        setFormData(prev => ({
          ...prev,
          nombreMascota: "",
          tipoMascota: "",
          edadMascota: "",
          razaMascota: "",
          pesoMascota: "",
        }));
      }
    }
  };

  // Función para manejar cambio de vacunas
  const handleVacunasChange = (vacunas: string[]) => {
    console.log("🔍 handleVacunasChange - Vacunas recibidas:", vacunas);
    setFormData(prev => ({
      ...prev,
      vacunas
    }));
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar vacunas si el servicio es vacunación Y es perro o gato
    if (
      formData.servicio === "vacunacion" && 
      (formData.tipoMascota === "perro" || formData.tipoMascota === "gato") &&
      formData.vacunas.length === 0
    ) {
      toast({
        title: "⚠️ Vacunas requeridas",
        description: "Por favor selecciona al menos una vacuna",
        variant: "destructive",
      });
      return;
    }
    
    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setLoading(true);
    setShowConfirmModal(false);

    try {
      let clienteId = clienteExistente?.id;
      let mascotaId = formData.mascotaExistenteId !== "nueva" ? formData.mascotaExistenteId : null;

      // 1. Crear o actualizar cliente
      if (!clienteId) {
        const clienteRef = await createCliente({
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          dni: formData.dni,
          domicilio: formData.domicilio,
        });
        clienteId = clienteRef.id;
      } else if (datosEditados) {
        await updateCliente(clienteId, {
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          domicilio: formData.domicilio,
        });
      }

      // 2. Crear o actualizar mascota
      if (mostrarNuevaMascota || !mascotaId) {
        const mascotaRef = await createMascota(clienteId, {
          nombre: formData.nombreMascota,
          tipo: formData.tipoMascota,
          edad: formData.edadMascota,
          raza: formData.razaMascota,
          peso: formData.pesoMascota,
        });
        mascotaId = mascotaRef.id;
      } else {
        await updateMascota(clienteId, mascotaId, {
          nombre: formData.nombreMascota,
          tipo: formData.tipoMascota,
          edad: formData.edadMascota,
          raza: formData.razaMascota,
          peso: formData.pesoMascota,
        });
      }

      // 3. Obtener datos de la mascota
      const mascotaSeleccionada = {
        nombre: formData.nombreMascota,
        tipo: formData.tipoMascota,
      };

      // 4. Crear el turno - incluir vacunas
      console.log("🔍 DEBUG - FormData completo:", formData);
      console.log("🔍 DEBUG - Servicio:", formData.servicio);
      console.log("🔍 DEBUG - Vacunas en formData:", formData.vacunas);
      console.log("🔍 DEBUG - ¿Es vacunación?:", formData.servicio === "vacunacion");
      
      const turnoData = {
        clienteId: clienteId,
        mascotaId: mascotaId || "",
        cliente: {
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          dni: formData.dni,
          domicilio: formData.domicilio,
        },
        mascota: {
          nombre: mascotaSeleccionada.nombre,
          tipo: mascotaSeleccionada.tipo,
          motivo: formData.motivo,
        },
        servicio: formData.servicio,
        fecha: formData.fecha,
        hora: formData.hora,
        estado: "pendiente" as const,
        vacunas: formData.vacunas,
      };
      
      console.log("🔍 DEBUG - Turno data a enviar:", turnoData);
      console.log("🔍 DEBUG - Vacunas en turnoData:", turnoData.vacunas);
      
      await createTurno(turnoData);

      // 5. Crear evento en Google Calendar
      try {
        await fetch("/api/calendar/create-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mascotaNombre: mascotaSeleccionada.nombre,
            duenoNombre: formData.nombre,
            motivo: formData.motivo,
            fecha: formData.fecha,
            hora: formData.hora,
            servicio: formData.servicio,
          }),
        });
      } catch (e) {
        console.error("No se pudo crear evento en Calendar:", e);
      }

      // 5. Enviar email de confirmación
      const emailEnviado = await enviarEmailConfirmacion({
        nombre_y_apellido: formData.nombre,
        fecha: selectedDate ? format(selectedDate, "PPP", { locale: es }) : formData.fecha,
        hora: formData.hora,
        direccion: formData.domicilio,
        nombre_mascota: mascotaSeleccionada.nombre,
        tipo_mascota: mascotaSeleccionada.tipo,
        servicio_requerido: formData.servicio,
        email: formData.email,
      });

      if (!emailEnviado) {
        console.warn("No se pudo enviar el email de confirmación");
      }

      toast({
        title: "✅ Turno agendado exitosamente",
        description: "Te enviamos un email de confirmación. Nos pondremos en contacto contigo pronto.",
      });
      onSuccess?.();
      if (redirectOnSuccess) {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating turno:", error);
      toast({
        title: "❌ Error al agendar turno",
        description: "Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleVacunasChange,
    handleSubmit: handlePreSubmit,
    handleConfirmedSubmit,
    loading,
    clienteExistente,
    mascotas,
    mostrarNuevaMascota,
    setMostrarNuevaMascota,
    selectedDate,
    setSelectedDate,
    horariosDisponibles,
    diasBloqueados,
    loadingCliente,
    showConfirmModal,
    setShowConfirmModal,
    datosEditados,
  };
}