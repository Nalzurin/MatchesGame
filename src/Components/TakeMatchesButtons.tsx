import Button from "./Button";
import { TakeMatchesButtonsProps } from "../Types/TakeMatchesButtonsProps";

export default function TakeMatchesButtons({
  count,
  handleClick,
}: TakeMatchesButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-4 overflow-y-scroll">
      {Array.from({ length: count }, (_, i) => (
        <Button
          key={`take-${i}`}
          handleClick={() => handleClick(i + 1)}
          label={`Take ${i + 1}`}
        />
      ))}
    </div>
  );
}
