"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Fields/Navbar"
import Sidebar from "../../components/Fields/Sidebar"
import { FiSearch, FiEdit2, FiTrash2, FiX } from "react-icons/fi"
import { FaFilter } from "react-icons/fa"
import { IoAddOutline } from "react-icons/io5"
import useAreaManagement from "../../hooks/admin-hooks/useAreaManagement"

const AddAreaModal = ({ isOpen, onClose, onAdd, loading }) => {
  const [areaName, setAreaName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!areaName.trim()) {
      setError("Area name is required")
      return
    }

    try {
      await onAdd(areaName)
      setAreaName("")
      onClose()
    } catch (error) {
      setError(error.message || "Failed to add area")
    }
  }

  const handleClose = () => {
    setAreaName("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Area</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Area Name</label>
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Enter area name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || !areaName.trim()}
            >
              {loading ? "Adding..." : "Add Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const EditAreaModal = ({ isOpen, onClose, onUpdate, loading, area }) => {
  const [areaName, setAreaName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (area) {
      setAreaName(area.areaName || "")
    }
  }, [area])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!areaName.trim()) {
      setError("Area name is required")
      return
    }

    try {
      await onUpdate(area._id, areaName)
      onClose()
    } catch (error) {
      setError(error.message || "Failed to update area")
    }
  }

  const handleClose = () => {
    setAreaName("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Area</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Area Name</label>
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Enter area name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || !areaName.trim()}
            >
              {loading ? "Updating..." : "Update Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const AreaManagement = () => {
  const { loading, areas, totalPages, totalItems, error, getAreas, addArea, updateArea, deleteArea } =
    useAreaManagement()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedArea, setSelectedArea] = useState(null)

  useEffect(() => {
    loadAreas()
  }, [currentPage, searchTerm])

  const loadAreas = () => {
    getAreas(currentPage, itemsPerPage, searchTerm)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleAddArea = async (areaName) => {
    try {
      await addArea(areaName)
      loadAreas() // Refresh the list
      alert("Area added successfully!")
    } catch (error) {
      console.error("Failed to add area:", error)
    }
  }

  const handleEditArea = (area) => {
    setSelectedArea(area)
    setShowEditModal(true)
  }

  const handleUpdateArea = async (areaId, areaName) => {
    try {
      await updateArea(areaId, areaName)
      loadAreas() // Refresh the list
      setShowEditModal(false)
      setSelectedArea(null)
      alert("Area updated successfully!")
    } catch (error) {
      console.error("Failed to update area:", error)
    }
  }

  const handleDeleteArea = async (area) => {
    if (window.confirm(`Are you sure you want to delete "${area.areaName}"?`)) {
      try {
        await deleteArea(area._id)
        loadAreas() // Refresh the list
        alert("Area deleted successfully!")
      } catch (error) {
        alert("Failed to delete area: " + error.message)
      }
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular h-screen overflow-hidden">
      <Sidebar className="w-[250px] h-screen sticky top-0 overflow-hidden" />
      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar pageName="Area Management" />

        {/* Header Controls */}
        <div className="w-full px-5 my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
              <FaFilter size={18} className="text-black" />
            </button>

            <div className="flex items-center w-full sm:w-[320px] px-3 py-1 bg-white border border-gray-300 rounded-lg focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-400 transition">
              <FiSearch size={18} className="text-black" />
              <input
                type="text"
                placeholder="Search areas..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-2 py-1 text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-green-800 text-white cursor-pointer text-sm transition self-start sm:self-auto"
          >
            <IoAddOutline size={18} />
            Add Area
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="mx-5 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading areas...</span>
          </div>
        )}

        {/* Areas Table */}
        <div className="overflow-x-auto px-5 mt-4 animate-fadeIn">
          <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-primary text-secondary text-sm">
              <tr>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">AREA NAME</th>
                <th className="text-left px-4 py-3">PINCODE</th>
                <th className="text-left px-4 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {areas.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    {searchTerm ? "No areas found matching your search." : "No areas found. Add your first area!"}
                  </td>
                </tr>
              ) : (
                areas.map((area, index) => (
                  <tr key={area._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-3 font-medium">{area.areaName}</td>
                    <td className="px-4 py-3">{area.pincode || "N/A"}</td>
                    <td className="px-4 py-3">{getStatusBadge(area.isActive)}</td>
                    {/* <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEditArea(area)}
                        className="text-white bg-blue-600 p-1 rounded-full hover:bg-blue-700 transition"
                        title="Edit Area"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area)}
                        className="text-white bg-red-600 p-1 rounded-full hover:bg-red-700 transition"
                        title="Delete Area"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="flex pb-4 flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
              <div>
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} –{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </div>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span>Rows per page: {itemsPerPage}</span>
                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {"<"}
                </button>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddAreaModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddArea}
        loading={loading}
      />

      <EditAreaModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedArea(null)
        }}
        onUpdate={handleUpdateArea}
        loading={loading}
        area={selectedArea}
      />
    </div>
  )
}

export default AreaManagement
