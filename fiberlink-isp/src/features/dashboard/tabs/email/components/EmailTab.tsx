import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMagnifyingGlass, HiEye, HiXMark } from 'react-icons/hi2'

interface Message {
  name: string
  to: string
  subject: string
  date: string
  status: string
  body: string
}

interface Props {
  messages: Message[]
  onUpdateStatus: (index: number, status: string) => void
}

export default function EmailTab({ messages, onUpdateStatus }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)

  const filtered = messages.filter(m =>
    m.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary">Sent Messages</h2>
          <p className="text-gray-500">Track all messages sent from your account.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 font-semibold text-secondary">Full Name</th>
                <th className="text-left px-6 py-4 font-semibold text-secondary">To</th>
                <th className="text-left px-6 py-4 font-semibold text-secondary">Subject</th>
                <th className="text-left px-6 py-4 font-semibold text-secondary hidden md:table-cell">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-secondary hidden sm:table-cell">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-secondary">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No messages found.</td></tr>
              ) : filtered.map((msg, i) => {
                const realIndex = messages.indexOf(msg)
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-secondary font-medium">{msg.name}</td>
                    <td className="px-6 py-4 text-gray-500">{msg.to}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">{msg.subject}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{msg.date}</td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <select
                        value={msg.status}
                        onChange={(e) => onUpdateStatus(realIndex, e.target.value)}
                        className={`text-xs font-medium rounded-full px-3 py-1 border-0 outline-none cursor-pointer appearance-none ${
                          msg.status === 'Delivered' ? 'bg-blue-50 text-blue-600' :
                          msg.status === 'Read' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                        <option value="Delivered">Delivered</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedMsg(msg)}
                        className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                        <HiEye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedMsg && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedMsg(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-secondary">Message Details</h3>
                <button onClick={() => setSelectedMsg(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">To</p>
                  <p className="text-secondary font-medium">{selectedMsg.to}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Subject</p>
                  <p className="text-secondary font-medium">{selectedMsg.subject}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Date</p>
                    <p className="text-secondary">{selectedMsg.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      selectedMsg.status === 'Delivered' ? 'bg-blue-50 text-blue-600' :
                      selectedMsg.status === 'Read' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'
                    }`}>{selectedMsg.status}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Message Body</p>
                  <p className="text-gray-600 leading-relaxed">{selectedMsg.body}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
