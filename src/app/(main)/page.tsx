import { createMetadata } from "@/lib/metadata";
import Home from "@/views/Home/Home";

export const generateMetadata = () => createMetadata({ title: "Home" });


export default function HomePage() {
  return (
    <Home />
  );
}
