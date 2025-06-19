import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserWithoutPassword } from "@/types/profile";
import { Mail, Phone, User } from "lucide-react";

interface ProfileOverviewCardProps {
  user: UserWithoutPassword;
}

export const ProfileOverviewCard = ({ user }: ProfileOverviewCardProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-main text-lg">
          <User className="h-5 w-5" />
          Current Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Username</Badge>
          <span className="text-sm">{user.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.phone}</span>
          </div>
        )}
        <div className="pt-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            Active Account
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
