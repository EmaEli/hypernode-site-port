import { useState } from 'react'

import Button from '../../ui/primitives/Button'
import CheckboxField from '../../ui/primitives/CheckboxField'
import FormField from '../../ui/primitives/FormField'
import VerticalFlex from '../../ui/primitives/VerticalFlex'

export interface HomepageLeadFormProps {
  submitLabel: string
  newsHref: string
  privacyPolicyHref: string
}

interface FormErrors {
  firstname?: string
  lastname?: string
  email?: string
  message?: string
  privacy?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {}
  if (!String(data.get('firstname') ?? '').trim()) errors.firstname = 'First name is required'
  if (!String(data.get('lastname') ?? '').trim()) errors.lastname = 'Last name is required'
  if (!isValidEmail(String(data.get('email') ?? '').trim())) errors.email = 'Valid email address is required'
  if (!String(data.get('leave_us_a_message') ?? '').trim()) errors.message = 'Message is required'
  if (!data.get('LEGAL_CONSENT.subscription_type_20878176')) errors.privacy = 'Privacy policy consent is required'
  return errors
}

const HomepageLeadForm = ({ submitLabel, newsHref, privacyPolicyHref }: HomepageLeadFormProps) => {
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const formErrors = validate(data)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch(form.action, { method: 'POST', body: data })
      const json = (await res.json()) as { success?: boolean; error?: string }

      if (res.ok && json.success) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'
  const submitText =
    status === 'success' ? "Message sent. We'll be in touch." :
    status === 'error' ? 'Something went wrong' :
    isLoading ? 'Sending…' :
    submitLabel

  return (
    <form method="post" action="/api/leads" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField id="firstname" placeholder="Your first name" autoComplete="given-name" required error={errors.firstname} />
        <FormField id="lastname" placeholder="Your last name" autoComplete="family-name" required error={errors.lastname} />

        <FormField id="company" placeholder="Your company name" autoComplete="organization" />
        <FormField id="website" placeholder="Your website URL" inputMode="url" />

        <FormField id="phone" placeholder="Your phone number" type="tel" inputMode="tel" autoComplete="tel" />
        <FormField id="email" placeholder="Your email" type="email" inputMode="email" autoComplete="email" required error={errors.email} />

        <div className="md:col-span-2">
          <FormField id="leave_us_a_message" placeholder="Leave us a message" required error={errors.message} />
        </div>
      </div>

      <VerticalFlex gap="4" className="my-4">
        <CheckboxField id="consent-news" name="LEGAL_CONSENT.subscription_type_36279934">
          Yes, keep me informed about{' '}
          <a href={newsHref} target="_blank" rel="noopener">Hypernode news and updates</a>.
        </CheckboxField>

        <CheckboxField id="consent-privacy" name="LEGAL_CONSENT.subscription_type_20878176" required error={errors.privacy}>
          Yes, I have read the{' '}
          <a href={privacyPolicyHref} target="_blank" rel="noopener">Privacy Policy</a>{' '}
          and give consent to Hypernode.com to store my submitted information.
        </CheckboxField>
      </VerticalFlex>

      <div className="flex justify-center">
        <Button type="submit" size="large" disabled={isLoading}>
          {submitText}
        </Button>
      </div>
    </form>
  )
}

export default HomepageLeadForm
