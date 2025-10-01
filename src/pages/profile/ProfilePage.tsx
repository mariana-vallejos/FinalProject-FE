import { useUser } from "../../context/UserContext";
import { i18n } from "../../i18n";

function ProfilePage() {
  const { user } = useUser();

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || "User"
  )}&background=random&rounded=true&size=128`;

  return (
    <div className="p-6">
      <div className="flex items-center gap-6">
        <img
          src={user.avatar || avatarUrl}
          alt="profile"
          className="w-24 h-24 rounded-full border border-gray-300"
        />

        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-500">
            {i18n.profile.edit}
          </button>
        </div>
      </div>

      <div className="mt-8 border-b flex gap-6 text-sm">
        <button className="text-primary border-b-2 border-primary pb-2">
          {i18n.profile.reviews}
        </button>
        <button className="text-gray-500 hover:text-primary">
          {i18n.navbar.WatchList}
        </button>
        <button className="text-gray-500 hover:text-primary">
          {i18n.profile.watched}
        </button>
      </div>

      <div className="mt-6">
        <p className="text-gray-600">{i18n.profile.noContent}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
