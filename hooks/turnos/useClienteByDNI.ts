import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getMascotasByClienteId } from "@/lib/firebase/firestore";

export function useClienteByDNI(dni: string) {
  const [clienteExistente, setClienteExistente] = useState<any>(null);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [mostrarNuevaMascota, setMostrarNuevaMascota] = useState(true);
  const [loadingCliente, setLoadingCliente] = useState(false);

  useEffect(() => {
    const buscarCliente = async () => {
      if (dni && dni.length >= 7) {
        setLoadingCliente(true);
        try {
          const clientesRef = collection(db, "clientes");
          const q = query(clientesRef, where("dni", "==", dni));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const clienteDoc = querySnapshot.docs[0];
            const cliente = { id: clienteDoc.id, ...clienteDoc.data() };
            setClienteExistente(cliente);

            const mascotasCliente = await getMascotasByClienteId(cliente.id);
            setMascotas(mascotasCliente);
            setMostrarNuevaMascota(mascotasCliente.length === 0);
          } else {
            setClienteExistente(null);
            setMascotas([]);
            setMostrarNuevaMascota(true);
          }
        } catch (error) {
          console.error("Error buscando cliente:", error);
        } finally {
          setLoadingCliente(false);
        }
      }
    };

    const debounce = setTimeout(buscarCliente, 500);
    return () => clearTimeout(debounce);
  }, [dni]);

  return {
    clienteExistente,
    mascotas,
    mostrarNuevaMascota,
    setMostrarNuevaMascota,
    loadingCliente,
  };
}