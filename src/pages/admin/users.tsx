import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import UsersForm from "../forms/user.form";
import { UsersTable } from "../components/users.table";
import { useRef } from "react";

interface ChildComponentRef {
  fetchUsersData: () => void;
}

export const Users = () => {
  const { openEditUser, openUserForm, isLoading } = useApp();
  const { session } = useAuth();

  const childRef = useRef<ChildComponentRef>(null);

    const handleFetchUsersData = () => {
        if (childRef.current) {
            childRef.current.fetchUsersData();
        }
    };

  return (
    <div className="px-4">
      <div className="flex justify-between md:flex-row  flex-col-reverse gap-3">
        <div className="md:w-[800px] w-full">
          <UsersTable ref={childRef}/> 
        </div>
        <div className="flex justify-end column--shrunk">
          {session &&
            <div className="flex gap-2 mb-2 items-center">
              <Button variant="outline" className={`h-7 ${isLoading && 'w-7'} rounded-full`} size={`${isLoading ? 'icon' : 'default'}`} onClick={handleFetchUsersData} >
                {isLoading ?
                  <ReloadIcon className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                  :
                  "Reload"
                }
              </Button>
              <Button className="h-7 rounded-full" onClick={() => openEditUser(null)} >
                Create
              </Button>
            </div>
          }
        </div>
      </div>
      <UsersForm open={openUserForm} toggleOpenState={openEditUser} />
    </div>
  )
}
