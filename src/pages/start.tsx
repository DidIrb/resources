import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { BoxIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Start = () => {
  const navigate = useNavigate();
  const techStack = ["React", "Shadcn UI", "Vite", "Open Source", "Search"]
  return (
    // Navbar Only needs the logo and Icon
    <div className="h-screen flex flex-col">

      <Link to={`/`} className="flex items-center gap-2 font-bold ml-2 h-16 px-4 cursor-pointer">
        <BoxIcon className="h-6 w-6 rotate-45" />  Resources
      </Link>
      <div className="flex-1 p-4 flex gap-2 flex-col justify-center items-center w-full">
        <p className="text-3xl font-bold">Welcome to Resources</p>
        <p className="text-lg max-w-[600px] text-center">The naming is generic but the information is useful, I built this to share helpful resources I find, basically like one massive repository of information, <br /> enjoy ♥</p>

        <div className="flex gap-2">
          {techStack.map((item, index) => (
            <Badge key={index} className='mr-1 font-medium' variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          <ModeToggle />
          <Button className="rounded-full" onClick={() => navigate("/home")}>Get Started</Button>
          <Link to="https://github.com/didirb/resources" target="_blank">
            <Button variant="ghost" className="w-8 rounded-full" size="icon">
              <GitHubLogoIcon className="icon" />
            </Button>
          </Link>
        </div>
      </div>
      <footer className="text-sm p-4 flex justify-center gap-1 items-center">Proudly Built by  <Link to="https://irbaye.com" className="text-blue-500 flex items-center" target="_blank">Dida Irbaye <ExternalLink className=" h-[14px]" /> </Link> </footer>
    </div>

  )
}
