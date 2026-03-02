import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  getClienteByDNI,
  getMascotas,
  getTurnosByClienteId,
  updateTurno,
} from "@/lib/firebase/firestore";
import type { Cliente, Mascota, Turno } from "@/lib/firebase/firestore";

function getFechaTurno(t: Turno) {
  return t.turno?.fecha ?? t.fecha ?? "";
}

export function useMisTurnosCliente() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dniActual, setDniActual] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [error, setError] = useState<string | null>(null);

  const buscarPorDni = useCallback(async (dni: string) => {
    const clean = dni.trim();
    if (!clean || clean.length < 7) {
      setError("Ingresá un DNI válido.");
      return false;
    }
    setLoading(true);
    setError(null);
    try {
      const clienteData = await getClienteByDNI(clean);
      if (!clienteData?.id) {
        setCliente(null);
        setMascotas([]);
        setTurnos([]);
        setError("Cliente no encontrado.");
        return false;
      }
      setDniActual(clean);
      setCliente(clienteData);
      const [mascotasData, turnosData] = await Promise.all([
        getMascotas(clienteData.id),
        getTurnosByClienteId(clienteData.id),
      ]);
      setMascotas(mascotasData);
      setTurnos(turnosData);
      return true;
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar la información.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refrescar = useCallback(async () => {
    if (!cliente?.id) return;
    try {
      const [mascotasData, turnosData] = await Promise.all([
        getMascotas(cliente.id),
        getTurnosByClienteId(cliente.id),
      ]);
      setMascotas(mascotasData);
      setTurnos(turnosData);
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "No se pudo actualizar.", variant: "destructive" });
    }
  }, [cliente?.id, toast]);

  const cancelarTurno = useCallback(
    async (turno: Turno) => {
      if (!turno.id) return;
      const fecha = getFechaTurno(turno);
      const hoy = new Date().toISOString().slice(0, 10);
      const manana = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      if (turno.estado !== "pendiente" || !fecha || fecha < manana) {
        toast({ title: "No se puede cancelar", description: "Solo turnos pendientes futuros." });
        return;
      }
      try {
        await updateTurno(turno.id, { estado: "cancelado" });
        toast({ title: "Turno cancelado" });
        await refrescar();
      } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "No se pudo cancelar.", variant: "destructive" });
      }
    },
    [refrescar, toast]
  );

  const turnosOrdenados = useMemo(() => {
    return [...turnos].sort((a, b) => {
      const fa = getFechaTurno(a);
      const fb = getFechaTurno(b);
      if (fa !== fb) return fa.localeCompare(fb);
      return (a.turno?.hora ?? "").localeCompare(b.turno?.hora ?? "");
    });
  }, [turnos]);

  return {
    loading,
    error,
    dniActual,
    cliente,
    mascotas,
    turnos,
    turnosOrdenados,
    buscarPorDni,
    cancelarTurno,
    refrescar,
    reset: () => {
      setDniActual("");
      setCliente(null);
      setMascotas([]);
      setTurnos([]);
      setError(null);
    },
  };
}
