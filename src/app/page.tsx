'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Zap, Target, Users, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SAMPLE_CHALLENGES } from '@/lib/data'
import { motion } from 'framer-motion'
import { FloatingBubbles } from '@/components/ui/floating-bubbles'

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative py-32 px-4 overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-100/50 dark:from-slate-900/20 dark:to-slate-800/20' />

        {/* Floating bubbles */}
        <FloatingBubbles />

        <div className='container mx-auto text-center relative z-10'>
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium mb-8'
          >
            <Sparkles className='h-4 w-4' />
            Interactive Coding Platform
          </motion.div>

          {/* Animated heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent'
          >
            Master Frontend Development
          </motion.h1>

          {/* Animated subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto'
          >
            Practice real-world frontend challenges, improve your skills, and
            prepare for interviews with our interactive coding platform.
          </motion.p>

          {/* Animated button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Link href='/challenges'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size='lg'
                  className='flex items-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  Start Coding <ArrowRight className='h-4 w-4' />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-muted/50'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Why Choose UI Works?
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <Card className='text-center'>
              <CardHeader>
                <Code className='h-12 w-12 mx-auto mb-4 text-primary' />
                <CardTitle>Real-World Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Practice with challenges based on actual frontend development
                  scenarios
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardHeader>
                <Zap className='h-12 w-12 mx-auto mb-4 text-primary' />
                <CardTitle>Instant Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Get immediate feedback on your code with live preview and
                  error detection
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardHeader>
                <Target className='h-12 w-12 mx-auto mb-4 text-primary' />
                <CardTitle>Skill Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Track your progress and level up your skills with our
                  structured learning path
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardHeader>
                <Users className='h-12 w-12 mx-auto mb-4 text-primary' />
                <CardTitle>Interview Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Prepare for technical interviews with industry-standard coding
                  challenges
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenge Preview */}
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Featured Challenges
          </h2>
          <div className='grid md:grid-cols-3 gap-8 auto-rows-fr'>
            {SAMPLE_CHALLENGES.filter((challenge) => challenge.featured).map(
              (challenge) => (
                <Card key={challenge.id} className='flex flex-col gap-2.5'>
                  <CardHeader className='min-h-20'>
                    <div className='flex justify-between items-start'>
                      <CardTitle>{challenge.title}</CardTitle>
                      <Badge className='capitalize'>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-1'>
                    <div className='flex gap-2 mb-4 flex-wrap'>
                      {challenge.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant='secondary'
                          className='capitalize'
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='mt-auto'>
                    <Link
                      href={`/challenges/${challenge.id}`}
                      className='w-full'
                    >
                      <Button className='w-full'>Try Challenge</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
