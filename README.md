# Chougale Constructions website

Portfolio site for Chougale Constructions (चौगले कन्स्ट्रक्शन्स), Shinganapur, Kolhapur. Static files, no build step.

The site is built as a gruhapravesh (housewarming) invitation from the Chougale family:

- **Cover:** a closed charcoal card with a gold foil band and the logo. As you scroll, the cover lifts and a dusk render of a finished building rises out of it.
- **Invitation wording:** who invites, to what, when and where, set like a printed patrika.
- **Handovers:** one invitation card per finished building, with a before/after slider from plot to moving-in day, and the promised and actual handover dates.
- **Every job, three ceremonies:** bhoomi pujan, slab day, gruhapravesh.
- **Thirty years, one floor at a time:** a 3D building that rises one floor per milestone as you scroll.
- **Where our families live:** 3D relief model of Kolhapur district with a pin per site.
- **RSVP:** phone, WhatsApp, address and an enquiry form, signed by the family.

Design records: `PRODUCT.md` (product facts), `DESIGN.md` (visual system) and `.impeccable/` (Impeccable skill files and the direction contract).

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
- `RITES`: the three ceremonies
- `SITES`: map pins (longitude / latitude)

In `index.html`: hero text and figures, the contact section, and the footer.

Logo and icons are in `assets/`.
