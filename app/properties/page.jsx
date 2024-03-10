'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PropertiesPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/">Home</Link>
    </div>
  )
}

export default PropertiesPage