import { useState } from "react";
import { GameStates } from "./Types/GameStates";
import { takeMatches } from "./Scripts/GameLogic";
import { botTurn } from "./Scripts/BotIntelligence";
import Button from "./Components/Button";
import MatchStickVisual from "./Components/MatchStickVisual";
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
      <div className="p-4 flex h-screen bg-gray-800 text-slate-100 text-center font-mono text-lg">
        <div className="flex-1 flex align-middle items-center justify-center flex-wrap">
          <div className="w-full"></div>
          <p className="w-full">Player Matches: {playerMatches}</p>
          <div className="w-full">
            <MatchStickVisual count={playerMatches} />
          </div>
          <div className="flex items-center justify-evenly w-full">
            {currentState === GameStates.PlayerTurn && (
              <>
                <Button
                  handleClick={() => handleTakeMatches(1)}
                  label="Take 1"
                />
                <Button
                  handleClick={() => handleTakeMatches(2)}
                  label="Take 2"
                />
                <Button
                  handleClick={() => handleTakeMatches(3)}
                  label="Take 3"
                />
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex align-middle items-center justify-center flex-wrap ">
          <h1 className="w-full">{currentState}</h1>

          <h3 className="w-full">Matches Left: {leftMatchesCount}/25</h3>
          <div className="w-full">
            <MatchStickVisual count={leftMatchesCount} />
          </div>

          <div className="w-full">
            <Button handleClick={() => handleResetGame()} label="Reset" />
          </div>
        </div>
        <div className="flex-1  flex align-middle items-center justify-center flex-wrap">
          <div className="w-full"></div>
          <p className="w-full">Bot Matches: {botMatches}</p>
          <div className="w-full">
            <MatchStickVisual count={botMatches} />
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </>
  );
}

export default App;
