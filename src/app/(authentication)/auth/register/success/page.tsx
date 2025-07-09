import { createMetadata } from '@/lib/metadata';
import RegisterSuccess from '@/views/Auth/Register/RegisterSuccess/RegisterSuccess'
import React from 'react'

export const generateMetadata = () => createMetadata({ title: "Register" });

export default function RegisterSuccessPage() {
  return (
    <RegisterSuccess />
  )
}
