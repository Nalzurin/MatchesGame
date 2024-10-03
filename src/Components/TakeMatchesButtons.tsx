import Button from "./Button";
import { TakeMatchesButtonsProps } from "../Types/TakeMatchesButtonsProps";
export default function TakeMatchesButtons({
  count,
  handleClick,
}: TakeMatchesButtonsProps) {
  const buttons: Array<JSX.Element> = [];
  for (let i: number = 0; i < count; i++) {
    buttons.push(
      <Button
        key={`take-${i}`}
        handleClick={() => handleClick(i + 1)}
        label={`Take ${i + 1}`}
      />
    );
  }
  return <>{buttons}</>;
}
