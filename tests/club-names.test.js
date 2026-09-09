// Tests des noms complets de clubs (clubs.json + helpers dans index.html).
// Format : « BMX BESANCON (BESANC) », repli code seul si inconnu.
// Usage : node --test tests/club-names.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
function block(start, indent = '  ') {
  const i = src.indexOf(start);
  if (i < 0) throw new Error('marqueur introuvable : ' + start);
  const j = src.indexOf('\n' + indent + '}\n', i);
  if (j < 0) throw new Error('fin de bloc introuvable pour : ' + start);
  return src.slice(i, j + ('\n' + indent + '}\n').length);
}
const harness = [
  block('const normClubCode = s =>'),
  'for (const [k, v] of Object.entries(__SEED)) clubFullNames.set(k, v);',
  block('function clubDisplayName(raw) {'),
].join('\n') + '\nreturn { normClubCode, clubDisplayName };';
const H = seed => new Function('__SEED', harness)(seed);

test('connu → « Nom (CODE) »', () => {
  const h = H({ beynos: "AIN'PULSION COTIERE BMX" });
  assert.equal(h.clubDisplayName('BEYNOS'), "AIN'PULSION COTIERE BMX (BEYNOS)");
});

test('inconnu → code seul', () => {
  const h = H({});
  assert.equal(h.clubDisplayName('AZE'), 'AZE');
});

test('modale pilote : club affiché via clubDisplayName', () => {
  assert.ok(src.includes('` · ${clubDisplayName(club)}`'), 'rendu modale branché');
});

test('clubs.json : copie conforme au canonique club_stats', () => {
  const local = fs.readFileSync(path.join(__dirname, '..', 'clubs.json'), 'utf8');
  const ref = fs.readFileSync(path.join(__dirname, '..', '..', 'club_stats', 'clubs.json'), 'utf8');
  assert.equal(local, ref, 'copie exacte (via tools/sync-clubs.sh)');
});
