import styles from "./gameList.module.css";
import { GameType } from "../../utils/types";

interface GamesListProps {
  games: Array<GameType>;
  columns: number;
}

export const GamesList = ({ games, columns }: GamesListProps) => {
  const isMobile = window.innerWidth <= 428;

  const getGameItemSize = (columns: number) => {
    if (isMobile) {
      return { width: "180px", height: "130px" };
    }

    const multiplyer = Math.abs(4 - columns) === 2 ? 1 : 1.3;
    const width = 196 * (Math.abs(4 - columns) * multiplyer);
    const height = 141 * (Math.abs(4 - columns) * multiplyer);
    return { width: `${width || 196}px`, height: `${height || 141}px` };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameListContainer}>
        <div
          className={styles.gameList}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              className={styles.gameItem}
              style={getGameItemSize(columns)}
            >
              <img src={game.cover} alt={game.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
