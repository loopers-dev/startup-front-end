# 🚀 Modern Startup Landing Page

A premium, motion-driven landing page template for technology startups. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features smooth animations, dark mode, responsive design, and a fully customizable architecture.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-0055ff?style=flat-square&logo=framer)

## ✨ Features

### 🎨 Design & UX
- **Premium Motion Design**: Scroll-triggered animations, smooth scrolling with Lenis, and micro-interactions
- **Dark/Light Mode**: Seamless theme switching with premium color palette
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Modern UI Components**: Beautiful, reusable components with consistent styling

### 🏗️ Architecture
- **Component-Driven**: Modular, reusable, and typed React components
- **Centralized Configuration**: All branding and site variables in one place (`config/site.ts`)
- **Type-Safe**: Full TypeScript support with strict mode
- **Performance Optimized**: Optimized animations, lazy loading, and fast page loads

### 📱 Sections Included
- **Hero Section**: Eye-catching hero with animated text and background media
- **About**: Company story and mission
- **Services**: Service offerings with interactive cards
- **Process**: Step-by-step process visualization with data flow
- **Technology Stack**: Tech stack showcase
- **System Boot Sequence**: Interactive system visualization
- **Team**: Team member showcase
- **Pricing**: Pricing plans (if needed)
- **CTA**: Call-to-action sections
- **Footer**: Complete footer with links and social media

### 🎯 Technical Features
- **SEO Optimized**: Metadata, OpenGraph tags, and structured data ready
- **Accessibility**: Respects `prefers-reduced-motion` and follows WCAG guidelines
- **Environment Context**: Dynamic background media system
- **Technical State Management**: Context-based state for interactive elements
- **Smooth Scrolling**: Lenis-powered smooth scroll experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/startup-landing.git
cd startup-landing
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure your site**
   
   Edit `config/site.ts` to update:
   - Project name
   - Website name
   - Tagline
   - Contact email
   - Social media links
   - SEO metadata

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── contact/         # Contact form endpoint
│   ├── globals.css          # Global styles & theme variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── cards/              # Card components (ProcessStep, ServiceCard)
│   ├── layout/             # Layout components (Header, Footer)
│   ├── media/              # Media components (Background, Frame)
│   ├── motion/             # Motion/animation components
│   ├── sections/           # Page sections (Hero, About, Services, etc.)
│   ├── system/             # System components (Canvas, ScrollTracker)
│   ├── tech/               # Technical visualization components
│   └── theme/              # Theme components (Provider, Toggle)
├── config/                 # Configuration files
│   ├── media.ts            # Media configuration
│   └── site.ts             # Centralized site config
├── contexts/               # React contexts
│   ├── EnvironmentContext.tsx
│   ├── MediaContext.tsx
│   └── TechnicalStateContext.tsx
└── lib/                    # Utilities
    ├── animations.ts       # Animation variants & utilities
    ├── media-discovery.ts  # Media discovery utilities
    ├── motion-tokens.ts    # Motion design tokens
    ├── motion-utils.ts     # Motion helper functions
    ├── theme.ts            # Theme utilities
    └── utils.ts            # General utilities
```

## 🎨 Customization

### Branding

Update values in `config/site.ts` - changes will reflect across the entire site:

```typescript
export const siteConfig = {
  projectName: 'Your Project Name',
  websiteName: 'Your Website',
  tagline: 'Your amazing tagline',
  contact: {
    email: 'hello@yourcompany.com',
  },
  social: {
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/company/yourcompany',
    github: 'https://github.com/yourusername',
  },
  // ... more config
}
```

### Theme Colors

Modify CSS variables in `app/globals.css`:

```css
:root {
  --color-primary: #000000;
  --color-secondary: #6b7280;
  --color-accent: #3b82f6;
  --color-background: #fff6f6;
  --color-foreground: #0a0a0a;
  /* ... */
}

.dark {
  --color-primary: #ffffff;
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  /* ... */
}
```

### Animations

Customize animation variants in `lib/animations.ts` and `lib/motion-tokens.ts`:
- Adjust timing, easing, and delays
- Create new animation variants
- Modify scroll trigger thresholds

### Content

Edit section components in `components/sections/` to update content:
- `Hero.tsx` - Hero section
- `About.tsx` - About section
- `Services.tsx` - Services section
- `Process.tsx` - Process section
- `HowWeBuild.tsx` - System boot sequence
- And more...

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theme system
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://github.com/studio-freight/lenis)
- **Deployment**: Vercel-ready (or any Node.js host)

## 📦 Dependencies

### Core Dependencies
- `next` ^14.2.0
- `react` ^18.3.0
- `react-dom` ^18.3.0
- `framer-motion` ^11.0.0
- `@studio-freight/lenis` ^1.0.42

### Dev Dependencies
- `typescript` ^5.3.3
- `tailwindcss` ^3.4.1
- `autoprefixer` ^10.4.17
- `postcss` ^8.4.33

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Connect your GitHub repo
- **AWS Amplify**: Connect your repository
- **Railway**: Deploy with one click
- **Self-hosted**: Run `npm run build && npm start`

### Environment Variables

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Next Steps

- [ ] Add contact form integration (backend endpoint ready)
- [ ] Connect to CMS (Contentful, Sanity, etc.)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Implement authentication if needed
- [ ] Set up CI/CD pipeline
- [ ] Add unit tests
- [ ] Add E2E tests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Lenis](https://github.com/studio-freight/lenis) for smooth scrolling

## 📧 Contact

For questions or support, please open an issue or contact:
- Email: hello@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

⭐ If you like this project, please give it a star on GitHub!
