'use client'

import { useEffect } from 'react'

export function ConsoleCredit() {
  useEffect(() => {
    console.log(
      `
      %c🚀 UI Works - Frontend Interview Platform
      %c
      %cBuilt by Pratik Avinash Chaudhari
      %cGitHub: https://github.com/pratikc22
      %cMade with ❤️ for the developer community
      %c
      %cType 'help' for more info
    `,
      'color: #3b82f6; font-size: 16px; font-weight: bold;',
      '',
      'color: #10b981; font-size: 14px;',
      'color: #6366f1; font-size: 14px;',
      'color: #f59e0b; font-size: 14px;',
      '',
      'color: #6b7280; font-size: 12px;'
    )

    // Add help command
    const originalLog = console.log
    console.log = function (...args) {
      if (args[0] === 'help') {
        console.log(
          `
          %c🛠️ UI Works Help
          %c
          %cCommands:
          %c  help     - Show this help
          %c  about    - About the creator
          %c  github   - Open GitHub repo
          %c
          %cBuilt by Pratik Avinash Chaudhari
          %cSenior Software Engineer @ Nference Labs
        `,
          'color: #3b82f6; font-size: 14px; font-weight: bold;',
          '',
          'color: #10b981; font-size: 12px;',
          'color: #6b7280; font-size: 12px;',
          'color: #6b7280; font-size: 12px;',
          'color: #6b7280; font-size: 12px;',
          'color: #6b7280; font-size: 12px;',
          '',
          'color: #f59e0b; font-size: 12px;',
          'color: #f59e0b; font-size: 12px;'
        )
        return
      }
      if (args[0] === 'about') {
        console.log(
          `
          %c👨‍💻 About the Creator
          %c
          %cPratik Avinash Chaudhari
          %cSenior Software Engineer @ Nference Labs
          %c
          %cPassionate about improving developer experience
          %cand building tools that make a difference.
          %c
          %cGitHub: https://github.com/pratikc22
          %cLinkedIn: https://linkedin.com/in/pratikc22
        `,
          'color: #3b82f6; font-size: 14px; font-weight: bold;',
          '',
          'color: #10b981; font-size: 12px; font-weight: bold;',
          'color: #6366f1; font-size: 12px;',
          '',
          'color: #6b7280; font-size: 12px;',
          'color: #6b7280; font-size: 12px;',
          '',
          'color: #f59e0b; font-size: 12px;',
          'color: #f59e0b; font-size: 12px;'
        )
        return
      }
      if (args[0] === 'github') {
        window.open('https://github.com/pratikc22/ui_works', '_blank')
        console.log(
          '%c🔗 Opening GitHub repository...',
          'color: #10b981; font-size: 12px;'
        )
        return
      }
      originalLog.apply(console, args)
    }

    return () => {
      console.log = originalLog
    }
  }, [])

  return null
}
