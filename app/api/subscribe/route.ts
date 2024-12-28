import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export async function POST(request: Request) {
  try {
    const { email, screenResolution } = await request.json();

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Get basic request data
      const headers = new Headers(request.headers);
      const userAgent = headers.get('user-agent') || '';
      const ip = headers.get('x-forwarded-for')?.split(',')[0] || 
                 headers.get('x-real-ip') || '';
      const referer = headers.get('referer') || '';
      const language = headers.get('accept-language')?.split(',')[0] || '';

      // Get country from IP
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();

      // Insert data
      await client.query(`
        INSERT INTO subscribers (
          email,
          ip_address,
          user_agent,
          referer,
          language,
          country,
          screen_resolution
        ) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7)
      `, [
        email,
        ip,
        userAgent,
        referer,
        language,
        geoData.country_name,
        screenResolution
      ]);

      return NextResponse.json({ message: 'Subscription successful' });
    } catch (error: any) {
      if (error.code === '23505') { // PostgreSQL unique constraint error
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 400 }
        );
      }
      console.error('Database Error:', error);
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    );
  }
}