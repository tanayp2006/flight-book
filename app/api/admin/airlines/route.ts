import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const airlines = await prisma.airline.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(airlines);
}

export async function POST(request: Request) {
  const data = await request.json();
  const required = ['name', 'code'];
  for (const field of required) {
    if (!data[field]) {
      return NextResponse.json({ error: `Missing ${field}` }, { status: 400 });
    }
  }

  const airline = await prisma.airline.create({
    data: {
      name: data.name,
      code: data.code.toUpperCase(),
    },
  });
  return NextResponse.json(airline, { status: 201 });
}
