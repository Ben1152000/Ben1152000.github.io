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
| `config.toml` | Site config; nav links and project list live under `[extra]` |
| `content/` | Pages (`about`, `projects`) and the `blag/` blog section |
| `templates/` | Tera templates (`base`, `index`, `page`, `projects`, `blog`, `post`, `404`, `redirect`) |
| `sass/` | SCSS sources; `styles.scss` compiles to `/styles.css` |
| `static/` | Files served verbatim (under `static/assets/…`) |

## Updating the resume / CV

`/resume`, `/cv`, and `/resume.json` are stable URLs that don't change when documents are updated:

- **Resume / CV PDFs** — add the new file to `static/assets/docs/` (named `YYYY_MM_DD` so it sorts chronologically), then point the redirect at it by editing the `target` line in `content/resume.md` or `content/cv.md`.
- **Machine-readable resume** — replace `static/resume.json` (served directly at `/resume.json`).
