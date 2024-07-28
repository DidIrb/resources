import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full p-4 flex gap-2 flex-col justify-center items-center w-full">
      <p className="text-3xl">Welcome to Resources</p>
      <p className="text-lg">A repository of helpful resources to get you started</p>
      <div className="flex gap-3 ">
        <Button className="rounded-full" onClick={() => navigate("/home")}>Browse</Button>
      </div>
    </div>
  )
}
