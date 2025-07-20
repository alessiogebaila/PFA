import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Phone, Mail, MapPin } from 'lucide-react';

// Define Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

export const ContactPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Add CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);

      // Add JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      
      script.onload = () => {
        if (mapRef.current && window.L && !mapInstance.current) {
          // Initialize map
          mapInstance.current = window.L.map(mapRef.current).setView([44.403532, 26.059423], 16.5);
          
          // Add tile layer
          window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
          }).addTo(mapInstance.current);

          // Add marker
          window.L.marker([44.403532, 26.059423])
            .addTo(mapInstance.current)
            .bindPopup('<p>Nr.9, Bloc 4, Scara H, Parter, Apt.71</p>');
        }
      };

      document.head.appendChild(script);
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="content max-w-4xl mx-auto">
      {/* Contact Information */}
      <div className="mb-8">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
              <Phone className="w-6 h-6" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4a0e4e]" />
                <div>
                  <span className="font-semibold text-gray-700">Telefon: </span>
                  <a 
                    href="tel:0722614766" 
                    className="text-[#4a0e4e] hover:text-[#4a0e4e]/80 transition-colors"
                  >
                    0722614766
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4a0e4e]" />
                <div>
                  <span className="font-semibold text-gray-700">Email: </span>
                  <a 
                    href="mailto:livia.alessio@yahoo.com" 
                    className="text-[#4a0e4e] hover:text-[#4a0e4e]/80 transition-colors underline"
                  >
                    livia.alessio@yahoo.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#4a0e4e] mt-1" />
                <div>
                  <span className="font-semibold text-gray-700">Adresa: </span>
                  <a 
                    href="https://maps.app.goo.gl/wgLL3gaSANhtG2CJ9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4a0e4e] hover:text-[#4a0e4e]/80 transition-colors underline"
                  >
                    Soseaua Alexandria nr.9, bloc 4, scara H, parter, apt.71
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <div className="w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              Localizare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef}
              className="w-full h-96 rounded-lg border border-gray-200"
              style={{ height: '400px' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
