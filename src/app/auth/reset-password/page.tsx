
import AuthCard from '../_components/AuthCard'
import ResetPasswordForm from '../_components/ResetPasswordForm'

function page() {
  return (
    <AuthCard
        title="Reset password"
        backRef="/auth/login"
        backText="Remember your password?"
    >
        <ResetPasswordForm/>
    </AuthCard>
  )
}

export default page