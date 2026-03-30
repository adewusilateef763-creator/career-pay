import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};

  return (
    <div className="flex justify-between p-4 bg-white shadow">
      <h1>Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;