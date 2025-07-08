
import { RegisterForm } from "@/components/register-form";
import Image from "next/image";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-primary"
          >
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Image
                src={"/images/Brand.svg"}
                width={100}
                height={100}
                alt="semaia logo"
                className="size-4"
              />
            </div>
            Semaia
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex justify-center items-center">
        <Image src="/images/cover.png" width={340} height={340} alt="Image" />
      </div>
    </div>
  );
}
