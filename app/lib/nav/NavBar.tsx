'use client'

import React from 'react'
import Link from 'next/link'

export const NavBar = () => {
  return (
    <nav className="w-full bg-gray-800">
      <ul className='flex flex-row gap-5 py-2 px-5'>
        <li className="hover:text-gray-400">
          <Link href='/'>Home</Link>
        </li>

        <li className="hover:text-gray-400">
          <Link href='/pad'>Pad</Link>
        </li>

        <li className="hover:text-gray-400">
          <Link href='/view'>View</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
