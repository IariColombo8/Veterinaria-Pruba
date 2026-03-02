import { db } from "./config"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

// ============ INTERFACES ============
export interface HistorialDato {
  campo: string
  valorAnterior: string
  valorNuevo: string
  fechaCambio: string
}

export interface Cliente {
  id?: string
  nombre: string
  telefono: string
  email: string
  dni?: string
  domicilio?: string
  historialDatos?: HistorialDato[]
  createdAt?: string
  updatedAt?: string
}

export interface Mascota {
  id?: string
  nombre: string
  tipo: string
  edad?: string
  raza?: string
  peso?: string
}

export interface Turno {
  id?: string
  clienteId: string
  mascotaId?: string
  cliente: {
    nombre: string
    telefono: string
    email: string
    dni?: string
    domicilio?: string
  }
  mascota: {
    nombre: string
    tipo: string
    motivo?: string
  }
  servicio?: string
  fecha?: string
  hora?: string
  turno: {
    fecha: string
    hora: string
    timestamp: any
  }
  estado: "pendiente" | "completado" | "cancelado"
  vacunas?: string[]
  /** Datos clínicos (editables en turnos pasados) */
  diagnostico?: string
  tratamiento?: string
  medicacion?: string
  observaciones?: string
}

export interface Historia {
  id?: string
  fechaAtencion: string
  motivo?: string
  diagnostico: string
  tratamiento: string
  observaciones?: string
  proximaVisita?: string
  archivos?: string[]
  tipoVisita?: "consulta" | "turno_programado" | "visita_programada"
  turnoId?: string
}

export interface HistoriaClinicaRegistro {
  consultas: any[]
  vacunas: any[]
  tratamientos: any[]
  alergias: any[]
  cirugias: any[]
  fechaCreacion: string
}

// ============ CLIENTES ============
export async function getClienteByDNI(dni: string) {
  if (!dni?.trim()) return null
  const clientesRef = collection(db, "clientes")
  const q = query(clientesRef, where("dni", "==", dni.trim()))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return { id: docSnap.id, ...docSnap.data() } as Cliente
}

export async function createCliente(data: Omit<Cliente, "id">) {
  // Si tiene DNI, buscar si ya existe
  if (data.dni?.trim()) {
    const existente = await getClienteByDNI(data.dni.trim())
    if (existente) {
      // Actualizar cliente existente en lugar de crear uno nuevo
      const cambios: HistorialDato[] = existente.historialDatos || []
      const ahora = new Date().toISOString()
      
      // Comparar y guardar cambios en historial
      if (data.domicilio && existente.domicilio !== data.domicilio) {
        cambios.push({
          campo: "domicilio",
          valorAnterior: existente.domicilio || "",
          valorNuevo: data.domicilio,
          fechaCambio: ahora,
        })
      }
      if (data.telefono && existente.telefono !== data.telefono) {
        cambios.push({
          campo: "telefono",
          valorAnterior: existente.telefono || "",
          valorNuevo: data.telefono,
          fechaCambio: ahora,
        })
      }
      if (data.email && existente.email !== data.email) {
        cambios.push({
          campo: "email",
          valorAnterior: existente.email || "",
          valorNuevo: data.email,
          fechaCambio: ahora,
        })
      }
      if (data.nombre && existente.nombre !== data.nombre) {
        cambios.push({
          campo: "nombre",
          valorAnterior: existente.nombre || "",
          valorNuevo: data.nombre,
          fechaCambio: ahora,
        })
      }
      
      const clienteRef = doc(db, "clientes", existente.id!)
      await updateDoc(clienteRef, {
        ...data,
        historialDatos: cambios,
        updatedAt: ahora,
      })
      return { id: existente.id, ...existente, ...data, historialDatos: cambios }
    }
  }
  
  // Crear nuevo cliente
  const clientesRef = collection(db, "clientes")
  const nuevoCliente = {
    ...data,
    historialDatos: [],
    createdAt: new Date().toISOString(),
  }
  const docRef = await addDoc(clientesRef, nuevoCliente)
  return { id: docRef.id, ...nuevoCliente }
}

export async function getClientes() {
  const clientesRef = collection(db, "clientes")
  const snapshot = await getDocs(clientesRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Cliente)
}

/** Obtiene solo los campos básicos para la tabla (optimización) */
export async function getClientesBasic() {
  const clientesRef = collection(db, "clientes")
  const snapshot = await getDocs(clientesRef)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      nombre: data.nombre || "",
      telefono: data.telefono || "",
      email: data.email || "",
      dni: data.dni || "",
      domicilio: data.domicilio || "",
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as Cliente
  })
}

