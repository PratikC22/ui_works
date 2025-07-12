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
            Revolutionizing frontend technical interviews with interactive
            coding challenges
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Target className='h-5 w-5' />
                Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                To provide a modern, interactive platform for evaluating
                frontend development skills through real-world coding challenges
                that mirror actual development scenarios.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-5 w-5' />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Built for developers, by developers. Open source and
                community-driven to ensure the best possible experience for both
                interviewers and candidates.
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
                  Senior Software Engineer at Nference Labs
                </p>
                <p className='text-muted-foreground mb-4'>
                  Passionate about improving the developer experience and
                  building tools that make a real difference in how we conduct
                  technical interviews. UI Works was born from the frustration
                  of existing interview platforms that don&apos;t properly
                  assess frontend skills.
                </p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  <Badge variant='secondary'>Full-Stack Development</Badge>
                  <Badge variant='secondary'>React/Next.js</Badge>
                  <Badge variant='secondary'>TypeScript</Badge>
                  <Badge variant='secondary'>UI/UX Design</Badge>
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
                <h4 className='font-semibold mb-2'>For Interviewers</h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Standardized assessment criteria</li>
                  <li>• Real-time code evaluation</li>
                  <li>• Professional interview environment</li>
                  <li>• Comprehensive challenge library</li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>For Candidates</h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Fair and transparent evaluation</li>
                  <li>• Real-world coding scenarios</li>
                  <li>• Educational content and hints</li>
                  <li>• Portfolio-worthy solutions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
