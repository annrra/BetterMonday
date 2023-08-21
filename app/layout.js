import './globals.css';
import styles from './global.module.css';
import { Raleway } from 'next/font/google';
import localFont from 'next/font/local';

const visuelt = localFont({
  src: [
    {
      path: '../public/VisueltPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/VisueltPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-visuelt',
})

const raleway = Raleway({
  weight: ['400', '600', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata = {
  title: 'BetterMonday',
  description: 'Web Design & Development',
  icons: {
    rel: 'icon',
    icon: 'favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${visuelt.variable} ${raleway.variable} ${styles.index}`}>
        {children}
      </body>
    </html>
  )
}
