'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix para el icono del marker en Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  coordinates: number[]; // [latitude, longitude]
  locationName?: string;
}

export default function Map({ coordinates, locationName }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-48 bg-gray-200 rounded-lg mt-2 flex items-center justify-center">
      <span className="text-sm text-gray-500">Cargando mapa...</span>
    </div>;
  }

  if (!coordinates || coordinates.length !== 2) {
    return <div className="text-sm text-gray-500">Coordenadas no disponibles</div>;
  }

  const [lat, lng] = coordinates;

  return (
    <div className="w-full h-48 rounded-lg overflow-hidden mt-2">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          {locationName && <Popup>{locationName}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
