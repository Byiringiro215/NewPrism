"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Steps } from "@/components/ui/steps";

const jobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  department: z.string().min(1, "Please select a department"),
  location: z.string().min(3, "Location is required"),
  type: z.enum(["full-time", "part-time", "contract", "remote"]),
  experience: z.string().min(1, "Please select experience level"),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    isPublic: z.boolean(),
  }),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.array(z.string()).min(1, "Add at least one requirement"),
  benefits: z.array(z.string()),
  skills: z.array(z.string()).min(1, "Add at least one required skill"),
  deadline: z.string().optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const steps = [
  { title: "Basic Info", description: "Job title and type" },
  { title: "Details", description: "Requirements and qualifications" },
  { title: "Compensation", description: "Salary and benefits" },
  { title: "Review", description: "Review and publish" },
];

export default function JobCreationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      type: "full-time",
      salary: {
        min: 0,
        max: 0,
        isPublic: true,
      },
      requirements: [],
      benefits: [],
      skills: [],
    },
  });

  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (step: number): Array<keyof JobFormData> => {
    switch (step) {
      case 0:
        return ["title", "department", "location", "type"];
      case 1:
        return ["experience", "requirements", "skills"];
      case 2:
        return ["salary", "benefits"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create job");

      toast({
        title: "Success",
        description: "Job posting has been created successfully.",
      });

      router.push("/dashboard/hirer/jobs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step < currentStep) setCurrentStep(step);
        }}
      />

      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                {...form.register("title")}
                placeholder="e.g. Senior Frontend Developer"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                onValueChange={(value) =>
                  form.setValue("department", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                {...form.register("location")}
                placeholder="e.g. New York, NY or Remote"
              />
            </div>

            <div className="space-y-2">
              <Label>Job Type</Label>
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue("type", value as JobFormData["type"])
                }
                defaultValue="full-time"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="full-time" />
                  <Label htmlFor="full-time">Full-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="part-time" />
                  <Label htmlFor="part-time">Part-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contract" id="contract" />
                  <Label htmlFor="contract">Contract</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remote" id="remote" />
                  <Label htmlFor="remote">Remote</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Specify the requirements and qualifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                onValueChange={(value) =>
                  form.setValue("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                {...form.register("description")}
                placeholder="Enter detailed job description..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a requirement"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        setRequirements([...requirements, target.value.trim()]);
                        form.setValue("requirements", [
                          ...requirements,
                          target.value.trim(),
                        ]);
                        target.value = "";
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {requirements.map((req, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {req}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-white/70 hover:text-white"
                      onClick={() => {
                        const newReqs = requirements.filter((_, i) => i !== index);
                        setRequirements(newReqs);
                        form.setValue("requirements", newReqs);
                      }}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Required Skills</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        setSkills([...skills, target.value.trim()]);
                        form.setValue("skills", [...skills, target.value.trim()]);
                        target.value = "";
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-white/70 hover:text-white"
                      onClick={() => {
                        const newSkills = skills.filter((_, i) => i !== index);
                        setSkills(newSkills);
                        form.setValue("skills", newSkills);
                      }}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Compensation</CardTitle>
            <CardDescription>
              Define salary range and benefits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Salary</Label>
                  <Input
                    type="number"
                    {...form.register("salary.min", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    {...form.register("salary.max", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={form.watch("salary.isPublic")}
                  onCheckedChange={(checked) =>
                    form.setValue("salary.isPublic", checked)
                  }
                />
                <Label>Display salary range publicly</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a benefit"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        setBenefits([...benefits, target.value.trim()]);
                        form.setValue("benefits", [...benefits, target.value.trim()]);
                        target.value = "";
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {benefits.map((benefit, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {benefit}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-white/70 hover:text-white"
                      onClick={() => {
                        const newBenefits = benefits.filter((_, i) => i !== index);
                        setBenefits(newBenefits);
                        form.setValue("benefits", newBenefits);
                      }}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Job Posting</CardTitle>
            <CardDescription>
              Review all details before publishing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add review content here */}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button type="submit">Publish Job</Button>
        ) : (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </form>
  );