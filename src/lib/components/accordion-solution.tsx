'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleAccordion(index)
    }
  }

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length)
  }, [items.length])

  return (
    <div className='w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700'>
      {items.map((item, index) => {
        const isActive = activeIndex === index
        const contentHeight = isActive
          ? contentRefs.current[index]?.scrollHeight || 0
          : 0

        return (
          <div
            key={item.id}
            className='border-b border-slate-200 dark:border-slate-700 last:border-b-0'
          >
            <button
              className='w-full px-6 py-4 text-left bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset transition-colors duration-200 flex items-center justify-between'
              onClick={() => toggleAccordion(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isActive}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              <span className='font-medium text-slate-900 dark:text-slate-100 text-md pr-4'>
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                  isActive ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className='overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-800'
              style={{ height: `${contentHeight}px` }}
              id={`accordion-content-${item.id}`}
              aria-labelledby={`accordion-header-${item.id}`}
            >
              <div
                ref={(el) => {
                  contentRefs.current[index] = el
                }}
                className='px-6 py-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm'
              >
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Example usage with sample data
const AccordionDemo: React.FC = () => {
  const accordionItems: AccordionItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content:
        "Welcome to our platform! This section covers the basics of setting up your account, navigating the interface, and understanding key features. You'll learn how to customize your dashboard and access essential tools to get the most out of your experience.",
    },
    {
      id: 'features',
      title: 'Key Features',
      content:
        'Discover our comprehensive suite of tools designed to streamline your workflow. From advanced analytics and reporting to collaboration features and integrations, we provide everything you need to boost productivity and achieve your goals efficiently.',
    },
    {
      id: 'pricing',
      title: 'Pricing Plans',
      content:
        'Choose from our flexible pricing options tailored to meet different needs and budgets. We offer transparent pricing with no hidden fees, including a free starter plan, professional tiers, and enterprise solutions with dedicated support and custom features.',
    },
    {
      id: 'support',
      title: 'Support & Resources',
      content:
        'Access our extensive knowledge base, video tutorials, and community forums for self-service support. Our dedicated support team is available 24/7 via chat, email, and phone to help you resolve any issues and maximize your platform experience.',
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      content:
        'Your data security is our top priority. We implement industry-standard encryption, regular security audits, and comply with major privacy regulations including GDPR and CCPA. Learn about our data protection measures and privacy policies.',
    },
  ]

  return (
    <div className='bg-slate-50 dark:bg-slate-900 py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
            Frequently Asked Questions
          </h1>
          <p className='text-slate-600 dark:text-slate-400 text-sm'>
            Find answers to common questions about our platform
          </p>
        </div>

        <Accordion items={accordionItems} />

        <div className='mt-8 text-center text-sm text-slate-500 dark:text-slate-400'>
          <p>
            Use Tab to navigate between sections, Enter or Space to
            expand/collapse
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccordionDemo
