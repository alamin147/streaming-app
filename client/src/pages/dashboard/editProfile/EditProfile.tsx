import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserInfo } from "@/redux/authUlits";
import { Avatar } from "@/components/ui/avatar";
import { Camera, Save, User, Mail, AtSign, MapPin, Calendar, Link as LinkIcon } from "lucide-react";

export default function EditProfile() {
  const user = getUserInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Add success notification here
    }, 1500);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10">
          <div className="flex items-center gap-2 px-4">
              {<SidebarTrigger className=" flex md:hidden -ml-1" />}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    <span className="text-yellow-500 font-bold">N</span>Movies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-muted-foreground">Update your profile information and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Section */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10 overflow-hidden">
              <div className="relative h-48 md:h-64 w-full bg-muted">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-gray-800/50 to-gray-600/50"></div>
                )}
                <label className="absolute bottom-4 right-4 cursor-pointer">
                  <div className="bg-black/70 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors">
                    <Camera className="h-5 w-5" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </label>
              </div>

              <CardContent className="relative pt-12 md:pt-16">
                <div className="absolute -top-12 left-6 md:-top-16 md:left-8">
                  <div className="relative">
                    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-background bg-muted">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 cursor-pointer">
                      <div className="bg-black/70 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors">
                        <Camera className="h-4 w-4" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 md:pt-6">
                  <h2 className="text-xl font-semibold">{user?.name || 'Your Name'}</h2>
                  <p className="text-muted-foreground text-sm">@{user?.username || 'username'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        className="pl-9"
                        defaultValue={user?.name || ''}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        className="pl-9"
                        defaultValue={user?.username || ''}
                        placeholder="Your username"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-9"
                        defaultValue={user?.email || ''}
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        className="pl-9"
                        defaultValue="New York, USA"
                        placeholder="Your location"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself"
                    className="min-h-[120px] resize-none"
                    defaultValue="Film enthusiast and content creator. I love sharing my passion for cinema with everyone!"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your social media accounts</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="website">Personal Website</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        className="pl-9"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="twitter">X (Twitter)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-bold">𝕏</span>
                      <Input
                        id="twitter"
                        className="pl-9"
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="instagram">Instagram</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                        IG
                      </span>
                      <Input
                        id="instagram"
                        className="pl-9"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="youtube">YouTube</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        YT
                      </span>
                      <Input
                        id="youtube"
                        className="pl-9"
                        placeholder="channel name"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Preferences */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>Manage your email notifications</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {['comments', 'subscribers', 'videos', 'newsletter'].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">{item === 'videos' ? 'New Video Alerts' : item === 'newsletter' ? 'Monthly Newsletter' : `${item.charAt(0).toUpperCase() + item.slice(1)} Notifications`}</p>
                        <p className="text-muted-foreground text-sm">
                          {item === 'comments' && "Receive emails when someone comments on your videos"}
                          {item === 'subscribers' && "Get notified when someone subscribes to your channel"}
                          {item === 'videos' && "Be alerted about trending videos in your category"}
                          {item === 'newsletter' && "Receive our monthly newsletter with tips and updates"}
                        </p>
                      </div>
                      <div className="flex items-center h-6 w-11 rounded-full bg-muted p-1 cursor-pointer" role="checkbox" aria-checked="true">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 transition-all duration-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
