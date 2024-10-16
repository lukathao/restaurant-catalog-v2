import { useFormStatus } from "react-dom";

export function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed"
      aria-disabled={pending}
    >
      Submit
    </button>
  )
}