import { ButtonProps } from "../Types/ButtonProps";

export default function Button({ handleClick, label }: ButtonProps) {
  return (
    <button
      className="px-6 py-3 bg-cyan-400 text-gray-900 rounded-lg"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
