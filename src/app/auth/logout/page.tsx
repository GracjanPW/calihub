
import React from 'react'
import AuthCard from '../_components/AuthCard'
import { signOut } from '@/auth/auth'

async function page() {
  return (
    <AuthCard
        title='See you soon!'
        backRef='/auth/login'
        backText='Back to login'
    >You been logged out</AuthCard>
  )
}

export default page