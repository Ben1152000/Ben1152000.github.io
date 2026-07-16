# bdarnell.com

Personal website, built with the [Zola](https://www.getzola.org/) static site generator.

## Prerequisites

Install Zola (built against 0.22):

```bash
brew install zola
```

## Develop

Serve locally with live reload at <http://127.0.0.1:1111>:

```bash
zola serve
```

## Build

Generate the static site into `public/`:

```bash
zola build
```

`zola check` validates internal links without writing output.

## Structure

| Path | Contents |
|------|----------|
| `config.toml` | Site config; identity (`[extra.profile]`) and project list (`[[extra.projects]]`) live under `[extra]` |
| `content/_index.md` | The homepage **content** (about / education / experience / publications / awards) as `[extra]` TOML — edit this, not the template |
| `content/projects.md`, `strata.md`, `resume.md`, `cv.md` | The `/projects/` page and the `/strata` `/resume` `/cv` redirects |
| `content/legacy/` | The previous (Jekyll-derived) site, archived at `/legacy/` |
| `templates/strata.html` | The site **design** (HTML5 UP Strata shell); identity-driven, exposes a `main` block |
| `templates/home.html`, `projects.html` | Page templates that extend `strata.html` |
| `templates/legacy/` | Templates for the archived `/legacy/` site |
| `templates/404.html`, `redirect.html` | Error page and the redirect helper |
| `static/strata/` | The Strata theme, all in one dir — `css/ js/ webfonts/ images/ sass/` + license (served at `/strata/…`) |
| `static/assets/` | Site images, docs, icons (served at `/assets/…`) |

**Content vs. design:** the homepage's words live in `content/_index.md` `[extra]`; the layout lives in `templates/home.html` + `templates/strata.html`. Edit one without touching the other.

## Updating the resume / CV

`/resume`, `/cv`, and `/resume.json` are stable URLs that don't change when documents are updated:

- **Resume / CV PDFs** — add the new file to `static/assets/docs/` (named `YYYY_MM_DD` so it sorts chronologically), then point the redirect at it by editing the `target` line in `content/resume.md` or `content/cv.md`.
- **Machine-readable resume** — replace `static/resume.json` (served directly at `/resume.json`).
