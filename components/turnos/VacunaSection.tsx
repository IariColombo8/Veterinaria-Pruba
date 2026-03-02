// /components/turnos/VacunaSection.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Syringe } from "lucide-react";

interface VacunaSectionProps {
  tipoMascota: string;
  vacunasSeleccionadas: string[];
  onVacunasChange: (vacunas: string[]) => void;
}

const VACUNAS_PERRO = [
  { 
    id: "antirrabica", 
    nombre: "Antirrábica", 
    descripcion: "Obligatoria - Protección contra el virus de la rabia" 
  },
  { 
    id: "quintuple", 
    nombre: "Quíntuple", 
    descripcion: "Protección contra Moquillo, Hepatitis, Parvovirus, Parainfluenza y Adenovirus" 
  },
  { 
    id: "sextuple", 
    nombre: "Séxtuple", 
    descripcion: "Quíntuple + Leptospirosis - Protección más completa" 
  },
];

const VACUNAS_GATO = [
  { 
    id: "triple-felina", 
    nombre: "Triple Felina", 
    descripcion: "Protección contra Panleucopenia, Rinotraqueítis y Calicivirus" 
  },
  { 
    id: "leucemia-felina", 
    nombre: "Leucemia Felina (FeLV)", 
    descripcion: "Recomendada para gatos que salen al exterior o conviven con otros gatos" 
  },
  { 
    id: "antirrabica", 
    nombre: "Antirrábica", 
    descripcion: "Obligatoria - Protección contra el virus de la rabia" 
  },
];

export function VacunaSection({ tipoMascota, vacunasSeleccionadas, onVacunasChange }: VacunaSectionProps) {
  // Si es ave u otro animal, mostrar mensaje informativo
  if (tipoMascota !== "perro" && tipoMascota !== "gato") {
    return (
      <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2">
          <Syringe className="h-5 w-5 text-primary" />
          <Label className="text-base font-semibold">
            Información sobre Vacunas
          </Label>
        </div>
        
        <div className="p-4 rounded-md bg-background/50 border border-primary/10">
          <p className="text-sm text-muted-foreground text-center">
            El veterinario le informará durante la consulta sobre el plan de vacunación específico para su mascota.
          </p>
        </div>
      </div>
    );
  }

  const vacunas = tipoMascota === "perro" ? VACUNAS_PERRO : VACUNAS_GATO;

  const handleVacunaToggle = (vacunaId: string) => {
    const nuevasVacunas = vacunasSeleccionadas.includes(vacunaId)
      ? vacunasSeleccionadas.filter(v => v !== vacunaId)
      : [...vacunasSeleccionadas, vacunaId];
    
    onVacunasChange(nuevasVacunas);
  };

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2">
        <Syringe className="h-5 w-5 text-primary" />
        <Label className="text-base font-semibold">
          Selecciona las vacunas requeridas
        </Label>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Puedes seleccionar una o más vacunas para este turno
      </p>

      <div className="space-y-3">
        {vacunas.map((vacuna) => (
          <div 
            key={vacuna.id} 
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-background/50 transition-colors"
          >
            <Checkbox
              id={vacuna.id}
              checked={vacunasSeleccionadas.includes(vacuna.id)}
              onCheckedChange={() => handleVacunaToggle(vacuna.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <label
                htmlFor={vacuna.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {vacuna.nombre}
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                {vacuna.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {vacunasSeleccionadas.length === 0 && (
        <p className="text-xs text-destructive mt-2">
          * Por favor selecciona al menos una vacuna
        </p>
      )}
    </div>
  );
}