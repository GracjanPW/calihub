"use client"
import React, { useEffect, useState } from 'react'
import BlogForm from '../../_components/BlogForm';


function Page({params}:{
	params:{
		id:string
	}
}) {
  const [blog, setBlog] = useState(null)
  useEffect(() => {
    const fetchBlog = async () => {

      const res = await fetch(`/api/articles?id=${params.id}`)
      const data = await res.json()
      setBlog(data)
    }
    fetchBlog()
  }, [params])

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div className="w-full ">
      <BlogForm submit={handleSubmit} data={blog}/>
    </div>
  );
}





export default Page

