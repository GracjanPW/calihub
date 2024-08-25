import AuthCard from "../_components/AuthCard"
import NewPasswordForm from "../_components/NewPasswordForm"

function page() {
  return (
    <AuthCard
        title="Create new password"
        backRef="/auth/login"
        backText="Back to login"
    >
        <NewPasswordForm/>
    </AuthCard>
  )
}

export default page