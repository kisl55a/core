import { memo, useState } from "react";
import UserList from "../components/UserList";
import styles from "./Dashboard.module.sass";
import useUsers from "../actions/UseUsers";

type SortField = "name" | "email" | "none";
type SortOrder = "asc" | "desc" | undefined;

const DescIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
  >
    <path d="M7 14l5-5 5 5H7z" />
  </svg>
);

const AscIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
  >
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortField, setSortField] = useState<SortField>("none");
  const { users, loading, isError } = useUsers({
    nameSortOrder: sortOrder,
    searchTerm,
    sortField,
  });

  const handleSort = () => {
    if (sortField === "none") return;
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as SortField;
    setSortField(value);
    setSortOrder(value === "none" ? undefined : "asc");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by any field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.sortControls}>
        <label htmlFor="sortField" className={styles.sortFieldLabel}>
          Sort by:
        </label>
        <select
          id="sortField"
          value={sortField}
          onChange={handleSortFieldChange}
          className={styles.sortFieldDropdown}
        >
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        {sortField !== "none" && (
          <button onClick={handleSort}>
            {sortOrder === "asc" ? <AscIcon /> : <DescIcon />}
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {isError && <p>Error loading users.</p>}
      {!loading && !isError && <UserList users={users} />}
    </div>
  );
};

export default memo(Dashboard);
