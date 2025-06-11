import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = ({}) => {
  return (
    <div className="flex justify-between items-center font-main">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/home"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Icons.logo className="h-6 w-6 rounded-sm dark:bg-white" />
          <span className="ml-2">P-AI</span>
        </Link>
      </nav>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
