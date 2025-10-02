import { Link } from "react-router";
import { useUser } from "../context/UserContext";
import { i18n } from "../i18n";

function ProfileSection() {
  const { user, logout } = useUser();

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || "User"
  )}&background=random&rounded=true&size=128`;

  return (
    <div className="flex items-center gap-2">
      <Link to="/profile" className="flex items-center gap-2">
        <span className="font-semibold">{user.name}</span>
        <img
          src={user.avatar || avatarUrl}
          alt="profile"
          className="w-9 h-9 rounded-full border border-gray-200"
        />
      </Link>

      <button
        onClick={logout}
        className="ml-3 text-sm text-red-500 hover:underline"
      >
        {i18n.navbar.logout}
      </button>
    </div>
  );
}

export default ProfileSection;
