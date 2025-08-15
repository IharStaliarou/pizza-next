import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const user = await prisma.user.findMany();
  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user);
}
