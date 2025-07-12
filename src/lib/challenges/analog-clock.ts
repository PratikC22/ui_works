import AnalogClock from '../components/analog-clock-solution'

const boardOfBoredom = {
  id: 'analog-clock',
  title: 'Analog Clock',
  description:
    'Build a functional analog clock component that displays the current time with hour, minute, and second hands. The clock should update in real-time and be visually appealing.',
  difficulty: 'medium',
  technologies: ['html', 'css', 'javascript', 'react'],
  category: 'ui-components',
  estimatedTime: 45,
  isCompleted: false,
  featured: true,
  instructions: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item">12 hour numbers around circle</li>
        <li class="challenge-rules-item">3 hands: hour, minute, second</li>
        <li class="challenge-rules-item">Hour hand moves with minutes</li>
        <li class="challenge-rules-item">Update every second</li>
        <li class="challenge-rules-item">Center dot covers hand origins</li>
      </ul>
    `,
  hints: `
    <ul class="challenge-hints-list">
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #333; border: 1px solid #000;"></span>
        Use border <code class="challenge-hints-code">#333</code> (4px) for the clock border
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #fff; border: 1px solid #999;"></span>
        Use background <code class="challenge-hints-code">#fff</code> for the clock background
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #000; border: 1px solid #000;"></span>
        Use hour hand color <code class="challenge-hints-code">#000</code> (6px wide, 80px long)
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #000; border: 1px solid #000;"></span>
        Use minute hand color <code class="challenge-hints-code">#000</code> (4px wide, 110px long)
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #e74c3c; border: 1px solid #000;"></span>
        Use second hand color <code class="challenge-hints-code">#e74c3c</code> (2px wide, 120px long)
      </li>
      <li class="challenge-hints-item">
        Use clock diameter <code class="challenge-hints-code">300px</code>
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
    react: AnalogClock,
  },
  assets: [],
  tags: ['widget', 'dom-manipulation', 'accessibility', 'javascript'],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default boardOfBoredom
