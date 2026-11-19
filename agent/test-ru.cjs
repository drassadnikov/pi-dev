const { createJiti } = require('C:/Users/HOME-PC/.pi/agent/npm/node_modules/jiti');
const jiti = createJiti(__filename);
const mod = jiti('C:/Users/HOME-PC/.pi/agent/extensions/pi-i18n-ru.ts');
const ext = mod.default;
const fakePi = {
  Theme: class { fg(t,s){return s;} bold(s){return s;} italic(s){return s;} underline(s){return s;} inverse(s){return s;} strikethrough(s){return s;} },
  registerTool: (t) => t,
  registerCommand: (n,o) => o,
  KeybindingsManager: class { static create(){ return { getDefinitions: () => ({}) }; } },
  ui: {},
};
(async () => {
  await ext(fakePi);
  const orig = process.stdout.write.bind(process.stdout);
  const out = [];
  process.stdout.write = (c) => { out.push(c); return true; };
  process.stdout.write('Welcome back!');
  process.stdout.write(['Tips', 'Loaded', 'Recent sessions']);
  process.stdout.write(Buffer.from('  Enter/Space to change · Esc to cancel'));
  process.stdout.write(' 81 skills');
  process.stdout.write(' ≈ 15k initial prompt tokens');
  process.stdout.write(' (1m ago)');
  process.stdout.write('Press any key to continue (29s)');
  process.stdout.write(' / for commands');
  process.stdout.write(' ! to run bash');
  process.stdout.write('Shift+Tab cycle thinking');
  process.stdout.write = orig;
  for (const c of out) orig(JSON.stringify(Buffer.isBuffer(c) ? c.toString('utf8') : c) + '
');
  process.exit(0);
})();
