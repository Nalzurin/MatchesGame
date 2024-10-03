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
  if (currentMatchesCount <= maxMatchesToTake) {
    for (let i = 1; i < currentMatchesCount + 1; i++) {
      if ((botMatches + i) % 2 == 0) {
        return i;
      }
    }
    return currentMatchesCount;
  } else {
    for (let i = maxMatchesToTake; i > 0; i--) {
      if ((botMatches + i) % 2 == 0) {
        return i;
      }
    }
    return 1;
  }
}
