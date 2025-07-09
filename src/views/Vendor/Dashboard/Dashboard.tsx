import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserStore } from "@/data/store";
import getCurrentUser from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { EditVendor } from "./EditVendor/EditVendor";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const userStore = await getUserStore(user.id);
  if (!userStore) {
    console.log("User not found");
    return;
  }
  const productCount = await db.product.count({
    where: {
      storeId: userStore.id,
    },
  });

  console.log(userStore.logoUrl)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold">
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-[150px] aspect-square rounded-full overflow-hidden bg-gray-600">
              <Image
                src={
                  userStore.logoUrl && userStore.logoUrl.trim() !== ""
                    ? userStore.logoUrl
                    : "/images/placeholder.png"
                }
                alt="Vendor brand"
                width={150}
                height={150}
                className="object-cover w-full h-full"
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
                <EditVendor store={userStore} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold">
            Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lg:flex-row flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary font-bold">
                  Product Sold
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 justify-end">
                  <div className="text-4xl">0</div>
                  <div className="">Product(s)</div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary font-bold">
                  Product Posted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 justify-end">
                  <div className="text-4xl">{productCount}</div>
                  <div className="">Product(s)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
