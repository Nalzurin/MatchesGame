import { GameStates } from "../Types/GameStates";

//const BASE_MATCHES_COUNT: number = 25;

export function takeMatches(
  matchesToTake: number,
  currentMatchesCount: number,
  currentState: GameStates,
  playerMatches: number,
  botMatches: number
) {
  if (currentMatchesCount < matchesToTake) {
    console.log("Not enough matches left to take");
    return { currentMatchesCount, currentState, playerMatches, botMatches };
  }
  if ([GameStates.Defeat, GameStates.Victory].includes(currentState)) {
    return { currentMatchesCount, currentState, playerMatches, botMatches };
  }
  console.log(`Removing matches from the pile ${matchesToTake}`);
  const newMatchesCount = currentMatchesCount - matchesToTake;

  if (currentState === GameStates.PlayerTurn) {
    playerMatches += matchesToTake;
  } else {
    botMatches += matchesToTake;
  }

  const newState = endTurn(currentState, newMatchesCount, playerMatches);
  return {
    currentMatchesCount: newMatchesCount,
    currentState: newState,
    playerMatches,
    botMatches,
  };
}

function endTurn(
  currentState: GameStates,
  currentMatchesCount: number,
  playerMatches: number
): GameStates {
  console.log("Ending turn...");
  if (currentMatchesCount == 0) {
    return endGame(playerMatches);
  }
  return currentState === GameStates.PlayerTurn
    ? GameStates.EnemyTurn
    : GameStates.PlayerTurn;
}

function endGame(playerMatches: number): GameStates {
  if (playerMatches % 2 != 0) {
    console.log("Player matches are odd, player loses.");
    return GameStates.Defeat;
  } else {
    console.log("Bot matches are odd, bot loses.");
    return GameStates.Victory;
  }
}
