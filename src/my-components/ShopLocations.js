import React, { useState, useEffect } from 'react';

export const ShopLocations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestShop, setNearestShop] = useState(null);
  const [showTooltip, setShowTooltip] = useState({ show: false, x: 0, y: 0, content: '' });
  const [activeRegion, setActiveRegion] = useState(null);

  const shops = [
    { id: 1, name: "Auckland Shop", region: "Auckland", lat: -36.8509, lng: 174.7645 },
    { id: 2, name: "Wellington Shop", region: "Wellington", lat: -41.2865, lng: 174.7762 },
    { id: 3, name: "Christchurch Shop", region: "Canterbury", lat: -43.5320, lng: 172.6306 },
    { id: 4, name: "Hamilton Shop", region: "Waikato", lat: -37.7870, lng: 175.2793 },
    { id: 5, name: "Napier Shop", region: "Hawke's Bay", lat: -39.4928, lng: 176.9120 }
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          findNearestShop(userPos);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestShop = (userPos) => {
    if (!userPos) return;
    let nearest = null;
    let minDistance = Infinity;
    shops.forEach(shop => {
      const distance = calculateDistance(
        userPos.lat, userPos.lng,
        shop.lat, shop.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...shop, distance };
      }
    });
    setNearestShop(nearest);
  };

  const LocationInfo = () => (
    <div className="p-3 bg-white rounded shadow mb-4">
      {userLocation ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Location</h3>
          <p className="mb-1 text-sm">Latitude: {userLocation.lat.toFixed(4)}</p>
          <p className="mb-2 text-sm">Longitude: {userLocation.lng.toFixed(4)}</p>
          {nearestShop && (
            <div className="mt-2 p-2 bg-blue-50 rounded">
              <h4 className="text-base font-semibold text-blue-800">Nearest Shop</h4>
              <p className="text-sm text-blue-700">{nearestShop.name}</p>
              <p className="text-sm text-blue-600">Distance: {nearestShop.distance.toFixed(2)} km</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center p-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
          <p className="text-sm">Getting your location...</p>
        </div>
      )}
    </div>
  );

  // Map Component with adjusted dimensions and marker positions
  const Map = () => {
    const handleRegionHover = (region, event) => {
      const shopsInRegion = shops.filter(shop => shop.region === region);
      if (shopsInRegion.length > 0) {
        setShowTooltip({
          show: true,
          x: event.clientX,
          y: event.clientY,
          content: `${region}: ${shopsInRegion.map(s => s.name).join(', ')}`
        });
      }
    };

    return (
      <div className="relative max-w-lg mx-auto mb-4 bg-white rounded shadow p-3">
        <h3 className="text-lg font-semibold mb-2">Store Locations</h3>
        <div className="relative w-full" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <img
            src="/new-zealand.png"
            alt="New Zealand Map"
            className="w-full h-auto rounded"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />

          {shops.map(shop => {
            // Adjusted calculation for more accurate positioning
            const longitudeRange = 174.7762 - 172.6306; // Approx NZ longitude range
            const latitudeRange = -36.8509 - (-43.5320); // Approx NZ latitude range
            
            // Normalize coordinates to percentage
            const leftPos = ((shop.lng - 172.6306) / longitudeRange) * 100;
            const topPos = ((shop.lat - (-43.5320)) / latitudeRange) * 100;

            return (
              <div
                key={shop.id}
                className={`absolute w-2.5 h-2.5 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2
                  ${nearestShop?.id === shop.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                style={{ 
                  left: `${leftPos}%`, 
                  top: `${topPos}%`,
                  zIndex: 10
                }}
                onMouseEnter={(e) => handleRegionHover(shop.region, e)}
                onMouseLeave={() => setShowTooltip({ ...showTooltip, show: false })}
                title={shop.name}
              />
            );
          })}

          {showTooltip.show && (
            <div
              className="absolute bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs pointer-events-none z-20"
              style={{
                left: showTooltip.x,
                top: showTooltip.y,
                transform: 'translate(8px, -50%)'
              }}
            >
              {showTooltip.content}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Shop List Component
  const ShopList = () => (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">All Shops</h3>
      <div className="space-y-2">
        {shops.map(shop => (
          <div
            key={shop.id}
            className={`p-2 rounded transition-colors text-sm
              ${nearestShop?.id === shop.id ? 'bg-blue-50' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{shop.name}</h4>
                <p className="text-gray-600 text-xs">{shop.region}</p>
              </div>
              {userLocation && (
                <span className="text-xs text-gray-500">
                  {calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    shop.lat,
                    shop.lng
                  ).toFixed(2)} km away
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Shop Locations</h1>
      <LocationInfo />
      <Map />
      <ShopList />
    </div>
  );
};

export default ShopLocations;