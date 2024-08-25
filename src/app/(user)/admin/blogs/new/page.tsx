"use client";
import React, { useCallback } from "react";
import RichEditor from "../../_components/RichEditor";
import Div from "../../_components/Div";
import { Label, TextInput, Checkbox, Button, Select } from "flowbite-react";
import { z } from "zod";
import FileDrop from "../../_components/FileDrop";
import BlogForm from "../../_components/BlogForm";


const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB


const file = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, 'File size must be less than 3MB')



const schema = z.object({
  title: z.string(),
  banner: file,
  content: z.string().default(""),
  category: z.string().default("tr33jo3jif3"),
  isPublished: z.boolean().default(false),
});

function page() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const validForm = new FormData()
    try{
      let parsedData = schema.parse({...data, isPublished: data.isPublished === 'on'});

    } catch (error) {
      console.log(error)
    } finally {
      fetch('/api/articles',{
        method:"POST",
        body: formData
      })
    }
  }

  return (
    <div className="w-full ">
      <BlogForm submit={handleSubmit} />
    </div>
  );
}

export default page;
