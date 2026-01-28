import React from "react"
import { AppProvider } from '@/lib/app-context'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
