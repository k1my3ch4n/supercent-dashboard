import GameCard from "./GameCard";
import GameCardAdd from "./GameCardAdd";
import { Game } from "@features/game/model/mockGames";

interface GameGridProps {
  games: Game[];
  onGameClick: (gameId: string) => void;
  onAddClick?: () => void;
}

export default function GameGrid({ games, onGameClick, onAddClick }: GameGridProps) {
  return (
    <div
      className="grid gap-[14px] px-10 pb-10 pt-9"
      style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} onClick={onGameClick} />
      ))}
      <GameCardAdd onClick={onAddClick} />
    </div>
  );
}
