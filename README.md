# AsTechAI — Navbar visible dans toutes les pages

Correction importante : la navbar n'est plus dépendante de `fetch()`.

Elle est maintenant **physiquement intégrée dans chacune des 36 pages HTML**.
Cela signifie qu'elle reste visible même si vous ouvrez une page directement avec `file://`.

Le fichier source commun reste disponible :
- `components/navbar.html`
- `assets/css/navbar.css`

Pour un futur workflow de génération, `components/navbar.html` peut rester la source centrale,
mais la version distribuée du site contient la navbar directement dans chaque page.
