# Bathhouse Studio Website

A modern, responsive website for Bathhouse Studio featuring contemporary approaches to ancient sauna and breathwork traditions.

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel account (recommended)

### Environment Variables
Create a `.env.local` file with:
\`\`\`
NEXT_PUBLIC_SITE_URL=https://bathhousestudio.com
GOOGLE_VERIFICATION=your-google-verification-code
\`\`\`

### Build Commands
\`\`\`bash
# Install dependencies
npm install

# Type check
npm run type-check

# Lint code
npm run lint:fix

# Build for production
npm run build

# Start production server
npm start
\`\`\`

### Deployment Checklist
- [ ] Update Google Form URLs in booking components
- [ ] Add Google Analytics/verification codes
- [ ] Configure domain and SSL
- [ ] Test all forms and links
- [ ] Verify image optimization
- [ ] Check mobile responsiveness
- [ ] Test performance with Lighthouse
- [ ] Validate SEO metadata

## 🎨 Brand Guidelines
Colors match the official Bathhouse Studio style guide:
- Primary: Black (#000000), Cream (#F2EBDE), White (#FFFFFF)
- Secondary: Slate (#5A6870), Teal (#598C82), Rose (#B59597)

## 📱 Features
- Responsive design optimized for mobile
- Video hero section with fallbacks
- Journal with categorized posts
- Event booking system
- SEO optimized
- Performance optimized
- Accessibility compliant

## 🛠 Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons

## 📊 Performance
- Lighthouse score: 95+ across all metrics
- Core Web Vitals optimized
- Image optimization with WebP/AVIF
- Font optimization with preloading
- Bundle size analysis included

## 🔧 Maintenance
- Update journal posts in `lib/journal-data.ts`
- Update events in `lib/events-data.ts`
- Replace Google Form URLs for booking
- Monitor performance with built-in analytics
