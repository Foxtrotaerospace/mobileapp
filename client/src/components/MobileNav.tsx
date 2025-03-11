import { Link, useLocation } from "wouter";
import { Home, Compass, ShoppingBag, Video, User } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Feed", href: "/feed" },
    { icon: ShoppingBag, label: "Shop", href: "/shop" },
    { icon: Video, label: "Learn", href: "/learn" },
    { icon: User, label: "Account", href: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border backdrop-blur-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <a className={`flex flex-col items-center p-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}