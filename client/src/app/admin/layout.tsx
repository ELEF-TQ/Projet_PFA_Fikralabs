'use client'
import React from 'react'
import Sidebar from '@/components/dashboard/admin/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';

export default function layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <div className="layout">
      <Sidebar />
      <main className="layout__main-content">
        {children}
      </main>;
  </div>
  </SidebarProvider>
  );
}
