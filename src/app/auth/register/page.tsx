import React from 'react'
import Register from '../../../views/Auth/Register/Register'
import { createMetadata } from '@/lib/metadata';

export const generateMetadata = () => createMetadata({ title: "Register" });


export default function RegisterPage() {
  return (
    <Register />
  )
}
