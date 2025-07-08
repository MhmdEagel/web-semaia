import Image from "next/image";

export default function RegisterSuccess() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        src={"/images/ilustration/email-sent.svg"}
        className="mb-4"
        width={300}
        height={300}
        alt="Email Sent"
      />
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="mb-1 text-3xl font-bold text-primary">
            Register Success
          </h1>
          <p className="text-xl">Verification Email has been sent</p>
          <p className="text-lg text-gray-500">Check your email to verify.</p>
        </div>
      </div>
    </div>
  );
}
