'use client';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../components/Footer';
import SideNavBar from '../components/sideNavBar';
import { StyledComponentRegistry } from '../lib';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <StyledComponentRegistry>
          <SideNavBar />
          <main>{children}</main>
          <Footer />
        </StyledComponentRegistry>
      </body>
    </html>
  );
}
