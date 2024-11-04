'use client';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SideNavBar from '../../components/sideNavBar';

interface RootLayoutProps {
  children: React.ReactNode;
  navbarType: 'side' | 'top';
}

export default function AppLayout({
  children,
  navbarType = 'side'
}: RootLayoutProps) {
  return (
    <>
      {navbarType === 'side' ? <SideNavBar /> : <Navbar />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
