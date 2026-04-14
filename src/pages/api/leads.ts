import type { APIRoute } from 'astro'

export interface LeadFormData {
  firstname: string
  lastname: string
  email: string
  company?: string
  website?: string
  phone?: string
  leave_us_a_message?: string
  'LEGAL_CONSENT.subscription_type_36279934'?: string
  'LEGAL_CONSENT.subscription_type_20878176'?: string
}

const validateLeadData = (data: Record<string, unknown>): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Required fields
  if (!data.firstname || typeof data.firstname !== 'string' || data.firstname.trim().length === 0) {
    errors.push('First name is required')
  }

  if (!data.lastname || typeof data.lastname !== 'string' || data.lastname.trim().length === 0) {
    errors.push('Last name is required')
  }

  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.push('Valid email is required')
  }

  // Privacy consent is required
  if (!data['LEGAL_CONSENT.subscription_type_20878176']) {
    errors.push('Privacy policy consent is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    // Validate
    const { valid, errors } = validateLeadData(data)
    if (!valid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    // Log in development
    console.log('[LEAD_FORM] New submission:', {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      timestamp: new Date().toISOString(),
    })

    // Attempt to forward to external API if configured
    const leadApiUrl = import.meta.env.PUBLIC_LEAD_API_URL
    const leadApiToken = import.meta.env.PUBLIC_LEAD_API_TOKEN

    if (leadApiUrl) {
      try {
        const response = await fetch(leadApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(leadApiToken && { Authorization: `Bearer ${leadApiToken}` }),
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          console.warn(`[LEAD_FORM] External API returned ${response.status}`, await response.text())
        }
      } catch (error) {
        console.warn('[LEAD_FORM] Failed to forward to external API:', error instanceof Error ? error.message : String(error))
        // Continue anyway — we already logged it locally
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for reaching out! We will contact you shortly.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('[LEAD_FORM] Error processing submission:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process form submission',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
