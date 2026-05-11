import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`DROP TABLE IF EXISTS blogs CASCADE`;
  await sql`DROP TABLE IF EXISTS analytics CASCADE`;
  await sql`DROP TABLE IF EXISTS contacts CASCADE`;
  console.log('Old tables dropped');
}

main().catch(console.error);
