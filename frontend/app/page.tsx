'use client'

import { useState } from 'react'
import HomePage from '@/components/HomePage'
import LoginSignupPage from '@/components/LoginSignupPage'
import JobPortalPage from '@/components/JobPortalPage'
import AdminDashboard from '@/components/AdminDashboard'
import Navbar from '@/components/Navbar'

type PageType = 'home' | 'portal' | 'admin' | 'auth'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null)

  const handleLogin = (role: 'student' | 'admin') => {
    setIsAuthenticated(true)
    setUserRole(role)
    if (role === 'admin') {
      setCurrentPage('admin')
    } else {
      setCurrentPage('portal')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setCurrentPage('home')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="pt-14">
        {!isAuthenticated ? (
          <>
            {currentPage === 'home' && <HomePage setPage={() => setCurrentPage} />}
            {currentPage === 'auth' && (
              <LoginSignupPage onLogin={handleLogin} />
            )}
          </>
        ) : (
          <>
            {currentPage === 'home' && <HomePage setPage={() => setCurrentPage} />}
            {currentPage === 'portal' && <JobPortalPage />}
            {currentPage === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>
    </div>
  )
}
