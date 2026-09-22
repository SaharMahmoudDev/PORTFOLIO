import { createInterface } from "node:readline/promises";
import { compareSync } from "bcryptjs";

// Local troubleshooting helper: checks a freshly typed password against the
// hash currently in .env.local, without printing or sending the password
// anywhere. Run it directly, never paste its output (or your password) into
// a chat.
async function promptPassword() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const password = await rl.question("Password to check: ");
  rl.close();
  return password;
}

async function main() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    console.error("ADMIN_PASSWORD_HASH is not set (check .env.local).");
    process.exit(1);
  }

  const password = await promptPassword();
  console.log(compareSync(password, hash) ? "MATCH" : "NO MATCH");
}

void main();
