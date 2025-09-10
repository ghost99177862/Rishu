const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@campusghost.local" },
    update: {},
    create: { email: "admin@campusghost.local", ghost_id: "GhostAdmin1", is_admin: true }
  });

  // Seed colleges
  const colleges = [
    { name: "ABC College of Engineering", type: "Private", established_year: 1998, location: "City A" },
    { name: "XYZ University", type: "Public", established_year: 1950, location: "City B" }
  ];
  for(const c of colleges){
    await prisma.college.upsert({
      where: { name: c.name },
      update: {},
      create: { ...c, approved: true }
    });
  }

  console.log("Seed done ✅");
}
main().catch(console.error).finally(() => prisma.$disconnect());
