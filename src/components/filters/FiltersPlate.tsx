import React, { useState } from "react";

import styles from "./filtersPlate.module.css";
import { FilterType, GroupType, ProviderType } from "../../utils/types";

import { ProvidersFilter } from "./Providers/ProvidersFilter";
import { SortFilter } from "./SortFilter/SortFilter";
import burger from "../../assets/images/burger.svg";
import { RowQuantityFilter } from "./RowQuantityFilter";

interface FiltersPlateProps {
  filter: FilterType;
  handleTileClick: (name: keyof FilterType, value: number) => void;
  providers: ProviderType[];
  groups: GroupType[];
  handleFilterChange: (name: string, value: string) => void;
  length: number;
  resetFilter: () => void;
  setSortOrder: (data: string) => void;
  columns: number;
  setColumns: (data: number) => void;
  sortOrder: string;
}

export const FiltersPlate = ({
  filter,
  handleTileClick,
  providers,
  groups,
  resetFilter,
  handleFilterChange,
  length,
  setSortOrder,
  columns,
  setColumns,
  sortOrder,
}: FiltersPlateProps) => {
  const [areFiltersVisible, setFiltersVisible] = useState(false);
  const isMobile = window.innerWidth <= 428;
  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search"
        value={filter.name}
        onChange={(e) => handleFilterChange("name", e.target.value)}
      />
      <div
        className={`${styles.filtersContent} ${
          areFiltersVisible || !isMobile ? styles.open : ""
        }`}
      >
        <p style={{ color: "#808080" }}>Providers</p>
        <ProvidersFilter
          items={providers}
          handleTileClick={handleTileClick}
          filter={filter}
          filterName="provider"
        />
        <p style={{ color: "#808080" }}>Groups</p>
        <ProvidersFilter
          items={groups}
          handleTileClick={handleTileClick}
          filter={filter}
          filterName="groups"
        />
        <p style={{ color: "#808080" }}>Sorting</p>
        <SortFilter setSortOrder={setSortOrder} sortOrder={sortOrder} />
        {!isMobile && (
          <>
            <p style={{ color: "#808080" }}>Columns</p>
            <RowQuantityFilter setColumns={setColumns} columns={columns} />
          </>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: isMobile ? "20px" : "40px",
            marginBottom: "10px",
            paddingRight: "20px",
          }}
        >
          <p style={{ color: "#808080" }}>Games amount: {length}</p>
          <button
            style={{
              boxShadow: "0px 4px 10px rgba(128, 128, 128, 0.3)",
              background: "white",
              padding: "15px 40px",
              border: "none",
              marginRight: "5px",
            }}
            onClick={resetFilter}
          >
            Reset
          </button>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={toggleFilters}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "white",
            color: "#007BFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
          }}
        >
          <img src={burger} alt="burger" style={{ marginRight: "10px" }} />
          {areFiltersVisible ? "Hide filters" : "Show filters"}
        </button>
      )}
    </div>
  );
};
