import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";

interface ServicioSectionProps {
  formData: {
    servicio: string;
    motivo: string;
  };
  handleChange: (field: string, value: string) => void;
}

export function ServicioSection({
  formData,
  handleChange,
}: ServicioSectionProps) {
  return (
    <>
      {/* Selector de Servicio */}
      <div className="space-y-2">
        <Label
          htmlFor="servicio"
          className="text-sm font-semibold flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Servicio Requerido *
        </Label>
        <Select
          value={formData.servicio}
          onValueChange={(value) => handleChange("servicio", value)}
          required
        >
          <SelectTrigger id="servicio" className="h-auto min-h-[44px] border-2">
            <SelectValue placeholder="Selecciona el servicio que necesitas..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consulta-general">
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold text-sm">
                  🩺 Consultas Generales
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Exámenes completos y diagnósticos profesionales para tu
                  mascota
                </span>
              </div>
            </SelectItem>
            <SelectItem value="telemedicina">
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold text-sm">💻 Telemedicina</span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Procedimientos para detectar online y con rapidez el
                  diagnóstico
                </span>
              </div>
            </SelectItem>
            <SelectItem value="vacunacion">
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold text-sm">💉 Vacunación</span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Plan de vacunación completo para proteger a tu mascota
                </span>
              </div>
            </SelectItem>
            <SelectItem value="urgencias">
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold text-sm">🚨 Urgencias</span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Atención de emergencia las 24 horas del día
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivo" className="text-sm font-semibold">
          Motivo de la Consulta *
        </Label>
        <Textarea
          id="motivo"
          placeholder="Describe brevemente el motivo de la consulta..."
          value={formData.motivo}
          onChange={(e) => handleChange("motivo", e.target.value)}
          required
          rows={4}
          className="border-2 focus-visible:ring-primary/50 resize-none"
        />
      </div>
    </>
  );
}