/** Obtiene un cliente completo con todas sus mascotas (para modal detalles) */
export async function getClienteCompleto(clienteId: string) {
  const clienteRef = doc(db, "clientes", clienteId)
  const clienteSnap = await getDoc(clienteRef)
  if (!clienteSnap.exists()) return null
  
  const cliente = { id: clienteSnap.id, ...clienteSnap.data() } as Cliente
  const mascotas = await getMascotas(clienteId)
  
  return { ...cliente, mascotas }
}

export async function getClienteByEmail(email: string) {
  const clientesRef = collection(db, "clientes")
  const q = query(clientesRef, where("email", "==", email))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return { id: docSnap.id, ...docSnap.data() } as Cliente
}

export async function updateCliente(
  clienteId: string,
  data: Partial<Omit<Cliente, "id">>
) {
  try {
    const clienteRef = doc(db, "clientes", clienteId)
    const clienteActual = await getDoc(clienteRef)
    if (!clienteActual.exists()) throw new Error("Cliente no encontrado")
    
    const clienteData = clienteActual.data() as Cliente
    const cambios: HistorialDato[] = clienteData.historialDatos || []
    const ahora = new Date().toISOString()
    
    // Comparar y guardar cambios en historial
    if (data.domicilio !== undefined && clienteData.domicilio !== data.domicilio) {
      cambios.push({
        campo: "domicilio",
        valorAnterior: clienteData.domicilio || "",
        valorNuevo: data.domicilio || "",
        fechaCambio: ahora,
      })
    }
    if (data.telefono !== undefined && clienteData.telefono !== data.telefono) {
      cambios.push({
        campo: "telefono",
        valorAnterior: clienteData.telefono || "",
        valorNuevo: data.telefono || "",
        fechaCambio: ahora,
      })
    }
    if (data.email !== undefined && clienteData.email !== data.email) {
      cambios.push({
        campo: "email",
        valorAnterior: clienteData.email || "",
        valorNuevo: data.email || "",
        fechaCambio: ahora,
      })
    }
    if (data.nombre !== undefined && clienteData.nombre !== data.nombre) {
      cambios.push({
        campo: "nombre",
        valorAnterior: clienteData.nombre || "",
        valorNuevo: data.nombre || "",
        fechaCambio: ahora,
      })
    }
    
    await updateDoc(clienteRef, {
      ...data,
      historialDatos: cambios,
      updatedAt: ahora,
    })
    console.log("Cliente actualizado exitosamente:", clienteId)
    return { success: true, id: clienteId }
  } catch (error) {
    console.error("Error actualizando cliente:", error)
    throw error
  }
}

// ============ MASCOTAS ============
export async function createMascota(clienteId: string, data: Omit<Mascota, "id">) {
  const mascotasRef = collection(db, "clientes", clienteId, "mascotas")
  const mascotaRef = await addDoc(mascotasRef, {
    ...data,
    createdAt: new Date().toISOString(),
  })
  
  await createHistoriaClinicaRegistro(clienteId, mascotaRef.id)
  
  return mascotaRef
}

export async function getMascotas(clienteId: string) {
  const mascotasRef = collection(db, "clientes", clienteId, "mascotas")
  const snapshot = await getDocs(mascotasRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Mascota)
}

export const getMascotasByClienteId = getMascotas

export async function updateMascota(
  clienteId: string,
  mascotaId: string,
  data: Partial<Omit<Mascota, "id">>
) {
  try {
    const mascotaRef = doc(db, "clientes", clienteId, "mascotas", mascotaId)
    await updateDoc(mascotaRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    })
    console.log("Mascota actualizada exitosamente:", mascotaId)
    return { success: true, id: mascotaId }
  } catch (error) {
    console.error("Error actualizando mascota:", error)
    throw error
  }
}

// ============ HISTORIA CLÍNICA (DOCUMENTO REGISTRO) ============
export async function createHistoriaClinicaRegistro(clienteId: string, mascotaId: string) {
  const historiaRef = doc(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historiaClinica",
    "registro"
  )
  await setDoc(historiaRef, {
    consultas: [],
    vacunas: [],
    tratamientos: [],
    alergias: [],
    cirugias: [],
    fechaCreacion: new Date().toISOString(),
  })
  return historiaRef
}

export async function getHistoriaClinicaRegistro(clienteId: string, mascotaId: string) {
  const historiaRef = doc(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historiaClinica",
    "registro"
  )
  const snapshot = await getDoc(historiaRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() } as HistoriaClinicaRegistro
}

