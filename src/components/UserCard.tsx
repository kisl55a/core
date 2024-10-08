import { memo } from "react";
import { User } from "../types/User";
import styles from "./UserCard.module.sass";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>
        Address: {user.address.street}, {user.address.city}
      </p>
    </div>
  );
};

export default memo(UserCard);
