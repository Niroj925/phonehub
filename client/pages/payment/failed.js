import React from 'react'
import { useRouter } from 'next/router'
function failed() {
  const router=useRouter();
  const {q}=router.query
  if(q==='fu'){
     setTimeout(() => {
                  router.push('/');
                }, 3000)
  }
  return (
    <div>
      payment unsuccess
    </div>
  )
}

export default failed
