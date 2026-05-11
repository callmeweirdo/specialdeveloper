import { getPayload } from 'payload';
import config from '@payload-config';

async function seed() {
  const payload = await getPayload({ config });

  // Seed blogs
  const blogsCount = await payload.count({ collection: 'blogs' });
  if (blogsCount.totalDocs === 0) {
    await payload.create({
      collection: 'blogs',
      data: {
        title: 'How to Build a High-Converting Portfolio',
        excerpt: 'Learn the essential elements every designer needs on their site to attract premium clients.',
        content: 'Your portfolio is more than a gallery — it\'s your sales pitch, your credibility builder, and your first impression all rolled into one. In this deep dive, I break down the exact framework I\'ve used to build portfolios that convert visitors into paying clients at a 4x higher rate than industry average.\n\nWe cover everything from information architecture and visual hierarchy to the psychology of trust signals and the perfect call-to-action placement. Whether you\'re a designer, developer, or creative agency, these principles will transform how potential clients perceive your work.',
        date: 'April 15, 2026',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&h=400&auto=format&fit=crop',
      },
    });
    await payload.create({
      collection: 'blogs',
      data: {
        title: 'The Future of Web Development in 2026',
        excerpt: 'Discover the latest trends in React, Next.js, and serverless architectures that are shaping the industry.',
        content: 'The web development landscape is evolving faster than ever. From AI-powered development workflows to edge computing and real-time collaborative applications, 2026 is bringing fundamental shifts in how we build digital products.\n\nIn this comprehensive analysis, I explore the technologies that are defining the next generation of web experiences — from React Server Components and streaming SSR to the rise of AI-assisted coding and zero-config deployments. Understanding these trends isn\'t just about staying current; it\'s about building products that are faster, more secure, and infinitely more scalable.',
        date: 'April 18, 2026',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&h=400&auto=format&fit=crop',
      },
    });
    await payload.create({
      collection: 'blogs',
      data: {
        title: 'Why Every Business Needs a Digital-First Strategy',
        excerpt: 'Your website is your hardest-working employee. Here\'s how to make it work 24/7 for your growth.',
        content: 'In today\'s market, having a website isn\'t optional — it\'s the foundation of your entire business. But simply having a website isn\'t enough. You need a digital-first strategy that turns your online presence into a revenue-generating engine.\n\nI break down the exact frameworks I\'ve used to help businesses triple their qualified leads, automate their sales processes, and build systems that scale without requiring constant manual intervention. From SEO fundamentals to conversion optimization and marketing automation — this is the playbook for modern business growth.',
        date: 'April 20, 2026',
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop',
      },
    });
    console.log('Blogs seeded');
  }

  // Seed analytics
  const analyticsCount = await payload.count({ collection: 'analytics' });
  if (analyticsCount.totalDocs === 0) {
    await payload.create({
      collection: 'analytics',
      data: {
        views: 1240,
        leads: 42,
        engagementRate: '68%',
        topService: 'Custom Web Apps',
      },
    });
    console.log('Analytics seeded');
  }

  // Seed projects
  const projectsCount = await payload.count({ collection: 'projects' });
  if (projectsCount.totalDocs === 0) {
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Spark Aura Solar',
        category: 'Energy & Solar',
        image: '/sparkaurasolar.png',
        tag: 'Lead Generation',
        desc: 'Solar energy platform with consultation booking, pricing tools, and SEO-optimized location pages.',
        fullDesc: 'Built a complete digital presence for Spark Aura Solar — Abuja\'s leading solar installation company. The platform features service pages for 10+ locations, a solar cost calculator, WhatsApp integration for instant quotes, and a blog optimized for local SEO. Result: 3x increase in qualified leads within 60 days.',
        tech: [{ item: 'Next.js' }, { item: 'Tailwind CSS' }, { item: 'SEO' }],
        link: 'https://sparkaurasolar.vercel.app',
      },
    });
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Bread, Banana & Butter',
        category: 'Service Marketplace',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&h=800&auto=format&fit=crop',
        tag: 'Platform Scale',
        desc: 'Multi-vendor marketplace with real-time booking, geo-location search, and seller dashboards.',
        fullDesc: 'Engineered a complete service marketplace for the Swedish market. Features include multi-vendor seller accounts, location-based service discovery, real-time availability booking, secure payments, and an admin dashboard for marketplace management.',
        tech: [{ item: 'React' }, { item: 'Node.js' }, { item: 'PostgreSQL' }],
        link: 'https://breadbananaandbutter.se',
      },
    });
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Nova Analytics',
        category: 'SaaS Platform',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&auto=format&fit=crop',
        tag: 'B2B SaaS',
        desc: 'Real-time financial analytics dashboard with interactive visualizations and automated reporting.',
        fullDesc: 'A B2B SaaS platform for financial teams. Built real-time data pipelines, interactive D3.js visualizations, role-based access control, and automated PDF report generation. Reduced client reporting time by 85%.',
        tech: [{ item: 'TypeScript' }, { item: 'D3.js' }, { item: 'AWS' }],
      },
    });
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Maison Noir',
        category: 'E-Commerce',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&h=800&auto=format&fit=crop',
        tag: 'Revenue Engine',
        desc: 'High-converting luxury retail platform with seamless checkout and inventory management.',
        fullDesc: 'Designed and developed a premium e-commerce experience for a luxury fashion brand. Features include one-click checkout with Stripe, real-time inventory sync, and a personalized recommendation engine. Achieved 4.2% conversion rate — 2x industry average.',
        tech: [{ item: 'Next.js' }, { item: 'Stripe' }, { item: 'Shopify API' }],
      },
    });
    console.log('Projects seeded');
  }

  // Seed services
  const servicesCount = await payload.count({ collection: 'services' });
  if (servicesCount.totalDocs === 0) {
    const services = [
      { id: '01', title: 'Custom Development', desc: 'Full-stack web applications built for speed, scale, and conversion. From landing pages to complex platforms.', tech: 'React / Next.js / Node' },
      { id: '02', title: 'E-Commerce', desc: 'Online stores engineered to turn browsers into buyers. Seamless checkout, inventory sync, and payment integration.', tech: 'Shopify / Stripe / Next.js' },
      { id: '03', title: 'SEO & Growth', desc: 'Search optimization and growth strategies that put your business in front of the right people at the right time.', tech: 'Technical SEO / Content / Analytics' },
      { id: '04', title: 'SaaS Platforms', desc: 'Multi-tenant platforms with real-time features, user management, secure payments, and scalable architecture.', tech: 'TypeScript / PostgreSQL / AWS' },
      { id: '05', title: 'Automation', desc: 'Business process automation and internal tools that eliminate manual work, cut costs, and free up your team.', tech: 'Node.js / Python / APIs' },
      { id: '06', title: 'Brand Systems', desc: 'Cohesive design systems and visual identities that build instant trust and make your brand unforgettable.', tech: 'Figma / Tailwind / DesignOps' },
    ];
    for (const svc of services) {
      await payload.create({ collection: 'services', data: svc });
    }
    console.log('Services seeded');
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
