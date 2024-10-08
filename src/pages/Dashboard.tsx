import { memo, useState } from "react";
import UserList from "../components/UserList";
import styles from "./Dashboard.module.sass";
import useUsers from "../actions/UseUsers";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { users, loading, isError } = useUsers(sortOrder, searchTerm);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const AscIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
  );

  const DescIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by any field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSort}>
          Sort by Name {sortOrder === "asc" ? <DescIcon /> : <AscIcon />}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {isError && <p>Error loading users.</p>}
      {!loading && !isError && <UserList users={users} />}
    </div>
  );
};

export default memo(Dashboard);
