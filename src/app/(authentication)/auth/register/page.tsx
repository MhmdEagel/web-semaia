import React from 'react'
import { createMetadata } from '@/lib/metadata';
import Register from '@/views/Auth/Register/Register';

export const generateMetadata = () => createMetadata({ title: "Register" });


export default function RegisterPage() {
  return (
    <Register />
  )
}
