import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiUser, HiEnvelope, HiPhone, HiPhoto, HiGlobeAlt, HiLockClosed,
  HiCheck, HiArrowPath, HiExclamationCircle, HiEye, HiEyeSlash,
} from 'react-icons/hi2'
import Button from '../../../../../components/Button/Button'
import type { UserProfile } from '../../../../../context/AuthContext'

interface Props {
  user: UserProfile
  onSaveProfile: (form: { name: string; email: string; phone: string }) => void
  saved: boolean
}

type SettingsSection = 'profile' | 'logo' | 'social' | 'password'

const navItems: { id: SettingsSection; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { id: 'profile', label: 'Profile', icon: HiUser, desc: 'Your personal details' },
  { id: 'logo', label: 'Branding', icon: HiPhoto, desc: 'Company logo' },
  { id: 'social', label: 'Social', icon: HiGlobeAlt, desc: 'Social media links' },
  { id: 'password', label: 'Security', icon: HiLockClosed, desc: 'Password & auth' },
]

function passwordStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: '', color: '', width: '0%' }
  const score =
    (pw.length >= 8 ? 25 : 0) +
    (/[a-z]/.test(pw) ? 25 : 0) +
    (/[A-Z]/.test(pw) ? 25 : 0) +
    (/\d/.test(pw) ? 12.5 : 0) +
    (/[^a-zA-Z0-9]/.test(pw) ? 12.5 : 0)
  if (score < 25) return { label: 'Weak', color: 'bg-red-500', width: '25%' }
  if (score < 50) return { label: 'Fair', color: 'bg-orange-500', width: '50%' }
  if (score < 75) return { label: 'Good', color: 'bg-yellow-500', width: '75%' }
  return { label: 'Strong', color: 'bg-green-500', width: '100%' }
}

export default function SettingsTab({ user, onSaveProfile, saved }: Props) {
  const [section, setSection] = useState<SettingsSection>('profile')
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone })
  const [networkName, setNetworkName] = useState('ProFiber Network')
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [facebookLink, setFacebookLink] = useState('')
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveProfile(form)
  }

  const strength = passwordStrength(newPw)

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account and brand configuration.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {navItems.map((tab) => (
          <button key={tab.id} onClick={() => setSection(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              section === tab.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:text-secondary border border-gray-200'
            }`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {section === 'profile' && (
                <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-secondary">Profile Information</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Update your personal details below.</p>
                  </div>
                  <div className="px-6 py-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <div className="relative">
                          <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input name="name" value={form.name} onChange={handleChange} className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <div className="relative">
                          <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input name="email" type="email" value={form.email} onChange={handleChange} className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <div className="relative">
                          <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input name="phone" value={form.phone} onChange={handleChange} className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center justify-end gap-3">
                    <Button type="submit" variant="primary" size="sm">
                      {saved ? <><HiCheck className="w-4 h-4 mr-1" /> Saved</> : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              )}

              {section === 'logo' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-secondary">Branding</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Upload your company logo for invoices and emails.</p>
                  </div>
                  <div className="px-6 py-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Network Name</label>
                      <div className="relative">
                        <HiPhoto className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={networkName} onChange={(e) => setNetworkName(e.target.value)}
                          placeholder="Your network name" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">This name appears on invoices, emails, and your public profile.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
                        {logoPreview
                          ? <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                          : <HiPhoto className="w-10 h-10 text-gray-300" />}
                      </div>
                      <div className="flex-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-all">
                          <HiArrowPath className="w-4 h-4" />
                          Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) { const reader = new FileReader(); reader.onload = () => setLogoPreview(reader.result as string); reader.readAsDataURL(file) }
                          }} />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG or SVG. Max 2MB. Recommended 200x50px.</p>
                      </div>
                    </div>
                  </div>
                  {logoPreview && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center justify-end gap-3">
                      <Button variant="primary" size="sm"><HiCheck className="w-4 h-4 mr-1" /> Upload Logo</Button>
                    </div>
                  )}
                </div>
              )}

              {section === 'social' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-secondary">Social Media</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Connect your social media profiles.</p>
                  </div>
                  <div className="px-6 py-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Facebook Page Link</label>
                      <div className="relative">
                        <HiGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="url" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)}
                          placeholder="https://facebook.com/yourpage" className="pl-9 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">This link will appear on your public profile and communications.</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center justify-end gap-3">
                    <Button variant="primary" size="sm"><HiCheck className="w-4 h-4 mr-1" /> Save Link</Button>
                  </div>
                </div>
              )}

              {section === 'password' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-secondary">Security</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Update your password and account security settings.</p>
                  </div>
                  <div className="px-6 py-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPw.current ? 'text' : 'password'} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                          placeholder="Enter current password" className="pl-9 pr-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                        <button type="button" onClick={() => setShowPw({ ...showPw, current: !showPw.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPw.current ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                        <div className="relative">
                          <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type={showPw.new ? 'text' : 'password'} value={newPw} onChange={(e) => setNewPw(e.target.value)}
                            placeholder="Enter new password" className="pl-9 pr-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                          <button type="button" onClick={() => setShowPw({ ...showPw, new: !showPw.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPw.new ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                          </button>
                        </div>
                        {newPw && (
                          <div className="mt-2 space-y-1">
                            <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
                            </div>
                            <p className="text-xs text-gray-500">Password strength: <span className="font-medium">{strength.label}</span></p>
                          </div>
                        )}
                        <ul className="mt-2 space-y-1">
                          {[
                            { label: 'At least 8 characters', ok: newPw.length >= 8 },
                            { label: 'Contains lowercase letter', ok: /[a-z]/.test(newPw) },
                            { label: 'Contains uppercase letter', ok: /[A-Z]/.test(newPw) },
                            { label: 'Contains number or symbol', ok: /\d/.test(newPw) || /[^a-zA-Z0-9]/.test(newPw) },
                          ].map((rule) => (
                            <li key={rule.label} className={`flex items-center gap-1.5 text-xs ${rule.ok ? 'text-green-600' : 'text-gray-400'}`}>
                              <span>{rule.ok ? '✓' : '○'}</span> {rule.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                        <div className="relative">
                          <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type={showPw.confirm ? 'text' : 'password'} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder="Confirm new password" className="pl-9 pr-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                          <button type="button" onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPw.confirm ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                          </button>
                        </div>
                        {confirmPw && newPw !== confirmPw && (
                          <p className="flex items-center gap-1 mt-1.5 text-xs text-rose-600">
                            <HiExclamationCircle className="w-3.5 h-3.5" /> Passwords do not match
                          </p>
                        )}
                        {confirmPw && newPw === confirmPw && (
                          <p className="flex items-center gap-1 mt-1.5 text-xs text-green-600">
                            <HiCheck className="w-3.5 h-3.5" /> Passwords match
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center justify-end gap-3">
                    <Button variant="primary" size="sm">Update Password</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
    </div>
  )
}
