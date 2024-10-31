import { useEffect, useMemo, useState } from "react";
import { FiltersPlate } from "../../components/filters/FiltersPlate";
import Navbar from "../../components/navbar/navbar";
import {
  GameType,
  ProviderType,
  GroupType,
  FilterType,
} from "../../utils/types";
import styles from "./gamesPage.module.css";
import axios from "axios";
import { GamesList } from "../../components/gameList/gameList";

interface GamesPageProps {
  onLogout: () => void;
}

const GamesPage = ({ onLogout }: GamesPageProps) => {
  const isMobile = window.innerWidth <= 428;
  const [games, setGames] = useState<GameType[]>([]);
  const [providers, setProviders] = useState<ProviderType[]>([]);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [filter, setFilter] = useState<FilterType>({
    name: "",
    provider: [],
    groups: [],
  });
  const [columns, setColumns] = useState<number>(isMobile ? 2 : 4);
  const [sortOrder, setSortOrder] = useState<string>("A-Z");
  const handleFilterChange = (name: string, value: string) => {
    setFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTileClick = (name: keyof FilterType, value: number) => {
    setFilter((prevState) => {
      const currentValues = prevState[name] as number[];
      if (currentValues.includes(value)) {
        return {
          ...prevState,
          [name]: currentValues.filter((v: number) => v !== value),
        };
      } else {
        return { ...prevState, [name]: [...currentValues, value] };
      }
    });
  };

  const resetFilter = () => {
    setFilter({ name: "", provider: [], groups: [] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");

        const response = await axios.get("http://localhost:3001/games", {
          headers: {
            "session-id": sessionId,
          },
        });
        const data = response.data;

        if (data && Array.isArray(data.games)) {
          setGames(data.games);
        } else {
          new Error("Invalid data format");
        }

        setProviders(data.providers || []);
        setGroups(data.groups || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error! please try again later");
        setGames([]);
        setProviders([]);
        setGroups([]);
      }
    };
    fetchData();
  }, []);

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchedNames = game.name
          .toLowerCase()
          .includes(filter.name.toLowerCase());
        const matchesProvider =
          filter.provider.length === 0 ||
          filter.provider.includes(game.provider);
        const matchesGroup =
          filter.groups.length === 0 ||
          filter.groups.some((groupId) => {
            const group = groups.find((g) => g.id === groupId);
            return group ? group.games.includes(game.id) : false;
          });
        return matchedNames && matchesProvider && matchesGroup;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "A-Z":
            return a.name.localeCompare(b.name);
          case "Z-A":
            return b.name.localeCompare(a.name);
          case "Newest":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          default:
            return 0;
        }
      });
  }, [games, filter, sortOrder, groups]);

  return (
    <div className={styles.wrapper}>
      <Navbar onLogout={onLogout} />
      <div className={styles.wrapper}>
        <div className={`${styles.container}`}>
          <div className={`${styles.gamesMobile}`}>
            <GamesList games={filteredGames} columns={columns} />
          </div>
          <div className={`${styles.filtersMobile}`}>
            <FiltersPlate
              filter={filter}
              handleTileClick={handleTileClick}
              providers={providers}
              groups={groups}
              resetFilter={resetFilter}
              handleFilterChange={handleFilterChange}
              length={filteredGames.length}
              setSortOrder={setSortOrder}
              columns={columns}
              setColumns={setColumns}
              sortOrder={sortOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
