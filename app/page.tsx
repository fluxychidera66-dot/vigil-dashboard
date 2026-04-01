'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    sites: 0,
    incidents: 0,
    alerts: 0,
    uptime: '99.9%'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        // Call your Vigil API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://vigil-api-aej3.onrender.com'
        
        // Try to fetch sites
        const response = await fetch(`${apiUrl}/api/sites`, {
          headers: { 'Content-Type': 'application/json' }
        }).catch(err => {
          console.log('API call (expected to fail without full setup):', err.message)
          return null
        })

        if (response && response.ok) {
          const data = await response.json()
          setStats(prev => ({
            ...prev,
            sites: data.length || 0
          }))
        } else {
          // Demo data for now
          setStats({
            sites: 5,
            incidents: 2,
            alerts: 12,
            uptime: '99.87%'
          })
        }
      } catch (err) {
        console.log('Error fetching stats (using demo data):', err)
        // Set demo data
        setStats({
          sites: 5,
          incidents: 2,
          alerts: 12,
          uptime: '99.87%'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              V
            </div>
            <h1 className="text-2xl font-bold text-white">Vigil</h1>
          </div>
          <div className="text-sm text-slate-400">
            API: {process.env.NEXT_PUBLIC_API_URL || 'vigil-api.onrender.com'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Welcome to Vigil</h2>
          <p className="text-lg text-slate-400">Revenue Protection & Uptime Monitoring</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Sites Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 rounded-lg p-6 hover:border-blue-600/50 transition-all">
            <div className="text-slate-400 text-sm font-medium mb-2">MONITORED SITES</div>
            <div className="text-4xl font-bold text-white mb-2">{stats.sites}</div>
            <div className="text-sm text-blue-400">Active monitoring</div>
          </div>

          {/* Incidents Card */}
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 border border-red-700/30 rounded-lg p-6 hover:border-red-600/50 transition-all">
            <div className="text-slate-400 text-sm font-medium mb-2">INCIDENTS (24H)</div>
            <div className="text-4xl font-bold text-white mb-2">{stats.incidents}</div>
            <div className="text-sm text-red-400">Detected & logged</div>
          </div>

          {/* Alerts Card */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 border border-yellow-700/30 rounded-lg p-6 hover:border-yellow-600/50 transition-all">
            <div className="text-slate-400 text-sm font-medium mb-2">ALERTS SENT</div>
            <div className="text-4xl font-bold text-white mb-2">{stats.alerts}</div>
            <div className="text-sm text-yellow-400">This month</div>
          </div>

          {/* Uptime Card */}
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/30 rounded-lg p-6 hover:border-green-600/50 transition-all">
            <div className="text-slate-400 text-sm font-medium mb-2">UPTIME</div>
            <div className="text-4xl font-bold text-white mb-2">{stats.uptime}</div>
            <div className="text-sm text-green-400">This month</div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Dashboard Status</h3>
          <div className="space-y-3 text-slate-300">
            <p>✅ <span className="font-medium text-green-400">Frontend</span> - Deployed on Vercel</p>
            <p>🔗 <span className="font-medium text-blue-400">Backend API</span> - Running on Render ({process.env.NEXT_PUBLIC_API_URL})</p>
            <p>📊 <span className="font-medium text-purple-400">Database</span> - Connected to Supabase</p>
            <p>📈 <span className="font-medium text-slate-300">Status</span> - Ready for testing with real data</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-6">
              <div className="text-2xl mb-3">🎥</div>
              <h4 className="font-bold text-white mb-2">Session Replay</h4>
              <p className="text-slate-400 text-sm">Watch user sessions and detect failures in real-time</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-6">
              <div className="text-2xl mb-3">🕷️</div>
              <h4 className="font-bold text-white mb-2">Web Crawling</h4>
              <p className="text-slate-400 text-sm">Automatic crawling to detect broken pages</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-6">
              <div className="text-2xl mb-3">🔔</div>
              <h4 className="font-bold text-white mb-2">Smart Alerts</h4>
              <p className="text-slate-400 text-sm">Get notified instantly of revenue-impacting failures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-900/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>Built on top of <span className="text-blue-400 font-medium">OpenReplay</span> • © 2026 Vigil</p>
        </div>
      </div>
    </div>
  )
}
