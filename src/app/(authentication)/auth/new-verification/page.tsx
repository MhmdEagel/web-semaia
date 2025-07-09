import { createMetadata } from "@/lib/metadata";
import NewVerification from "@/views/Auth/NewVerification/NewVerification";

export const generateMetadata = () =>
  createMetadata({ title: "Verification Email" });

export default function VerificationPage() {
  return <NewVerification />;
}
