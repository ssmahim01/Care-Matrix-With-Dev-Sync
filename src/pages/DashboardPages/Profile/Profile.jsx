import useRole from "@/hooks/useRole";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
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
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { formatDate } from "date-fns";

const Profile = () => {
  const user = useAuthUser();
  const role = useRole();
  return (
    <div className="px-7">
      <DashboardPagesHeader
        title={"My Profile"}
        subtitle={"Manage your personal information and account settings"}
        icon={User}
      />

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Image & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-28 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
            <CardContent className="pt-0 relative">
              <div className="flex flex-col items-center -mt-14">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white">
                      {user?.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 
                        
                    `}
                  >
                    <div className="flex flex-col items-center justify-center text-white">
                      <Camera className="h-6 w-6 mb-1" />
                      <span className="text-xs font-medium">Change</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">{user?.displayName}</h2>
                  <Badge className="mt-1 capitalize bg-teal-100 text-teal-800 hover:bg-teal-100">
                    {role}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3 w-full">
                <Mail className="h-4 w-4 text-teal-600" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Phone className="h-4 w-4 text-teal-600" />
                <span className="text-sm">{"8801534567887"}</span>
              </div>
            </CardFooter>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {/* Created At */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-teal-600" />
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
                <div className="flex items-center gap-2">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-teal-600" />
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
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
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
      </div>
    </div>
  );
};

export default Profile;
