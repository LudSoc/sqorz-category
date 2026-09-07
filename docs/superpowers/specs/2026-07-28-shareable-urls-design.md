# URLs partageables — Design (category_stats)

Date : 2026-07-28

Voir spec complète : `club_stats/docs/superpowers/specs/2026-07-28-shareable-urls-design.md`

## Paramètres URL

`?orgs=<code1,code2>&year=<yyyy>`

Règle : omettre `orgs` si toutes les orgs sont sélectionnées (état par défaut).

## Fonctions à ajouter

```js
function parseUrlState()      // lit ?orgs= et ?year=
function buildUrl()           // construit l'URL depuis l'état courant
function replaceUrlState()    // replaceState à chaque changement
```

## Restauration

1. `?orgs=` absent → tout sélectionner
2. `?orgs=` présent → cocher uniquement les codes listés (virgule-séparés)
3. `?year=` → appliquer au sélecteur d'année
4. Déclencher le rendu
