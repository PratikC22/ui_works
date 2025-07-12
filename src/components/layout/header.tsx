'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code, Info } from 'lucide-react'
import { ModeToggle } from '../ui/mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Code className='h-6 w-6' />
          <span className='font-bold text-xl'>UI Works</span>
        </Link>

        <div className='flex items-center space-x-4'>
          <Link href='/challenges'>
            <Button
              variant='outline'
              size='sm'
              className='hidden md:flex h-9 cursor-pointer'
            >
              Get Started
            </Button>
          </Link>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-9 w-9 p-0'>
                <Info className='h-4 w-4' />
                <span className='sr-only'>About</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem asChild>
                <Link href='/about'>About UI Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href='https://github.com/pratikc22/ui-works'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View on GitHub
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
