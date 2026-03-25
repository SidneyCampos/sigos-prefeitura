import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../prisma/database.db");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
  console.log(`Arquivo SQLite criado em: ${dbPath}`);
} else {
  console.log(`Arquivo SQLite ja existe em: ${dbPath}`);
}
