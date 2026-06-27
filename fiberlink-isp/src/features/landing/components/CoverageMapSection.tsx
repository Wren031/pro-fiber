import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from '../../../context/AuthContext'

L.Marker.prototype.options.icon = L.divIcon({
  className: '',
  html: '<div style="background:#2563EB;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(37,99,235,0.3);border:2px solid white;">📍</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

const userPinIcon = L.divIcon({
  className: '',
  html: '<div style="background:#F59E0B;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 16px rgba(245,158,11,0.5);border:3px solid white;">📍</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
})

// ✅ Bukidnon-based coverage
const cities = [
  { name: 'Malaybalay City', lat: 8.1575, lng: 125.1273, status: 'Available' },
  { name: 'Valencia City', lat: 7.9069, lng: 125.0944, status: 'Available' },
  { name: 'Maramag', lat: 7.7625, lng: 125.0056, status: 'Expanding Area' },
  { name: 'Manolo Fortich', lat: 8.3683, lng: 124.8647, status: 'Available' },
  { name: 'Quezon, Bukidnon', lat: 7.7300, lng: 125.0980, status: 'Coming Soon' },
]

export default function CoverageMapSection() {
  const { user } = useAuth()
  const pinned = user?.pinnedLocation

  // ✅ Bukidnon center
  const bukidnonCenter: [number, number] = [7.9833, 125.0833]

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-100">
      <div className="aspect-[21/9] relative z-0">
        <MapContainer
          center={pinned ? [pinned.lat, pinned.lng] : bukidnonCenter}
          zoom={pinned ? 11 : 9}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ Coverage circle around Bukidnon */}
          <Circle
            center={bukidnonCenter}
            radius={60000} // 60km coverage radius (adjust if needed)
            pathOptions={{
              color: '#2563EB',
              fillColor: '#60A5FA',
              fillOpacity: 0.2,
            }}
          />

          {cities.map((city) => (
            <Marker key={city.name} position={[city.lat, city.lng]}>
              <Popup>
                <div className="text-sm font-medium">{city.name}</div>
                <div className="text-xs text-gray-500">{city.status}</div>
              </Popup>
            </Marker>
          ))}

          {pinned && (
            <Marker position={[pinned.lat, pinned.lng]} icon={userPinIcon}>
              <Popup>
                <div className="text-sm font-medium">Your Location</div>
                <div className="text-xs text-gray-500">{pinned.label}</div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[1]">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="font-semibold">Bukidnon Coverage Area</p>
              <p className="text-sm text-gray-300">Valencia • Malaybalay • Maramag & nearby areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}