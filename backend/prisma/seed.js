import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const setores = [
    "Administracao",
    "Obras",
    "Saude",
    "Educacao",
    "TI",
    "Assistencia Social"
  ];

  for (const nome of setores) {
    await prisma.setor.upsert({
      where: { nome },
      update: {},
      create: { nome, ativo: true }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erro ao executar seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
