import { MatchStickVisualProps } from "../Types/MatchStickVisualProps";

const emoji: string = "📌";

export default function MatchStickVisual({ count }: MatchStickVisualProps) {
  let content: string = "";
  for (let i: number = 0; i < count; i++) {
    content += emoji;
  }
  return <p>{content}</p>;
}
