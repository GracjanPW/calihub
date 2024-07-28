import React from 'react'
import "@/styles/globals.css";
function layout({
    children
}:{children:React.ReactNode}) {
  return (
    <html lang="en">
    <body>{children}</body>
  </html>
  )
}

export default layout