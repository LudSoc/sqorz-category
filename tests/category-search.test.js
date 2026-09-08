// Tests de la recherche pilote du tableau (tokens, navigation circulaire).
// Code extrait de index.html (pas recopié) ; norm vient de common.js.
// Usage : node --test tests/category-search.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const commonSrc = fs.readFileSync(path.join(__dirname, '..', '..', 'sqorz_stats', 'common.js'), 'utf8');
const SC = new Function('window', commonSrc + '\nreturn window.SqorzCommon;')({});
function block(start, indent = '  ') {
  const i = src.indexOf(start);
  if (i < 0) throw new Error('marqueur introuvable : ' + start);
  const j = src.indexOf('\n' + indent + '}\n', i);
  if (j < 0) throw new Error('fin de bloc introuvable pour : ' + start);
  return src.slice(i, j + ('\n' + indent + '}\n').length);
}
const H = new Function('norm',
  block('function matchTokens(key, query) {') + '\n' +
  block('function wrapSearchPos(pos, n) {') +
  '\nreturn { matchTokens, wrapSearchPos };'
)(SC.norm);

test('matchTokens : tous les mots, ordre indifférent, accents', () => {
  assert.equal(H.matchTokens('jean dupont', 'dupont jean'), true);
  assert.equal(H.matchTokens('jean dupont', 'dupont'), true);
  assert.equal(H.matchTokens('jean dupont', 'jean dupont extra'), false);
  assert.equal(H.matchTokens('eleonore martin', 'eleonore'), true);
  assert.equal(H.matchTokens('jean dupont', ''), false);
  assert.equal(H.matchTokens('jean dupont', '   '), false);
  assert.equal(H.matchTokens('', 'dupont'), false);
  assert.equal(H.matchTokens(null, 'dupont'), false);
});

test('matchTokens : sensible au mot complet partiel (préfixe OK)', () => {
  assert.equal(H.matchTokens('jean dupont', 'dup'), true);
  assert.equal(H.matchTokens('jean dupont', 'dupont jean-marie'), false);
});

test('wrapSearchPos : circulaire dans les deux sens', () => {
  assert.equal(H.wrapSearchPos(0, 5), 0);
  assert.equal(H.wrapSearchPos(5, 5), 0);
  assert.equal(H.wrapSearchPos(-1, 5), 4);
  assert.equal(H.wrapSearchPos(-6, 5), 4);
  assert.equal(H.wrapSearchPos(7, 5), 2);
  assert.equal(H.wrapSearchPos(0, 0), 0);
  assert.equal(H.wrapSearchPos(3, 1), 0);
});
