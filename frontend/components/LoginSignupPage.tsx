'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Upload } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface LoginSignupPageProps {
  onLogin: (role: 'student' | 'admin') => void
}

export default function LoginSignupPage({ onLogin }: LoginSignupPageProps) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupCV, setSignupCV] = useState<File | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields')
      return
    }

    if (loginEmail === 'admin@university.edu' && loginPassword === 'admin123') {
      onLogin('admin')
    } else if (loginEmail === 'faculty@university.edu' && loginPassword === 'faculty123') {
      onLogin('student')
    } else {
      setError('Invalid credentials')
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!signupName || !signupEmail || !signupPassword || !signupCV) {
      setError('Please fill in all fields and upload CV')
      return
    }

    if (signupCV.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    onLogin('student')
  }

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSignupCV(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center py-12 px-4">
      <div ref={containerRef} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">FacultyHub</h1>
          <p className="text-sm opacity-70">Modern faculty recruitment platform</p>
        </div>

        <Card ref={cardRef} className="border-0 shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-0 rounded-none border-b">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="p-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="rounded-lg border-primary/20 focus:border-accent focus:ring-accent"
                  />
                  <p className="text-xs opacity-60">Demo: admin@university.edu</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="rounded-lg border-primary/20 focus:border-accent focus:ring-accent"
                  />
                  <p className="text-xs opacity-60">Demo: admin123</p>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg py-6 font-semibold text-base"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="rounded-lg border-primary/20 focus:border-accent focus:ring-accent"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="rounded-lg border-primary/20 focus:border-accent focus:ring-accent"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="rounded-lg border-primary/20 focus:border-accent focus:ring-accent"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="cv-upload">Upload CV (PDF)</Label>
                  <div className="relative border-2 border-dashed border-accent/30 rounded-lg p-6 text-center cursor-pointer hover:border-accent/60 transition-all duration-300 bg-accent/5 hover:bg-accent/10">
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleCVChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-semibold text-sm">
                      {signupCV ? signupCV.name : 'Click to upload CV'}
                    </p>
                    <p className="text-xs opacity-60 mt-1">PDF files only</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg py-6 font-semibold text-base"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
