import { useAuth } from "@/context/auth.context";
import { Profile } from "../common/profile"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Settings = () => {
  const { session } = useAuth();
  return (
    <div className="px-4 flex justify-between md:flex-row gap-3 flex-col-reverse">
      <Profile />
      {session.role == "super_admin"
        &&
        "Protected Here"
      }
      <Card className="flex-1">
        <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <span className="font-medium">Info alert!</span>  Be careful with tags and types, once created it cannot be deleted
        </div>
        <div className="p-3">
          {/* Types Sections */}
          <div className="title mb-1 font-medium"> Resource type</div>

          <Card className="p-3 pt-2">
            <Badge variant="outline">Item</Badge>
          </Card>

        </div>
      </Card>
    </div>
  )
}
