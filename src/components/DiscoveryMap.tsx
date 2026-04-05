"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { animate: true });
  }, [center, map]);
  return null;
}

interface Product {
  id: string;
  name: string;
  category: string;
  seller: string;
  price: number;
  lat: number;
  lng: number;
}

export default function DiscoveryMap({ products, mapCenter }: { products: Product[], mapCenter: [number, number] }) {
  useEffect(() => {
    (async () => {
      // Fix marker issues in Next.js by importing Leaflet dynamically on the client
      const L = (await import("leaflet")).default;
      
      const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
      const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
      const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

      const DefaultIcon = L.icon({
        iconUrl,
        iconRetinaUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;
    })();
  }, []);

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-sm border border-neutral-200 z-0 relative">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={mapCenter} />
        {products.map((product) => (
          <Marker key={product.id} position={[product.lat, product.lng]}>
            <Popup className="rounded-xl">
              <div className="p-1 min-w-[150px]">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mb-2 inline-block">
                  {product.category}
                </span>
                <h3 className="font-bold text-neutral-900 leading-tight mb-1">{product.name}</h3>
                <p className="text-sm text-neutral-500 mb-2">Sold by: {product.seller}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-lg text-emerald-700">₹{product.price}</span>
                  <button className="bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition">
                    View
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}