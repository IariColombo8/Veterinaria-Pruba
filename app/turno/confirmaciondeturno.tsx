"use client"

import emailjs from '@emailjs/browser'

interface DatosTurno {
  nombre_y_apellido: string
  fecha: string
  hora: string
  direccion: string
  nombre_mascota: string
  tipo_mascota: string
  servicio_requerido: string
  email: string
}

export const enviarEmailConfirmacion = async (datos: DatosTurno): Promise<boolean> => {
  try {
    // Inicializar EmailJS con tu Public Key
    emailjs.init('-xJCnnC8OzbgOFNbt')

    // Parámetros del template
    const templateParams = {
      nombre_y_apellido: datos.nombre_y_apellido,
      fecha: datos.fecha,
      hora: datos.hora,
      direccion: datos.direccion,
      nombre_mascota: datos.nombre_mascota,
      tipo_mascota: datos.tipo_mascota,
      servicio_requerido: datos.servicio_requerido,
      email: datos.email, // Email del destinatario
    }

    // Enviar email
    // IMPORTANTE: Reemplaza estos valores con los tuyos de EmailJS
    const response = await emailjs.send(
      "turnos_veterinaria_p_s", // Reemplazar con tu Service ID
      "confirmacion_correosPS", // Reemplazar con tu Template ID
      templateParams
    );

    console.log('Email enviado exitosamente:', response.status, response.text)
    return true
  } catch (error) {
    console.error('Error al enviar email:', error)
    return false
  }
}