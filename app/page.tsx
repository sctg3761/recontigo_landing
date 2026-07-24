'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const { error } = await supabase.from('waitlist').insert([{ email }])

      if (error) throw error

      setStatus('success')
      setMessage('Thank you for joining the waitlist!')
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Recontigo</h1>
        <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
          A community, working together, to find and share product data, local inventory, price tracking, and store data, reported by actual human customers.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ padding: '12px 16px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '280px', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ padding: '12px 24px', fontSize: '1rem', fontWeight: '600', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {status === 'success' && <p style={{ color: '#16a34a', fontWeight: '500' }}>{message}</p>}
        {status === 'error' && <p style={{ color: '#dc2626', fontWeight: '500' }}>{message}</p>}

        <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '2rem' }}>We respect your privacy. No spam, ever.</p>
      </div>
    </main>
  )
}
