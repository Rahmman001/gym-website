import { createClient } from 'npm:@supabase/supabase-js@2'

const allowedOrigins = new Set([
  'http://127.0.0.1:4173',
  'https://your-production-domain.com',
  'https://gym-website-seven-delta.vercel.app',
])

const response = (body: unknown, status = 200, origin = '') =>
  Response.json(body, {
    status,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'content-type',
      'Content-Type': 'application/json',
    },
  })

Deno.serve(async (request) => {
  const origin = request.headers.get('origin') ?? ''

  if (!allowedOrigins.has(origin)) {
    return response({ error: 'Origin not allowed' }, 403, origin)
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  if (request.method !== 'POST') {
    return response({ error: 'Method not allowed' }, 405, origin)
  }

  const body = await request.json().catch(() => null)

  const firstName = body?.first?.trim()
  const lastName = body?.last?.trim()
  const email = body?.email?.trim().toLowerCase()
  const phone = body?.phone?.trim() || null
  const tier = body?.tier

  if (
    !firstName ||
    !lastName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '') ||
    !['basic', 'premium', 'elite'].includes(tier)
  ) {
    return response({ error: 'Invalid registration details' }, 400, origin)
  }

  const secretKey =
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
    JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') ?? '{}').default

  if (!secretKey) {
    return response({ error: 'Server configuration error' }, 500, origin)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    secretKey,
  )

  const { error } = await supabase
    .from('membership_leads')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      tier,
    })

  if (error) {
    console.error(error)
    return response({ error: 'Could not save registration' }, 500, origin)
  }

  return response({ ok: true }, 201, origin)
})