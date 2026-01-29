'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function AuthButtons() {
  const { isAuthenticated, isLoading, openLoginModal, openSignupModal } = useAuth();

  return (
    <>
      {isLoading ? null : isAuthenticated ? (
        <UserMenu />
      ) : (
        <>
          <Button variant="ghost" size="sm" onClick={openLoginModal}>
            <User className="h-4 w-4 mr-2" />
            로그인
          </Button>
          <Button size="sm" onClick={openSignupModal}>
            회원가입
          </Button>
        </>
      )}
      <LoginModal />
      <SignupModal />
    </>
  );
}
