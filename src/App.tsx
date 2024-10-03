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
    console.log(result.currentMatchesCount);
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

  const playerTurnColor =
    currentState === GameStates.PlayerTurn ? "bg-gray-700" : "bg-gray-800";
  const botTurnColor =
    currentState === GameStates.EnemyTurn ? "bg-gray-700" : "bg-gray-800";
  return (
    <>
      <div className="p-4 flex h-screen bg-gray-800 text-slate-100 text-center font-mono text-lg ">
        <div
          className={`flex-1 flex align-middle items-center justify-center flex-wrap rounded-lg ${playerTurnColor}`}
        >
          <div className="w-full"></div>
          <p className="w-full">Player Matches: {playerMatches}</p>
          <div className="w-full">
            <MatchStickVisual count={playerMatches} />
          </div>

          <div className="flex items-center justify-evenly w-full flex-wrap ">
            {currentState === GameStates.PlayerTurn && (
              <TakeMatchesButtons
                count={maxMatchesToTake}
                handleClick={handleTakeMatches}
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex align-middle items-center justify-center flex-col ">
          <div className="shrink">
            <h1>Starting turn: {defaultGoesFirst}</h1>
          </div>
          <div className="flex-1 flex items-center justify-evenly">
            <Button handleClick={() => handleSetBotGoesFirst()} label="Enemy" />
            <Button
              handleClick={() => handleSetPlayerGoesFirst()}
              label="Player"
            />
          </div>
          <div className="shrink flex items-center justify-evenly mb-4">
            <h1>Starting matches count: 2n+1, n =</h1>
            <input
              type="number"
              value={initialMatchesN}
              onChange={(e) => setInitialMatchesN(Number(e.target.value))}
              className="px-4 py-2 rounded-lg text-gray-900"
            />
          </div>

          <div className="shrink flex items-center justify-evenly mb-4">
            <h1>Max matches to take: </h1>
            <input
              type="number"
              value={maxMatchesToTake}
              onChange={(e) => setMaxMatchesToTake(Number(e.target.value))}
              className="px-4 py-2 rounded-lg text-gray-900"
            />
          </div>
          <h1 className="flex-1">{currentState}</h1>

          <h3 className="flex-1">
            Matches Left: {leftMatchesCount}/{initialMatchesCount}
          </h3>
          <div className="flex-1">
            <MatchStickVisual count={leftMatchesCount} />
          </div>

          <div className="flex-1">
            <Button handleClick={() => handleResetGame()} label="Reset" />
          </div>
        </div>
        <div
          className={`flex-1  flex align-middle items-center justify-center flex-wrap rounded-lg  ${botTurnColor}`}
        >
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
