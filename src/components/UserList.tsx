import { memo } from "react";
import { User } from "../types/User";
import UserCard from "./UserCard";
import styles from "./UserList.module.sass";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default memo(UserList);
