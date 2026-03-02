"use client";

import emailjs from "@emailjs/browser";

interface DatosTurno {
  nombre_y_apellido: string;
  fecha: string;
  hora: string;
  direccion: string;
  nombre_mascota: string;
  tipo_mascota: string;
  servicio_requerido: string;
  email: string;
}

export const enviarEmailConfirmacion = async (
  datos: DatosTurno,
): Promise<boolean> => {
  try {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

    const templateParams = {
      nombre_y_apellido: datos.nombre_y_apellido,
      fecha: datos.fecha,
      hora: datos.hora,
      direccion: datos.direccion,
      nombre_mascota: datos.nombre_mascota,
      tipo_mascota: datos.tipo_mascota,
      servicio_requerido: datos.servicio_requerido,
      email: datos.email,
    };

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
    );

    console.log("Email enviado:", response.status, response.text);
    return true;
  } catch (error) {
    console.error("Error al enviar email:", error);
    return false;
  }
};
