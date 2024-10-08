import { memo } from "react";
import { User } from "../types/User";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
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
