import { motion } from 'framer-motion'
import {
  HiUserGroup, HiBuildingOffice2, HiCheckBadge, HiRocketLaunch, HiSignal, HiClock,
  HiMapPin,
} from 'react-icons/hi2'
import type { UserProfile } from '../../../context/AuthContext'

interface Props {
  user: UserProfile
  form: { name: string; email: string; phone: string; address: string; city: string; plan: string }
  onNavigateMap: () => void
}

export default function DashboardTab({ user, form, onNavigateMap }: Props) {
  const stats = [
    { icon: HiUserGroup, label: 'Happy Customers', value: '25,847', change: '+12%', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: HiBuildingOffice2, label: 'Cities Covered', value: '120+', change: '+5', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: HiCheckBadge, label: 'Uptime', value: '99.9%', change: '', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: HiRocketLaunch, label: 'Max Speed', value: '10 Gbps', change: '', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: HiSignal, label: 'Active Connections', value: '18,423', change: '+8%', color: 'text-teal-500', bg: 'bg-teal-50' },
    { icon: HiClock, label: 'Avg. Subscription', value: '18 mo', change: '', color: 'text-rose-500', bg: 'bg-rose-50' },
  ]

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-secondary">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-500">Here's your network overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-secondary">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            {stat.change && <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-secondary border-b border-gray-100 pb-4 mb-6">Monthly Growth</h3>
          <div className="flex items-end gap-2 sm:gap-3 h-48">
            {[65, 72, 68, 85, 92, 88, 95, 102, 110, 118, 125, 132].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-gray-400 font-medium">{val}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(val / 132) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }} className="w-full gradient-bg rounded-t-lg"
                  style={{ height: `${(val / 132) * 100}%` }} />
                <span className="text-[10px] text-gray-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-secondary border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
            <HiMapPin className="w-5 h-5 text-primary" /> Map Pin Location
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Address</p>
              <p className="text-secondary font-medium">{form.address || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">City</p>
              <p className="text-secondary font-medium">{form.city || 'Not set'}</p>
            </div>
            {user.pinnedLocation && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Coordinates</p>
                <p className="text-secondary font-medium text-sm">
                  {user.pinnedLocation.lat.toFixed(4)}, {user.pinnedLocation.lng.toFixed(4)}
                </p>
              </div>
            )}
            <div className="pt-2">
              <button onClick={onNavigateMap}
                className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                <HiMapPin className="w-4 h-4" /> Update on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
