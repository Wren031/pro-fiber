import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const pinIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2563EB;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(37,99,235,0.4);border:3px solid white;">📍</div>',
  iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36],
})

export default function ContactMapSection({ center }: { center: [number, number] }) {
  return (
    <div className="aspect-[16/9] rounded-3xl overflow-hidden">
      <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={pinIcon}>
          <Popup>
            <div className="text-sm font-medium">ProFiber Network</div>
            <div className="text-xs text-gray-500">Balangay 2 Poblacion Quezon Bukidnon 8715</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
