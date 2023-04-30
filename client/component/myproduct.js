import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';

function myproduct() {
    const [products,setProducts]=useState([])

    const router=useRouter();
  
    const { userid } = router.query
    console.log(userid);

    const getMyProducts=async ()=>{
    try {
        const response = await api.post('/user/getproduct', {userId:userid}, {
          headers: {
           token: JSON.parse(localStorage.getItem("token")),               
          },
        });
        console.log(response.data);
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }

    useEffect(()=>{
        getMyProducts();
    })

  return (
    <div>
      
    </div>
  )
}

export default myproduct
