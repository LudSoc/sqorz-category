# Stats Catégorie BMX

**[🇬🇧 English](#english) · [🇫🇷 Français](#français)**

Part of [Sqorz Hub](https://ludsoc.github.io/sqorz-hub/) — BMX Race statistics tools.

---

## English

Browse BMX Race rankings and statistics by age category across multiple organizations and seasons.

### Features

- Category list without grouping: each exact Sqorz class (e.g. `U9GR`, `9GR`, `Élite`…) is its own entry
- European (UEC) classes included as separate `uec:…` entries (e.g. `uec:B11`)
- Each category shows the organizations running that exact class
- Selecting a category ranks pilots across all those organizations
- Year filter
- Top pilots per category with podium counts
- Shareable URL (saves selected category and year)

### Live

**[ludsoc.github.io/sqorz-category](https://ludsoc.github.io/sqorz-category/)**

### Tech

HTML/CSS/JS, no framework, no build step. Shared core (`SqorzCommon`) loaded from sqorz-stats. Data from the public [Sqorz API](https://our.sqorz.com) + UEC European races (JSTiming).

> Community project, not affiliated with Sqorz.

---

## Français

Consultez les classements et statistiques BMX Race par catégorie d'âge, sur plusieurs organisations et saisons.

### Fonctionnalités

- Liste de catégories sans regroupement : chaque classe Sqorz exacte (ex. `U9GR`, `9GR`, Élite…) a sa propre entrée
- Catégories européennes (UEC) incluses comme entrées `uec:…` séparées (ex. `uec:B11`)
- Chaque catégorie affiche les organisations qui courent cette classe exacte
- Choisir une catégorie classe les pilotes de toutes ces organisations
- Filtre par année
- Meilleurs pilotes par catégorie avec leur nombre de podiums
- Indice de performance par pilote (0–1000, même formule que sqorz_stats : rang selon le nombre de partants, force du plateau adverse, constance, chrono transpondeur, DNF gradué par la phase atteinte)
- URL partageable (mémorise la catégorie et l'année sélectionnées)

### Accès

**[ludsoc.github.io/sqorz-category](https://ludsoc.github.io/sqorz-category/)**

### Technique

HTML/CSS/JS, sans framework, sans étape de build. Socle partagé (`SqorzCommon`) chargé depuis sqorz-stats. Données issues de l'[API publique Sqorz](https://our.sqorz.com) + courses européennes UEC (JSTiming).

> Projet communautaire non officiel, non affilié à Sqorz.
