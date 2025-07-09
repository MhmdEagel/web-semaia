import { Button } from '@/components/ui/button'
import { getUserStoreProducts } from '@/data/store'
import getCurrentUser from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Vendor() {
  const user = await getCurrentUser();
  if(!user) redirect("/auth/login")
  const storeData = await getUserStoreProducts(user.id);

  console.log(storeData)




if(!storeData) return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <Image className='mb-4' src={"/images/ilustration/empty.svg"} width={300} height={300}  alt='Vendor not found' />
        <h2 className='text-2xl text-primary font-bold'>Vendor not found.</h2>
        <p className='mb-4'>it seems you don&apos;t have a store.</p>
        <Link href={"/vendor/create"}>
            <Button>Start create now</Button>
        </Link>
    </div>
  )

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <div className='w-[100px] h-[100px] rounded-full bg-gray-500 flex justify-center items-center mb-4'>
        <Image src={"/images/placeholder.png"} width={50} height={50} alt='Logo Placeholder' />
      </div>
      <h2 className='text-2xl font-bold text-primary mb-4'>{storeData.name}</h2>
      <p className='max-w-md'>{storeData.description}</p>
    </div>
  )

}
