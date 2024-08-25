import React from 'react'
import AuthCard from '../_components/AuthCard'
import VerifyEmailForm from '../_components/VerifyEmailForm'

function page() {
  return (
    <AuthCard
        title='Verify email'
        backRef='/auth/login'
        backText='Back to login'
    >   
        <VerifyEmailForm/>
    </AuthCard>
  )
}

export default page