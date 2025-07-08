"use client";
import Image from "next/image";
import useNewVerification from "./useNewVerification";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewVerification() {
  const { success, error } = useNewVerification();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {!success && !error && <Spinner className="text-primary" size={100} variant="circle" />}
      
      {error && (
        <div>
          <p className="mx-auto mb-4 w-fit text-red-500 font-semibold">{error}</p>
          <h1 className="mb-4 text-2xl text-primary font-bold">Please Register your account.</h1>
          <Link href={`/auth/register`}>
            <Button className="w-full">Register</Button>
          </Link>
        </div>
      )}
      {success && (
        <>
          <Image
            className="mx-auto mb-4"
            src={"/images/ilustration/success.svg"}
            width={280}
            height={280}
            alt="Verification Ilustration"
          />
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="mb-1 text-lg lg:text-3xl font-bold text-primary">
                Email Verification Success
              </h1>
              <p className="mb-4 text-base lg:text-lg text-gray-600">
                Click this button to login.
              </p>
              <Link href='auth/login'>
                <Button className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
