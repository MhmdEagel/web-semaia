import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import getCurrentUser from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "@/auth";

export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <nav className="p-4 bg-secondary flex items-center justify-between">
      <Link href={"/"}>
        <div className="flex items-center">
          <Image
            className="pr-2"
            src={"/images/Brand.svg"}
            width={50}
            height={50}
            alt="Semaia logo"
          />
          <h1 className="font-bold text-xl text-primary">Semaia</h1>
        </div>
      </Link>
      <div className="space-x-6 text-secondary-foreground font-medium lg:block hidden">
        <Link href={"/browse"}>Browse</Link>
        <Link href={"/vendor"}>Start Selling</Link>
        <Link href={"/about"}>About Us</Link>
        <Link href={"/support"}>Suppport</Link>
      </div>
      <div className="lg:flex items-center gap-4 hidden">
        <Link href={"/search"}>
          <Search className="text-primary" />
        </Link>
        <Link href={"/cart"}>
          <ShoppingCart className="text-primary" />
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-primary p-2 rounded-full text-white cursor-pointer">
                <User />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4" side="bottom">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="px-1 py-1.5">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.fullname}
                    </span>
                    <span className="truncate text-xs ">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="w-full" type="submit">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/auth/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="flex items-center space-x-1">
                <Image
                  src={"/images/Brand.svg"}
                  width={30}
                  height={30}
                  alt="Semaia logo"
                />
                <SheetTitle className="font-bold text-lg text-primary">
                  Semaia
                </SheetTitle>
              </div>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-4 px-4 text-secondary-foreground">
              <Link href={"/products"}>Products</Link>
              <Link href={"/vendor"}>Start Selling</Link>
              <Link href={"/about"}>About Us</Link>
              <Link href={"/support"}>Suppport</Link>
              <Link href={"/cart"}>Cart</Link>
            </div>
            <SheetFooter>
              <Link href={"/auth/login"}>
                <Button className="w-full">Login</Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
