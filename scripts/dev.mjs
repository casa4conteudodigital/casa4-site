import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

// Aceita também os argumentos usados por ambientes de pré-visualização.
const require = createRequire(import.meta.url);
const args = process.argv.slice(2)
  .filter(arg => arg !== '--strictPort')
  .map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', ...args], {
  stdio: 'inherit',
  env: process.env,
});
child.on('error', error => { console.error(error); process.exit(1); });
child.on('exit', code => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
