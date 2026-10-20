# Chougale Constructions website

Portfolio site for Chougale Constructions (चौगले कन्स्ट्रक्शन्स), Shinganapur, Kolhapur. Static files, no build step.

The layout follows Aditya's reference, a dark photo-led architecture site:

- **Hero:** a full-screen dusk photo of a house, the company name across the top, "Plan. Build. Move in.", call buttons and three facts.
- **All services:** homes and bungalows, apartment buildings, shops and offices, industrial sheds, over a dimmed site photo.
- **Three steps to your keys:** plot visit and plan, approvals and drawings, build and hand over.
- **Our projects:** photo cards, plus a before/after slider from construction to handover.
- **Our story:** milestones by year.
- **Where we build:** 3D relief model of Kolhapur district with a pin per site.
- **Book a site visit:** phone, WhatsApp, address and an enquiry form.

Fonts: Lexend Exa (headings), Lexend (body) and Anek Devanagari (Marathi), from Google Fonts. Colours: charcoal, cream and haldi gold. The map uses Three.js r128 from cdnjs.

Photos are hotlinked Unsplash images standing in for the firm's own photos, credited in the footer. All names, years, projects, figures and phone numbers are placeholders.

## Run locally

Serve the folder (`python3 -m http.server`) and open http://localhost:8000.

## Publish with GitHub Pages

Settings → Pages → Build and deployment → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.

## Where to edit content

- `index.html`: all text, photos (the `img` URLs), projects and contact details.
- `assets/main.js`: `SITES`, the map pins (longitude / latitude).

Logo and icons are in `assets/`. The `ideas/` folder holds earlier main-page experiments.
