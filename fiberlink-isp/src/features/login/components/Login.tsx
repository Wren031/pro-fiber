import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiGlobeAlt, HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiArrowLeft } from 'react-icons/hi2'
import { BsShieldCheck, BsLightningCharge, BsHeadset } from 'react-icons/bs'
import { useAuth } from '../../../context/AuthContext'
import Button from '../../../components/Button/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (login(email, password)) {
      navigate('/dashboard')
    } else {
      setError('Invalid credentials.')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-[1.6] bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-center px-16 max-w-xl"
        >
          <div className="mb-10 flex justify-center">
            <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <circle cx="140" cy="100" r="80" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.25" />
              <circle cx="140" cy="100" r="55" stroke="white" strokeWidth="1" opacity="0.15" />
              <circle cx="140" cy="100" r="30" fill="white" fillOpacity="0.06" stroke="white" strokeWidth="1.5" />
              <circle cx="140" cy="100" r="8" fill="#38BDF8" />
              <circle cx="196" cy="64" r="5" fill="#38BDF8" opacity="0.6" />
              <circle cx="210" cy="130" r="4" fill="#38BDF8" opacity="0.4" />
              <circle cx="80" cy="60" r="4" fill="#38BDF8" opacity="0.5" />
              <circle cx="74" cy="142" r="5" fill="#38BDF8" opacity="0.7" />
              <circle cx="168" cy="168" r="3" fill="#38BDF8" opacity="0.4" />
              <circle cx="104" cy="50" r="3" fill="#38BDF8" opacity="0.5" />
              <circle cx="196" cy="96" r="3" fill="#38BDF8" opacity="0.3" />
              <circle cx="82" cy="100" r="3" fill="#38BDF8" opacity="0.3" />
              <path d="M140 100 L196 64" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L210 130" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L80 60" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L74 142" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L168 168" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L104 50" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M140 100 L196 96" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
              <path d="M140 100 L82 100" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
              <circle cx="140" cy="144" r="12" fill="white" fillOpacity="0.06" stroke="white" strokeWidth="0.5" />
              <text x="134" y="148" fontSize="10" fill="white" fillOpacity="0.4">N</text>
              <path d="M130 70 Q140 55 150 70" stroke="white" strokeWidth="1" opacity="0.12" fill="none" />
              <path d="M130 130 Q140 145 150 130" stroke="white" strokeWidth="1" opacity="0.12" fill="none" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">ProFiber Network</h2>
          <p className="text-gray-400 leading-relaxed mb-10 text-sm max-w-sm mx-auto">
            Enterprise-grade fiber optic internet management platform. Monitor, manage, and grow your network from one central dashboard.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[
              { icon: BsLightningCharge, label: '10 Gbps', sub: 'Max Speed' },
              { icon: BsShieldCheck, label: '99.9%', sub: 'Uptime' },
              { icon: BsHeadset, label: '24/7', sub: 'Support' },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 backdrop-blur-sm rounded-xl py-4 px-3 ring-1 ring-white/[0.06]">
                <item.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-white text-sm font-bold">{item.label}</p>
                <p className="text-gray-500 text-[10px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <Link to="/"
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors">
          <HiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 text-secondary mb-8">
              <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <HiGlobeAlt className="w-5 h-5 text-primary" />
              </span>
              <span className="text-base font-bold">Pro<span className="text-primary">Fiber</span></span>
            </div>
            <h1 className="text-2xl font-bold text-secondary">Welcome back</h1>
            <p className="text-gray-500 mt-1.5 text-sm">Sign in to your admin account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@profibernetwork.com"
                  className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm placeholder:text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9 pr-10 w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30" />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" variant="primary" size="md" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              &copy; 2026 ProFiber Network. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
