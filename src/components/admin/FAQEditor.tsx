import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'

interface FAQ {
  id: number
  question: string
  answer: string
  updated_at: string
}

export const FAQEditor: React.FC = () => {
  const { role } = useSupabaseAuth()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setFaqs(data || [])
    } catch (error) {
      showToast('Error fetching FAQs: ' + (error as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFAQs()
  }, [])

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return

    try {
      const { error } = await supabase
        .from('faqs')
        .insert([newFaq])

      if (error) throw error

      setNewFaq({ question: '', answer: '' })
      setShowAddForm(false)
      fetchFAQs()
      showToast('FAQ added successfully!', 'success')
    } catch (error) {
      showToast('Error adding FAQ: ' + (error as Error).message, 'error')
    }
  }

  const handleUpdateFAQ = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingFaq) return

    try {
      const { error } = await supabase
        .from('faqs')
        .update({
          question: editingFaq.question,
          answer: editingFaq.answer,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingFaq.id)

      if (error) throw error

      setEditingFaq(null)
      fetchFAQs()
      showToast('FAQ updated successfully!', 'success')
    } catch (error) {
      showToast('Error updating FAQ: ' + (error as Error).message, 'error')
    }
  }

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchFAQs()
      showToast('FAQ deleted successfully!', 'success')
    } catch (error) {
      showToast('Error deleting FAQ: ' + (error as Error).message, 'error')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading FAQs...</div>
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg z-50 ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">FAQ Management</h2>
        {(role === 'admin' || role === 'editor') && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add FAQ'}
          </button>
        )}
      </div>

      {/* Add FAQ Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Add New FAQ</h3>
          <form onSubmit={handleAddFAQ} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <input
                type="text"
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Answer</label>
              <textarea
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add FAQ
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-gray-800 rounded-lg p-6">
            {editingFaq?.id === faq.id ? (
              <form onSubmit={handleUpdateFAQ} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question</label>
                  <input
                    type="text"
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Answer</label>
                  <textarea
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingFaq(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Updated: {new Date(faq.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {(role === 'admin' || role === 'editor') && (
                    <button
                      onClick={() => setEditingFaq(faq)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {role === 'admin' && (
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        
        {faqs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No FAQs found. Add your first FAQ to get started.
          </div>
        )}
      </div>
    </div>
  )
}