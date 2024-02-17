
import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex">
        <main className="flex-1">
            {children}
        </main>
      </div>
    );
  }
