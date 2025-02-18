import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, company, role, screenResolution, isNewsletter } = data;

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Check if email exists
      const existingUser = await client.query(
        'SELECT * FROM subscribers WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        const user = existingUser.rows[0];
        
        if (isNewsletter) {
          // If newsletter signup and already an alpha customer, just confirm subscription
          if (user.is_alpha_customer) {
            return NextResponse.json({ 
              message: 'You are already subscribed to our newsletter as an alpha customer' 
            });
          }
          
          // Update to add newsletter subscription
          await client.query(`
            UPDATE subscribers 
            SET 
              is_newsletter = true,
              updated_at = CURRENT_TIMESTAMP
            WHERE email = $1
          `, [email]);

          return NextResponse.json({ message: 'Newsletter subscription successful' });
        } else {
          // Upgrading to alpha customer
          await client.query(`
            UPDATE subscribers 
            SET 
              name = COALESCE($1, name),
              company = COALESCE($2, company),
              role = COALESCE($3, role),
              is_alpha_customer = true,
              is_newsletter = true,
              updated_at = CURRENT_TIMESTAMP
            WHERE email = $4
          `, [name, company, role, email]);

          return NextResponse.json({ message: 'Profile updated successfully' });
        }
      }

      // Get request data for new user
      const headers = new Headers(request.headers);
      const userAgent = headers.get('user-agent') || '';
      const ip = headers.get('x-forwarded-for')?.split(',')[0] || 
                 headers.get('x-real-ip') || '';
      const referer = headers.get('referer') || '';
      const language = headers.get('accept-language')?.split(',')[0] || '';

      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();

      // Insert new user - note that alpha customers are automatically newsletter subscribers
      await client.query(`
        INSERT INTO subscribers (
          email,
          name,
          company,
          role,
          ip_address,
          user_agent,
          referer,
          language,
          country,
          screen_resolution,
          is_newsletter,
          is_alpha_customer
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        email,
        name || null,
        company || null,
        role || null,
        ip,
        userAgent,
        referer,
        language,
        geoData.country_name,
        screenResolution,
        true, // Always subscribe to newsletter
        !isNewsletter // if not newsletter signup, then it's alpha customer
      ]);

      return NextResponse.json({ 
        message: isNewsletter ? 'Newsletter subscription successful' : 'Alpha signup successful' 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}