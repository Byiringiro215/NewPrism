"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Building, MapPin, Globe, Users, Upload } from "lucide-react";

const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select company size"),
  founded: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(50, "Company description must be at least 50 characters"),
  mission: z.string().optional(),
  benefits: z.array(z.string()),
  socialLinks: z.object({
    linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),
    twitter: z.string().url("Please enter a valid Twitter URL").optional(),
  }),
  isRemoteFirst: z.boolean(),
});

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Consulting",
  "Other",
];

const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "TechCorp Inc.",
      website: "https://techcorp.com",
      industry: "Technology",
      size: "51-200",
      founded: "2020",
      location: "San Francisco, CA",
      description: "Leading technology company focused on innovation...",
      isRemoteFirst: true,
      benefits: [],
      socialLinks: {
        linkedin: "https://linkedin.com/company/techcorp",
        twitter: "https://twitter.com/techcorp",
      },
    },
  });

  const handleSave = async (data: CompanyFormData) => {
    try {
      // In a real app, this would make an API call
      console.log("Saving company data:", data);
      
      toast({
        title: "Success",
        description: "Company profile has been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const updatedBenefits = [...benefits, newBenefit.trim()];
      setBenefits(updatedBenefits);
      form.setValue("benefits", updatedBenefits);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
    form.setValue("benefits", updatedBenefits);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
      {/* Company Overview */}
      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Manage your company information and branding
              </CardDescription>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-logo.svg" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="mb-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
                <p className="text-sm text-white/70">
                  Recommended: 400x400px or larger, PNG or JPG
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  {...form.register("name")}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  {...form.register("website")}
                  disabled={!isEditing}
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select
                  disabled={!isEditing}
                  onValueChange={(value) => form.setValue("industry", value)}
                  value={form.watch("industry")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Company Size</Label>
                <Select
                  disabled={!isEditing}
                  onValueChange={(value) => form.setValue("size", value)}
                  value={form.watch("size")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Founded Year</Label>
                <Input
                  {...form.register("founded")}
                  disabled={!isEditing}
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  {...form.register("location")}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company Description</Label>
              <Textarea
                {...form.register("description")}
                disabled={!isEditing}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Mission Statement</Label>
              <Textarea
                {...form.register("mission")}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Benefits & Perks</Label>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a benefit or perk"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBenefit}
                  >
                    Add
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {benefit}
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 px-1 hover:bg-transparent"
                        onClick={() => removeBenefit(index)}
                      >
                        ×
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  {...form.register("socialLinks.linkedin")}
                  disabled={!isEditing}
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label>Twitter URL</Label>
                <Input
                  {...form.register("socialLinks.twitter")}
                  disabled={!isEditing}
                  type="url"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={form.watch("isRemoteFirst")}
                onCheckedChange={(checked) =>
                  form.setValue("isRemoteFirst", checked)
                }
                disabled={!isEditing}
              />
              <Label>This is a remote-first company</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Building className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Company Size</div>
                <div className="text-2xl font-semibold text-white">
                  {form.watch("size")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Location</div>
                <div className="text-lg font-semibold text-white">
                  {form.watch("location")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Globe className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Industry</div>
                <div className="text-lg font-semibold text-white">
                  {form.watch("industry")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Founded</div>
                <div className="text-lg font-semibold text-white">
                  {form.watch("founded")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}