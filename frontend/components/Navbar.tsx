'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: any) => void
  isAuthenticated: boolean
  userRole: 'student' | 'admin' | null
  onLogout: () => void
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isAuthenticated,
  userRole,
  onLogout,
}: NavbarProps) {
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b backdrop-blur"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          ref={logoRef}
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-bold transition-all duration-300 hover:opacity-70"
        >
          FacultyHub
        </button>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {userRole === 'student' && (
                <Button
                  variant={currentPage === 'portal' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('portal')}
                  size="sm"
                  className="transition-all duration-300"
                >
                  Portal
                </Button>
              )}
              {userRole === 'admin' && (
                <Button
                  variant={currentPage === 'admin' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('admin')}
                  size="sm"
                  className="transition-all duration-300"
                >
                  Dashboard
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={onLogout}
                size="sm"
                className="gap-2 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('home')}
                size="sm"
                className="transition-all duration-300"
              >
                Home
              </Button>
              <Button
                variant={currentPage === 'auth' ? 'default' : 'outline'}
                onClick={() => setCurrentPage('auth')}
                size="sm"
                className="transition-all duration-300"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
