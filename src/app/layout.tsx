import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ReactQueryProvider } from '@/lib/react-query'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axiom Pulse Replica',
  description: 'Token trading discovery table demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Provider>
      </body>
    </html>
  )
}
