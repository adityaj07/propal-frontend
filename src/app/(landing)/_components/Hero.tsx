import { FC } from "react";
import Line from "./ui/Line";
// import PromptInput from "./PromptInput";
import { SparkleIcon } from "lucide-react";
import Link from "next/link";
import Arrow from "./ui/Arrow";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <section
      id="#Hero"
      className="flex flex-col justify-center items-center font-main"
    >
      <h1 className="text-center mx-auto bg-gradient-to-t from-orange-100 to-orange-500 bg-clip-text text-5xl tracking-tighter text-transparent md:text-6xl lg:text-7xl">
        Build voice dashboards <br /> in{" "}
        <span className="text-transparent bg-clip-text bg-orange-100/50 relative">
          <Line className="absolute top-1 -right-7 -left-7" />
          weeks
        </span>{" "}
        <span className="italic text-transparent bg-clip-text">days</span>
      </h1>

      <h3 className="text-center mx-auto bg-gradient-to-t from-indigo-200 to-yellow-100 bg-clip-text text-base tracking-normal sm:text-md text-transparent md:text-lg lg:text-xl mt-6 text-wrap w-[90%]">
        A slick Next.js + Tailwind app built for the proPAL AI internship —
        powered by JSON, protected routes, and pixel-perfect polish.
      </h3>
      <div className="flex justify-center items-center gap-4 mt-6">
        <Link
          href="/signup"
          className=" hover:shadow-[0_4px_14px_0_#f58123d5] px-8 py-2 bg-[#f87c17] rounded-md text-white font-semibold transition duration-200 ease-linear relative flex gap-2 justify-center items-center"
        >
          <Arrow className="absolute -top-10 w-32 -right-20" />
          Signup
          <SparkleIcon className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
