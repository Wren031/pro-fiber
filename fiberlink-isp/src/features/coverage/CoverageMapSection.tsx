import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from '../../context/AuthContext'

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

const cities = [
  { name: 'Metro Manila', lat: 14.5995, lng: 120.9842, status: 'Available' },
  { name: 'Cebu City', lat: 10.3157, lng: 123.8854, status: 'Available' },
  { name: 'Davao City', lat: 7.1907, lng: 125.4553, status: 'Available' },
  { name: 'Baguio', lat: 16.4023, lng: 120.5960, status: 'Coming Soon' },
  { name: 'Iloilo City', lat: 10.7202, lng: 122.5621, status: 'Available' },
  { name: 'Bacolod', lat: 10.6676, lng: 122.9507, status: 'Expanding Area' },
]

export default function CoverageMapSection() {
  const { user } = useAuth()
  const pinned = user?.pinnedLocation

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-100">
      <div className="aspect-[21/9] relative z-0">
        <MapContainer
          center={pinned ? [pinned.lat, pinned.lng] : [12.8797, 121.7740]}
          zoom={pinned ? 10 : 6}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              <p className="font-semibold">Metro Manila, Cebu, Davao</p>
              <p className="text-sm text-gray-300">and 120+ cities nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
