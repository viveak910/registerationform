'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationFormComponent() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    college: '',
    semester: '',
    rollno: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, semester: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email || !formData.name || !formData.college || !formData.semester || !formData.rollno) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const dataToSend = {
      ...formData,
      semester: parseInt(formData.semester, 10)
    }

    try {
      const response = await fetch('https://backend.viveak910.workers.dev/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Registration successful!",
        })
        setFormData({
          email: '',
          name: '',
          college: '',
          semester: '',
          rollno: ''
        })
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
        <CardDescription>Please fill out all the fields to register.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Sample College"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select onValueChange={handleSelectChange} value={formData.semester}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollno">Roll Number</Label>
            <Input
              type="text"
              id="rollno"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              placeholder="12345"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}