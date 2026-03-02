import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getTurnos } from "@/lib/firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function useDisponibilidadTurnos() {
  const { toast } = useToast();
  const [diasBloqueados, setDiasBloqueados] = useState<string[]>([]);
  const [turnosExistentes, setTurnosExistentes] = useState<any[]>([]);

  // Cargar días bloqueados y turnos al montar
  useEffect(() => {
    const cargarDisponibilidad = async () => {
      try {
        // Cargar fechas bloqueadas desde Firestore settings/blockedDates
        const docRef = doc(db, "settings", "blockedDates");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fechasBloqueadas = docSnap.data().dates || [];
          setDiasBloqueados(fechasBloqueadas);
          console.log("Fechas bloqueadas cargadas:", fechasBloqueadas);
        } else {
          console.log("No hay documento de fechas bloqueadas");
          setDiasBloqueados([]);
        }

        // Cargar turnos existentes
        const turnosData = await getTurnos();
        setTurnosExistentes(turnosData);
      } catch (error) {
        console.error("Error cargando disponibilidad:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la disponibilidad",
          variant: "destructive",
        });
      }
    };

    cargarDisponibilidad();
  }, [toast]);

  return {
    diasBloqueados,
    turnosExistentes,
  };
}