import { cn } from "@/lib/utils";
import React from "react";

type LineProps = {
  className?: string;
};

function Line({ className }: LineProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 400"
      className={cn(className)}
    >
      <path
        fill="none"
        stroke='url("#SvgjsLinearGradient1000")'
        strokeDasharray="0 0"
        strokeLinecap="round"
        strokeWidth="9"
        d="M116.144 212.556c11.645-7.843 22.08-28.408 43.946-29.596 21.865-1.189 15.273 26.3 38.565 25.112 23.291-1.189 24.61-30.785 49.327-29.597 24.718 1.189 14.475 34.081 43.946 34.081 29.471 0 23.059-32.18 67.265-34.08 44.206-1.902 48.215 28.331 99.551 26.905 51.337-1.426 27.624-30.623 94.17-32.287 66.548-1.664 115.36 19.117 156.951 26.01"
      ></path>
      <defs>
        <linearGradient
          id="SvgjsLinearGradient1000"
          gradientTransform="rotate(143 .5 .5)"
        >
          <stop offset="0" stopColor="hsl(70, 69%, 60%)"></stop>
          <stop offset="1" stopColor="hsl(70, 69%, 80%)"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Line;
