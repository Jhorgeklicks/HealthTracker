import { Lexend } from 'next/font/google'
import './ui/globals.css'

const laxend = Lexend({ subsets: ['latin'] })

export const metadata = {
  title : "Health Tracker",
  description : "A web application that empowers you to take control of your health by tracking key personal health data and lifestyle factors",
  keywords : 'health tracker,personal health record,weight management,blood pressure tracker,blood sugar tracker,lifestyle habits tracker,diet tracker,exercise tracker,preventive health,chronic disease management'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={laxend.className}>{children}</body>
    </html>
  )
}
