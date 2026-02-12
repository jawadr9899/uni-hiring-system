'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus, Edit2 } from 'lucide-react'

interface Vacancy {
  id: number
  title: string
  department: string
  salary: string
  deadline: string
  description: string
}

const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 1,
    title: 'Assistant Professor - Computer Science',
    department: 'Computer Science',
    salary: '$70,000 - $90,000',
    deadline: '2024-03-31',
    description: 'Tenure-track position in computer science',
  },
  {
    id: 2,
    title: 'Associate Professor - Physics',
    department: 'Physics',
    salary: '$75,000 - $95,000',
    deadline: '2024-04-15',
    description: 'Tenure-track position in physics',
  },
]

export default function VacancyManagement() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    salary: '',
    deadline: '',
    description: '',
  })

  const handleAddVacancy = () => {
    if (
      !formData.title ||
      !formData.department ||
      !formData.salary ||
      !formData.deadline ||
      !formData.description
    ) {
      return
    }

    const newVacancy: Vacancy = {
      id: Math.max(...vacancies.map((v) => v.id), 0) + 1,
      ...formData,
    }

    setVacancies([...vacancies, newVacancy])
    setFormData({
      title: '',
      department: '',
      salary: '',
      deadline: '',
      description: '',
    })
    setIsDialogOpen(false)
  }

  const handleDeleteVacancy = (id: number) => {
    setVacancies(vacancies.filter((v) => v.id !== id))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Faculty Vacancies</CardTitle>
            <CardDescription className="mt-1">Create and manage open faculty positions</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 rounded-lg">
                <Plus className="h-4 w-4" />
                Add Position
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-96 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-base">Add Vacancy</DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="title" className="text-sm">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Position title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-sm">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="salary" className="text-sm">Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="$70,000 - $90,000"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline" className="text-sm">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddVacancy} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full overflow-x-auto rounded-lg border border-primary/10">
          <Table>
            <TableHeader className="bg-accent/5 hover:bg-accent/5">
              <TableRow className="border-b border-primary/10 hover:bg-transparent">
                <TableHead className="text-sm font-semibold">Position Title</TableHead>
                <TableHead className="text-sm font-semibold">Department</TableHead>
                <TableHead className="text-sm font-semibold">Salary Range</TableHead>
                <TableHead className="text-sm font-semibold">Application Deadline</TableHead>
                <TableHead className="text-right text-sm font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.map((vacancy) => (
                <TableRow key={vacancy.id} className="border-b border-primary/5 hover:bg-accent/5 transition-colors">
                  <TableCell className="font-medium">{vacancy.title}</TableCell>
                  <TableCell>{vacancy.department}</TableCell>
                  <TableCell className="font-semibold text-accent">{vacancy.salary}</TableCell>
                  <TableCell>{vacancy.deadline}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteVacancy(vacancy.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive text-destructive/60"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {vacancies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm opacity-60">No vacancies yet. Create your first position to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
