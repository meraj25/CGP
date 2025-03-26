
export default function Dashboard() {
    const sriLankaDistricts = [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullaitivu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya"
      ];

    return(
        <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-green-500 p-4 flex justify-between items-center text-black">
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Sign In</a>
            <a href="#" className="hover:underline">Sign Up</a>
          </div>
          <div className="flex items-center space-x-2">
            <span>👤 Hi, User</span>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex p-8">
          {/* Filter Sidebar */}
          <div className="bg-white text-black shadow-lg p-4 rounded-md w-1/4">
            <h2 className="text-lg font-bold mb-4">Filter Your Tutor</h2>
            <div className="mb-4">
              <label className="block font-semibold">Medium</label>
              <select className="w-full p-2 border rounded">
                <option>Sinhalese</option>
                <option>English</option>
                <option>Tamil</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Section</label>
              <select className="w-full p-2 border rounded">
                <option>Primary</option>
                <option>Secondary</option>
                <option>AdvanceLevel</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Subject</label>
              <select className="w-full p-2 border rounded">
                <option>Maths</option>
                <option>Science</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">District</label>
              <select className="w-full p-2 border rounded">
              {sriLankaDistricts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
              </select>
            </div>
            <button className="w-full bg-green-500 text-black p-2 rounded">Filter</button>
          </div>
  
          {/* Tutor Listings */}
          <div className="flex-1 ml-8">
            {/* Search Bar */}
            <div className="flex items-center mb-6 " >
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border rounded text-black"
              />
              <button className="ml-2 p-2 bg-gray-300 rounded">🔍</button>
            </div>
  
            {/* Tutor Cards Grid */}
            <div className="grid grid-cols-4 text-black gap-6">
            {Array.from({ length: 8 }, (_, i) => (
  <div key={i} className="bg-white p-4 rounded shadow-md">
    <div className="h-24 bg-gray-300 rounded mb-2"></div>
    <p className="font-bold">Name: <span className="font-normal">Tutor {i + 1}</span></p>
    <p className="font-bold">Section: <span className="font-normal">Primary</span></p>
    <p className="font-bold">Stream: <span className="font-normal">Maths</span></p>
    <p className="font-bold">District: <span className="font-normal">Kandy</span></p>
  </div>
))}
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="bg-green-500 h-12"></div>
      </div>
    );
}