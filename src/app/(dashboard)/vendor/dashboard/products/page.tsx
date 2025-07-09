import { createMetadata } from "@/lib/metadata";
import Products from "@/views/Vendor/Dashboard/Products/Products";
export const generateMetadata = () => createMetadata({ title: "Productts" });
export default function ProductsPage() {
  return (
    <Products />
  )
}
