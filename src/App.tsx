import { useState, useEffect } from "react";
import { GameStates } from "./Types/GameStates";
import { takeMatches } from "./Scripts/GameLogic";
import { botTurn } from "./Scripts/BotIntelligence";
import Button from "./Components/Button";
import MatchStickVisual from "./Components/MatchStickVisual";
import TakeMatchesButtons from "./Components/TakeMatchesButtons";

function App() {
  const [initialMatchesN, setInitialMatchesN] = useState(12);
  const [initialMatchesCount, setInitialMatchesCount] = useState(
    2 * initialMatchesN + 1
  );
  const [maxMatchesToTake, setMaxMatchesToTake] = useState(3);
  const [defaultGoesFirst, setDefaultGoesFirst] = useState<GameStates>(
    GameStates.PlayerTurn
  );
  const [currentState, setCurrentState] = useState<GameStates>(
    GameStates.PlayerTurn
  );
  const [leftMatchesCount, setLeftMatchesCount] =
    useState<number>(initialMatchesCount);
  const [playerMatches, setPlayerMatches] = useState<number>(0);
  const [botMatches, setBotMatches] = useState<number>(0);

  useEffect(() => {
    handleBotTurn();
  }, [currentState]);

  useEffect(() => {
    handleResetGame();
  }, [
    defaultGoesFirst,
    initialMatchesCount,
    initialMatchesN,
    maxMatchesToTake,
  ]);

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
  }

  function handleSetBotGoesFirst() {
    setDefaultGoesFirst(GameStates.EnemyTurn);
  }

  function handleSetPlayerGoesFirst() {
    setDefaultGoesFirst(GameStates.PlayerTurn);
  }

  function handleBotTurn() {
    if (currentState !== GameStates.EnemyTurn) {
      return;
    }
    setTimeout(() => {
      setLeftMatchesCount((prevLeftMatchesCount) => {
        const result = botTurn(
          prevLeftMatchesCount,
          botMatches,
          playerMatches,
          maxMatchesToTake
        );
        setCurrentState(result.currentState);
        setBotMatches(result.botMatches);
        return result.currentMatchesCount;
      });
    }, 1000);
  }

  function handleResetGame() {
    setCurrentState(defaultGoesFirst);
    setInitialMatchesCount(2 * initialMatchesN + 1);
    setLeftMatchesCount(initialMatchesCount);
    setPlayerMatches(0);
    setBotMatches(0);
  }

  return (
    <div className="p-8 flex h-screen bg-gray-900 text-slate-100 font-mono text-lg space-x-8">
      {/* Player Section */}
      <div
        className={`flex-1 flex flex-col items-center p-6 rounded-lg ${
          currentState === GameStates.PlayerTurn ? "bg-teal-600" : "bg-teal-800"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Player</h2>
        <p className="mb-2">Matches: {playerMatches}</p>
        <MatchStickVisual count={playerMatches} />
        {currentState === GameStates.PlayerTurn && (
          <TakeMatchesButtons
            count={maxMatchesToTake}
            handleClick={handleTakeMatches}
          />
        )}
      </div>

      {/* Middle Section */}
      <div className="flex-1 flex flex-col items-center bg-gray-800 p-6 rounded-lg space-y-4">
        <h1 className="text-xl font-bold">Starting Turn: {defaultGoesFirst}</h1>
        <div className="flex items-center space-x-4">
          <Button handleClick={handleSetBotGoesFirst} label="Enemy" />
          <Button handleClick={handleSetPlayerGoesFirst} label="Player" />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <span className="mr-2">Starting matches count: 2n+1, n =</span>
            <input
              type="number"
              value={initialMatchesN}
              onChange={(e) => setInitialMatchesN(Number(e.target.value))}
              className="w-32 px-4 py-2 rounded-lg text-gray-900"
            />
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <span className="mr-2">Max matches to take:</span>
            <input
              type="number"
              value={maxMatchesToTake}
              onChange={(e) => setMaxMatchesToTake(Number(e.target.value))}
              className="w-32 px-4 py-2 rounded-lg text-gray-900"
            />
          </label>
        </div>
        <h1>Current State: {currentState}</h1>
        <h3>
          Matches Left: {leftMatchesCount}/{initialMatchesCount}
        </h3>
        <MatchStickVisual count={leftMatchesCount} />
        <Button handleClick={handleResetGame} label="Reset" />
      </div>

      {/* Bot Section */}
      <div
        className={`flex-1 flex flex-col items-center p-6 rounded-lg ${
          currentState === GameStates.EnemyTurn ? "bg-red-700" : "bg-red-950"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Bot</h2>
        <p className="mb-2">Matches: {botMatches}</p>
        <MatchStickVisual count={botMatches} />
      </div>
    </div>
  );
}

export default App;
