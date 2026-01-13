import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.sportsArticle.createMany({
    data: [
      {
        title: "Messi wins Ballon d'Or",
        content: "Messi won his 8th Ballon d'Or in 2023",
        imageUrl: "https://example.com/messi.jpg",
      },
      {
        title: "NBA Finals",
        content: "The NBA finals were thrilling this year",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
