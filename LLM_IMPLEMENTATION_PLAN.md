# LLM-Actionable Implementation Plan

## Academic Homepage Modernization

**Target:** jhuber.github.io  
**Date:** July 23, 2025  
**Status:** Ready for LLM execution

---

## 🚀 Immediate Actions (LLM Executable)

### Action 1: Critical Security Fixes

**File: Fix HTML Syntax Error**

```bash
# Location: /index.html line 19
# Issue: Stray '>' character after German comment
# Fix: Remove the orphaned '>' character
```

**File: Replace Insecure CDN Links**

```bash
# Replace Font Awesome HTTP with HTTPS
sed -i 's|http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css|https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css|g' *.html

# Replace HTML5 Shim HTTP with HTTPS
sed -i 's|http://html5shim.googlecode.com/svn/trunk/html5.js|https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js|g' *.html
```

**File: Update jQuery Version**

```bash
# Download and replace jQuery 1.8.3 with 3.7.x
curl -o js/libs/jquery-3.7.1.min.js https://code.jquery.com/jquery-3.7.1.min.js

# Update HTML references
sed -i 's|jquery-1.8.3.min.js|jquery-3.7.1.min.js|g' *.html
```

### Action 2: Accessibility Quick Wins

**File: Fix Viewport Meta Tag**

```bash
# Remove maximum-scale restriction for accessibility
sed -i 's|maximum-scale=1|maximum-scale=5|g' *.html
```

**File: Add Missing Alt Text**

```html
<!-- Add to slider images in index.html -->
<img
  src="./images/titles/header-multiforce.jpg"
  alt="Multi-Level Force Touch Input for Automotive research interface"
  title="Multi-Level Force Touch Input for Automotive (AutoUI 2017)"
/>
```

### Action 3: Performance Optimizations

**File: CSS Concatenation**

```bash
# Combine and minify CSS files
cat css/base.css css/themes/type_04.css css/themes/color_09.css > css/combined.css

# Update HTML to use single CSS file
sed -i 's|<link rel="stylesheet" href="css/base.css">.*<link rel="stylesheet" href="css/themes/color_09.css">|<link rel="stylesheet" href="css/combined.css">|g' *.html
```

---

## 🔧 Automated Script Generation

### Security Patch Script

```bash
#!/bin/bash
# security-patch.sh - Immediate security fixes

echo "🔒 Applying security patches..."

# Fix HTML syntax error
sed -i 's|<!-- das ist ein Kommentar -->[[:space:]]*>|<!-- das ist ein Kommentar -->|g' index.html

# Replace insecure CDN links
find . -name "*.html" -exec sed -i 's|http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css|https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css|g' {} +

find . -name "*.html" -exec sed -i 's|http://html5shim.googlecode.com/svn/trunk/html5.js|https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js|g' {} +

# Update jQuery
curl -s -o js/libs/jquery-3.7.1.min.js https://code.jquery.com/jquery-3.7.1.min.js
find . -name "*.html" -exec sed -i 's|jquery-1.8.3.min.js|jquery-3.7.1.min.js|g' {} +

# Fix viewport accessibility
find . -name "*.html" -exec sed -i 's|maximum-scale=1|maximum-scale=5|g' {} +

echo "✅ Security patches applied successfully!"
```

### Performance Optimization Script

```bash
#!/bin/bash
# performance-optimize.sh - Immediate performance improvements

echo "⚡ Optimizing performance..."

# Combine CSS files
cat css/base.css css/themes/type_04.css css/themes/color_09.css > css/combined.min.css

# Create backup and update HTML references
cp index.html index.html.bak
sed -i '/<link rel="stylesheet" href="css\/base.css">/,/<link rel="stylesheet" href="css\/themes\/color_09.css">/c\<link rel="stylesheet" href="css/combined.min.css">' index.html

# Apply same to other HTML files
for file in about.html projects.html publications.html; do
    cp "$file" "$file.bak"
    sed -i '/<link rel="stylesheet" href="css\/base.css">/,/<link rel="stylesheet" href="css\/themes\/color_09.css">/c\<link rel="stylesheet" href="css/combined.min.css">' "$file"
done

# Add async/defer to JavaScript
find . -name "*.html" -exec sed -i 's|<script src="js/libs/modernizr.min.js"></script>|<script async src="js/libs/modernizr.min.js"></script>|g' {} +

echo "✅ Performance optimizations applied!"
```

### Image Optimization Script

```bash
#!/bin/bash
# image-optimize.sh - Optimize images for web

echo "🖼️  Optimizing images..."

# Install imagemin if not present
if ! command -v imagemin &> /dev/null; then
    npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant
fi

# Create optimized directory
mkdir -p images/optimized

# Optimize JPG images
find images -name "*.jpg" -exec imagemin {} --plugin=mozjpeg --out-dir=images/optimized/ \;

# Optimize PNG images
find images -name "*.png" -exec imagemin {} --plugin=pngquant --out-dir=images/optimized/ \;

# Update HTML references to use optimized images
find . -name "*.html" -exec sed -i 's|src="\.\/images\/|src="./images/optimized/|g' {} +

echo "✅ Images optimized!"
```

