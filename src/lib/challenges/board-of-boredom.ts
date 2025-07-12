import BoardOfBoredom from '../components/board-of-boredom'

const boardOfBoredom = {
  id: 'board-of-boredom',
  title: 'Board of Boredom',
  description:
    'Build a classic board game with a 10x10 grid where players roll dice to move from position 1 to 100. The game should be interactive and visually appealing.',
  difficulty: 'easy',
  technologies: ['html', 'css', 'javascript', 'react'],
  category: 'ui-components',
  estimatedTime: 45,
  isCompleted: false,
  featured: true,
  instructions: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item">10x10 grid numbered 1-100 in zigzag pattern</li>
        <li class="challenge-rules-item">Player starts at position 1</li>
        <li class="challenge-rules-item">Roll dice to move player position</li>
        <li class="challenge-rules-item">Reach position 100 to win</li>
        <li class="challenge-rules-item">Show current position with black dot indicator</li>
      </ul>
    `,
  hints: `
    <ul class="challenge-hints-list">
      <li class="challenge-hints-item">
        <em>Hints are for visual mimicry only. You can use any implementation as long as the UI matches.</em>
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #fdfdfd; border: 1px solid #999;"></span>
        Use background <code class="challenge-hints-code">#fdfdfd</code> for regular tiles
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #f5d0c5; border: 1px solid #999;"></span>
        Use background <code class="challenge-hints-code">#f5d0c5</code> for even-numbered tiles
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #d1e7dd; border: 1px solid #999;"></span>
        Use background <code class="challenge-hints-code">#d1e7dd</code> for even rows
      </li>
      <li class="challenge-hints-item">
        <span class="challenge-hints-sample" style="background-color: #cfe2f3; border: 1px solid #999;"></span>
        Use background <code class="challenge-hints-code">#cfe2f3</code> for even rows with even numbers
      </li>
      <li class="challenge-hints-item">
        Use tile size <code class="challenge-hints-code">60x60px</code> with border <code class="challenge-hints-code">#444</code>
      </li>
      <li class="challenge-hints-item">
        Use black dot <code class="challenge-hints-code">18x18px</code> with white border for player position
      </li>
    </ul>
    `,
  standards: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item"><strong>Semantic HTML:</strong> Use appropriate HTML5 elements like <code>&lt;section&gt;</code> for main content areas</li>
        <li class="challenge-rules-item"><strong>Interactive Elements:</strong> Implement proper button functionality with click handlers and visual feedback</li>
        <li class="challenge-rules-item"><strong>Responsive Design:</strong> Implement CSS media queries for mobile-first responsive layout</li>
        <li class="challenge-rules-item"><strong>Visual Indicators:</strong> Provide clear visual feedback for current player position and game status</li>
        <li class="challenge-rules-item"><strong>Game Logic:</strong> Implement proper win conditions and game reset functionality</li>
        <li class="challenge-rules-item"><strong>CSS Grid/Flexbox:</strong> Use modern CSS layout techniques for the game board structure</li>
      </ul>
    `,
  issues: `
      <ul class="challenge-rules-list">
        <li class="challenge-rules-item"><strong>Zigzag numbering logic:</strong> Complex array manipulation for alternating row directions</li>
        <li class="challenge-rules-item"><strong>State synchronization:</strong> Managing multiple state variables (position, dice, win condition)</li>
        <li class="challenge-rules-item"><strong>Grid layout responsiveness:</strong> Maintaining aspect ratio and readability on mobile devices</li>
        <li class="challenge-rules-item"><strong>Visual positioning:</strong> Accurate placement of player indicator relative to tile numbers</li>
        <li class="challenge-rules-item"><strong>Game boundary logic:</strong> Preventing player from moving beyond position 100</li>
        <li class="challenge-rules-item"><strong>Performance optimization:</strong> Efficient rendering of 100 tiles with conditional styling</li>
        <li class="challenge-rules-item"><strong>CSS specificity conflicts:</strong> Managing complex color schemes across different tile states</li>
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
    react: BoardOfBoredom,
  },
  assets: [],
  tags: ['game', 'dom-manipulation', 'accessibility', 'javascript'],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default boardOfBoredom
