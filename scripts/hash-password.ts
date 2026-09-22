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

  console.log(hashSync(password, 12));
}

void main();
