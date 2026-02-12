'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertCircle, Briefcase, Search, Loader, Clock, DollarSign } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Job {
  id: number
  title: string
  department: string
  description: string
  fullDescription: string
  salary: string
  deadline: string
}

const DEMO_JOBS: Job[] = [
  {
    id: 1,
    title: 'Assistant Professor - Computer Science',
    department: 'Computer Science',
    description: 'We seek an exceptional computer scientist with expertise in machine learning and AI.',
    fullDescription: `We are seeking an exceptional computer scientist with expertise in machine learning and artificial intelligence. The ideal candidate will have a PhD in Computer Science or a related field, with a strong publication record and demonstrated teaching ability.

Responsibilities:
- Teach undergraduate and graduate courses
- Conduct research in machine learning and AI
- Mentor graduate students
- Contribute to departmental service

Qualifications:
- PhD in Computer Science or related field
- 2+ years of postdoctoral experience
- Strong publication record
- Teaching experience

Salary Range: $70,000 - $90,000 per annum`,
    salary: '$70,000 - $90,000',
    deadline: '2024-03-31',
  },
  {
    id: 2,
    title: 'Associate Professor - Physics',
    department: 'Physics',
    description: 'Tenure-track position for an accomplished physicist with research in quantum mechanics.',
    fullDescription: `We are delighted to announce a tenure-track position for an accomplished physicist. The ideal candidate should have a strong background in quantum mechanics or related areas.

Responsibilities:
- Develop and teach physics curriculum
- Establish independent research program
- Mentor undergraduate and graduate students
- Participate in academic committees

Qualifications:
- PhD in Physics or related field
- 3+ years of postdoctoral research experience
- Proven research productivity
- Excellent communication skills

Salary Range: $75,000 - $95,000 per annum`,
    salary: '$75,000 - $95,000',
    deadline: '2024-04-15',
  },
  {
    id: 3,
    title: 'Lecturer - Biology',
    department: 'Biology',
    description: 'Full-time lecturer position in cellular and molecular biology with emphasis on teaching.',
    fullDescription: `We seek a dedicated educator for our biology department. This position emphasizes excellence in teaching and curriculum development.

Responsibilities:
- Teach introductory and advanced biology courses
- Develop laboratory curricula
- Provide student support and mentoring
- Participate in department meetings

Qualifications:
- PhD in Biology or related field
- 2+ years of teaching experience
- Ability to teach laboratory courses
- Commitment to student success

Salary Range: $55,000 - $70,000 per annum`,
    salary: '$55,000 - $70,000',
    deadline: '2024-04-30',
  },
  {
    id: 4,
    title: 'Professor - Chemistry',
    department: 'Chemistry',
    description: 'Senior faculty position for a distinguished chemist with international research recognition.',
    fullDescription: `We are recruiting a distinguished chemist with a strong international reputation. This senior position offers opportunities for research and leadership.

Responsibilities:
- Lead research group
- Teach graduate and undergraduate courses
- Mentor faculty and students
- Participate in university governance

Qualifications:
- PhD in Chemistry or related field
- 10+ years of research experience
- Significant publication and grant record
- Leadership experience

Salary Range: $100,000 - $130,000 per annum`,
    salary: '$100,000 - $130,000',
    deadline: '2024-05-31',
  },
]

export default function JobPortalPage() {
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applyingId, setApplyingId] = useState<number | null>(null)
  const [applyError, setApplyError] = useState('')
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])
  const containerRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: index * 0.1
        }
      )

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
      })
    })
  }, [jobs])

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [jobs, searchTerm]
  )

  const handleApply = async (jobId: number) => {
    setApplyingId(jobId)
    setApplyError(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock: 80% success rate
    const success = Math.random() > 0.2

    if (success) {
      setAppliedJobs([...appliedJobs, jobId])
      setJobs(jobs.filter((j) => j.id !== jobId))
      setSelectedJob(null)
    } else {
      setApplyError('Failed to submit application. Please try again.')
    }

    setApplyingId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <div ref={containerRef} className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Faculty Opportunities</h1>
          <p className="text-lg opacity-70">
            Discover exciting career opportunities at leading universities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
            <p className="text-sm opacity-70 mb-1">Open Positions</p>
            <p className="text-4xl font-bold">{jobs.length}</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
            <p className="text-sm opacity-70 mb-1">Applications</p>
            <p className="text-4xl font-bold">{appliedJobs.length}</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 opacity-50 text-accent" />
            <Input
              id="search"
              placeholder="Search positions, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 rounded-lg border-primary/20 focus:border-accent focus:ring-accent bg-white dark:bg-slate-900 text-base py-6"
            />
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
              >
                <Card
                  className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm mt-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      {job.department}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm opacity-70 line-clamp-2">{job.description}</p>
                    <div className="space-y-2 pt-2 border-t border-primary/10">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span className="font-semibold">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>Apply by: {job.deadline}</span>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedJob(job)
                      }}
                      className="w-full rounded-lg mt-2"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg opacity-70">
              {jobs.length === 0
                ? 'You have applied to all available positions! Check back soon for new opportunities.'
                : 'No positions match your search. Try different keywords.'}
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg">{selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-xs">{selectedJob?.department}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-80 overflow-y-auto text-sm">
            <p className="whitespace-pre-wrap text-xs opacity-75">
              {selectedJob?.fullDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-semibold">Salary</p>
                <p className="opacity-75">{selectedJob?.salary}</p>
              </div>
              <div>
                <p className="font-semibold">Deadline</p>
                <p className="opacity-75">{selectedJob?.deadline}</p>
              </div>
            </div>

            {applyError && (
              <Alert variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3" />
                <AlertDescription>{applyError}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setSelectedJob(null)}
              size="sm"
              disabled={applyingId === selectedJob?.id}
            >
              Close
            </Button>
            <Button
              onClick={() => selectedJob && handleApply(selectedJob.id)}
              disabled={applyingId === selectedJob?.id}
              size="sm"
            >
              {applyingId === selectedJob?.id ? (
                <>
                  <Loader className="h-3 w-3 mr-1 animate-spin" />
                  Applying...
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
