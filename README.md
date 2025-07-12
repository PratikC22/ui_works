# UI Works - Frontend Interview Platform

A modern, interactive platform for conducting frontend technical interviews with real-time coding challenges.

## 🚀 Features

- **Interactive Coding Environment** - Real-time HTML/CSS/JS editor with live preview
- **Professional Challenges** - Curated frontend challenges that mirror real-world scenarios
- **Interview Tools** - Built specifically for technical interview workflows
- **Modern UI/UX** - Clean, responsive design with dark/light theme support
- **Code Persistence** - Auto-save functionality with localStorage
- **Export Options** - Download code as ZIP or individual files
- **Accessibility** - Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🎯 Use Cases

- **Technical Interviews** - Evaluate frontend development skills
- **Skill Assessment** - Test real-world coding abilities
- **Learning Platform** - Practice frontend development
- **Portfolio Building** - Create showcase-worthy projects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pratikc22/ui-works.git

# Navigate to the project
cd ui-works

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── challenge/        # Challenge-specific components
│   ├── layout/           # Layout components
│   └── ui/              # Base UI components (Radix)
├── lib/                  # Utilities and data
│   ├── challenges/      # Challenge definitions
│   ├── components/      # Solution components
│   └── types.ts         # TypeScript definitions
├── store/               # Zustand state management
├── providers/           # Context providers
└── hooks/               # Custom React hooks
```

## 🎨 Adding New Challenges

1. Create a new challenge file in `src/lib/challenges/`
2. Follow the existing pattern with proper TypeScript types
3. Add solution component in `src/lib/components/`
4. Update `src/lib/data.ts` to include the new challenge

Example challenge structure:

```typescript
const myChallenge = {
  id: 'my-challenge',
  title: 'My Challenge',
  description: 'Challenge description',
  difficulty: 'medium',
  technologies: ['html', 'css', 'javascript'],
  category: 'ui-components',
  // ... other properties
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Pratik Avinash Chaudhari** - Senior Software Engineer at Nference Labs

- GitHub: [@PratikC22](https://github.com/PratikC22)
- LinkedIn: [Pratik Chaudhari](https://linkedin.com/in/PratikC22)
- Email: your.email@example.com

Built with ❤️ for the developer community to improve the technical interview experience.

## 🙏 Acknowledgments

- [Radix UI](https://radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://framer.com/motion) for animations
- [Lucide](https://lucide.dev/) for icons
- The open source community for inspiration and tools

## 📊 Status

- ✅ Alpha Version - Core functionality complete
- 🔄 Beta Version - Coming soon with more challenges
- 🚀 Production - Planned with enterprise features

---

**Made with ❤️ by [Pratik Avinash Chaudhari](https://github.com/pratikc22)**
