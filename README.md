# Chougale Constructions website

Portfolio site for Chougale Constructions (चौगले कन्स्ट्रक्शन्स), Shinganapur, Kolhapur. Static files, no build step.

- **Hero:** full-screen dusk render of an apartment building with lit windows, the company name set large across it.
- **What we do:** four services. **Three steps:** how a job runs.
- **Flagship projects:** before/after sliders, empty plot to finished building, rendered at dusk.
- **Our story:** a 3D building that rises one floor per milestone as you scroll; the gold slab marks the floor being built.
- **Where we build:** 3D relief model of Kolhapur district with a pin per site.

Colours, fonts and logo follow the brand guidelines: charcoal, cream and haldi gold; Big Shoulders Display for English headings, Mukta for body text and all Marathi. The 3D scenes use Three.js r128 from cdnjs.

All names, years, numbers, projects, phone numbers and site locations are sample content to be replaced. Real project photos can replace the rendered pictures later.

## Run locally

Serve the folder (`python3 -m http.server`) and open http://localhost:8000.

## Publish with GitHub Pages

Settings → Pages → Build and deployment → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.

## Where to edit content

In `assets/site.js`, at the top:

- `STORY`: one milestone per floor of the story building
- `PROJECTS`: flagship projects
- `SERVICES` and `STEPS`: the two numbered sections
- `SITES`: map pins (longitude / latitude)

In `index.html`: hero text and figures, the contact section, and the footer.

Logo and icons are in `assets/`.
