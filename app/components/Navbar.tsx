import { ListTree, Menu, PackagePlus, X } from "lucide-react";
import Link from "next/link";
import React, { use, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { checkAndAddAssociation } from "../action";

const Navbar = () => {
  const {user }=  useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [{ href: "/category", label: "Categories", icon: ListTree }];

  useEffect(()=>{
    if(user?.primaryEmailAddress?.emailAddress && user.fullName){
        checkAndAddAssociation(user?.primaryEmailAddress?.emailAddress, user.fullName)
    }
  },[user])

  const renderLinks = (baseClass: string) => (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        const activeClass = isActive ? "btn-primary" : "btn-ghost";
        return (
          <Link
            href={href}
            key={href}
            className={`${baseClass} ${activeClass} btn-sm flex gap-2 items-center`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2">
            <PackagePlus className="w-8 h-8 text-primary" />
          </div>
          <span className="uppercase font-bold text-pink-300">
            Dsk Groupe Stock
          </span>
        </div>
        <button
          className="btn w-fit sm:hidden bg-primary rounded-lg btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className=" hidden space-x-2 sm:flex items-center">
          {renderLinks("btn")}
          <UserButton />
        </div>
      </div>
      <div
        className={`absolute top-0 w-full bg-base-100 h-screen flex flex-col gap-2 p-4 
            transition-all duration-300 sm:hidden z-50 ${
              menuOpen ? "left-0" : "-left-full"
            }`}
      >
        <div className="flex justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn w-fit sm:hidden btn-sm bg-ghost hover:bg-red-500 rounded-lg"
          >
            <X className="w-4 h-4 " />
          </button>
          <UserButton />
        </div>

        {renderLinks("btn")}
      </div>
    </div>
  );
};

export default Navbar;
