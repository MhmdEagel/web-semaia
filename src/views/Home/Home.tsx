import HomeTitle from "@/components/home-title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-secondary pb-16">
      <div className="min-h-[600px] flex flex-col justify-center items-center 2xl:container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 pb-16 lg:p-0">
          <Image
            src={"/images/cover.png"}
            width={400}
            height={400}
            alt="Hero Image"
          />
          <div className="space-y-2 max-w-lg ">
            <HomeTitle />
            <p className="lg:text-lg text-primary font-semibold">
              Buy Products, Donate a Tree, Save the world.
            </p>
            <p className="mb-4">
              Start exploring your daily needs, buy or sell some products, all
              in one place. Every purchase you make helps fund reforestation
              projects. Get the products you love while giving back to the
              planet.
            </p>
            <Button>Start Browsing</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center 2xl:container mx-auto px-4 pt-8 select-none lg:p-0">
        <div className="relative">
          <Image
            src={"/images/products/termos.svg"}
            width={300}
            height={300}
            alt="Termos Image"
            className="block z-10 relative"
          />
          <p className="italic font-bold text-stroke text-8xl absolute top-20 -left-40 hidden lg:block">
            SEMAIA
          </p>
          <p className="italic font-bold text-primary text-8xl absolute bottom-0 -right-40 hidden lg:block">
            TERMOS
          </p>
        </div>
        <div className=" space-y-4">
          <h4 className="text-2xl font-bold text-primary">
            Try Semaia Original Product
          </h4>
          <h5 className="text-xl font-semibold text-primary">
            Semaia Original Termos
          </h5>
          <p className="text-justify max-w-sm">
            Dukung gaya hidup ramah lingkungan dengan SEMAIA Original Termos,
            botol minum berbahan stainless steel berkualitas tinggi yang
            dirancang untuk kamu yang aktif dan peduli bumi.{" "}
          </p>
          <Button className="ml-auto block">See Store</Button>
        </div>
      </div>
      <Card className="mt-24 mx-4 bg-primary text-center py-16 relative overflow-hidden">
        <CardTitle className="text-xl lg:text-4xl text-secondary">
          <div className="mb-4">Join our e-commerce</div>
          <div>revolution today</div>
        </CardTitle>
        <CardDescription className="text-sm max-w-[250px] lg:max-w-sm mx-auto text-secondary lg:text-lg">
          Discover the future of online shopping with us. Explore our diverse
          product and help us to save the world from global warning through our
          platform
        </CardDescription>
        <CardContent>
          <Link href={"/auth/register"}>
            <Button size={"lg"} className="bg-secondary text-primary hover:bg-secondary/90">
              Register Now - It&apos;s free
            </Button>
          </Link>
        </CardContent>
        <div className="w-[200px] h-[200px] border-4 border-secondary bg-transparent rounded-full absolute -top-10 -left-10 hidden lg:block"></div>
        <div className="w-[300px] h-[300px] border-4 border-secondary bg-transparent rounded-full absolute -top-20 -left-20 hidden lg:block"></div>
        <div className="w-[250px] h-[250px] bg-secondary/50 rounded-full absolute -bottom-20 -right-20 hidden lg:block"></div>
      </Card>
    </div>
  );
}
