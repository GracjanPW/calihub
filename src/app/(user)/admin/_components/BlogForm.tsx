"use client";
import { Label, TextInput, Select, Checkbox, Button } from 'flowbite-react'
import React from 'react'
import Div from './Div'
import FileDrop from './FileDrop'
import RichEditor from './RichEditor'
import { Article, Image } from '@prisma/client';

type ArticleForm = {
    title: string,
    content: string,
    isPublished: boolean,
    category: string,
    banner: Image
}

function BlogForm({submit: handleSubmit, data=null}:{
    submit: (e:React.FormEvent<HTMLFormElement>)=>void,
    data?:ArticleForm|null
}) {
  return (
    <form className="flex max-w-4xl flex-col gap-4 m-auto" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Title" />
          </div>
          <TextInput
            id="email1"
            type="text"
            name="title"
            defaultValue={data ? data.title : ""}
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
            <FileDrop savedFileUrl={data?data.banner.url:null}/>
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" name="isPublished" defaultChecked={data? data.isPublished:false}/>
          <Label htmlFor="remember" >Publish</Label>
        </div>
        <Div>
          <RichEditor content={data?data.content:""}/>
        </Div>
        <Button type="submit">{data?"Save":"Submit"}</Button>
      </form>
  )
}

export default BlogForm