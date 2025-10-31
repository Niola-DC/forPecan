
// const Header = () => {
//   const handleLogout = () => {
//     console.log("User logged out");
//   };

//   return (
//     <header className="flex justify-between items-center bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 shadow-md">
//       {/* Company Name */}
//       <h1 className="text-xl font-semibold">MyCompany</h1>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <span className="text-sm md:text-base">Welcome, Eniola</span>
//         <button
//           onClick={handleLogout}
//           className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-md text-sm font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear authentication data
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");

//     // Optionally show feedback
//     console.log("User logged out");

//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 shadow-md">
//       {/* Company Name */}
//       <h1 className="text-xl font-semibold">MyCompany</h1>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <span className="text-sm md:text-base">Welcome, Eniola</span>
//         <button
//           onClick={handleLogout}
//           className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-md text-sm font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;




import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    // Clear tokens and navigate to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("User logged out");
    setShowModal(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 shadow-md">
        <h1 className="text-xl font-semibold">MyCompany</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base">Welcome, Eniola</span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-md text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed backdrop-blur-sm inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
