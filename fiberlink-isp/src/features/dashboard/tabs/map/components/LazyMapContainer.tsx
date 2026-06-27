import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2563EB;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(37,99,235,0.4);border:3px solid white;">📍</div>',
  iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36],
})

function DraggableMarker({ position, onMove }: { position: [number, number]; onMove: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onMove(e.latlng.lat, e.latlng.lng) } })
  return (
    <Marker draggable position={position} icon={defaultIcon}
      eventHandlers={{ dragend(e) { const m = e.target; const p = m.getLatLng(); onMove(p.lat, p.lng) } }}>
      <Popup><div className="text-sm font-medium">Your Pinned Location</div></Popup>
    </Marker>
  )
}

interface Props {
  position: [number, number]
  onMove: (pos: [number, number]) => void
}

export default function LazyMapContainer({ position, onMove }: Props) {
  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={true} className="w-full h-full">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker position={position} onMove={(lat, lng) => onMove([lat, lng])} />
    </MapContainer>
  )
}
