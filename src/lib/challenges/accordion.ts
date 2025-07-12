import AccordionDemo from '../components/accordion-solution'

const accordion = {
  id: 'accordion',
  title: 'Interactive Accordion',
  description:
    'Build a classic accordion component where only one item can be open at a time. The component should be responsive and accessible.',
  difficulty: 'easy',
  technologies: ['html', 'css', 'javascript'],
  category: 'ui-components',
  estimatedTime: 45,
  isCompleted: false,
  featured: true,
  instructions: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item">Only one section can be open at a time</li>
        <li class="challenge-rules-item">Click any header to expand that section</li>
        <li class="challenge-rules-item">Click the same header again to collapse it</li>
        <li class="challenge-rules-item">Use keyboard navigation (Tab/Enter/Space) for accessibility</li>
        <li class="challenge-rules-item">Content should expand smoothly without jumping</li>
      </ul>
    `,
  hints: `
      <ul class="challenge-hints-list">
        <li class="challenge-hints-item">
          <span class="challenge-hints-sample" style="background-color: #f9f9f9; border: 1px solid #999;"></span>
          Use background <code class="challenge-hints-code">#f9f9f9</code> for headers
        </li>
        <li class="challenge-hints-item">
          <span class="challenge-hints-sample" style="background-color: #fff; border: 1px solid #999;"></span>
          Use background <code class="challenge-hints-code">#fff</code> for content
        </li>
        <li class="challenge-hints-item">
          <span class="challenge-hints-sample" style="background-color: #333; border: 1px solid #000;"></span>
          Use <code class="challenge-hints-code">#333</code> for main borders
        </li>
        <li class="challenge-hints-item">
          <span class="challenge-hints-sample" style="background-color: #ccc; border: 1px solid #999;"></span>
          Use <code class="challenge-hints-code">#ccc</code> for divider borders
        </li>
        <li class="challenge-hints-item">
          Animate height directly, not maxHeight for smooth transitions
        </li>
        <li class="challenge-hints-item">
          Use refs to measure actual content height
        </li>
      </ul>
    `,
  standards: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item">Keep content concise and scannable</li>
        <li class="challenge-rules-item">Use clear, descriptive section titles</li>
        <li class="challenge-rules-item">Maintain consistent spacing and typography</li>
        <li class="challenge-rules-item">Provide visual feedback for hover and active states</li>
        <li class="challenge-rules-item">Include ARIA attributes for screen readers</li>
        <li class="challenge-rules-item">Test with keyboard navigation</li>
        <li class="challenge-rules-item">Consider mobile responsiveness</li>
      </ul>
    `,
  issues: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item"><strong>Jittery animations:</strong> Avoid maxHeight transitions, use actual height</li>
        <li class="challenge-rules-item"><strong>Poor accessibility:</strong> Missing ARIA labels and keyboard support</li>
        <li class="challenge-rules-item"><strong>Layout shifts:</strong> Content jumping during expand/collapse</li>
        <li class="challenge-rules-item"><strong>Mobile issues:</strong> Touch targets too small, poor responsive design</li>
        <li class="challenge-rules-item"><strong>Performance:</strong> Too many DOM manipulations during animation</li>
        <li class="challenge-rules-item"><strong>Browser compatibility:</strong> CSS transitions not supported in older browsers</li>
      </ul>
    `,
  startingCode: {
    html: ``,
    css: ``,
    javascript: ``,
  },
  solutionCode: {
    html: ``,
    css: ``,
    javascript: ``,
    react: AccordionDemo,
  },
  assets: [],
  tags: ['accordion', 'dom-manipulation', 'accessibility', 'javascript'],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default accordion
