import { memo } from "react";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>
            Address: {user.address.street}, {user.address.city}
          </p>
        </div>
      ))}
    </div>
  );
};

export default memo(UserList);
