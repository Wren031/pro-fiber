import { useState, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiGlobeAlt, HiArrowRightOnRectangle, HiEnvelope, HiMapPin,
  HiSquares2X2, HiUserGroup, HiCog6Tooth, HiXMark,
} from 'react-icons/hi2'
import { useAuth } from '../../context/AuthContext'

const LazyDashboardTab = lazy(() => import('./tabs/DashboardTab'))
const LazyEmailTab = lazy(() => import('./tabs/EmailTab'))
const LazyMapTab = lazy(() => import('./tabs/MapTab'))
const LazyClientsTab = lazy(() => import('./tabs/ClientsTab'))
const LazySettingsTab = lazy(() => import('./tabs/SettingsTab'))

interface Message {
  name: string
  to: string
  subject: string
  date: string
  status: string
  body: string
}

interface Client {
  name: string
  email: string
  phone: string
  address: string
  plan: string
  status: string
  since: string
  speed: string
}

const defaultMessages: Message[] = [
  { name: 'Maria Santos', to: 'support@profibernetwork.com', subject: 'Billing Inquiry - June 2026', date: 'Jun 25, 2026', status: 'Delivered', body: 'I would like to inquire about my billing statement for the month of June. There seems to be a discrepancy in the charges. Please review and get back to me.' },
  { name: 'Juan Dela Cruz', to: 'support@profibernetwork.com', subject: 'Plan Upgrade Request', date: 'Jun 20, 2026', status: 'Read', body: 'I am interested in upgrading my current plan from Family Fiber to Pro Fiber. Please let me know the process and any applicable fees.' },
  { name: 'Anna Reyes', to: 'help@profibernetwork.com', subject: 'Technical Support - Slow Speed', date: 'Jun 15, 2026', status: 'Replied', body: 'My internet speed has been significantly slower than usual for the past week. I have tried restarting the router but the issue persists.' },
  { name: 'Carlos Mendoza', to: 'billing@profibernetwork.com', subject: 'Payment Confirmation', date: 'Jun 10, 2026', status: 'Delivered', body: 'I have made my payment for this month. Please find attached the confirmation receipt for your records.' },
  { name: 'Lisa Tan', to: 'sales@profibernetwork.com', subject: 'Business Plan Inquiry', date: 'Jun 5, 2026', status: 'Replied', body: 'Our company is looking for a reliable internet provider. We have 50 employees and need dedicated bandwidth. Can you share your business plan options?' },
  { name: 'Pedro Gomez', to: 'support@profibernetwork.com', subject: 'Installation Schedule', date: 'May 28, 2026', status: 'Delivered', body: 'I would like to confirm my installation schedule for this Saturday. Please let me know the time window for the technician visit.' },
  { name: 'Sofia Rodriguez', to: 'help@profibernetwork.com', subject: 'Account Access Issue', date: 'May 20, 2026', status: 'Replied', body: 'I am unable to log into my account portal. It says my credentials are invalid. I have tried resetting my password but have not received the email.' },
  { name: 'Miguel Fernandez', to: 'billing@profibernetwork.com', subject: 'Change Payment Method', date: 'May 15, 2026', status: 'Delivered', body: 'I would like to update my payment method from credit card to auto-debit from my bank account. Please send me the necessary forms.' },
]

const clientData: Client[] = [
  { name: 'Maria Santos', email: 'maria.santos@email.com', phone: '+63 912 111 1111', address: '123 Rizal St., Makati City', plan: 'Family Fiber', status: 'Active', since: 'Mar 2025', speed: '500 Mbps' },
  { name: 'Juan Dela Cruz', email: 'juan.dc@email.com', phone: '+63 912 222 2222', address: '456 Mabini Ave., Quezon City', plan: 'Pro Fiber', status: 'Active', since: 'Jan 2025', speed: '1 Gbps' },
  { name: 'Anna Reyes', email: 'anna.reyes@email.com', phone: '+63 912 333 3333', address: '789 Osmeña Blvd., Cebu City', plan: 'Starter Fiber', status: 'Active', since: 'Feb 2025', speed: '100 Mbps' },
  { name: 'Carlos Mendoza', email: 'carlos.m@email.com', phone: '+63 912 444 4444', address: '321 Legazpi St., Davao City', plan: 'Business Fiber', status: 'Active', since: 'Apr 2025', speed: '10 Gbps' },
  { name: 'Lisa Tan', email: 'lisa.tan@email.com', phone: '+63 912 555 5555', address: '654 Bonifacio High St., Taguig', plan: 'Family Fiber', status: 'Active', since: 'May 2025', speed: '500 Mbps' },
  { name: 'Pedro Gomez', email: 'pedro.g@email.com', phone: '+63 912 666 6666', address: '987 Luna St., Iloilo City', plan: 'Starter Fiber', status: 'Pending', since: 'Jun 2026', speed: '100 Mbps' },
  { name: 'Sofia Rodriguez', email: 'sofia.r@email.com', phone: '+63 912 777 7777', address: '147 Aguinaldo Hwy., Bacolod', plan: 'Pro Fiber', status: 'Active', since: 'Jan 2026', speed: '1 Gbps' },
  { name: 'Miguel Fernandez', email: 'miguel.f@email.com', phone: '+63 912 888 8888', address: '258 Katipunan Ave., Quezon City', plan: 'Family Fiber', status: 'Active', since: 'Oct 2025', speed: '500 Mbps' },
  { name: 'Elena Castillo', email: 'elena.c@email.com', phone: '+63 912 999 9999', address: '369 Taft Ave., Manila', plan: 'Business Fiber', status: 'Active', since: 'Sep 2025', speed: '10 Gbps' },
  { name: 'Jose Villanueva', email: 'jose.v@email.com', phone: '+63 912 000 0000', address: '741 MacArthur Hwy., Angeles City', plan: 'Starter Fiber', status: 'Suspended', since: 'Nov 2025', speed: '100 Mbps' },
]

