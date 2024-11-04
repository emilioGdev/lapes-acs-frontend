'use client';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { StyledComponentRegistry } from '../lib';
import AppLayout from './layout/AppLayout';

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
          <AppLayout navbarType={'side'}>{children}</AppLayout>
        </StyledComponentRegistry>
      </body>
    </html>
  );
}
