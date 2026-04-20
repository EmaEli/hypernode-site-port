import type { APIRoute } from 'astro'

const REQUIRED_FIELDS = ['firstname', 'lastname', 'leave_us_a_message'] as const

const isEmpty = (v: unknown): boolean => typeof v !== 'string' || !v.trim()

const validate = (data: Record<string, unknown>): string[] => {
  const errors: string[] = []

  for (const field of REQUIRED_FIELDS) {
    if (isEmpty(data[field])) errors.push(`${field} is required`)
  }

  if (isEmpty(data.email)) {
    errors.push('email is required')
  } else if (!(data.email as string).includes('@')) {
    errors.push('Valid email is required')
  }

  if (!data['LEGAL_CONSENT.subscription_type_20878176']) {
    errors.push('Privacy policy consent is required')
  }

  return errors
}

const forwardToExternalApi = async (data: Record<string, unknown>) => {
  const url = import.meta.env.PUBLIC_LEAD_API_URL
  const token = import.meta.env.LEAD_API_TOKEN

  if (!url) return

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.warn(`[LEAD_FORM] External API returned ${res.status}`, await res.text())
    }
  } catch (err) {
    console.warn('[LEAD_FORM] Failed to forward to external API:', err instanceof Error ? err.message : String(err))
  }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData())

    const errors = validate(data)
    if (errors.length) return json({ success: false, errors }, 400)

    console.log('[LEAD_FORM] New submission:', {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      timestamp: new Date().toISOString(),
    })

    await forwardToExternalApi(data)

    return json({ success: true, message: 'Thank you for reaching out! We will contact you shortly.' })
  } catch (err) {
    console.error('[LEAD_FORM] Error processing submission:', err)
    return json({ success: false, error: 'Failed to process form submission' }, 500)
  }
}
