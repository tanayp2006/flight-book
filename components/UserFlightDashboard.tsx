'use client';

import { useEffect, useState } from 'react';

type Flight = {
  id: string;
  flightNumber: string;
  origin: { iata: string; city: string; country: string };
  destination: { iata: string; city: string; country: string };
  airline: { name: string; code: string };
  airplane: { model: string; capacity: number };
  departureTime: string;
  arrivalTime: string;
  durationMins: number;
  basePrice: number;
  status: string;
};

export default function UserFlightDashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFlights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/flights');
      if (!res.ok) throw new Error('Failed to load flights');
      const data: Flight[] = await res.json();
      setFlights(data);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100">
              <tr>
                <th className="px-3 py-2">Flight</th>
                <th className="px-3 py-2">Route</th>
                <th className="px-3 py-2">Airline / Airplane</th>
                <th className="px-3 py-2">Depart/Arrive</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id} className="border-t">
                  <td className="px-3 py-2 font-semibold">{flight.flightNumber}</td>
                  <td className="px-3 py-2">{flight.origin.iata} → {flight.destination.iata}</td>
                  <td className="px-3 py-2">{flight.airline.name} ({flight.airline.code}) / {flight.airplane.model}</td>
                  <td className="px-3 py-2">{new Date(flight.departureTime).toLocaleString()} / {new Date(flight.arrivalTime).toLocaleString()}</td>
                  <td className="px-3 py-2">${flight.basePrice.toFixed(2)}</td>
                  <td className="px-3 py-2">{flight.status}</td>
                  <td className="px-3 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {flights.length === 0 && <p className="p-4 text-gray-500">No flights available.</p>}
        </div>
      )}
    </section>
  );
}