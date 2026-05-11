import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Seed blogs
  const blogs = await sql`SELECT id FROM blogs`;
  if (blogs.length === 0) {
    await sql`
      INSERT INTO blogs (title, excerpt, content, date, category, image, created_at, updated_at) VALUES
      ('How to Build a High-Converting Portfolio', 'Learn the essential elements every designer needs on their site to attract premium clients.', 'Your portfolio is more than a gallery — it''s your sales pitch, your credibility builder, and your first impression all rolled into one. In this deep dive, I break down the exact framework I''ve used to build portfolios that convert visitors into paying clients at a 4x higher rate than industry average.\n\nWe cover everything from information architecture and visual hierarchy to the psychology of trust signals and the perfect call-to-action placement. Whether you''re a designer, developer, or creative agency, these principles will transform how potential clients perceive your work.', 'April 15, 2026', 'Design', 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&h=400&auto=format&fit=crop', NOW(), NOW()),
      ('The Future of Web Development in 2026', 'Discover the latest trends in React, Next.js, and serverless architectures that are shaping the industry.', 'The web development landscape is evolving faster than ever. From AI-powered development workflows to edge computing and real-time collaborative applications, 2026 is bringing fundamental shifts in how we build digital products.\n\nIn this comprehensive analysis, I explore the technologies that are defining the next generation of web experiences — from React Server Components and streaming SSR to the rise of AI-assisted coding and zero-config deployments. Understanding these trends isn''t just about staying current; it''s about building products that are faster, more secure, and infinitely more scalable.', 'April 18, 2026', 'Development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&h=400&auto=format&fit=crop', NOW(), NOW()),
      ('Why Every Business Needs a Digital-First Strategy', 'Your website is your hardest-working employee. Here''s how to make it work 24/7 for your growth.', 'In today''s market, having a website isn''t optional — it''s the foundation of your entire business. But simply having a website isn''t enough. You need a digital-first strategy that turns your online presence into a revenue-generating engine.\n\nI break down the exact frameworks I''ve used to help businesses triple their qualified leads, automate their sales processes, and build systems that scale without requiring constant manual intervention. From SEO fundamentals to conversion optimization and marketing automation — this is the playbook for modern business growth.', 'April 20, 2026', 'Business', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop', NOW(), NOW())
    `;
    console.log('Blogs seeded');
  }

  // Seed analytics
  const analytics = await sql`SELECT id FROM analytics`;
  if (analytics.length === 0) {
    await sql`
      INSERT INTO analytics (views, leads, engagement_rate, top_service, created_at, updated_at) VALUES
      (1240, 42, '68%', 'Custom Web Apps', NOW(), NOW())
    `;
    console.log('Analytics seeded');
  }

  // Seed projects
  const projects = await sql`SELECT id FROM projects`;
  if (projects.length === 0) {
    await sql`
      INSERT INTO projects (title, category, image, tag, "desc", "full_desc", link, created_at, updated_at) VALUES
      ('Spark Aura Solar', 'Energy & Solar', '/sparkaurasolar.png', 'Lead Generation', 'Solar energy platform with consultation booking, pricing tools, and SEO-optimized location pages.', 'Built a complete digital presence for Spark Aura Solar — Abuja''s leading solar installation company. The platform features service pages for 10+ locations, a solar cost calculator, WhatsApp integration for instant quotes, and a blog optimized for local SEO. Result: 3x increase in qualified leads within 60 days.', 'https://sparkaurasolar.vercel.app', NOW(), NOW()),
      ('Bread, Banana & Butter', 'Service Marketplace', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&h=800&auto=format&fit=crop', 'Platform Scale', 'Multi-vendor marketplace with real-time booking, geo-location search, and seller dashboards.', 'Engineered a complete service marketplace for the Swedish market. Features include multi-vendor seller accounts, location-based service discovery, real-time availability booking, secure payments, and an admin dashboard for marketplace management.', 'https://breadbananaandbutter.se', NOW(), NOW()),
      ('Nova Analytics', 'SaaS Platform', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&auto=format&fit=crop', 'B2B SaaS', 'Real-time financial analytics dashboard with interactive visualizations and automated reporting.', 'A B2B SaaS platform for financial teams. Built real-time data pipelines, interactive D3.js visualizations, role-based access control, and automated PDF report generation. Reduced client reporting time by 85%.', NULL, NOW(), NOW()),
      ('Maison Noir', 'E-Commerce', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&h=800&auto=format&fit=crop', 'Revenue Engine', 'High-converting luxury retail platform with seamless checkout and inventory management.', 'Designed and developed a premium e-commerce experience for a luxury fashion brand. Features include one-click checkout with Stripe, real-time inventory sync, and a personalized recommendation engine. Achieved 4.2% conversion rate — 2x industry average.', NULL, NOW(), NOW())
    `;

    // Seed project tech arrays
    const projectsData = await sql`SELECT id, title FROM projects ORDER BY id`;
    const techMap: Record<string, string[]> = {
      'Spark Aura Solar': ['Next.js', 'Tailwind CSS', 'SEO'],
      'Bread, Banana & Butter': ['React', 'Node.js', 'PostgreSQL'],
      'Nova Analytics': ['TypeScript', 'D3.js', 'AWS'],
      'Maison Noir': ['Next.js', 'Stripe', 'Shopify API'],
    };
    let techIdCounter = 1;
    for (const proj of projectsData) {
      const techItems = techMap[proj.title];
      if (techItems) {
        for (let i = 0; i < techItems.length; i++) {
          await sql`
            INSERT INTO projects_tech (_order, _parent_id, id, item) VALUES (${i}, ${proj.id}, ${'tech-' + techIdCounter++}, ${techItems[i]})
          `;
        }
      }
    }
    console.log('Projects seeded');
  }

  // Seed services
  const services = await sql`SELECT id FROM services`;
  if (services.length === 0) {
    await sql`
      INSERT INTO services (id, title, "desc", tech, created_at, updated_at) VALUES
      ('01', 'Custom Development', 'Full-stack web applications built for speed, scale, and conversion. From landing pages to complex platforms.', 'React / Next.js / Node', NOW(), NOW()),
      ('02', 'E-Commerce', 'Online stores engineered to turn browsers into buyers. Seamless checkout, inventory sync, and payment integration.', 'Shopify / Stripe / Next.js', NOW(), NOW()),
      ('03', 'SEO & Growth', 'Search optimization and growth strategies that put your business in front of the right people at the right time.', 'Technical SEO / Content / Analytics', NOW(), NOW()),
      ('04', 'SaaS Platforms', 'Multi-tenant platforms with real-time features, user management, secure payments, and scalable architecture.', 'TypeScript / PostgreSQL / AWS', NOW(), NOW()),
      ('05', 'Automation', 'Business process automation and internal tools that eliminate manual work, cut costs, and free up your team.', 'Node.js / Python / APIs', NOW(), NOW()),
      ('06', 'Brand Systems', 'Cohesive design systems and visual identities that build instant trust and make your brand unforgettable.', 'Figma / Tailwind / DesignOps', NOW(), NOW())
    `;
    console.log('Services seeded');
  }

  console.log('Done!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
