import { ButtonProps } from "../Types/ButtonProps";

export default function Button({ handleClick, label }: ButtonProps) {
  return (
    <button
      className="mx-2 my-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg transition-colors"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
