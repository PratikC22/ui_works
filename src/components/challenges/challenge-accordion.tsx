'use client'

import { Challenge } from '@/lib/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface ChallengeAccordionProps {
  readonly challenge: Challenge
}

export function ChallengeAccordion({ challenge }: ChallengeAccordionProps) {
  return (
    <Accordion type='multiple' defaultValue={['details']} className='w-full'>
      <AccordionItem value='details'>
        <AccordionTrigger className='text-md font-bold'>
          Details
        </AccordionTrigger>
        <AccordionContent className='space-y-4'>
          <div>
            <h3 className='font-semibold mb-2'>Difficulty</h3>
            <Badge
              className={`difficulty-${challenge.difficulty}`}
              variant={'secondary'}
            >
              {challenge.difficulty}
            </Badge>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Technologies</h3>
            <div className='flex flex-wrap gap-2'>
              {challenge.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant='secondary'
                  className={`tech-${tech}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Tags</h3>
            <div className='flex flex-wrap gap-2'>
              {challenge.tags.map((tag) => (
                <Badge key={tag} variant='outline'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='rules'>
        <AccordionTrigger className='text-md font-bold'>Rules</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className='h-fit pr-4'>
            <div dangerouslySetInnerHTML={{ __html: challenge.instructions }} />
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='hints'>
        <AccordionTrigger className='text-md font-bold'>Hints</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className='h-fit pr-4'>
            <div dangerouslySetInnerHTML={{ __html: challenge.hints }} />
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='standards'>
        <AccordionTrigger className='text-md font-bold'>
          Best Practices
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className='h-fit pr-4'>
            <div dangerouslySetInnerHTML={{ __html: challenge.standards }} />
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='issues'>
        <AccordionTrigger className='text-md font-bold'>
          Common Issues
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className='h-fit pr-4'>
            <div dangerouslySetInnerHTML={{ __html: challenge.issues }} />
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>

      {challenge.assets && challenge.assets.length > 0 && (
        <AccordionItem value='assets'>
          <AccordionTrigger>Assets</AccordionTrigger>
          <AccordionContent>
            <p>Assets for this challenge will be listed here.</p>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}
