import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Instrument_Serif } from "next/font/google";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className={`container max-w-7xl mx-auto h-full pt-6 `}>
      <Navbar />
      <Separator className="mt-2" />
      {children}
    </div>
  );
}
