import { FilterType, GroupType, ProviderType } from "../../../utils/types";
import styles from "./providersFilter.module.css";

interface ProvidersFilterProps {
  items: Array<ProviderType | GroupType>;
  handleTileClick: (name: keyof FilterType, value: number) => void;
  filter: FilterType;
  filterName: "provider" | "groups";
}
export const ProvidersFilter = ({
  items,
  handleTileClick,
  filter,
  filterName,
}: ProvidersFilterProps) => {
  return (
    <div className={styles.tileContainer}>
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={`${styles.tile} ${
              filter[filterName].includes(item.id) ? styles.active : ""
            }`}
            onClick={() => handleTileClick(filterName, item.id)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
