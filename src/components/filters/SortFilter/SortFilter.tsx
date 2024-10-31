import styles from './SortFilter.module.css'

interface SortFilterProps {
    sortOrder: string
    setSortOrder:(data: string) => void
}

export const SortFilter = ({setSortOrder, sortOrder}: SortFilterProps) => {
  return (
    <div>
            <div className={styles.tileContainer}>
              <div
                className={`${styles.tile} ${
                  sortOrder === "A-Z" ? styles.active : ""
                }`}
                onClick={() => setSortOrder("A-Z")}
              >
                A-Z
              </div>
              <div
                className={`${styles.tile} ${
                  sortOrder === "Z-A" ? styles.active : ""
                }`}
                onClick={() => setSortOrder("Z-A")}
              >
                Z-A
              </div>
              <div
                className={`${styles.tile} ${
                  sortOrder === "Newest" ? styles.active : ""
                }`}
                onClick={() => setSortOrder("Newest")}
              >
                Newest
              </div>
            </div>
          </div>
  )
}
