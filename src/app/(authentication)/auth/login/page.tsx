
import { createMetadata } from "@/lib/metadata";
import Login from "@/views/Auth/Login/Login";

export const generateMetadata = () => createMetadata({ title: "Login" });

export default function LoginPage() {
  return (
    <Login />
  )
}
