import { Duffel } from '@duffel/api';
import { NextResponse } from 'next/server';

const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
    console.log('Received flight search request');
  try {
    const { origin, destination, date } = await request.json();

    // Validate token
    if (!process.env.DUFFEL_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'API token not configured', details: 'DUFFEL_ACCESS_TOKEN is missing' },
        { status: 500 }
      );
    }

    // Validate inputs
    if (!origin || !destination || !date) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'origin, destination, and date are required' },
        { status: 400 }
      );
    }

    const originCode = origin.toUpperCase().trim();
    const destCode = destination.toUpperCase().trim();

    // Validate airport codes (should be 3 letters)
    if (!/^[A-Z]{3}$/.test(originCode) || !/^[A-Z]{3}$/.test(destCode)) {
      return NextResponse.json(
        { error: 'Invalid airport code', details: 'Airport codes must be 3 letters (e.g., JFK, LHR)' },
        { status: 400 }
      );
    }

    console.log('Flight search request:', { originCode, destCode, date });

    const offerRequest = await duffel.offerRequests.create({
      slices: [
        {
          origin: originCode,
          destination: destCode,
          departure_date: date,
        } as any,
      ],
      passengers: [{ type: 'adult' }] as any,
      cabin_class: 'economy',
    });

    console.log('Duffel API response:', offerRequest.data.offers[0]);

    return NextResponse.json({
      success: true,
      id: offerRequest.data.id,
      offers: offerRequest.data.offers || [],
      message: `Found ${offerRequest.data.offers?.length || 0} flights from ${originCode} to ${destCode}`,
    });
  } catch (error) {
    console.error('Duffel API Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: 'Flight search failed',
        details: errorMessage,
        hint: 'Check if DUFFEL_ACCESS_TOKEN is set and valid',
      },
      { status: 500 }
    );
  }
}

