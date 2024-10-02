import { GameStates } from "../Types/GameStates";
import { takeMatches } from "./GameLogic";

export function botTurn(currentMatchesCount: number, botMatches: number) {
  // Bot takes between 1 and 3 matches, depending on how many are left
  const matchesToTake = Math.min(currentMatchesCount, 3);

  return takeMatches(
    matchesToTake,
    currentMatchesCount,
    GameStates.EnemyTurn,
    0,
    botMatches
  );
}
