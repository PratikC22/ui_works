'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className='border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <span className='text-[12px] text-muted-foreground'>
          &copy; Pratik Avinash Chaudhari • UI Works is open source (MIT)
        </span>

        <div className='flex items-center gap-3'>
          <a
            href='https://github.com/PratikC22'
            target='_blank'
            rel='noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
            aria-label='GitHub Profile'
          >
            <Github size={14} />
          </a>
          <a
            href='https://linkedin.com/in/pratikc22'
            target='_blank'
            rel='noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
            aria-label='LinkedIn Profile'
          >
            <Linkedin size={14} />
          </a>
          <a
            href='mailto:pratikc1020@gmail.com'
            className='text-muted-foreground hover:text-foreground transition-colors'
            aria-label='Email'
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
