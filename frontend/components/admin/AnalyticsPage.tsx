'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface CandidateAnalytics {
  id: number
  name: string
  position: string
  department: string
  degreeLevel: string
  publicationCount: number
  experience: number
  academicScore: number
  researchScore: number
  teachingScore: number
  industrialScore: number
  salaryScore: number
  adminScore: number
  compositeRank: number
  summary: string
}

const DEMO_CANDIDATES: CandidateAnalytics[] = [
  {
    id: 1,
    name: 'Dr. Alice Johnson',
    position: 'Assistant Professor - Computer Science',
    department: 'Computer Science',
    degreeLevel: 'PhD',
    publicationCount: 15,
    experience: 3,
    academicScore: 85,
    researchScore: 90,
    teachingScore: 80,
    industrialScore: 75,
    salaryScore: 80,
    adminScore: 85,
    compositeRank: 85,
    summary: 'Excellent researcher with strong publication record',
  },
  {
    id: 2,
    name: 'Dr. Bob Smith',
    position: 'Assistant Professor - Computer Science',
    department: 'Computer Science',
    degreeLevel: 'PhD',
    publicationCount: 22,
    experience: 5,
    academicScore: 92,
    researchScore: 95,
    teachingScore: 85,
    industrialScore: 88,
    salaryScore: 88,
    adminScore: 90,
    compositeRank: 90,
    summary: 'Outstanding candidate with extensive research background',
  },
  {
    id: 3,
    name: 'Dr. Carol Davis',
    position: 'Assistant Professor - Computer Science',
    department: 'Computer Science',
    degreeLevel: 'PhD',
    publicationCount: 12,
    experience: 2,
    academicScore: 78,
    researchScore: 82,
    teachingScore: 88,
    industrialScore: 70,
    salaryScore: 75,
    adminScore: 80,
    compositeRank: 79,
    summary: 'Strong teaching focus with decent research background',
  },
  {
    id: 4,
    name: 'Dr. Diana Wilson',
    position: 'Associate Professor - Physics',
    department: 'Physics',
    degreeLevel: 'PhD',
    publicationCount: 28,
    experience: 7,
    academicScore: 95,
    researchScore: 98,
    teachingScore: 82,
    industrialScore: 92,
    salaryScore: 92,
    adminScore: 94,
    compositeRank: 93,
    summary: 'Exceptional candidate with international reputation',
  },
  {
    id: 5,
    name: 'Dr. Edward Brown',
    position: 'Associate Professor - Physics',
    department: 'Physics',
    degreeLevel: 'PhD',
    publicationCount: 18,
    experience: 4,
    academicScore: 82,
    researchScore: 88,
    teachingScore: 78,
    industrialScore: 80,
    salaryScore: 82,
    adminScore: 83,
    compositeRank: 82,
    summary: 'Solid candidate with balanced profile',
  },
]

type AnalyticsCriteria = 'position' | 'department' | 'all'

export default function AnalyticsPage() {
  const [criteria, setCriteria] = useState<AnalyticsCriteria>('all')
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')

  const positions = useMemo(
    () => [...new Set(DEMO_CANDIDATES.map((c) => c.position))],
    []
  )

  const departments = useMemo(
    () => [...new Set(DEMO_CANDIDATES.map((c) => c.department))],
    []
  )

  const filteredCandidates = useMemo(() => {
    let filtered = DEMO_CANDIDATES

    if (criteria === 'position' && selectedPosition !== 'all') {
      filtered = filtered.filter((c) => c.position === selectedPosition)
    } else if (criteria === 'department' && selectedDepartment !== 'all') {
      filtered = filtered.filter((c) => c.department === selectedDepartment)
    }

    return filtered
  }, [criteria, selectedPosition, selectedDepartment])

  // Prepare data for comparison chart
  const comparisonData = filteredCandidates.map((c) => ({
    name: c.name.split(' ')[0],
    academic: c.academicScore,
    research: c.researchScore,
    teaching: c.teachingScore,
    industrial: c.industrialScore,
    composite: c.compositeRank,
  }))

  // Prepare data for metrics breakdown
  const metricsData = [
    {
      name: 'Academic',
      value: Math.round(
        filteredCandidates.reduce((sum, c) => sum + c.academicScore, 0) /
          filteredCandidates.length
      ),
    },
    {
      name: 'Research',
      value: Math.round(
        filteredCandidates.reduce((sum, c) => sum + c.researchScore, 0) /
          filteredCandidates.length
      ),
    },
    {
      name: 'Teaching',
      value: Math.round(
        filteredCandidates.reduce((sum, c) => sum + c.teachingScore, 0) /
          filteredCandidates.length
      ),
    },
    {
      name: 'Industrial',
      value: Math.round(
        filteredCandidates.reduce((sum, c) => sum + c.industrialScore, 0) /
          filteredCandidates.length
      ),
    },
  ]

  const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Analytics Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="criteria" className="text-sm">Criteria</Label>
              <Select value={criteria} onValueChange={(value: any) => setCriteria(value)}>
                <SelectTrigger className="mt-1 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="position">By Position</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {criteria === 'position' && (
              <div>
                <Label htmlFor="position" className="text-sm">Position</Label>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="mt-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {criteria === 'department' && (
              <div>
                <Label htmlFor="department" className="text-sm">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="mt-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle>Score Comparison</CardTitle>
            <CardDescription>Candidate evaluation metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="academic" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="research" fill="hsl(217, 91%, 50%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="teaching" fill="hsl(217, 91%, 70%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="industrial" fill="hsl(217, 91%, 80%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle>Average Metrics</CardTitle>
            <CardDescription>Category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metricsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Composite Rank</CardTitle>
          <CardDescription className="text-xs">Overall ranking</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="composite"
                stroke="#4b5563"
                dot={{ fill: '#4b5563', r: 3 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Candidate Analysis</CardTitle>
          <CardDescription className="text-xs">Detailed scores</CardDescription>
        </CardHeader>
        <CardContent className="text-xs overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 px-1">Name</th>
                <th className="text-left py-1 px-1">Dept</th>
                <th className="text-center py-1 px-1">Pub</th>
                <th className="text-center py-1 px-1">Exp</th>
                <th className="text-center py-1 px-1">Acad</th>
                <th className="text-center py-1 px-1">Res</th>
                <th className="text-center py-1 px-1">Teach</th>
                <th className="text-center py-1 px-1">Rank</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-b hover:bg-secondary">
                  <td className="py-1 px-1">{candidate.name}</td>
                  <td className="py-1 px-1">{candidate.department}</td>
                  <td className="py-1 px-1 text-center">{candidate.publicationCount}</td>
                  <td className="py-1 px-1 text-center">{candidate.experience}</td>
                  <td className="py-1 px-1 text-center">{candidate.academicScore}</td>
                  <td className="py-1 px-1 text-center">{candidate.researchScore}</td>
                  <td className="py-1 px-1 text-center">{candidate.teachingScore}</td>
                  <td className="py-1 px-1 text-center font-semibold">{candidate.compositeRank}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCandidates.length === 0 && (
            <p className="text-center py-2 opacity-60">No candidates found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
