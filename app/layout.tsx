import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recontigo',
  description: 'Crowdsourced product data and local inventory price tracking.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a' }}>
        {children}
      </body>
    </html>
  )
}
