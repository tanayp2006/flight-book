import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const airports = await prisma.airport.findMany({ orderBy: { city: 'asc' } });
  return NextResponse.json(airports);
}

export async function POST(request: Request) {
  const data = await request.json();
  const required = ['iata', 'name', 'city', 'country'];
  for (const field of required) {
    if (!data[field]) {
      return NextResponse.json({ error: `Missing ${field}` }, { status: 400 });
    }
  }

  const airport = await prisma.airport.create({
    data: {
      iata: data.iata.toUpperCase(),
      name: data.name,
      city: data.city,
      country: data.country,
    },
  });
  return NextResponse.json(airport, { status: 201 });
}
