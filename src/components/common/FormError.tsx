
import { BiError } from "react-icons/bi";

function FormError({
    text
}:{
    text:string|undefined
}) {
  if (!text) return 
  return (
    <div className="space-x-2 p-2 flex items-center bg-red-800 text-red-400 font-bold bg-opacity-20 border-red-400 border rounded-md">
        <BiError size={24}/>
        <p>{text}</p>
    </div>
  )
}

export default FormError