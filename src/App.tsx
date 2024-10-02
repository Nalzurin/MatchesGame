import { useState } from "react";
import { GameStates } from "./Types/GameStates";
import { takeMatches } from "./Scripts/GameLogic";
import { botTurn } from "./Scripts/BotIntelligence";
import "./App.css";

function App() {
  const initialMatchesCount = 25;
  const [currentState, setCurrentState] = useState<GameStates>(
    GameStates.PlayerTurn
  );
  const [leftMatchesCount, setLeftMatchesCount] = useState<number>(25);
  const [playerMatches, setPlayerMatches] = useState<number>(0);
  const [botMatches, setBotMatches] = useState<number>(0);

  function handleTakeMatches(matches: number) {
    const result = takeMatches(
      matches,
      leftMatchesCount,
      currentState,
      playerMatches,
      botMatches
    );
    setLeftMatchesCount(result.currentMatchesCount);
    setCurrentState(result.currentState);
    setPlayerMatches(result.playerMatches);
    setBotMatches(result.botMatches);
    if (result.currentState === GameStates.EnemyTurn) {
      handleBotTurn(result.currentMatchesCount, result.botMatches);
    }
  }

  function handleBotTurn(currentMatchesCount: number, botMatches: number) {
    const result = botTurn(currentMatchesCount, botMatches);
    setLeftMatchesCount(result.currentMatchesCount);
    setCurrentState(result.currentState);
    setBotMatches(result.botMatches);
  }
  function handleResetGame() {
    // Reset all states to their initial values
    setCurrentState(GameStates.PlayerTurn);
    setLeftMatchesCount(initialMatchesCount);
    setPlayerMatches(0);
    setBotMatches(0);
  }
  return (
    <>
      <h1>{currentState}</h1>
      <h3>Matches Left: {leftMatchesCount}/25</h3>
      <p>Player Matches: {playerMatches}</p>
      <p>Bot Matches: {botMatches}</p>
      {currentState === GameStates.PlayerTurn && (
        <button onClick={() => handleTakeMatches(1)}>Take 1</button>
      )}
      {currentState === GameStates.PlayerTurn && (
        <button onClick={() => handleTakeMatches(2)}>Take 2</button>
      )}
      {currentState === GameStates.PlayerTurn && (
        <button onClick={() => handleTakeMatches(3)}>Take 3</button>
      )}
      <button onClick={handleResetGame}>Reset</button>
    </>
  );
}

export default App;
