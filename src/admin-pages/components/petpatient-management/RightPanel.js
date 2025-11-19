const RightPanel = ({ 
  activeTab, 
  selectedOwner, 
  selectedPet, 
  selectedRecord, 
  setIsPdfModalOpen 
}) => {
  return (
    <div className="w-1/3 bg-white dark:bg-[#181818] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex flex-col min-h-0 overflow-y-auto">
      {/* Pet Owners Details */}
      {activeTab === "Pet Owners" && selectedOwner && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{selectedOwner.name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">ID: {selectedOwner.id}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Email</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Phone</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Address</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.address}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Sex</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.gender}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Date of Birth</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.dateOfBirth}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Pets</span>
              <span className="text-gray-800 dark:text-gray-200">
                {selectedOwner?.pets?.length
                  ? selectedOwner.pets.map(p => p.petName).join(", ")
                  : "No pets"}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Account Created</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOwner.createdAt}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pets Details */}
      {activeTab === "Pets" && selectedPet && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedPet.image || "/images/sad-dog.png"}
              alt={selectedPet.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{selectedPet.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">ID: {selectedPet.id}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Owner</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.owner}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Breed</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.breed}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Age</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.age}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Sex</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.gender}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Weight</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.weight}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Color</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.color}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Date of Birth</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.petDateOfBirth}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-medium text-gray-600 dark:text-gray-400">Notes</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedPet.note}</span>
            </div>
          </div>
        </div>
      )}

      {/* Lab/Medical Records Details */}
      {activeTab === "Lab/Medical Records" && (
        <div className="flex-1 flex flex-col min-h-0">
          {selectedRecord ? (
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {selectedRecord.petName} - {selectedRecord.type}
                </h3>
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#222]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
                  </svg>
                </button>
              </div>
              <iframe
                src={`/${selectedRecord.fileName}`}
                title={selectedRecord.fileName}
                className="flex-1 w-full border rounded-xl"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-gray-400 dark:text-gray-500">
              Select a record to see file
            </div>
          )}
        </div>
      )}

      {((activeTab === "Pet Owners" && !selectedOwner) || (activeTab === "Pets" && !selectedPet)) && (
        <div className="flex flex-col justify-center items-center h-full text-gray-400 dark:text-gray-500">
          Select a {activeTab === "Pet Owners" ? "owner" : "pet"} to see details
        </div>
      )}
    </div>
  );
};

export default RightPanel;
