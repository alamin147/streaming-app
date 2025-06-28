import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserInfo } from "@/redux/authUlits";
import {
  Camera,
  Save,
  User,
  Mail,
  AtSign,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import { useEditProfileMutation } from "@/redux/features/dashboard/userDashboard/userDashboardApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import coverImage from "@/assets/profile_banner.png";
import Navbar from "@/components/navbar/Navbar";
export default function EditProfile() {
  const user = getUserInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview] = useState<string | null>(null);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(
    user?.bio ||
      "Film enthusiast and content creator. I love sharing my passion for cinema with everyone!"
  );

  const getFirstChar = () => {
    return user?.name
      ? user.name.charAt(0).toUpperCase()
      : name.charAt(0).toUpperCase() || "U";
  };

  const [editProfile] = useEditProfileMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await editProfile({ name, bio }).unwrap();
      if (response.success) {
        const decoded = jwtDecode(response?.data?.token);
        dispatch(setUser({ user: decoded, token: response?.data?.token }));
        toast.success(response.message || "Profile updated successfully");
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your profile information and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Section */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10 overflow-hidden">
              <div className="relative h-48 md:h-64 w-full bg-muted">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-gray-800/50 to-gray-600/50"></div>
                )}
                <div className="absolute bottom-4 right-4 opacity-60 cursor-not-allowed">
                  <div className="bg-black/70 text-white rounded-full p-2.5 transition-colors">
                    <Camera className="h-5 w-5" />
                  </div>
                  <span className="sr-only">Cover image upload disabled</span>
                </div>
              </div>

              <CardContent className="relative pt-12 md:pt-16">
                <div className="absolute -top-12 left-6 md:-top-16 md:left-8">
                  <div className="relative">
                    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-background bg-muted">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-700">
                          <span className="text-3xl md:text-5xl font-bold text-white">
                            {getFirstChar()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-60 cursor-not-allowed">
                      <div className="bg-black/70 text-white rounded-full p-1.5 transition-colors">
                        <Camera className="h-4 w-4" />
                      </div>
                      <span className="sr-only">Avatar upload disabled</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 md:pt-6">
                  <h2 className="text-xl font-semibold">
                    {user?.name || "Your Name"}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    @{user?.username ? user.username : "username"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">
                      Full Name{" "}
                      <span className="text-xs text-yellow-500">
                        (Editable)
                      </span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        className="pl-9 border-yellow-500/30 focus-visible:ring-yellow-500/30"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="username">
                      Username{" "}
                      <span className="text-xs text-muted-foreground">
                        (Read-only)
                      </span>
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        className="pl-9 bg-muted/30"
                        value={user && "username" in user ? user.username : ""}
                        disabled
                        readOnly
                        placeholder="Your username"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      Email Address{" "}
                      <span className="text-xs text-muted-foreground">
                        (Read-only)
                      </span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-9 bg-muted/30"
                        value={user?.email || ""}
                        disabled
                        readOnly
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location">
                      Location{" "}
                      <span className="text-xs text-muted-foreground">
                        (Read-only)
                      </span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        className="pl-9 bg-muted/30"
                        defaultValue="New York, USA"
                        disabled
                        readOnly
                        placeholder="Your location"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bio">
                    Bio{" "}
                    <span className="text-xs text-yellow-500">(Editable)</span>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself"
                    className="min-h-[120px] resize-none border-yellow-500/30 focus-visible:ring-yellow-500/30"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Social media accounts{" "}
                  <span className="text-xs text-muted-foreground">
                    (Read-only)
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="website">Personal Website</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        className="pl-9 bg-muted/30"
                        placeholder="https://yourwebsite.com"
                        disabled
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="twitter">X (Twitter)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-bold">
                        𝕏
                      </span>
                      <Input
                        id="twitter"
                        className="pl-9 bg-muted/30"
                        placeholder="@username"
                        disabled
                        readOnly
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
                        className="pl-9 bg-muted/30"
                        placeholder="username"
                        disabled
                        readOnly
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
                        className="pl-9 bg-muted/30"
                        placeholder="channel name"
                        disabled
                        readOnly
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
                <CardDescription>
                  Email notification settings{" "}
                  <span className="text-xs text-muted-foreground">
                    (Read-only)
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 opacity-80">
                  {["comments", "subscribers", "videos", "newsletter"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium capitalize">
                            {item === "videos"
                              ? "New Video Alerts"
                              : item === "newsletter"
                              ? "Monthly Newsletter"
                              : `${
                                  item.charAt(0).toUpperCase() + item.slice(1)
                                } Notifications`}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {item === "comments" &&
                              "Receive emails when someone comments on your videos"}
                            {item === "subscribers" &&
                              "Get notified when someone subscribes to your channel"}
                            {item === "videos" &&
                              "Be alerted about trending videos in your category"}
                            {item === "newsletter" &&
                              "Receive our monthly newsletter with tips and updates"}
                          </p>
                        </div>
                        <div
                          className="flex items-center h-6 w-11 rounded-full bg-muted p-1 cursor-not-allowed"
                          role="checkbox"
                          aria-checked="true"
                          aria-disabled="true"
                        >
                          <div className="h-4 w-4 rounded-full bg-yellow-500/70 transition-all duration-200"></div>
                        </div>
                      </div>
                    )
                  )}
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
