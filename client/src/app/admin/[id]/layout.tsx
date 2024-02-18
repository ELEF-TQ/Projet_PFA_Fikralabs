
import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="Dashboard__Container ">
        <main className="flex ">
            {children}
        </main>
      </div>
    );
  }
