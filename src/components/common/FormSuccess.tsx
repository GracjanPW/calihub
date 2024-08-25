import { RxCheckCircled } from "react-icons/rx";

function FormSuccess({ text }: { text: string | undefined }) {
  if (!text) return;
  return (
    <div className="space-x-2 p-2 flex items-center bg-green-800 text-green-400 font-bold bg-opacity-20 border-green-400 border rounded-md">
      <RxCheckCircled size={24} />
      <p>{text}</p>
    </div>
  );
}

export default FormSuccess;
