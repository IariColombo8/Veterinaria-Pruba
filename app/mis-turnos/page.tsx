"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMisTurnosCliente } from "@/hooks/turnos/useMisTurnosCliente";
import { MisTurnosCliente } from "@/components/turnos/MisTurnosCliente";
import { MiLibretaCliente } from "@/components/turnos/MiLibretaCliente";

export default function MisTurnosPage() {
  const [dniInput, setDniInput] = useState("");
  const {
    loading,
    error,
    cliente,
    mascotas,
    turnos,
    buscarPorDni,
    cancelarTurno,
    refrescar,
    reset,
    dniActual,
  } = useMisTurnosCliente();

  return (
    <main className="min-h-screen bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 py-8 md:py-16">
      <div className="container max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Ver mis turnos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ingresá tu DNI para ver y gestionar tus turnos.
          </p>
        </div>

        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Acceso rápido</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                DNI
              </label>
              <Input
                placeholder="12345678"
                value={dniInput}
                onChange={(e) => setDniInput(e.target.value)}
                className="h-10"
              />
              {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => buscarPorDni(dniInput)}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? "Buscando..." : "Ingresar"}
              </Button>
              {cliente && (
                <Button variant="outline" onClick={reset}>
                  Cambiar DNI
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {cliente && (
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {cliente.nombre}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    DNI {dniActual}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="turnos">
                <TabsList className="h-9 bg-slate-200/80 dark:bg-slate-800/80">
                  <TabsTrigger value="turnos" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    Mis turnos
                  </TabsTrigger>
                  <TabsTrigger value="libreta" className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    Libreta sanitaria
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="turnos" className="mt-4">
                  <MisTurnosCliente
                    dni={dniActual}
                    turnos={turnos}
                    onCancelar={cancelarTurno}
                    onRefresh={refrescar}
                  />
                </TabsContent>
                <TabsContent value="libreta" className="mt-4">
                  <MiLibretaCliente
                    mascotas={mascotas}
                    turnos={turnos}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
