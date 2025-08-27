"use client"

import { useEffect, useState } from "react"
import LoadingPage from "@/components/loadingpage/LoadingPage"

export default function ClientDashboard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading (replace with actual logic like auth/data fetching)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingPage />

  return <>{children}</>
}
