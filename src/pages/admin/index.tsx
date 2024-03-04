import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function Page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default Page;
