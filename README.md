# Chougale Constructions website

Portfolio site for Chougale Constructions, Shinganapur (Kolhapur). One static page, no build step.

- **Hero:** a 3D apartment building (Three.js) that rises floor by floor as you scroll; each floor shows one milestone of the company story.
- **Flagship Projects:** before/after sliders.
- **Footprint:** 3D terrain map of Kolhapur district with a pin per site.

All names, years, numbers, projects and site locations are sample content to be replaced.

## Run locally

Open `index.html` in a browser, or serve the folder (`python3 -m http.server`).

## Publish with GitHub Pages

Settings → Pages → Build and deployment → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.

## Where to edit content

In `index.html`:

- `STORY`: the milestone shown on each floor (also fills the Our Story timeline)
- `PROJECTS`: flagship projects
- `SITES`: Footprint map pins (longitude / latitude)
- Contact details: the `#contact` section
