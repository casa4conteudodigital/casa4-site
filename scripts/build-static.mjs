import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve('next/dist/bin/next'), 'build'], {
  stdio: 'inherit', env: { ...process.env, CASA4_STATIC_EXPORT: '1' },
});
if (result.error) { console.error(result.error); process.exit(1); }
process.exit(result.status ?? 1);
