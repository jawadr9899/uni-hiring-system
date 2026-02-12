'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Briefcase, BarChart3, CheckCircle, ArrowRight } from 'lucide-react'

interface HomePageProps {
  setPage: (page: string) => void
}

export default function HomePage({ setPage }: HomePageProps) {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const featuresRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const features = [
    {
      icon: Briefcase,
      title: 'Browse Faculty Positions',
      description: 'Explore diverse faculty positions across multiple departments and disciplines'
    },
    {
      icon: Users,
      title: 'Manage Applications',
      description: 'Track your job applications and application status in one place'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Admins can view detailed analytics of candidates and applications'
    },
    {
      icon: CheckCircle,
      title: 'Simple Process',
      description: 'Streamlined hiring process for both candidates and administrators'
    }
  ]

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.1 + index * 0.1
        }
      )

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <section ref={heroRef} className="container mx-auto px-4 pt-28 pb-20 text-center">
        <div ref={headingRef}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Modern Faculty<br />Recruitment Platform
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-balance opacity-70 leading-relaxed">
            Streamline your university's faculty hiring process with an intuitive platform designed for both administrators and candidates.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => setPage('auth')}
              size="lg"
              className="gap-2 rounded-full px-8 py-6 text-base font-semibold"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage('auth')}
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-20 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-center opacity-70 mb-14 max-w-2xl mx-auto">
            Everything you need to manage faculty recruitment efficiently
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el
                  }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why FacultyHub?</h2>
          <div className="space-y-6 text-lg opacity-75 leading-relaxed">
            <p>
              FacultyHub is a modern, comprehensive faculty hiring platform designed specifically for universities. We streamline the entire recruitment process, from job posting to candidate selection.
            </p>
            <p>
              Whether you're an administrator managing positions and reviewing applications, or a faculty candidate seeking your next opportunity, our platform provides an intuitive and efficient experience.
            </p>
            <p>
              With built-in analytics, application tracking, and a clean interface, FacultyHub makes faculty recruitment simple and effective.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-accent to-accent/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Revolutionize Hiring?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join universities already using FacultyHub to find exceptional faculty
          </p>
          <Button
            onClick={() => setPage('auth')}
            variant="secondary"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold"
          >
            Start Hiring Today
          </Button>
        </div>
      </section>
    </div>
  )
}
