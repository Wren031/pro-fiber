import { lazy, Suspense } from 'react'
import { HiMagnifyingGlass, HiCheck } from 'react-icons/hi2'
import Button from '../../../components/Button/Button'

const cityCoords: Record<string, [number, number]> = {
  'quezon bukidnon': [7.7323, 125.1022],
  'metro manila': [14.5995, 120.9842],
  'cebu': [10.3157, 123.8854],
  'davao': [7.1907, 125.4553],
  'baguio': [16.4023, 120.5960],
  'iloilo': [10.7202, 122.5621],
  'bacolod': [10.6676, 122.9507],
  'tagaytay': [14.1000, 120.9333],
  'laguna': [14.2833, 121.4333],
  'cavite': [14.2833, 120.8833],
  'rizal': [14.5833, 121.1667],
}

const LazyMap = lazy(() => import('./LazyMapContainer'))

interface Props {
  pinPos: [number, number]
  onPinMove: (pos: [number, number]) => void
  onSave: () => void
  pinSaved: boolean
  locationSearch: string
  onLocationSearchChange: (val: string) => void
}

export default function MapTab({ pinPos, onPinMove, onSave, pinSaved, locationSearch, onLocationSearchChange }: Props) {
  const handleSearch = () => {
    const query = locationSearch.toLowerCase().trim()
    for (const [key, coords] of Object.entries(cityCoords)) {
      if (query.includes(key) || key.includes(query)) {
        onPinMove(coords)
        return
      }
    }
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-secondary mb-2">Service Location</h2>
      <p className="text-gray-500 mb-8">Search for a location or drag the marker to set your exact service address.</p>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={locationSearch} onChange={(e) => onLocationSearchChange(e.target.value)}
            placeholder="Search location (e.g. Manila, Cebu, Davao)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
          <button type="button" onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-medium text-white gradient-bg hover:opacity-90 transition-all cursor-pointer">
            <HiMagnifyingGlass className="w-4 h-4" />
          </button>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200 h-[450px]">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-sm">Loading map...</div>}>
            <LazyMap position={pinPos} onMove={onPinMove} />
          </Suspense>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-secondary">Coordinates:</span>{' '}
            {pinPos[0].toFixed(4)}, {pinPos[1].toFixed(4)}
          </p>
          <Button variant="primary" size="sm" onClick={onSave}>
            {pinSaved ? <><HiCheck className="w-4 h-4 mr-1" /> Location Saved!</> : 'Save Location'}
          </Button>
        </div>
      </div>
    </div>
  )
}
