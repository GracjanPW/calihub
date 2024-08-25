import React from 'react'
import AuthCard from '../_components/AuthCard'
import RegisterForm from '../_components/RegisterForm'

function page() {
  return (
    <AuthCard
        title='Register'
        backRef='/auth/login'
        backText='Have an account already?'
    ><RegisterForm/></AuthCard>
  )
}

export default page