export async function updateHistoriaClinicaRegistro(
  clienteId: string,
  mascotaId: string,
  data: Partial<HistoriaClinicaRegistro>
) {
  const historiaRef = doc(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historiaClinica",
    "registro"
  )
  await setDoc(historiaRef, data, { merge: true })
}

export const createHistoriaClinica = createHistoriaClinicaRegistro
export const getHistoriaClinica = getHistoriaClinicaRegistro
export const updateHistoriaClinica = updateHistoriaClinicaRegistro

// ============ HISTORIAS CLÍNICAS (COLECCIÓN DE REGISTROS) ============
export async function createHistoria(
  clienteId: string,
  mascotaId: string,
  historiaData: Omit<Historia, "id">
) {
  const historiasRef = collection(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historias"
  )
  // Firestore no acepta undefined; todos los campos con valor por defecto string
  const payload: Record<string, string | string[]> = {
    fechaAtencion: historiaData.fechaAtencion ?? "",
    motivo: historiaData.motivo ?? "Consulta general",
    diagnostico: historiaData.diagnostico ?? "",
    tratamiento: historiaData.tratamiento ?? "—",
    observaciones: historiaData.observaciones ?? "",
    proximaVisita: historiaData.proximaVisita ?? "",
  }
  if (historiaData.tipoVisita != null && historiaData.tipoVisita !== "") payload.tipoVisita = historiaData.tipoVisita
  if (historiaData.turnoId != null && historiaData.turnoId !== "") payload.turnoId = historiaData.turnoId
  if (historiaData.archivos?.length) payload.archivos = historiaData.archivos
  return await addDoc(historiasRef, payload)
}

