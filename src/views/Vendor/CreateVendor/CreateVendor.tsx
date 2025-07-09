import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreForm } from "@/components/vendor-form";
import getCurrentUser from "@/lib/auth";
import React from "react";

export default async function CreateVendor() {
    const user = await getCurrentUser()
    console.log(user?.id)

  return (
    <div className="flex flex-col mx-auto justify-center items-center 2xl:container w-full h-screen">
      <Card className="min-w-xl max-w-xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl text-center text-primary">Create Vendor</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StoreForm />
        </CardContent>
      </Card>
    </div>
  );
}
