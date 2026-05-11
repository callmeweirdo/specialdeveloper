import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const blogs = await sql`SELECT * FROM blogs`;
  const analytics = await sql`SELECT * FROM analytics`;
  const contacts = await sql`SELECT * FROM contacts`;
  console.log('---BLOGS_START---');
  console.log(JSON.stringify(blogs));
  console.log('---BLOGS_END---');
  console.log('---ANALYTICS_START---');
  console.log(JSON.stringify(analytics));
  console.log('---ANALYTICS_END---');
  console.log('---CONTACTS_START---');
  console.log(JSON.stringify(contacts));
  console.log('---CONTACTS_END---');
}

main().catch(console.error);
