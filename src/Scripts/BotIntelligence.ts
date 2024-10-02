import { GameStates } from "../Types/GameStates";
import { takeMatches } from "./GameLogic";

export function botTurn(currentMatchesCount: number, botMatches: number) {
  // Bot takes between 1 and 3 matches, depending on how many are left
  const matchesToTake: number = optimalMove(currentMatchesCount, botMatches);

  return takeMatches(
    matchesToTake,
    currentMatchesCount,
    GameStates.EnemyTurn,
    0,
    botMatches
  );
}
function optimalMove(currentMatchesCount: number, botMatches: number): number {
  if (currentMatchesCount <= 3) {
    for (let i = 1; i < currentMatchesCount + 1; i++) {
      if ((botMatches + i) % 2 == 0) {
        return i;
      }
    }
    return currentMatchesCount;
  } else {
    for (let i = 1; i < 4; i++) {
      if ((botMatches + i) % 2 == 0) {
        return i;
      }
    }
    return 1;
  }
}