---

## 🏗️ Migration Plan (Step-by-Step)

### Week 1: Foundation Setup

**Day 1-2: Project Initialization**

```bash
# Create new Next.js project
npx create-next-app@latest jhuber-nextjs --typescript --tailwind --eslint --app

# Install additional dependencies
cd jhuber-nextjs
npm install @next/mdx gray-matter reading-time
```

**Day 3-4: Content Migration**

```bash
# Create content structure
mkdir -p content/{publications,projects,about}

# Convert HTML to MDX
node scripts/html-to-mdx.js
```

**Day 5-7: Basic Layout Implementation**

```bash
# Create layout components
mkdir -p components/{layout,ui,academic}

# Implement responsive navigation
# Convert CSS grid system to Tailwind
# Set up typography system
```

### Week 2: Content Management

**Day 8-10: CMS Integration**

```bash
# Set up Netlify CMS
npm install netlify-cms-app

# Create admin configuration
mkdir -p public/admin
```

**Day 11-14: Publication System**

```bash
# Implement ORCID integration
npm install axios xml2js

# Create publication management system
# Add citation download functionality
```

### Week 3: Advanced Features

**Day 15-17: Search & Navigation**

```bash
# Implement client-side search
npm install fuse.js

# Add advanced filtering for publications/projects
# Create academic timeline component
```

**Day 18-21: SEO & Analytics**

```bash
# Set up structured data
npm install next-seo

# Implement Google Analytics 4
# Add sitemap generation
```

### Week 4: Deployment & Optimization

**Day 22-24: Performance Tuning**

```bash
# Set up Lighthouse CI
npm install --save-dev @lhci/cli

# Optimize bundle size
# Implement service worker
```

**Day 25-28: Launch Preparation**

```bash
# Set up monitoring
# Create deployment pipeline
# Final testing and optimization
```

---

## 📊 Progress Tracking

### Completion Checklist

**Phase 1: Emergency Fixes ✅**

- [ ] HTML syntax errors fixed
- [ ] Security vulnerabilities patched
- [ ] Basic accessibility compliance
- [ ] Performance quick wins implemented

**Phase 2: Modern Foundation**

- [ ] Static site generator selected and configured
- [ ] Content architecture designed
- [ ] Responsive design implemented
- [ ] Basic CMS functionality working

**Phase 3: Academic Features**

- [ ] ORCID integration complete
- [ ] Publication management system
- [ ] Project showcase enhanced
- [ ] Contact and CV sections improved

**Phase 4: Launch Ready**

- [ ] Performance targets met (Lighthouse 90+)
- [ ] Accessibility compliance verified
- [ ] SEO optimization complete
- [ ] Monitoring and analytics configured

---

## 🎯 Quality Gates

### Phase 1 Acceptance Criteria

- No HTTP resources in HTTPS context
- HTML validates without errors
- Core Web Vitals in "Good" range
- Basic keyboard navigation functional

### Phase 2 Acceptance Criteria

- Mobile-first responsive design
- Sub-2-second page load times
- Content editable via CMS
- Automated deployment working

### Phase 3 Acceptance Criteria

- Publications auto-sync from ORCID
- Structured data validation passes
- Contact forms functional
- Search working across content

### Phase 4 Acceptance Criteria

- Lighthouse score 95+ all categories
- WCAG 2.1 AA compliance verified
- Analytics and monitoring active
- Documentation complete

---

## 🚨 Risk Mitigation

### Technical Risks

**Risk:** Migration breaks existing URLs  
**Mitigation:** Implement 301 redirects, maintain URL structure

**Risk:** Content loss during migration  
**Mitigation:** Full backup, incremental migration, version control

**Risk:** Performance regression  
**Mitigation:** Lighthouse CI gates, performance budget alerts

### Timeline Risks

**Risk:** Underestimated complexity  
**Mitigation:** 20% buffer time, MVP-first approach

**Risk:** Feature creep  
**Mitigation:** Strict scope definition, phase gates

---

## 💡 Success Metrics Dashboard

### Technical KPIs

- Page Speed Score: Target 95+ (Current: ~60)
- Bundle Size: Target <200KB (Current: ~2MB)
- Accessibility Score: Target 100 (Current: ~70)
- SEO Score: Target 95+ (Current: ~75)

### Business KPIs

- Contact Form Submissions: +50%
- Publication Downloads: +100%
- Mobile User Engagement: +75%
- Search Console Impressions: +200%

### Academic KPIs

- ORCID Profile Views: Track baseline
- Citation Downloads: Track baseline
- Research Collaboration Inquiries: Track baseline
- Student Contact Rate: Track baseline

---

_This implementation plan is designed for execution by both human developers and LLM assistants, with clear automation scripts and step-by-step instructions._
