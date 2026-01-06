import { Logout } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, Outlet } from '@tanstack/react-router';

import logoImg from '@/assets/logo-image.svg';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useCurrentUserStore } from '@/stores/use-current-user';

export function AppLayout() {
  const { currentUser } = useCurrentUserStore();

  const logout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  return (
    <div className="min-h-svh flex flex-col">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-5xl w-full mx-auto flex h-16 items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Finshow Logo" className="h-6" />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to="/" />}
              >
                Home
              </NavigationMenuLink>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to="/cards" />}
              >
                Cards
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="text-sm flex text-end flex-col leading-tight">
              <p>{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>

            <Button onClick={logout} variant="destructive" size="icon">
              <HugeiconsIcon icon={Logout} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
