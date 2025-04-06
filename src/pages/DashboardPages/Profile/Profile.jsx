import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import usePhone from "@/hooks/usePhone";
import useRole from "@/hooks/useRole";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

const Profile = () => {
  const user = useAuthUser();
                  const phoneNumber = usePhone();
  const role = useRole();
  return (
    <div className="px-7 pb-12">
      <DashboardPagesHeader
        title={"My Profile"}
        subtitle={"Manage your personal information and account settings"}
        icon={User}
      />

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Left Column - Profile Image & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="border shadow-none border-[#e5e7eb]">
            <div className="h-28 bg-gradient-to-r from-blue-500 to-sky-500 rounded-t-[12.8px]" />
            <CardContent className="pt-0 relative">
              <div className="flex flex-col items-center -mt-20">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName} />
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
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  {phoneNumber ||
                    "No Phone Number Available, Please Update Your Phone Number"}
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
        <div className="lg:col-span-2">
          {/* Profile Complete Progress */}
          <Card>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
