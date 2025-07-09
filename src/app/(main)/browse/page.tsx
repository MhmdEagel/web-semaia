import { createMetadata } from "@/lib/metadata";
import Browse from "@/views/Browse/Browse";

export const generateMetadata = () =>
  createMetadata({ title: "Browse" });


export default function BrowsePage() {
  return (
   <Browse />
  )
}
