import GameCard from "./GameCard";
import { Game } from "@features/game/model/games";

interface GameGridProps {
  games: Game[];
  onGameClick: (gameId: string) => void;
}

export default function GameGrid({ games, onGameClick }: GameGridProps) {
  return (
    <ul className="grid gap-size-14 px-10 pb-10 pt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard
            game={game}
            onSelect={() => {
              onGameClick(game.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
