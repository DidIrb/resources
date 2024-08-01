import React, { useState } from 'react';
import { useAuth } from "@/context/auth.context";
import { User } from '@/types/forms.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PasswordForm from '../forms/profile/password.form';
import UsernameForm from '../forms/profile/username.form';

export const Profile: React.FC = () => {
  const { session } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);

  const user: User | null = session;

  if (!user) {
    return <div>Loading...</div>;
  }

  const profileItems = Object.entries(user).map(([key, value]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    return (
      <div key={key} className="py-2 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{value as React.ReactNode}</dd>
      </div>
    );
  });

  return (
      <Card className=" self-start overflow-hidden text-sm md:text-base md:w-[500px] align-top w-full justify-center px-3 items-center">
        <div className="py-2">
          <h3 className="text-lg leading-6 font-medium">Profile</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">This is your Information</p>
        </div>
        <div className="border-t border-gray-200 px-2 py-2 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {profileItems}
          </dl>
          <div className="py-2 border-t border-gray-200">
            {!showPasswordForm && !showUsernameForm && (
              <>
                <Button variant="outline" className='mr-2 md:mb-0 mb-2' onClick={() => setShowPasswordForm(true)}>
                  update password
                </Button>
                <Button variant="outline" className='' onClick={() => setShowUsernameForm(true)}>
                  update username
                </Button>
              </>
            )}
            {showPasswordForm && (
              <PasswordForm userId={session.id} onClose={() => setShowPasswordForm(false)} />
            )}
            {showUsernameForm && (
              <UsernameForm userId={session.id} currentUsername={session.username} onClose={() => setShowUsernameForm(false)} />
            )}
          </div>
        </div>
      </Card>
  );
};
