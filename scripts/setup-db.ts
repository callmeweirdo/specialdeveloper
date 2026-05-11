import { sql } from "../lib/db.ts";

async function setup() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      views INTEGER DEFAULT 0,
      leads INTEGER DEFAULT 0,
      engagement_rate TEXT DEFAULT '0%',
      top_service TEXT DEFAULT '',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  console.log("Seeding data...");

  const existingBlogs = await sql`SELECT COUNT(*) FROM blogs`;
  if (Number(existingBlogs[0].count) === 0) {
    await sql`
      INSERT INTO blogs (title, excerpt, content, date, category, image) VALUES
      ('How to Build a High-Converting Portfolio', 'Learn the essential elements every designer needs on their site to attract premium clients.', 'Your portfolio is more than a gallery — it''s your sales pitch, your credibility builder, and your first impression all rolled into one. In this deep dive, I break down the exact framework I''ve used to build portfolios that convert visitors into paying clients at a 4x higher rate than industry average.\n\nWe cover everything from information architecture and visual hierarchy to the psychology of trust signals and the perfect call-to-action placement. Whether you''re a designer, developer, or creative agency, these principles will transform how potential clients perceive your work.', 'April 15, 2026', 'Design', 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&h=400&auto=format&fit=crop'),
      ('The Future of Web Development in 2026', 'Discover the latest trends in React, Next.js, and serverless architectures that are shaping the industry.', 'The web development landscape is evolving faster than ever. From AI-powered development workflows to edge computing and real-time collaborative applications, 2026 is bringing fundamental shifts in how we build digital products.\n\nIn this comprehensive analysis, I explore the technologies that are defining the next generation of web experiences — from React Server Components and streaming SSR to the rise of AI-assisted coding and zero-config deployments. Understanding these trends isn''t just about staying current; it''s about building products that are faster, more secure, and infinitely more scalable.', 'April 18, 2026', 'Development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&h=400&auto=format&fit=crop'),
      ('Why Every Business Needs a Digital-First Strategy', 'Your website is your hardest-working employee. Here''s how to make it work 24/7 for your growth.', 'In today''s market, having a website isn''t optional — it''s the foundation of your entire business. But simply having a website isn''t enough. You need a digital-first strategy that turns your online presence into a revenue-generating engine.\n\nI break down the exact frameworks I''ve used to help businesses triple their qualified leads, automate their sales processes, and build systems that scale without requiring constant manual intervention. From SEO fundamentals to conversion optimization and marketing automation — this is the playbook for modern business growth.', 'April 20, 2026', 'Business', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop')
    `;
  }

  const existingAnalytics = await sql`SELECT COUNT(*) FROM analytics`;
  if (Number(existingAnalytics[0].count) === 0) {
    await sql`
      INSERT INTO analytics (views, leads, engagement_rate, top_service) VALUES
      (1240, 42, '68%', 'Custom Web Apps')
    `;
  }

  console.log("Done!");
  process.exit(0);
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
