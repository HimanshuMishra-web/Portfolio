export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const validateContactForm = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Check required fields
  if (!data.name.trim()) {
    errors.push('Name is required')
  }

  if (!data.email.trim()) {
    errors.push('Email is required')
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!data.subject.trim()) {
    errors.push('Subject is required')
  }

  if (!data.message.trim()) {
    errors.push('Message is required')
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}
