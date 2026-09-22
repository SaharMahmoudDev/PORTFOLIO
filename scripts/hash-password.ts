import { createInterface } from "node:readline/promises";
import { hashSync } from "bcryptjs";

// Prompted interactively instead of taken as a CLI argument, so shells
// (PowerShell, Git Bash, cmd) never get a chance to reinterpret characters
// like $, `, ! or " in the password before it reaches bcrypt.
async function promptPassword() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const password = await rl.question("Password to hash: ");
  rl.close();
  return password;
}

async function main() {
  const password = await promptPassword();

  if (!password) {
    console.error("No password entered.");
    process.exit(1);
  }

  const hash = hashSync(password, 12);

  // Next.js expands unescaped `$name` sequences in .env files (the same
  // syntax as bcrypt's `$2b$12$...` prefix), which silently corrupts the
  // hash. Escaping every `$` as `\$` here is what actually belongs in
  // .env.local — paste this line, not the raw hash.
  const envSafeHash = hash.replace(/\$/g, "\\$");

  console.log("\nAdd this line to .env.local:\n");
  console.log(`ADMIN_PASSWORD_HASH="${envSafeHash}"`);
}

void main();
