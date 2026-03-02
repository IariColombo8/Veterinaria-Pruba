// /components/turnos/TurnoForm.tsx
"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TurnoHeader } from "./TurnoHeader";
import { ClienteSection } from "./ClienteSection";
import { MascotaSection } from "./MascotaSection";
import { ServicioSection } from "./ServicioSection";
import { VacunaSection } from "./VacunaSection"; // NUEVO
import { FechaHoraSection } from "./FechaHoraSection";
import { TurnoSubmitButton } from "./TurnoSubmitButton";
import { ModalConfirmacion } from "./ModalConfirmacion";
import { useTurnoForm } from "@/hooks/turnos/useTurnoForm";
import { Heart, Clock } from "lucide-react";

interface TurnoFormProps {
  defaultDni?: string;
  lockDni?: boolean;
  redirectOnSuccess?: boolean;
  onSuccess?: () => void;
}

export function TurnoForm({
  defaultDni,
  lockDni,
  redirectOnSuccess = true,
  onSuccess,
}: TurnoFormProps) {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleConfirmedSubmit,
    handleVacunasChange, // NUEVO
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
  } = useTurnoForm({ defaultDni, lockDni, redirectOnSuccess, onSuccess });

  // NUEVO: Determinar si mostrar sección de vacunas
  const mostrarVacunas = formData.servicio === "vacunacion" && formData.tipoMascota;

  return (
    <>
      <Card className="shadow-2xl border-2 backdrop-blur-sm bg-background/95 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <TurnoHeader />

        <CardContent className="px-6 py-8 md:px-8 md:py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cliente Info */}
            <ClienteSection
              formData={formData}
              handleChange={handleChange}
              clienteExistente={clienteExistente}
              loadingCliente={loadingCliente}
              lockDni={lockDni}
            />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <div className="px-4 bg-background">
                  <Heart className="h-5 w-5 text-primary fill-primary/20" />
                </div>
              </div>
            </div>

            {/* Mascota Info */}
            <MascotaSection
              formData={formData}
              handleChange={handleChange}
              mascotas={mascotas}
              mostrarNuevaMascota={mostrarNuevaMascota}
              setMostrarNuevaMascota={setMostrarNuevaMascota}
            />

            {/* Servicio */}
            <ServicioSection formData={formData} handleChange={handleChange} />

            {/* NUEVO: Sección de Vacunas - Solo se muestra si el servicio es vacunación */}
            {mostrarVacunas && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                </div>
                
                <VacunaSection
                  tipoMascota={formData.tipoMascota}
                  vacunasSeleccionadas={formData.vacunas}
                  onVacunasChange={handleVacunasChange}
                />
              </>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <div className="px-4 bg-background">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* Fecha y Hora */}
            <FechaHoraSection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              formData={formData}
              handleChange={handleChange}
              diasBloqueados={diasBloqueados}
              horariosDisponibles={horariosDisponibles}
            />

            {/* Submit Button */}
            <TurnoSubmitButton loading={loading} />
          </form>
        </CardContent>
      </Card>

      {/* Modal de Confirmación */}
      <ModalConfirmacion
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedSubmit}
        formData={formData}
        selectedDate={selectedDate}
        loading={loading}
      />
    </>
  );
}