import React, { useState } from "react";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Appointment");
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({ photo: null, name: "", breed: "", age: "", gender: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const handleAddPet = () => {
    if (!newPet.name || !newPet.photo) return;
    setPets([...pets, newPet]);
    setNewPet({ photo: null, name: "", breed: "", age: "", gender: "" });
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPet({ ...newPet, photo: e.target.result });
        setShowPhotoOptions(false); 
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={`font-sansation bg-[#FBFBFB] min-h-screen relative ${isChatOpen ? "overflow-hidden" : ""}`}>
      {/* header */}
      <div className="pt-5 pb-2 px-5 sm:px-10 flex flex-row justify-between items-center animate-fadeSlideDown">
        <div className="flex flex-row items-center gap-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110">
            ☰
          </button>
          <img src="/images/logo.png" className="w-[40px] sm:w-[60px] md:w-[80px] transition-transform duration-300 hover:scale-105" alt="Logo" />
          <div className="flex flex-col">
            <div className="font-baloo text-2xl leading-none">
              <span className="text-[#000000]">Rapha</span>
              <span className="text-[#5EE6FE]">Vets</span>
            </div>
            <span className="font-sansation text-sm">Pet Clinic</span>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center gap-5 sm:gap-8 text-gray-700 animate-fadeSlideDown delay-100">
          <span className="text-2xl transition-transform duration-300 hover:scale-110 cursor-pointer"><i className="fa-solid fa-bell"></i></span>
          <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <i className="fa-solid fa-users"></i>
            <span className="font-semibold">Forum</span>
          </div>
        </div>
      </div>

      {/* main layout */}
      <div className="flex flex-row gap-5 px-5 sm:px-12 animate-fadeSlideUp">
        {/* sidebar */}
        <div className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:p-0"} fixed md:static top-0 left-0 z-20 md:z-auto bg-white md:bg-transparent w-[250px] h-full md:h-auto flex-shrink-0 flex flex-col p-5 transition-all duration-500 ease-in-out overflow-hidden`}>
          {isMenuOpen && (
            <>
              {/* personal */}
              <div className="pb-4 flex flex-col border-b-[2px] border-[#5EE6FE]">
                <div>
                  <span className="font-[700] text-[20px]">Your pets</span>
                </div>
                <div className="flex overflow-x-auto px-2 gap-4 mt-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {/* render exist pets */}
                  {pets.map((pet, index) => (
                    <div key={index} className="flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5EE6FE]">
                        <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[12px] mt-1 truncate w-12 text-center">{pet.name}</span>
                    </div>
                  ))}
                  {/* add new pet button */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <button onClick={() => setShowModal(true)} className="text-3xl bg-white rounded-full border-2 border-[#5EE6FE] w-12 h-12 flex items-center justify-center hover:bg-[#5EE6FE] hover:text-white transition-all duration-300 hover:scale-110">+</button>
                    <span className="text-[12px] mt-1">Add new</span>
                  </div>
                </div>

                {/* sidebar links */}
                <div className="flex flex-col gap-2 mt-4">
                  <div className="text-[15px] flex flex-row items-center gap-2 text-[#5EE6FE] font-semibold cursor-pointer">
                    <i className="fa-solid fa-house"></i><span>Home</span>
                  </div>
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-user"></i><span>Profile</span>
                  </div>
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-shield-dog"></i><span>Try Breed Detect</span>
                  </div>
                </div>
              </div>

              {/* resources */}
              <div className="pb-4 flex flex-col border-b-[2px] border-[#5EE6FE] mt-2">
                <span className="font-[700] text-[20px]">Resources</span>
                <div className="px-3 flex flex-col gap-2 mt-2">
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-film"></i><span>Videos</span>
                  </div>
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-lightbulb"></i><span>Pet Tips</span>
                  </div>
                </div>
              </div>

              {/* information */}
              <div className="pb-4 flex flex-col border-b-[2px] border-[#5EE6FE] mt-2">
                <span className="font-[700] text-[20px]">Information</span>
                <div className="px-3 flex flex-col gap-2 mt-2">
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-circle-question"></i><span>FAQs</span>
                  </div>
                  <div className="text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                    <i className="fa-solid fa-headset"></i><span>Support</span>
                  </div>
                </div>
              </div>

              {/* logout */}
              <div className="px-3 mt-3 text-[15px] flex flex-row items-center gap-2 hover:text-[#5EE6FE] cursor-pointer">
                <i className="fa-solid fa-right-from-bracket"></i><span>Logout</span>
              </div>
            </>
          )}
        </div>

        {/* overlay for small screens */}
        {isMenuOpen && <div className="fixed inset-0 bg-black/40 md:hidden z-10" onClick={() => setIsMenuOpen(false)}></div>}

        {/* main content */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col gap-7 rounded-xl p-5 w-full ${!isMenuOpen ? "md:w-full" : "md:w-[calc(100%-250px)]"}`}>
          {/* pet info placeholder */}
          <div className="p-4 rounded-2xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <div className="p-5 bg-[#EEF4F5] rounded-xl flex flex-row justify-around items-center">
              <div className="w-32">
                <img src="/images/sad-dog.png" alt="sad dog" />
              </div>
              <div className="flex flex-col">
                <div className="text-left flex flex-col gap-2">
                  <span className="font-[700]">No pets on your account.</span>
                  <span className="text-[15px]">If you have a pet registered, you should see their information here.</span>
                </div>
                <div className="text-right mt-5">
                  <button onClick={() => setShowModal(true)} className="relative bg-white py-2 px-6 text-[13px] font-semibold text-gray-700 rounded-lg border border-[#5EE6FE] shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(94,230,254,0.4)] hover:bg-[#5EE6FE] hover:text-white active:translate-y-[1px]">Add my pet</button>
                </div>
              </div>
            </div>
          </div>

          {/* appointment section */}
          <div className="px-6 py-4 text-[12px] rounded-2xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col h-[300px]">
            <div className="font-[700] flex flex-row gap-5">
              {["Appointment", "Medical Reports", "Reminders", "Lab Records"].map((tab) => (
                <span key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer transition-all duration-300 ${activeTab === tab ? "text-[#5EE6FE] border-b-2 border-[#5EE6FE]" : "hover:text-[#5EE6FE] text-gray-700"}`}>{tab}</span>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="mt-2 text-[13px] flex flex-row justify-end items-center pr-5">
                <button className="bg-[#d9d9d9] py-1 px-3 rounded-lg flex flex-row items-center gap-2 hover:bg-[#5EE6FE] hover:text-white transition-all duration-300 active:scale-95">
                  <i className="fa-solid fa-calendar-days"></i><span>Book</span>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center h-full">
                <span className="text-gray-500 text-sm font-medium">No incoming appointments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chat button */}
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-8 right-8 sm:bottom-12 sm:right-20 bg-[#5EE6FE] text-white text-2xl w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-[#3ecbe0] transition-all duration-300 z-50">
        <i className="fa-regular fa-comment"></i>
      </button>

      {/* chat popup */}
      {isChatOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 animate-fadeIn" onClick={() => setIsChatOpen(false)}></div>
          <div className="fixed bottom-32 right-8 sm:right-20 bg-white rounded-2xl shadow-xl p-4 z-50 w-52 flex flex-col gap-3 animate-popUp">
            <button className="bg-[#5EE6FE] text-white font-semibold py-2 rounded-lg hover:bg-[#3ecbe0] transition-all">Chat with AI</button>
            <button className="bg-[#EEF4F5] text-gray-700 font-semibold py-2 rounded-lg hover:bg-[#d9d9d9] transition-all">Chat with Professional</button>
          </div>
        </>
      )}

      {/* add pet modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 flex flex-col gap-4 relative shadow-lg">
            <h2 className="text-lg font-semibold text-center">Add New Pet</h2>

            {/* image upload */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-600 font-semibold">Upload Pet Photo</span>

              <div
                className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#5EE6FE] cursor-pointer group"
                onClick={() => setShowPhotoOptions(true)}
              >
                <img
                  src={newPet.photo || "/images/dog-profile.png"}
                  alt="Pet"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <i className="fa-solid fa-pen text-white text-xl"></i>
                </div>
              </div>

              {/* option modal */}
              {showPhotoOptions && (
                <div
                  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                  onClick={() => setShowPhotoOptions(false)}
                >
                  <div
                    className="bg-white rounded-xl p-6 flex flex-col gap-4 w-64"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <h3 className="text-lg font-semibold text-center">Update Pet Photo</h3>

                    {/* take photo */}
                    <label className="cursor-pointer bg-[#EEF4F5] hover:bg-[#5EE6FE] hover:text-white text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all">
                      <i className="fa-solid fa-camera"></i>
                      Take Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>

                    {/* upload */}
                    <label className="cursor-pointer bg-[#EEF4F5] hover:bg-[#5EE6FE] hover:text-white text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all">
                      <i className="fa-solid fa-folder-open"></i>
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* name */}
            <div className="relative">
              <input
                type="text"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:border-[#5EE6FE] focus:ring-1 focus:ring-[#5EE6FE] transition-all"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray">
                Pet Name
              </label>
            </div>

            {/* breed input with detect breed button */}
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                className="peer flex-1 border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:border-[#5EE6FE] focus:ring-1 focus:ring-[#5EE6FE] transition-all"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray">
                Breed
              </label>
              <button
                onClick={() => alert("Breed detection coming soon!")}
                className="bg-[#5EE6FE] text-white px-3 py-1 rounded-lg shadow-md hover:bg-[#3ecbe0] transition-all text-sm"
              >
                Detect Breed
              </button>
            </div>

            {/* age and gender */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newPet.age}
                  onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                  className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:border-[#5EE6FE] focus:ring-1 focus:ring-[#5EE6FE] transition-all"
                  placeholder=" "
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray">
                  Age
                </label>
              </div>
              <div className="relative flex-1">
                <select
                  value={newPet.gender}
                  onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
                  className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:border-[#5EE6FE] focus:ring-1 focus:ring-[#5EE6FE] transition-all bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewPet({ photo: null, name: "", breed: "", age: "", gender: "" });
                  setShowPhotoOptions(false);
                }}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleAddPet}
                className="bg-[#5EE6FE] text-white py-2 px-4 rounded-lg hover:bg-[#3ecbe0] transition-all"
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* success banner */}
      {showSuccess && (
        <div className="fixed top-[80px] right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 w-[300px] overflow-hidden">
          <span className="font-semibold">Pet added successfully!</span>
          {/* progress line */}
          <div className="mt-2 h-1 w-full bg-green-400 relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-white animate-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
