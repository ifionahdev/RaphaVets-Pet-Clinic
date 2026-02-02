import React, { useState } from "react";
import Header from "../template/Header";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  X,
  Shield,
  BriefcaseMedical,
  Search,
  Mail,
  Phone,
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("admins");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initial sample data - NO STATUS OR SPECIALTY
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Fiona Irish Beltran",
      email: "beltran.fionahirish@gmail.com",
      phone: "09171234567",
    },
    {
      id: 2,
      name: "Jordan Frando",
      email: "jordan.frando@email.com",
      phone: "09172234568",
    },
    {
      id: 3,
      name: "Mark Angel Mapili",
      email: "mark.mapili@email.com",
      phone: "09173234569",
    },
  ]);

  const [veterinarians, setVeterinarians] = useState([
    {
      id: 1,
      name: "Dr. Fiona Irish Beltran",
      email: "dr.beltran@raphavets.com",
      phone: "09171234567",
    },
    {
      id: 2,
      name: "Dr. Jordan Frando",
      email: "dr.frando@raphavets.com",
      phone: "09172234568",
    },
    {
      id: 3,
      name: "Dr. Mark Angel Mapili",
      email: "dr.mapili@raphavets.com",
      phone: "09173234569",
    },
  ]);

  const [newUser, setNewUser] = useState({
    type: "admin",
    name: "",
    email: "",
    phone: "",
  });

  // Filter users based on search term
  const filteredAdmins = admins.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVeterinarians = veterinarians.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new user
  const handleAddUser = () => {
    if (newUser.type === "admin") {
      const newAdmin = {
        id: admins.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };
      setAdmins([...admins, newAdmin]);
    } else {
      const newVet = {
        id: veterinarians.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };
      setVeterinarians([...veterinarians, newVet]);
    }

    // Reset form
    setNewUser({
      type: "admin",
      name: "",
      email: "",
      phone: "",
    });
    setShowAddModal(false);
  };

  // Edit user
  const handleEditUser = () => {
    if (activeTab === "admins") {
      setAdmins(admins.map(admin => 
        admin.id === selectedUser.id ? { ...selectedUser } : admin
      ));
    } else {
      setVeterinarians(veterinarians.map(vet => 
        vet.id === selectedUser.id ? { ...selectedUser } : vet
      ));
    }
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Delete user
  const handleDeleteUser = () => {
    if (activeTab === "admins") {
      setAdmins(admins.filter(admin => admin.id !== selectedUser.id));
    } else {
      setVeterinarians(veterinarians.filter(vet => vet.id !== selectedUser.id));
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Render admins table - ONLY 3 COLUMNS
  const renderAdminsTable = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Administrator
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-900">
          {filteredAdmins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#5EE6FE] dark:bg-[#2D88A5] rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={18} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {admin.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      <Mail size={12} />
                      {admin.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Phone size={14} />
                  {admin.phone}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedUser(admin);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-[#5EE6FE] dark:text-gray-400 dark:hover:text-[#5EE6FE] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(admin);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render veterinarians table - ONLY 3 COLUMNS
  const renderVeterinariansTable = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Veterinarian
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-900">
          {filteredVeterinarians.map((vet) => (
            <tr key={vet.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#5EE6FE] dark:bg-[#2D88A5] rounded-full flex items-center justify-center">
                    <BriefcaseMedical className="text-white" size={18} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {vet.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      <Mail size={12} />
                      {vet.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Phone size={14} />
                  {vet.phone}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedUser(vet);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-[#5EE6FE] dark:text-gray-400 dark:hover:text-[#5EE6FE] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(vet);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex bg-[#FBFBFB] dark:bg-[#101010] min-h-screen">
      <main className="flex-1 p-4 flex flex-col">
        <Header title="User Management" />
        
        {/* Search and Add Section */}
        <div className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#5EE6FE] text-white rounded-lg hover:bg-[#4CD5ED]"
            >
              <UserPlus size={16} />
              Add {activeTab === 'admins' ? 'Admin' : 'Veterinarian'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("admins")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === "admins"
                  ? "bg-[#5EE6FE] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Shield size={18} />
              <span className="font-medium">Administrators ({admins.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("veterinarians")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === "veterinarians"
                  ? "bg-[#5EE6FE] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <BriefcaseMedical size={18} />
              <span className="font-medium">Veterinarians ({veterinarians.length})</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex-1">
          {activeTab === "admins" ? renderAdminsTable() : renderVeterinariansTable()}
        </div>

        {/* Add User Modal - SIMPLIFIED */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Add New User
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* User Type Selection */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setNewUser({...newUser, type: 'admin'})}
                      className={`px-4 py-3 rounded-lg border ${
                        newUser.type === 'admin'
                          ? 'border-[#5EE6FE] bg-[#5EE6FE]/10 text-[#5EE6FE]'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <Shield size={18} />
                        <span className="font-medium">Admin</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setNewUser({...newUser, type: 'veterinarian'})}
                      className={`px-4 py-3 rounded-lg border ${
                        newUser.type === 'veterinarian'
                          ? 'border-[#5EE6FE] bg-[#5EE6FE]/10 text-[#5EE6FE]'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <BriefcaseMedical size={18} />
                        <span className="font-medium">Veterinarian</span>
                      </div>
                    </button>
                  </div>

                  {/* Form Fields - ONLY NAME, EMAIL, PHONE */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    disabled={!newUser.name || !newUser.email}
                    className="px-4 py-2 bg-[#5EE6FE] text-white rounded-lg hover:bg-[#4CD5ED] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal - SIMPLIFIED */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Edit User
                  </h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditUser}
                    className="px-4 py-2 bg-[#5EE6FE] text-white rounded-lg hover:bg-[#4CD5ED]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal - SIMPLIFIED */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Trash2 className="text-red-500 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Delete User
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Delete <span className="font-semibold">{selectedUser.name}</span>?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;