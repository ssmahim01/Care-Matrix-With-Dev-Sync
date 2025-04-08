import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import auth from "@/firebase/firebase.config";
import usePhone from "@/hooks/usePhone";
import useRole from "@/hooks/useRole";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { updateUsername } from "@/redux/auth/authSlice";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import axios from "axios";
import { format } from "date-fns";
import { updateProfile } from "firebase/auth";
import {
  Calendar,
  CheckCheck,
  CheckCircle2,
  Clock,
  Edit,
  IdCardIcon,
  Info,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const user = useAuthUser();
  const phoneNumber = usePhone();
  const loading = useAuthLoading();
  const [, roleLoading] = useRole();
  const [, phoneLoading] = usePhone();
  const dispatch = useDispatch();
  const role = useRole();

  const [newName, setNewName] = useState(user?.displayName);
  const [isNameEditing, setIsNameEditing] = useState(false);

  // Function for update username
  const handleNameChange = async () => {
    try {
      // update Firebase display name
      await updateProfile(auth.currentUser, { displayName: newName });
      // update username in db name
      const updateUsernamePromise = axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update-name/${user?.email}`,
        { name: newName }
      );
      // show success toast and update states
      await toast.promise(updateUsernamePromise, {
        loading: "Updating Username...",
        success: (res) => {
          if (res.data.data.modifiedCount) {
            setIsNameEditing(false);
            dispatch(updateUsername(newName));
            return "Username Updated Successfully";
          } else {
            return "No changes were made";
          }
        },
        error: (err) => err.message || "Failed to update username",
      });
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while updating the username"
      );
    }
  };

  if (loading || roleLoading || phoneLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="px-7 pb-12">
      <DashboardPagesHeader
        title={"My Profile"}
        subtitle={"Manage your personal information and account settings"}
        icon={User}
      />

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-8">
        {/* Left Column - Profile Image & Quick Info */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="border shadow-none border-[#e5e7eb]">
            <div className="h-28 bg-gradient-to-r skeleton rounded-b-none rounded-t-[12.8px]" />
            <CardContent className="pt-0 relative">
              <div className="flex flex-col items-center -mt-20">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName} className={'object-cover'} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-400 to-sky-600 text-white">
                      {user?.displayName.charAt(0) || "Username"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">{user?.displayName}</h2>
                  <Badge className="mt-2 font-semibold capitalize bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {role}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3 w-full">
                <IdCardIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm truncate">{user?.uid}</span>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  {phoneNumber ||
                    "No Phone Number Available, Please Update Your Phone Number" ||
                    (phoneNumber === "" &&
                      "No Phone Number Available, Please Update Your Phone Number") ||
                    (phoneNumber === null &&
                      "No Phone Number Available, Please Update Your Phone Number")}
                </span>
              </div>
            </CardFooter>
          </Card>
          {/* Account Information Card */}
          <Card className={"border shadow-none border-[#e5e7eb] pt-6"}>
            <CardHeader className={"py-0"}>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 px-6">
              {/* Created At */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-sm font-medium">
                      {user?.createdAt && user?.createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Last Login At */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Login</p>
                    <p className="text-sm font-medium">
                      {user?.lastLoginAt && user?.lastLoginAt}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Account Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Account Status
                    </p>
                    <p className="text-sm font-medium">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* Change Password */}
            <CardFooter className="border-t bg-muted/30 px-6 pb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <Lock className="h-4 w-4" />
                    Change Password
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        {/* Right Column - Progress, & Profile Details & Edit Profile */}
        <div className="lg:col-span-3 xl:col-span-2">
          {/* Profile Complete Progress */}
          <Card className="border shadow-none border-[#e5e7eb]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Complete your profile</h3>
                    <p className="text-sm text-muted-foreground">
                      {69}% of your profile is complete
                    </p>
                  </div>
                </div>
                <Progress value={69} className="h-2 flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Profile Edit & View */}
          <Card className="mt-6 pt-4 border shadow-none border-[#e5e7eb]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-blue-600" />
                  <CardTitle>Profile Details</CardTitle>
                </div>
              </div>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                {isNameEditing ? (
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      onClick={handleNameChange}
                      className="gap-1 cursor-pointer"
                    >
                      <CheckCheck className="h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewName(user?.displayName);
                        setIsNameEditing(false);
                      }}
                      className="gap-1 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                    {user?.displayName}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                  {user?.email}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                  {phoneNumber}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 flex justify-between py-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {format(new Date(), "MMM d, yyyy")}
              </p>
              {!isNameEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsNameEditing(true)}
                  className="gap-1 cursor-pointer"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
