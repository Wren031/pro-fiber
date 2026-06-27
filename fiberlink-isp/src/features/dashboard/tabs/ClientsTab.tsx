import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMagnifyingGlass, HiEye, HiEnvelope, HiXMark, HiCheck, HiPhone, HiClock, HiMapPin, HiUser, HiGlobeAlt } from 'react-icons/hi2'
import Button from '../../../components/Button/Button'

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

interface Props {
  clients: Client[]
  onAddClient: (client: Omit<Client, 'since'>) => void
}

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
  Suspended: 'bg-rose-50 text-rose-600 ring-1 ring-rose-200',
}

function ClientAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-xl' }
  return (
    <div className={`${dims[size]} rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center`}>
      {name.charAt(0)}
    </div>
  )
}

export default function ClientsTab({ clients, onAddClient }: Props) {
  const [clientSearch, setClientSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showAddClient, setShowAddClient] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '', plan: 'Starter Fiber', status: 'Active', speed: '100 Mbps' })

  const addClient = () => {
    if (!newClient.name || !newClient.email) return
    onAddClient(newClient)
    setShowAddClient(false)
    setNewClient({ name: '', email: '', phone: '', address: '', plan: 'Starter Fiber', status: 'Active', speed: '100 Mbps' })
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.address.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.plan.toLowerCase().includes(clientSearch.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary">Clients</h2>
          <p className="text-gray-500">Manage all registered clients and their subscriptions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-56">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={clientSearch} onChange={(e) => setClientSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
          </div>
          <button onClick={() => setShowAddClient(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all">
            + Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((client, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden"
          >
            <div className="px-5 pt-5 pb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ClientAvatar name={client.name} />
                <div>
                  <h4 className="font-semibold text-secondary text-sm">{client.name}</h4>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[client.status] || 'bg-gray-50 text-gray-600 ring-1 ring-gray-200'}`}>
                    {client.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HiEnvelope className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HiPhone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HiMapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">{client.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HiClock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>Since {client.since}</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary">
                  {client.plan}
                </span>
                <span className="text-[11px] text-gray-400">{client.speed}</span>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
              <button onClick={() => setSelectedClient(client)}
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                View Details <HiEye className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedClient && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedClient(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-secondary">Client Details</h3>
                <button onClick={() => setSelectedClient(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <ClientAvatar name={selectedClient.name} size="lg" />
                  <div>
                    <p className="text-lg font-semibold text-secondary">{selectedClient.name}</p>
                    <span className={`inline-flex px-3 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedClient.status] || 'bg-gray-50 text-gray-600'}`}>
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p><p className="text-secondary font-medium text-sm">{selectedClient.email}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</p><p className="text-secondary font-medium text-sm">{selectedClient.phone}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Plan</p><p className="text-secondary font-medium text-sm">{selectedClient.plan}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Speed</p><p className="text-secondary font-medium text-sm">{selectedClient.speed}</p></div>
                  <div className="col-span-2"><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Address</p><p className="text-secondary font-medium text-sm">{selectedClient.address}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Member Since</p><p className="text-secondary font-medium text-sm">{selectedClient.since}</p></div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {showAddClient && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddClient(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-base font-semibold text-secondary">Add New Client</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Fill in the client details below.</p>
                </div>
                <button onClick={() => setShowAddClient(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="e.g. Juan Dela Cruz" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      placeholder="e.g. juan@example.com" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      placeholder="e.g. +63 912 345 6789" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                  <div className="relative">
                    <HiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={newClient.address} onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      placeholder="e.g. 123 Rizal St., Makati City" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Plan</label>
                    <div className="relative">
                      <HiGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select value={newClient.plan} onChange={(e) => setNewClient({ ...newClient, plan: e.target.value })}
                        className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm appearance-none">
                        <option>Starter Fiber</option><option>Family Fiber</option><option>Pro Fiber</option><option>Business Fiber</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Speed</label>
                    <div className="relative">
                      <HiClock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select value={newClient.speed} onChange={(e) => setNewClient({ ...newClient, speed: e.target.value })}
                        className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm appearance-none">
                        <option>100 Mbps</option><option>500 Mbps</option><option>1 Gbps</option><option>10 Gbps</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select value={newClient.status} onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm">
                    <option>Active</option><option>Pending</option><option>Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button onClick={() => setShowAddClient(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all">
                  Discard
                </button>
                <Button variant="primary" size="sm" onClick={addClient}>
                  <HiCheck className="w-4 h-4 mr-1" /> Add Client
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
