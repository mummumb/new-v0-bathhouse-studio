# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Content Updates
- [ ] Replace Google Form URLs in `components/booking-form.tsx`
- [ ] Update contact email addresses
- [ ] Verify all image paths and assets
- [ ] Check journal post content and images
- [ ] Update event dates and information

### 2. SEO & Analytics
- [ ] Add Google verification code to `app/layout.tsx`
- [ ] Configure Google Analytics (if needed)
- [ ] Update `metadataBase` URL in layout
- [ ] Verify structured data markup
- [ ] Test social media previews

### 3. Performance Optimization
- [ ] Run `npm run build` and check for errors
- [ ] Analyze bundle size with `npm run analyze`
- [ ] Optimize images (already configured)
- [ ] Test Core Web Vitals
- [ ] Verify font loading performance

### 4. Security & Headers
- [ ] Security headers configured in `next.config.mjs`
- [ ] CSP policies for images and videos
- [ ] HTTPS redirect configured
- [ ] Proper cache headers for static assets

## Vercel Deployment

### 1. Connect Repository
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### 2. Environment Variables
Set in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL=https://bathhousestudio.com`
- `GOOGLE_VERIFICATION=your-code`

### 3. Domain Configuration
- Add custom domain in Vercel dashboard
- Configure DNS records
- Enable automatic HTTPS

### 4. Performance Monitoring
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Set up error tracking

## Post-Deployment Testing

### 1. Functionality Tests
- [ ] All pages load correctly
- [ ] Navigation works on mobile/desktop
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] Videos play with fallbacks

### 2. SEO Tests
- [ ] Google Search Console verification
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt at `/robots.txt`
- [ ] Meta tags display correctly
- [ ] Social media previews work

### 3. Performance Tests
- [ ] Lighthouse audit (95+ score target)
- [ ] Mobile page speed
- [ ] Image optimization working
- [ ] Font loading optimized
- [ ] Core Web Vitals passing

### 4. Accessibility Tests
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast ratios
- [ ] Alt text for images
- [ ] Focus indicators

## Maintenance

### Regular Updates
- Update journal posts monthly
- Review and update event information
- Monitor performance metrics
- Update dependencies quarterly
- Backup content regularly

### Monitoring
- Set up uptime monitoring
- Monitor Core Web Vitals
- Track user analytics
- Monitor error rates
- Review security headers

## Support
For technical issues, contact the development team or refer to the Next.js documentation.
