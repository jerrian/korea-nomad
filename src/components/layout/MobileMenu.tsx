'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navItems } from '@/data/cities';
import { useAuth } from '@/contexts/AuthContext';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isLoading, user, openLoginModal, openSignupModal, logout } = useAuth();

  const handleLoginClick = () => {
    setOpen(false);
    openLoginModal();
  };

  const handleSignupClick = () => {
    setOpen(false);
    openSignupModal();
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="text-2xl">🇰🇷</span>
            <span className="text-xl font-bold text-primary">KoreaNomad</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-2 text-lg font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <hr className="my-4" />
          <div className="flex flex-col gap-2">
            {isLoading ? null : isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {user?.name.charAt(0)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-start" onClick={handleLoginClick}>
                  <User className="h-4 w-4 mr-2" />
                  로그인
                </Button>
                <Button className="w-full" onClick={handleSignupClick}>
                  회원가입
                </Button>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
