// Guardar como: hooks/turnos/useTurnosManagement.ts

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import {
  getTurnos,
  updateTurno,
  deleteTurno,
  getMascotas,
} from "@/lib/firebase/firestore";
import type { Turno, Mascota } from "@/lib/firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function useTurnosManagement() {
  const { toast } = useToast();
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const [mascotaDetails, setMascotaDetails] = useState<Mascota | null>(null);
  const [loadingMascota, setLoadingMascota] = useState(false);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const fetchTurnos = async () => {
    try {
      const data = await getTurnos();
      setTurnos(data);
    } catch (error) {
      console.error("Error fetching turnos:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los turnos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockedDates = async () => {
    try {
      const docRef = doc(db, "settings", "blockedDates");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlockedDates(docSnap.data().dates || []);
      }
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
    }
  };

  const fetchMascotaDetails = async (clienteId: string, mascotaId: string) => {
    if (!mascotaId || !clienteId) return null;

    setLoadingMascota(true);
    try {
      const mascotas = await getMascotas(clienteId);
      const mascota = mascotas.find((m) => m.id === mascotaId);
      setMascotaDetails(mascota || null);
      return mascota || null;
    } catch (error) {
      console.error("Error fetching mascota details:", error);
      return null;
    } finally {
      setLoadingMascota(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
    fetchBlockedDates();
  }, []);

  const handleToggleBlockDate = async (dateStr: string) => {
    try {
      const isCurrentlyBlocked = blockedDates.includes(dateStr);
      let newBlockedDates: string[];

      if (isCurrentlyBlocked) {
        newBlockedDates = blockedDates.filter((d) => d !== dateStr);
        toast({
          title: "Fecha habilitada",
          description: `La fecha ${dateStr} ha sido habilitada`,
        });
      } else {
        newBlockedDates = [...blockedDates, dateStr];
        toast({
          title: "Fecha bloqueada",
          description: `La fecha ${dateStr} ha sido bloqueada`,
        });
      }

      await setDoc(doc(db, "settings", "blockedDates"), {
        dates: newBlockedDates,
      });
      setBlockedDates(newBlockedDates);
    } catch (error) {
      console.error("Error toggling block date:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la fecha",
        variant: "destructive",
      });
    }
  };

  const handleToggleSingleDate = async (
    singleDateBlock: string,
    action: "block" | "unblock",
    onSuccess: () => void
  ) => {
    if (!singleDateBlock) {
      toast({
        title: "Error",
        description: "Debes seleccionar una fecha",
        variant: "destructive",
      });
      return;
    }

    try {
      let newBlockedDates: string[];

      if (action === "block") {
        newBlockedDates = [...new Set([...blockedDates, singleDateBlock])];
        toast({
          title: "Fecha bloqueada",
          description: `Se bloqueó la fecha ${singleDateBlock}`,
        });
      } else {
        newBlockedDates = blockedDates.filter((d) => d !== singleDateBlock);
        toast({
          title: "Fecha habilitada",
          description: `Se habilitó la fecha ${singleDateBlock}`,
        });
      }

      await setDoc(doc(db, "settings", "blockedDates"), {
        dates: newBlockedDates,
      });
      setBlockedDates(newBlockedDates);
      onSuccess();
    } catch (error) {
      console.error("Error toggling single date:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la fecha",
        variant: "destructive",
      });
    }
  };

  const handleToggleDateRange = async (
    dateRangeStart: string,
    dateRangeEnd: string,
    action: "block" | "unblock",
    onSuccess: () => void
  ) => {
    if (!dateRangeStart || !dateRangeEnd) {
      toast({
        title: "Error",
        description: "Debes seleccionar ambas fechas del rango",
        variant: "destructive",
      });
      return;
    }

    try {
      const start = new Date(dateRangeStart + "T00:00:00");
      const end = new Date(dateRangeEnd + "T00:00:00");

      if (start > end) {
        toast({
          title: "Error",
          description: "La fecha de inicio debe ser anterior a la de fin",
          variant: "destructive",
        });
        return;
      }

      const datesToModify: string[] = [];
      const currentDate = new Date(start);

      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split("T")[0];
        datesToModify.push(dateStr);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      let newBlockedDates: string[];

      if (action === "block") {
        newBlockedDates = [...new Set([...blockedDates, ...datesToModify])];
        toast({
          title: "Rango bloqueado",
          description: `Se bloquearon ${datesToModify.length} fechas`,
        });
      } else {
        newBlockedDates = blockedDates.filter(
          (d) => !datesToModify.includes(d)
        );
        toast({
          title: "Rango habilitado",
          description: `Se habilitaron ${datesToModify.length} fechas`,
        });
      }

      await setDoc(doc(db, "settings", "blockedDates"), {
        dates: newBlockedDates,
      });
      setBlockedDates(newBlockedDates);
      onSuccess();
    } catch (error) {
      console.error("Error toggling date range:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el rango de fechas",
        variant: "destructive",
      });
    }
  };

  const handleMarkCompleted = async (turnoId: string, onSuccess: () => void) => {
    try {
      await updateTurno(turnoId, { estado: "completado" });
      toast({
        title: "Turno completado",
        description: "El turno ha sido marcado como completado",
      });
      await fetchTurnos();
      onSuccess();
    } catch (error) {
      console.error("Error updating turno:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el turno",
        variant: "destructive",
      });
    }
  };

  const handleCancel = async (turnoId: string, onSuccess: () => void) => {
    try {
      await updateTurno(turnoId, { estado: "cancelado" });
      toast({
        title: "Turno cancelado",
        description: "El turno ha sido cancelado",
      });
      await fetchTurnos();
      onSuccess();
    } catch (error) {
      console.error("Error canceling turno:", error);
      toast({
        title: "Error",
        description: "No se pudo cancelar el turno",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (turnoId: string, onSuccess: () => void) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este turno?")) return;

    try {
      await deleteTurno(turnoId);
      toast({
        title: "Turno eliminado",
        description: "El turno ha sido eliminado correctamente",
      });
      await fetchTurnos();
      onSuccess();
    } catch (error) {
      console.error("Error deleting turno:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el turno",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async (
    turnoId: string,
    editData: { fecha: string; hora: string },
    turno: Turno,
    onSuccess: () => void
  ) => {
    try {
      await updateTurno(turnoId, {
        turno: {
          ...turno.turno,
          fecha: editData.fecha,
          hora: editData.hora,
        },
      });
      toast({
        title: "Turno actualizado",
        description: "La fecha y hora han sido actualizadas",
      });
      await fetchTurnos();
      onSuccess();
    } catch (error) {
      console.error("Error updating turno:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el turno",
        variant: "destructive",
      });
    }
  };

  return {
    turnos,
    loading,
    selectedTurno,
    setSelectedTurno,
    mascotaDetails,
    setMascotaDetails,
    loadingMascota,
    blockedDates,
    selectedDate,
    setSelectedDate,
    fetchMascotaDetails,
    fetchTurnos,
    handleToggleBlockDate,
    handleToggleSingleDate,
    handleToggleDateRange,
    handleMarkCompleted,
    handleCancel,
    handleDelete,
    handleSaveEdit,
  };
}