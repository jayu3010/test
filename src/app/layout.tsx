import type { Metadata } from 'next';

import './globals.css';
import '../../public/scss/main.scss';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';

import Providers from '@/utils/redux/provider';
import Loader from '@/component/loader/Loader';

import DataLayout from './layout/index';

export const metadata: Metadata = {
  title: "Smart PPC",
  description: "By ACE Infoway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={{ hashed: false }}>
          <Providers>
            <Suspense fallback={<Loader />}>
              <DataLayout>{children}</DataLayout>
            </Suspense>
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
