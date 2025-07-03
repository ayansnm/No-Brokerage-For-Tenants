"use client"

import { useState } from "react"

const useAreaManagement = () => {
  const [loading, setLoading] = useState(false)
  const [areas, setAreas] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)

  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token")
  }

  const getAreas = async (page = 1, size = 10, search = "") => {
    setLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/area/getlist?page=${page}&size=${size}&search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Match the actual API response structure
      if (data.message && data.areas) {
        setAreas(data.areas || [])
        setTotalPages(data.pagination?.totalPages || 0)
        setTotalItems(data.pagination?.totalRecords || 0)
        setCurrentPage(data.pagination?.currentPage || 1)
        return data
      } else {
        throw new Error(data.message || "Failed to fetch areas")
      }
    } catch (error) {
      console.error("Error fetching areas:", error)
      setError(error.message)
      setAreas([])
      setTotalPages(0)
      setTotalItems(0)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addArea = async (areaName) => {
    setLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/area/addarea`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaName: areaName.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error adding area:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateArea = async (areaId, areaName) => {
    setLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/area/updatearea/${areaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaName: areaName.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error updating area:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteArea = async (areaId) => {
    setLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/area/deletearea/${areaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error deleting area:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    areas,
    totalPages,
    totalItems,
    currentPage,
    error,
    getAreas,
    addArea,
    updateArea,
    deleteArea,
  }
}

export default useAreaManagement
