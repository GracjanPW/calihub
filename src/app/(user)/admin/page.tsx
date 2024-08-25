
import React from "react";
import { redirect } from 'next/navigation'

function page() {
    redirect('/admin/dashboard')
  return <div>Loading..</div>;
}

export default page;
