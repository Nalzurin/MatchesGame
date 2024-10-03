import { MatchStickVisualProps } from "../Types/MatchStickVisualProps";

const emoji = "📌";

export default function MatchStickVisual({ count }: MatchStickVisualProps) {
  return (
    <p className="text-3xl my-4 break-all overflow-y-scroll">
      {Array.from({ length: count })
        .map(() => emoji)
        .join("")}
    </p>
  );
}
