import { useNavigate } from "react-router";
import { mockGuest, mockAdmin, mockUser, type User } from "../Mocks/user.mock";
import { MdLocalMovies } from "react-icons/md";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

type NavbarProps = {
    user?: User;
};

// Change the mock to see changes
function Navbar({ user = mockAdmin }: NavbarProps) {
    const navigate = useNavigate();
    const isLoggedIn = user.isLoggedIn;
    const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="bg-primary-bg px-6 py-3 border-b border-gray-300">
            <div className="flex justify-between items-center">
                <div className="text-xl font-title flex items-center">
                    <MdLocalMovies/> CineLog
                </div>

                <div className="hidden md:flex items-center gap-6">{menuItems()}</div>

                <div className="hidden md:flex items-center gap-4">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => navigate("/login")}
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

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {menuOpen && (
                <div className="flex flex-col gap-4 mt-4 md:hidden">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-500 w-fit"
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
                    {menuItems()}
                </div>
            )}
        </nav>
    );
}

export default Navbar