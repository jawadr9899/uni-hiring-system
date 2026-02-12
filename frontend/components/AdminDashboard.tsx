'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VacancyManagement from './admin/VacancyManagement'
import AnalyticsPage from './admin/AnalyticsPage'

export default function AdminDashboard() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <div ref={containerRef} className="container mx-auto px-4 pt-24 pb-12">
        <div ref={headerRef} className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg opacity-70">Manage positions, vacancies, and view application analytics</p>
        </div>

        <Tabs defaultValue="vacancies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="vacancies" className="py-3">Vacancies</TabsTrigger>
            <TabsTrigger value="analytics" className="py-3">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="vacancies" className="mt-0">
            <VacancyManagement />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <AnalyticsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
