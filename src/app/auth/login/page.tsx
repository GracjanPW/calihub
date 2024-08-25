

import { signIn } from "@/auth/auth";
import React from "react";
import AuthCard from "../_components/AuthCard";
import LoginForm from "../_components/LoginForm";



function page() {
  return (
    <AuthCard
      title={"Login"}
      backRef={"/auth/register"}
      backText={"Don't have account?"}
    >
      <LoginForm/>
    </AuthCard>
  );
}

export default page;
