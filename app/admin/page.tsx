"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import TurnosManagement from "@/components/admin/turnos-management"
import { LibretaSanitariaManagement } from "@/components/admin/libreta-sanitaria-management"
import { LayoutDashboard, Calendar, FileText, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [turnosTargetDate, setTurnosTargetDate] = useState<string | null>(null)
  const router = useRouter()

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/5 dark:bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hover:bg-slate-100 dark:hover:bg-slate-800 h-8 sm:h-9 px-2 sm:px-3 rounded-lg shrink-0"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline text-sm font-medium">Volver</span>
            </Button>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 shrink-0">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)]">
        <div className="sticky top-[52px] sm:top-[56px] z-30 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-start sm:justify-center overflow-x-auto pb-1 scrollbar-hide">
              <TabsList className="inline-flex h-auto gap-1 p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shrink-0">
                <TabsTrigger value="dashboard" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:bg-slate-200 dark:data-[state=inactive]:hover:bg-slate-700">
                  <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
                  <span className="hidden xs:inline">Dashboard</span>
                  <span className="xs:hidden">Inicio</span>
                </TabsTrigger>
                <TabsTrigger value="turnos" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:bg-slate-200 dark:data-[state=inactive]:hover:bg-slate-700">
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  <span>Turnos</span>
                </TabsTrigger>
                <TabsTrigger value="libreta" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:bg-slate-200 dark:data-[state=inactive]:hover:bg-slate-700">
                  <FileText className="h-4 w-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Libreta Sanitaria</span>
                  <span className="sm:hidden">Libreta</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex-1">
          <TabsContent value="dashboard" className="mt-0 space-y-6 data-[state=inactive]:hidden">
            <DashboardCharts
              onNavigateToTurnos={(fecha) => {
                setActiveTab("turnos")
                if (fecha) {
                  setTurnosTargetDate(fecha)
                }
              }}
            />
          </TabsContent>
          <TabsContent value="turnos" className="mt-0 space-y-6 data-[state=inactive]:hidden">
            <TurnosManagement targetDate={turnosTargetDate ?? undefined} />
          </TabsContent>
          <TabsContent value="libreta" className="mt-0 data-[state=inactive]:hidden">
            <LibretaSanitariaManagement />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}