import { Navigate, useNavigate } from "react-router";
import { mockGuest, mockAdmin, mockUser, type User } from "../Mocks/user.mock";
import { MdLocalMovies } from "react-icons/md";

type NavbarProps = {
    user?: User;
};

// Change the mock to see changes
function Navbar({ user = mockAdmin }: NavbarProps) {
    const navigate = useNavigate();
    const isLoggedIn = user.isLoggedIn;

    const menuItems = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <a href="/" className="hover:text-primary">Home</a>
                </>
            );
        }

        if (user.role === "admin") {
            return (
                <>
                    <a href="/" className="hover:text-primary">Home</a>
                    <a href="/admin" className="hover:text-primary">Movies</a>
                    <a href="#" className="hover:text-primary">Reviews</a>
                </>
            );
        }

        if (user.role === "user") {
            return (
                <>
                    <a href="/" className="hover:text-primary">Home</a>
                    <a href="#" className="hover:text-primary">Watch list</a>
                </>
            );
        }
    };

    return (
        <nav className="bg-white shadow border-gray px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-title font-title flex items-center">
                <MdLocalMovies /> CineLog
            </div>

            {/* Menu */}
            <div className="flex items-center gap-6">
                {menuItems()}
            </div>

            {/* User actions */}
            <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                <button 
                    onClick={()=> navigate('/login')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                    Sign In
                </button>
                ) : (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{user.name}</span>
                    <a href="/#">
                        <img
                            src={user.avatar}
                            alt="profile"
                            className="w-9 h-9 rounded-full border border-gray-200"
                        />
                    </a>
                </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar