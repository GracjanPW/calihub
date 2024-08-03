import { FileInput } from "flowbite-react";
import React, { use, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";

function FileDrop() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  }, []);

  const onFileDialogCancel = useCallback(() => {
    console.log("File dialog was canceled");
  }, []);
  const onFileDialogOpen = useCallback(() => {
    console.log("File dialog was opened");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: false,
    onFileDialogCancel,
    onFileDialogOpen,
    useFsAccessApi: true,
  });

  return (
    <div {...getRootProps()} className="dropzone w-full h-full">
      <div className="relative h-full  flex flex-col items-center justify-center pb-6 pt-5">
      {selectedFile ? (
        <div className="relative m-auto h-full w-auto hover:[&>div]:block">
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="h-full w-auto rounded shadow-slate-500 shadow-md"
            width={800}
            height={400}

            objectFit="contain"
          />
          <div className="absolute top-0 right-0 hidden">
            <button
              className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"
              onClick={() => setSelectedFile(null)}
            >
              <TiDelete />
            </button>
            </div>
        </div>
       ) : (
        <>
        <svg
          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p></>)}
      </div>
      <FileInput
        className="hidden"
        name="banner"
        {...getInputProps({ id: "dropzone-file" })}
      />
    </div>
  );
}

export default FileDrop;
