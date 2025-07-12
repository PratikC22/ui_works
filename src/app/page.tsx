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
import { Code, Zap, Target, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SAMPLE_CHALLENGES } from '@/lib/data'

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
            Master Frontend Development
          </h1>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Practice real-world frontend challenges, improve your skills, and
            prepare for interviews with our interactive coding platform.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/challenges'>
              <Button
                size='lg'
                className='flex items-center gap-2 cursor-pointer'
              >
                Start Coding <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>
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
