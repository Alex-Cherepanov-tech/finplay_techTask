import styles from "./rowQuantityFilter.module.css";

interface RowQuantityFilterProps {
  columns: number;
  setColumns: (data: number) => void;
}

export const RowQuantityFilter = ({
  columns,
  setColumns,
}: RowQuantityFilterProps) => {
  return (
    <div className={styles["columnCounter-slider"]}>
      <div className={styles.slider}>
        {[2, 3, 4].map((item) => (
          <div
            key={item}
            className={`${styles.ball} ${
              columns >= item ? `${styles.active}` : ""
            }`}
            onClick={() => setColumns(item)}
          >
            {item}
          </div>
        ))}
        <div
          className={`${styles.filler} ${
            columns !== null ? `${styles.active}` : ""
          }`}
          style={{
            width:
              columns !== null && columns !== 2
                ? `${(columns - 1) * (columns === 4 ? 33 : 25)}%`
                : "0%",
          }}
        />
      </div>
    </div>
  );
};
