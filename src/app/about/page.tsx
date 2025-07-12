import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, Linkedin, Mail, Code, Users, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - UI Works',
  description: 'Learn more about UI Works and its creator',
}

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>About UI Works</h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            A better way to test frontend skills — fast, realistic, and
            distraction-free.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Target className='h-5 w-5' />
                Why it exists
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                UI Works exists because technical interviews suck — especially
                for frontend roles. This app brings real-world challenges, with
                real tools, in a real environment. No MCQs. No trick puzzles.
                Just code.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-5 w-5' />
                Built for devs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                The platform is open source, and it&apos;s growing. If
                you&apos;re tired of over-engineered platforms and bloated UX,
                contribute or fork it. Whether you&apos;re hiring or learning —
                this is for you.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className='mb-12'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Code className='h-5 w-5' />
              Creator
            </CardTitle>
            <CardDescription>
              Meet the developer behind UI Works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col md:flex-row items-start gap-6'>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold mb-2'>
                  Pratik Avinash Chaudhari
                </h3>
                <p className='text-muted-foreground mb-4'>
                  UI Works was created to bring clarity and realism to frontend
                  interviews. It focuses on what matters: code, design thinking,
                  and the actual workflows developers use every day.
                </p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  <Badge variant='secondary'>Full-Stack</Badge>
                  <Badge variant='secondary'>React/Next.js</Badge>
                  <Badge variant='secondary'>TypeScript</Badge>
                  <Badge variant='secondary'>UI/UX</Badge>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <Link
                  href='https://github.com/pratikc22'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
                >
                  <Github className='h-5 w-5' />
                  <span>GitHub</span>
                </Link>
                <Link
                  href='https://linkedin.com/in/pratikc22'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
                >
                  <Linkedin className='h-5 w-5' />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href='mailto:pratikc1020@gmail.com'
                  className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
                >
                  <Mail className='h-5 w-5' />
                  <span>Email</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Zap className='h-5 w-5' />
              Features
            </CardTitle>
            <CardDescription>What makes UI Works special</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <h4 className='font-semibold mb-2'>Interviewers</h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Instant previews & evaluation</li>
                  <li>• Practical coding tasks</li>
                  <li>• Clean, distraction-free UI</li>
                  <li>• Sharable challenge links</li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Candidates</h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Real-time feedback</li>
                  <li>• Mobile-ready (mostly)</li>
                  <li>• Open source & free</li>
                  <li>• Learn by doing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
