import { readFile } from 'node:fs/promises'

// Cached blocklist
let blocklist: Set<string> | null = null

// Load blocklist once and cache it
async function loadBlocklist() {
  if (!blocklist) {
    const content = await readFile('disposable_email_blocklist.conf', { encoding: 'utf-8' })

    // Populate the blocklist as a Set for faster lookup
    blocklist = new Set(content.split('\r\n').filter(Boolean))
  }

  return blocklist
}

// Check if an email's domain is disposable
export async function isDisposable(email: string): Promise<boolean> {
  const domain = email.split('@')[1]

  // Load blocklist if not already cached
  const blocklist = await loadBlocklist()

  return blocklist.has(domain)
}
