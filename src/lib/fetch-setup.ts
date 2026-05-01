export function setupFetchWithUserAgent() {
  if (typeof window === 'undefined') {
    const originalFetch = globalThis.fetch

    globalThis.fetch = (url, init) => {
      const headers = new Headers(init?.headers)

      // GitHub API requires a User-Agent. Cloudflare doesn't always provide one.
      if (!headers.has('User-Agent')) {
        headers.set('User-Agent', 'Keystatic-App/1.0.0')
      }

      return originalFetch(url, {
        ...init,
        headers,
      })
    }
  }
}
