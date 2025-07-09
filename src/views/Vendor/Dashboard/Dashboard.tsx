import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserStore } from "@/data/store";
import getCurrentUser from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const userStore = await getUserStore(user.id);
  if (!userStore) {
    console.log("User not found");
    return;
  }

  return (
    <div>
      <Card >
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold">
            Overview
          </CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-[200px] h-[150px] rounded-full bg-gray-600 p-4 flex justify-center items-center">
              <Image
                src={"/images/placeholder.png"}
                width={80}
                height={80}
                alt="Vendor brand"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-base uppercase font-bold text-gray-500">
                  Name
                </h4>
                <p className="font-semibold text-xl">{userStore.name}</p>
              </div>
              <div>
                <h4 className="text-base uppercase font-bold text-gray-500">
                  Description
                </h4>
                <p className="text-justify">{userStore.description}</p>
              </div>
              <div>
                <h4 className="text-base uppercase font-bold text-gray-500 mb-1">
                  Actions
                </h4>
                <Button>Edit Vendor</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
