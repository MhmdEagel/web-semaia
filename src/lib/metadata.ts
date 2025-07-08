import { MetaHeader } from "@/types/metadata";
import { Metadata } from "next";

export const createMetadata = ({
  title,
  description,
}: MetaHeader): Metadata => ({
  title,
  description:
    description ??
    "Semaia merupakan platform e-commerce untuk menjual dan membeli barang, setiap transaksi akan didonasikan ke lembaga penanaman pohon untuk mendukung aksi penghijauan",
});
