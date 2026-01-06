import { Outlet } from '@tanstack/react-router';

import authAnm from '@/assets/auth-animation.svg';
import logoImg from '@/assets/logo-image.svg';

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <img src={logoImg} alt="Logo" className="h-8" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={authAnm}
          alt="Man with control about his money"
          className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
