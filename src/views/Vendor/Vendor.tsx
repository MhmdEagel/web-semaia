import { Button } from '@/components/ui/button'
import { getUserStore } from '@/data/store'
import getCurrentUser from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Vendor() {
  const user = await getCurrentUser();
  if(!user) redirect("/auth/login")
  const storeData = await getUserStore(user.id);

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
  redirect("/vendor/dashboard")
}
