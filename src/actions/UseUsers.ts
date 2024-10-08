import { useState, useEffect, useCallback } from "react";
import { User } from "../types/User";

const useUsers = (nameSortOrder: "asc" | "desc", searchTerm: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setIsError(false);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setIsError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortedUsers = [...users].sort((a, b) => {
    const fieldA = a.name.toLowerCase();
    const fieldB = b.name.toLowerCase();
    if (nameSortOrder === "asc") {
      return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
    } else {
      return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
    }
  });

  const filteredUsers = sortedUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return { users: filteredUsers, loading, isError, fetchUsers };
};

export default useUsers;
