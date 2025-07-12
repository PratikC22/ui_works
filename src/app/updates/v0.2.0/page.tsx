'use client'

import { Separator } from '@/components/ui/separator'

export default function UpdatePage() {
  return (
    <main className='max-w-4xl mx-auto px-6 py-24 bg-background'>
      <article className='prose prose-neutral dark:prose-invert prose-h1:mb-8 prose-h2:mt-16 prose-h2:mb-6 prose-p:leading-relaxed prose-li:leading-relaxed space-y-16'>
        <header className='text-center space-y-5'>
          <h1 className='text-5xl font-bold tracking-tight text-foreground'>
            UI Works Release Notes - v0.2.0
          </h1>
          <p className='text-muted-foreground text-lg'>
            Released on July 12, 2025
          </p>
        </header>

        <Separator className='my-20 bg-muted' />

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>Stunning UI Overhaul</h2>
          <p className='text-lg'>
            I have rebuilt UI Works from the ground up for a seamless, modern
            experience. Powered by a semantic Tailwind design system with oklch
            color precision, every pixel is optimized for clarity and
            performance.
          </p>
          <ul className='list-disc pl-6 text-lg space-y-2'>
            <li>
              Revamped homepage with a dynamic hero section and fluid animations
            </li>
            <li>
              Enhanced typography with superior contrast and variable fonts
            </li>
            <li>
              Seamless light/dark mode support with smooth theme transitions
            </li>
            <li>
              Accessibility upgrades, including ARIA labels and keyboard
              navigation
            </li>
          </ul>
          <p className='text-muted-foreground text-lg'>
            Improved load times, optimized components, and a refined design.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>
            Challenges Dashboard (Beta)
          </h2>
          <p className='text-lg'>
            The new{' '}
            <a href='/challenges' className='text-primary hover:underline'>
              /challenges
            </a>{' '}
            dashboard serves as your hub for coding tasks. Discover challenges
            with difficulty badges, tech stack tags, and a streamlined layout.
          </p>
          <ul className='list-disc pl-6 text-lg space-y-2'>
            <li>
              Visual difficulty indicators (Beginner, Intermediate, Advanced)
            </li>
            <li>
              Tech tags for quick filtering (e.g., JavaScript, CSS, React)
            </li>
            <li>
              Upcoming: Advanced filtering and pagination for efficient
              navigation
            </li>
          </ul>
          <p className='text-lg'>
            Designed to help you code and track progress effectively.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>
            Live In-Browser Code Editor
          </h2>
          <p className='text-lg'>
            Code directly in UI Works with my integrated editor. Write, preview,
            and debug in real-time without external tools.
          </p>
          <ul className='list-disc pl-6 text-lg space-y-2'>
            <li>Supports HTML, CSS, and JavaScript with live preview</li>
            <li>Sandboxed iframes for secure, isolated rendering</li>
            <li>Auto-save and reset for a consistent experience</li>
            <li>Planned support for React, Angular, Vue, and TypeScript</li>
          </ul>
          <p className='text-lg'>
            <span className='font-medium'>Note:</span> Desktop-only for now.
            Mobile support is planned for v0.3.0.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>Now Fully Open Source</h2>
          <p className='text-lg'>
            UI Works is open source under the MIT license. Join me on{' '}
            <a
              href='https://github.com/pratikc22/ui_works'
              className='text-primary hover:underline'
            >
              GitHub
            </a>{' '}
            to contribute, report issues, or suggest features.
          </p>
          <ul className='list-disc pl-6 text-lg space-y-2'>
            <li>
              No tracking or authentication barriers—pure, open development
            </li>
            <li>Modular components with typed TypeScript logic</li>
            <li>Public roadmap and community discussions to follow</li>
          </ul>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>
            Mobile Responsiveness (In Progress)
          </h2>
          <p className='text-lg'>
            Most UI elements are mobile-friendly with responsive grids and
            adaptive layouts. The code editor is optimized for desktop due to
            viewport constraints.
          </p>
          <p className='text-lg'>
            I am testing touch-friendly controls, toolbar compression, and
            viewport scaling for full mobile support in v0.3.0.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>Roadmap to v1.0</h2>
          <p className='text-lg'>
            What’s next for UI Works? Here is my plan to make it your go-to
            coding platform:
          </p>
          <ul className='list-disc pl-6 text-lg space-y-2'>
            <li>React (JSX) and TypeScript preview sandboxes</li>
            <li>Challenge folders and category browsing</li>
            <li>Progress tracking with completion badges</li>
            <li>Leaderboards and coding streak analytics</li>
            <li>Code import/export for seamless workflows</li>
            <li>Enhanced search with fuzzy matching and filters</li>
          </ul>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold mb-6'>From the Maintainer</h2>
          <p className='text-lg'>
            UI Works is my solo project, built during late nights and spare
            time. It remains 100% free with no paywalls or premium tiers,
            created for developers by a developer.
          </p>
          <p className='text-lg'>
            My goal is an open, professional platform for coders to learn and
            build. Each update brings me closer to that vision.
          </p>
          <p className='text-lg'>
            Want to help? Star the repo, submit a PR, or share UI Works with
            others. Every contribution drives this project forward.
          </p>
        </section>

        <Separator className='my-20 bg-muted' />

        <footer className='text-center text-sm text-muted-foreground'>
          <p>
            Appreciate UI Works? Share it. Found a bug?{' '}
            <a
              href='https://github.com/pratikc22/ui_works/issues'
              className='text-primary hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Report it
            </a>
            . Want to contribute?{' '}
            <a
              href='https://github.com/pratikc22/ui_works'
              className='text-primary hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Join me
            </a>
            .
          </p>
        </footer>
      </article>
    </main>
  )
}
