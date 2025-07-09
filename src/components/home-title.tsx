"use client";

import { cn } from "@/lib/utils";
import { TypeAnimation } from "react-type-animation";
const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

export default function HomeTitle() {
  return (
    <TypeAnimation
      className={cn(
        CURSOR_CLASS_NAME,
        "text-xl lg:text-4xl font-bold text-primary"
      )}
      sequence={[
        500,
        "Welcome to Semaia",
        1000,
        (el) => el?.classList.remove(CURSOR_CLASS_NAME),
      ]}
      wrapper="h2"
      cursor={false}
      repeat={0}
      speed={30}
    />
  );
}
