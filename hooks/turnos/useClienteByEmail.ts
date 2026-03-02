import { useState, useEffect } from "react";
import { getClienteByEmail, getMascotasByClienteId } from "@/lib/firebase/firestore";

export function useClienteByEmail(email: string) {
  const [clienteExistente, setClienteExistente] = useState<any>(null);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [mostrarNuevaMascota, setMostrarNuevaMascota] = useState(true);

  useEffect(() => {
    const buscarCliente = async () => {
      if (email && email.includes("@")) {
        try {
          const cliente = await getClienteByEmail(email);
          if (cliente) {
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
        }
      }
    };

    const debounce = setTimeout(buscarCliente, 500);
    return () => clearTimeout(debounce);
  }, [email]);

  return {
    clienteExistente,
    mascotas,
    mostrarNuevaMascota,
    setMostrarNuevaMascota,
  };
}