type Tab = 'dashboard' | 'email' | 'map' | 'clients' | 'settings'

const navItems: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HiSquares2X2 },
  { id: 'email', label: 'Email', icon: HiEnvelope },
  { id: 'map', label: 'Map', icon: HiMapPin },
  { id: 'clients', label: 'Clients', icon: HiUserGroup },
  { id: 'settings', label: 'Settings', icon: HiCog6Tooth },
]

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export default function Dashboard() {
  const { user, isAuthenticated, logout, updateProfile, updatePinnedLocation } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [saved, setSaved] = useState(false)
  const [pinSaved, setPinSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState(defaultMessages)
  const [clients, setClients] = useState(clientData)

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', plan: '' })
  const [pinPos, setPinPos] = useState<[number, number]>([7.7323, 125.1022])
  const [locationSearch, setLocationSearch] = useState('')

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    if (user) {
      setForm({ name: user.name, email: user.email, phone: user.phone, address: user.address, city: user.city, plan: user.plan })
      if (user.pinnedLocation) setPinPos([user.pinnedLocation.lat, user.pinnedLocation.lng])
    }
  }, [isAuthenticated, user, navigate])

  const handleLogout = () => { logout(); navigate('/') }

  const updateStatus = (index: number, status: string) => {
    setMessages((prev) => prev.map((m, i) => i === index ? { ...m, status } : m))
  }

  const addClient = (c: Omit<Client, 'since'>) => {
    setClients((prev) => [{
      ...c,
      address: c.address || 'N/A',
      since: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    }, ...prev])
  }

  const handleProfileSave = (profileForm: { name: string; email: string; phone: string }) => {
    updateProfile(profileForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePinSave = () => {
    updatePinnedLocation({ lat: pinPos[0], lng: pinPos[1], label: `${form.address}, ${form.city}` })
    setPinSaved(true)
    setTimeout(() => setPinSaved(false), 3000)
  }

  if (!user) return null

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <a href="/" className="flex items-center gap-2 text-white">
          <HiGlobeAlt className="w-7 h-7 text-accent" />
          <span className="text-lg font-bold">Pro<span className="text-accent">Fiber</span></span>
        </a>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <item.icon className="w-5 h-5" /> {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all">
          <HiArrowRightOnRectangle className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 flex-col bg-secondary fixed left-0 top-0 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-secondary shadow-xl">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 text-white">
                  <HiGlobeAlt className="w-7 h-7 text-accent" />
                  <span className="text-lg font-bold">Pro<span className="text-accent">Fiber</span></span>
                </a>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white p-1">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === item.id ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <item.icon className="w-5 h-5" /> {item.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                <button onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer">
                  <HiArrowRightOnRectangle className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <button className="lg:hidden text-secondary p-2" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-secondary capitalize">{activeTab === 'settings' ? 'Settings' : activeTab === 'clients' ? 'Clients' : activeTab}</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
              <button onClick={handleLogout} className="lg:hidden text-gray-500 hover:text-red-500 p-1">
                <HiArrowRightOnRectangle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="h-full">

              <Suspense fallback={<Spinner />}>
                {activeTab === 'dashboard' && (
                  <LazyDashboardTab user={user} form={form} onNavigateMap={() => setActiveTab('map')} />
                )}
                {activeTab === 'email' && (
                  <LazyEmailTab messages={messages} onUpdateStatus={updateStatus} />
                )}
                {activeTab === 'map' && (
                  <LazyMapTab
                    pinPos={pinPos}
                    onPinMove={setPinPos}
                    onSave={handlePinSave}
                    pinSaved={pinSaved}
                    locationSearch={locationSearch}
                    onLocationSearchChange={setLocationSearch}
                  />
                )}
                {activeTab === 'clients' && (
                  <LazyClientsTab clients={clients} onAddClient={addClient} />
                )}
                {activeTab === 'settings' && (
                  <LazySettingsTab user={user} onSaveProfile={handleProfileSave} saved={saved} />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
