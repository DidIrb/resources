import { useAuth } from "@/context/auth.context"

export const Profile = () => {
  const { session } = useAuth();
  return (
    <div className="w-full justify-center items-center">
      {JSON.stringify(session)}
    </div>
  )
}
