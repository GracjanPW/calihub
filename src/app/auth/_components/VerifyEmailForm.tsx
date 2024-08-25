"use client"

import verifyEmail from "@/actions/auth/verify-email";
import FormError from "@/components/common/FormError";
import FormSuccess from "@/components/common/FormSuccess";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners"

function VerifyEmailForm() {
    const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleVerify = useCallback(() => {
    if (!token) return setError("Token not found");

    verifyEmail(token)
      .then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    if (error || success) return;
    handleVerify();
  }, [handleVerify]);

  return (
    <div className="w-full flex-col justify-items-stretch">
        {error || success ? (
          <>
            <FormError text={error} />
            <FormSuccess text={success} />
          </>
        ) : (
          <div className="m-auto max-w-fit ">
            <FadeLoader speedMultiplier={1.5} color="white"/>
          </div>
        )}
        <br />
      </div>
  )
}

export default VerifyEmailForm