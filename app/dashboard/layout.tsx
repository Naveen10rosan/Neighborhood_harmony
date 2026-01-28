'use client'

import React from "react"

import { AppProvider } from '@/lib/app-context'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AppProvider>
  )
}
