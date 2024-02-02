'use client';

import React from 'react';
import { links } from '../lib/data';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex items-center space-x-6 border-b">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={clsx({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
