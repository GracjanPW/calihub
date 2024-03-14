import React, { useEffect, useState } from 'react'

function useScrollCheck() {
  const [isScroll, setIsScroll] = useState(false);

  const checkIfAtTop = (e)=>{
    if (window.scrollY < 10 ){
        setIsScroll(false)
    }
    else {
        setIsScroll(true)
    }
}
  useEffect(()=>{
    window.addEventListener("scroll", checkIfAtTop)
    return ()=> {
        window.removeEventListener("scroll", checkIfAtTop)
    }
  })

  return isScroll
}

export default useScrollCheck