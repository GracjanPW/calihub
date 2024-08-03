"use client";
import React, { useCallback } from "react";
import RichEditor from "../../_components/RichEditor";
import Div from "../../_components/Div";
import { Label, TextInput, Checkbox, Button, Select } from "flowbite-react";
import { z } from "zod";
import FileDrop from "../../_components/FileDrop";


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
      <form className="flex max-w-4xl flex-col gap-4 m-auto" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Title" />
          </div>
          <TextInput
            id="email1"
            type="text"
            name="title"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
        <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country" />
      </div>
      <Select id="countries" name="category" required>
        <option value="tr33jo3jif3">Tutorial</option>
      </Select>
        </div>
        <div>
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <FileDrop/>
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" name="isPublished"/>
          <Label htmlFor="remember" >Publish</Label>
        </div>
        <Div>
          <RichEditor />
        </Div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default page;
