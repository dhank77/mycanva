"use client";

import { UserButton } from "@/features/auth/components/user-button"

export const Navbar = () => {
  return (
    <nav className="w-full flex item-center h-[68px] p-4">
        <div className="ml-auto">
            <UserButton />
        </div>
    </nav>
  )
}
