const NavBar = () => {
    return (
      <div className="bg-green-500 p-4 flex justify-between items-center text-white">
        {/* Left Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
  
        {/* User Section */}
        <div className="flex items-center space-x-2">
          <span>👤 Hi, User</span>
          <a href="#" className="hover:underline">Log Out</a>
        </div>
      </div>
    );
  };
  
  export default NavBar;
  