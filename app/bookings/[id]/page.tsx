import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const prisma = new PrismaClient();

type BookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== 'USER') {
    redirect('/dashboard');
  }

  const { id } = await params;

  const flight = await prisma.flight.findUnique({
    where: { id },
    include: {
      origin: true,
      destination: true,
      airline: true,
      airplane: true,
    },
  });

  if (!flight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Review Your Trip</h1>
          <Link href="/flights" className="text-sm font-medium text-sky-700 hover:text-sky-900">
            Back to Search
          </Link>
        </div>

        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Flight:</span> {flight.flightNumber}
          </p>
          <p>
            <span className="font-semibold">Route:</span> {flight.origin.iata} ({flight.origin.city}) to {flight.destination.iata} ({flight.destination.city})
          </p>
          <p>
            <span className="font-semibold">Airline:</span> {flight.airline.name}
          </p>
          <p>
            <span className="font-semibold">Aircraft:</span> {flight.airplane.model}
          </p>
          <p>
            <span className="font-semibold">Departure:</span> {new Date(flight.departureTime).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Arrival:</span> {new Date(flight.arrivalTime).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {formatDuration(flight.durationMins)}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${flight.basePrice.toFixed(2)}
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Booking confirmation is the next step and can now be connected without breaking the route flow.
        </div>
      </div>
    </main>
  );
}
