"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import StandalonePageForm from "./standalone-page-form"
import type { StandalonePage } from "@/lib/types"

export default function StandalonePageList() {
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<StandalonePage | undefined>()

  const queryClient = useQueryClient()

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["standalonePages"],
    queryFn: async () => {
      const response = await fetch("/api/standalone-pages")
      if (!response.ok) {
        throw new Error("Failed to fetch pages")
      }
      return response.json()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/standalone-pages/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete page")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standalonePages"] })
    },
  })

  const handleEdit = (page: StandalonePage) => {
    setEditingPage(page)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPage(undefined)
  }

  if (isLoading) {
    return <div className="p-4">Loading pages...</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Standalone Pages</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Page
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page: StandalonePage) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{page.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{page.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      page.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(page)} className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this page?")) {
                        deleteMutation.mutate(page.id)
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pages.length === 0 && (
          <div className="text-center py-8 text-gray-500">No pages found. Create your first page!</div>
        )}
      </div>

      {showForm && <StandalonePageForm page={editingPage} onClose={handleCloseForm} />}
    </div>
  )
}