export async function getHistorias(clienteId: string, mascotaId: string) {
  const historiasRef = collection(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historias"
  )
  const q = query(historiasRef, orderBy("fechaAtencion", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Historia)
}

/** Cuenta el número de consultas/visitas de una mascota */
export async function contarVisitasMascota(clienteId: string, mascotaId: string): Promise<number> {
  try {
    const historias = await getHistorias(clienteId, mascotaId)
    return historias.filter((h) => h.tipoVisita !== "turno_programado").length
  } catch {
    return 0
  }
}

/** Obtiene clientes con sus mascotas y contadores (optimizado para pre-fetching) */
export async function getClientesConMascotasYContadores(limit?: number, offset?: number) {
  const clientesData = await getClientesBasic()
  
  // Filtrar solo clientes con DNI (clave única)
  const clientesConDNI = clientesData.filter((c) => c.dni?.trim())
  
  // Aplicar paginación si se especifica
  const paginados = limit
    ? clientesConDNI.slice(offset || 0, (offset || 0) + limit)
    : clientesConDNI
  
  const resultado = []
  
  for (const cliente of paginados) {
    if (!cliente.id) continue
    
    try {
      const mascotas = await getMascotas(cliente.id)
      
      // Solo incluir si tiene mascotas
      if (mascotas.length === 0) continue
      
      const mascotasConContadores = await Promise.all(
        mascotas.map(async (mascota) => {
          if (!mascota.id) return null
          const historias = await getHistorias(cliente.id!, mascota.id)
          const totalVisitas = historias.filter((h) => h.tipoVisita !== "turno_programado").length
          const ultimaVisita = historias.length > 0 ? historias[0] : null
          
          return {
            mascota,
            totalVisitas,
            ultimaVisita,
            totalConsultas: historias.length,
          }
        })
      )
      
      resultado.push({
        cliente,
        mascotas: mascotasConContadores.filter((m) => m !== null),
        totalMascotas: mascotas.length,
      })
    } catch (error) {
      console.error(`Error loading mascotas for cliente ${cliente.id}:`, error)
    }
  }
  
  return {
    clientes: resultado,
    total: clientesConDNI.length,
    hasMore: limit ? (offset || 0) + limit < clientesConDNI.length : false,
  }
}

export async function updateHistoria(
  clienteId: string,
  mascotaId: string,
  historiaId: string,
  data: Partial<Historia>
) {
  const historiaRef = doc(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historias",
    historiaId
  )
  return await updateDoc(historiaRef, data)
}

export async function deleteHistoria(
  clienteId: string,
  mascotaId: string,
  historiaId: string
) {
  const historiaRef = doc(
    db,
    "clientes",
    clienteId,
    "mascotas",
    mascotaId,
    "historias",
    historiaId
  )
  return await deleteDoc(historiaRef)
}

// ============ TURNOS ============
export async function createTurno(turnoData: Partial<Turno>) {
  const turnosRef = collection(db, "turnos")
  
  console.log("📋 FIRESTORE - Datos recibidos en createTurno:", turnoData);
  console.log("📋 FIRESTORE - Vacunas recibidas:", turnoData.vacunas);
  
  const turnoCompleto = {
    clienteId: turnoData.clienteId || "",
    mascotaId: turnoData.mascotaId || "",
    cliente: {
      nombre: turnoData.cliente?.nombre || "",
      telefono: turnoData.cliente?.telefono || "",
      email: turnoData.cliente?.email || "",
      dni: turnoData.cliente?.dni || "",
      domicilio: turnoData.cliente?.domicilio || "",
    },
    mascota: {
      nombre: turnoData.mascota?.nombre || "",
      tipo: turnoData.mascota?.tipo || "",
      motivo: turnoData.mascota?.motivo || "",
    },
    servicio: turnoData.servicio || "",
    vacunas: turnoData.vacunas || [],
    fecha: turnoData.fecha || turnoData.turno?.fecha || "",
    hora: turnoData.hora || turnoData.turno?.hora || "",
    turno: {
      fecha: turnoData.fecha || turnoData.turno?.fecha || "",
      hora: turnoData.hora || turnoData.turno?.hora || "",
      timestamp: serverTimestamp(),
    },
    estado: turnoData.estado || "pendiente",
  }
  
  console.log("📋 FIRESTORE - Turno completo a guardar:", turnoCompleto);
  console.log("📋 FIRESTORE - Vacunas en turnoCompleto:", turnoCompleto.vacunas);
  
  const docRef = await addDoc(turnosRef, turnoCompleto)
  console.log("✅ FIRESTORE - Turno guardado con ID:", docRef.id);
  
  // Sincronización automática: crear entrada en historial clínico como "Visita Programada"
  if (turnoCompleto.clienteId && turnoCompleto.mascotaId && turnoCompleto.fecha) {
    try {
      const fechaTurno = turnoCompleto.fecha
      await createHistoria(
        turnoCompleto.clienteId,
        turnoCompleto.mascotaId,
        {
          fechaAtencion: fechaTurno,
          motivo: `Turno programado: ${turnoCompleto.servicio || "Consulta"}`,
          diagnostico: "Visita programada",
          tratamiento: turnoCompleto.mascota.motivo || "Pendiente de atención",
          observaciones: `Turno agendado para el ${fechaTurno} a las ${turnoCompleto.hora || ""}. Estado: ${turnoCompleto.estado}`,
          proximaVisita: fechaTurno,
          tipoVisita: "turno_programado",
          turnoId: docRef.id,
        }
      )
      console.log("✅ FIRESTORE - Entrada en historial clínico creada automáticamente")
    } catch (error) {
      console.error("⚠️ FIRESTORE - Error al crear entrada en historial clínico:", error)
      // No lanzar error para no interrumpir el flujo del turno
    }
  }
  
  return docRef
}

export async function getTurnos() {
  const turnosRef = collection(db, "turnos")
  const q = query(turnosRef, orderBy("turno.timestamp", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Turno)
}

/** Turnos de un cliente (para cruce con historial por mascota). Filtra en memoria para no depender de índices compuestos. */
export async function getTurnosByClienteId(clienteId: string): Promise<Turno[]> {
  if (!clienteId) return []
  try {
    const todos = await getTurnos()
    return todos.filter((t) => t.clienteId === clienteId)
  } catch {
    return []
  }
}

export async function updateTurno(turnoId: string, data: Partial<Turno>) {
  const turnoRef = doc(db, "turnos", turnoId)
  return await updateDoc(turnoRef, data)
}

export async function deleteTurno(turnoId: string) {
  const turnoRef = doc(db, "turnos", turnoId)
  return await deleteDoc(turnoRef)
}

// ============ DISPONIBILIDAD ============
export async function getDiasBloqueados() {
  const diasRef = collection(db, "diasBloqueados")
  const snapshot = await getDocs(diasRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function bloquearDia(fecha: string, motivo?: string) {
  const diasRef = collection(db, "diasBloqueados")
  return await addDoc(diasRef, {
    fecha,
    motivo: motivo || "Día bloqueado",
    fechaCreacion: new Date().toISOString()
  })
}

export async function desbloquearDia(diaId: string) {
  const diaRef = doc(db, "diasBloqueados", diaId)
  return await deleteDoc(diaRef)
}