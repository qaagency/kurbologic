import React, { useState } from 'react'
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'
import { FAQEditor } from '@/components/admin/FAQEditor'

const Admin: React.FC = () => {
  const { session, user, role, loading, signInWithEmailOtp, signOut } = useSupabaseAuth()
  const [email, setEmail] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [message, setMessage] = useState('')

  // Check if Supabase keys are configured
  const supabaseConfigured = !import.meta.env.VITE_SUPABASE_URL?.includes('YOUR_SUPABASE') && 
                            !window.location.origin.includes('localhost') // Simple check for demo

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Supabase Configuration Required</h1>
          <p className="text-gray-300 mb-4">
            Please update <code className="bg-gray-700 px-2 py-1 rounded">src/lib/supabaseClient.ts</code> with your actual Supabase URL and anon key.
          </p>
          <div className="bg-gray-700 p-4 rounded text-sm">
            <p>1. Go to your Supabase project dashboard</p>
            <p>2. Copy your project URL and anon key</p>
            <p>3. Replace the placeholder values in supabaseClient.ts</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSigningIn(true)
      setMessage('')
      
      try {
        await signInWithEmailOtp(email)
        setMessage('Check your email for the magic link!')
      } catch (error) {
        setMessage('Error: ' + (error as Error).message)
      } finally {
        setIsSigningIn(false)
      }
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Sign In</h1>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isSigningIn ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (role !== 'admin' && role !== 'editor') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            You need admin or editor permissions to access this page.
          </p>
          <button
            onClick={signOut}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              {user?.email} ({role})
            </span>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <FAQEditor />
      </div>
    </div>
  )
}

export default Admin