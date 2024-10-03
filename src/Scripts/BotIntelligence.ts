import { GameStates } from "../Types/GameStates";
import { takeMatches } from "./GameLogic";

export function botTurn(
  currentMatchesCount: number,
  botMatches: number,
  playerMatches: number,
  maxMatchesToTake: number
) {
  const matchesToTake: number = optimalMove(
    currentMatchesCount,
    botMatches,
    maxMatchesToTake
  );
  console.log("Bot turn");
  console.log(currentMatchesCount);
  console.log(botMatches);
  console.log(matchesToTake);
  return takeMatches(
    matchesToTake,
    currentMatchesCount,
    GameStates.EnemyTurn,
    playerMatches,
    botMatches
  );
}
function optimalMove(
  currentMatchesCount: number,
  botMatches: number,
  maxMatchesToTake: number
): number {
  if (
    currentMatchesCount <= maxMatchesToTake &&
    (botMatches + currentMatchesCount) % 2 === 0
  ) {
    return currentMatchesCount;
  }
  for (let i = maxMatchesToTake; i > 0; i--) {
    if (currentMatchesCount - i > -1 && (currentMatchesCount - i) % 2 === 1) {
      console.log("Optimal count to leave odd number in the pile found" + i);
      return i;
    }
  }

  for (let i = maxMatchesToTake; i > 0; i--) {
    if (currentMatchesCount - i > -1 && (botMatches + i) % 2 === 0) {
      console.log("Optimal count to have even number found " + i);
      return i;
    }
  }
  return 1;
}
