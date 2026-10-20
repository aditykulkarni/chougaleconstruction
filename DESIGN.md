---
name: Chougale Constructions
description: A gruhapravesh invitation from a Kolhapur building family, set on charcoal card stock with one haldi-gold foil band.
colors:
  charcoal: "#1e1a17"
  charcoal-2: "#27221e"
  charcoal-line: "#4a423b"
  cream: "#f2ede4"
  cream-2: "#e9e2d6"
  cream-line: "#cfc5b6"
  stone: "#645d55"
  stone-light: "#b5aca1"
  gold: "#e8a50c"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.2rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  numeral:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  marathi-lead:
    fontFamily: "Mukta, Segoe UI, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: "Mukta, Segoe UI, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  none: "0px"
spacing:
  hair: "4px"
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "48px"
  section: "clamp(80px, 10vw, 140px)"
  gutter: "20px"
  container: "1180px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.charcoal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  button-gold-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.charcoal}"
  button-ink:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  button-ink-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.charcoal}"
  nav-link:
    textColor: "{colors.stone-light}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.cream}"
  field:
    backgroundColor: "{colors.charcoal-2}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  site-row:
    textColor: "{colors.charcoal}"
    padding: "12px 4px"
  site-row-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
  handover-leaf:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "clamp(28px, 4vw, 52px)"
---

# Design System: Chougale Constructions

## Overview

**Creative North Star: "The Gruhapravesh Patrika"**

The site is typeset like the printed invitation a Kolhapur family sends when it moves into a new house. Charcoal card stock is the ground; cream inner leaves alternate with it section by section, as the pages of a folded card would. A single haldi-gold foil band sits at the head of the cover, and gold otherwise appears only where the visitor is asked to act. Everything is square-cornered, ruled with fine printed lines, and centred where it speaks as an invitation (who invites, to what, when, where).

English speaks in tall condensed Big Shoulders capitals; Marathi speaks in Mukta, never spaced out, always sitting beside its English line rather than replacing it. Depth comes from paper, not from interface chrome: the cover is a real card that folds open on scroll, and the buildings inside are clay-and-dusk 3D renders rather than stock photography. Density is calm and generous, with tall section padding and narrow measures, so the page reads like a card held in two hands.

The world deliberately refuses the builder template of a hero photo, stat row, service cards and project grid.

**Key Characteristics:**
- Charcoal stock and cream leaves alternate as whole sections; no third surface.
- One gold foil band, one gold action per view.
- Zero corner radius everywhere.
- Printed double rules and inset double-line frames instead of filled boxes or cards with shadow.
- Bilingual pairs: Big Shoulders capitals for English, Mukta for Marathi.
- Centred invitation typesetting for statements; left-set lists only where the content is a ledger.

## Colors

A warm, near-monochrome paper palette of charcoal, cream and stone, struck once with haldi gold.

### Primary
- **Haldi Gold** (`gold`): the foil band on the cover and the fill of the single primary action (call). Also the keyboard focus ring and text-selection colour, and in the 3D scenes the active slab, the HQ map pin and the site flag. Gold is a fill or a mark; it is never used as text on a light surface.

### Neutral
- **Card-Stock Charcoal** (`charcoal`): the default page ground, the `stock` sections, the cover card, and the text colour on cream leaves.
- **Pressed Charcoal** (`charcoal-2`): one step lighter than stock; used only as the fill of form fields on charcoal.
- **Charcoal Rule** (`charcoal-line`): rules, frames and borders on charcoal (bar underline, card frames, field underlines, footer rule).
- **Leaf Cream** (`cream`): the `leaf` section ground, the handover leaf, and primary text on charcoal.
- **Back-of-Card Cream** (`cream-2`): the back face of the folding cover and the hover tint of site rows on cream.
- **Cream Rule** (`cream-line`): rules and inset frames on cream.
- **Stone Grey** (`stone`): secondary text on cream (descriptions, labels in definition lists, dates).
- **Light Stone** (`stone-light`): secondary text on charcoal (nav links, captions, form labels, address, footer).

### Named Rules
**The One Foil Rule.** Gold appears as the cover's foil band and as the fill of the call action. Every other use is a state mark (focus, selection, the active slab or pin), never decoration, never a second accent.

**The Surface Pair Rule.** Each section is either `stock` (charcoal ground, cream ink, `stone-light` muted, `charcoal-line` rules) or `leaf` (cream ground, charcoal ink, `stone` muted, `cream-line` rules). Components read `--ink`, `--muted` and `--rule` from their surface and never hard-code the other surface's colours.

**The No Gold On Cream Rule.** Gold is never text, and never sits on a cream leaf as text or thin line. On cream, the focus and active marks use charcoal.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, sans-serif)
**Body Font:** Mukta (with Segoe UI, system-ui, sans-serif)

**Character:** Tall, condensed, heavy capitals with the confidence of a building sign, set against a warm Devanagari-and-Latin humanist that reads equally well in Marathi and English. Headings are always capitals in Big Shoulders; all Marathi and all running English text is Mukta.

### Hierarchy
- **Display** (800, clamp(3.2rem, 9vw, 6rem), 0.95): the one cover headline.
- **Headline** (800, clamp(2.6rem, 6vw, 4.6rem), 0.95): section heads. The invitation verses step down to clamp(2.2rem, 5vw, 3.6rem).
- **Title** (800, clamp(1.8rem, 2.8vw, 2.4rem), 0.95): handover names, milestone titles, ceremony names (range 1.5rem to 2.9rem by context).
- **Numeral** (800, clamp(2.2rem, 4.6vw, 3.4rem), 1, tabular figures): the phone number and the milestone years (years run larger, up to 5rem).
- **Marathi Lead** (Mukta 600, 1.15 to 1.2rem, 1.3): the Marathi line paired under each English heading; the salute and cover invite run larger (up to 2.1rem).
- **Body** (Mukta 400, 18px, 1.6): running text, held to 36 to 52ch.
- **Label** (Big Shoulders 700, 0.9 to 1.05rem, 0.1 to 0.12em tracking, uppercase): nav links, buttons, image tags, the "on the promised day" stamp.

### Named Rules
**The Bilingual Pair Rule.** Every English section head is paired with its Marathi line directly beneath, in Mukta, at Marathi Lead size. Marathi is never set in Big Shoulders, never uppercased and never letter-spaced (`letter-spacing: 0`).

**The Capitals Only For English Rule.** Big Shoulders is always uppercase; tracking is tight (0.01em) at heading sizes and opens to 0.1 to 0.12em only at label size.

## Layout

A single centred column, max 1180px, with a 20px gutter that respects safe-area insets. Sections stack as full-bleed alternating `stock` and `leaf` bands with tall vertical padding (clamp(80px, 10vw, 140px)); section heads are centred with clamp(48px, 6vw, 80px) below them.

Statements (cover, invitation verses, section heads, the RSVP card) are centred and narrow. Ledgers (ceremonies, site list, form) are left-set on asymmetric two-column grids: 7/5 for handovers and the story, 8/4 for the map, 3/5 inside each ceremony row, 6/6 for contact. Handovers alternate their 7/5 split row by row.

The cover is a 210svh scroll track with a sticky 100svh stage; the card is up to 1120 by 760px inside 14px of margin. Sticky elements sit under the 60px bar.

Breakpoints: 900px hides the cover nav; 860px collapses every two-column grid to one column and turns the story canvas into a 44svh sticky strip; 760px reduces the bar to the call link; 600px centres the cover top and foot and stacks ceremony rows; 520px makes the form one column. Under reduced motion the card sits open above the page with no fold.

## Elevation & Depth

The system is flat paper. Depth is physical: the cover is a 3D card hinged at its top edge that folds back 158 degrees with scroll, and the building render inside rises as it opens. The only shadow is the cover card's ambient drop (`0 30px 60px -20px rgba(0,0,0,0.6)`), which belongs to the card as an object. Elsewhere, separation comes from the alternation of charcoal and cream, from printed rules, and from inset double-line frames.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6)`): the closed cover card only.
- **Image tag legibility** (`text-shadow: 0 1px 8px rgba(0,0,0,0.5)`): labels set over renders.
- **Note scrim** (`linear-gradient(180deg, rgba(21,19,17,0) 0%, rgba(21,19,17,0.86) 55%)`): text over the opened card's render.

### Named Rules
**The Paper Not Chrome Rule.** Nothing floats. A surface is either the card, a leaf, or the stock; no component gets its own shadow.

## Shapes

Every corner is square (0px radius), including buttons, fields, the before/after knob and the cards. Lines are the shape language: a printed double rule (two 1px lines 3px apart, 5px total) divides blocks; ledger lists open with a 1.5px ink rule and separate rows with 1px rules; framed panels carry an inset double-line border (1px border plus 1px outline offset 4px, inset 12px from the edge, or offset -8px inward on the contact card), as on a printed patrika. Form fields are underlined, not boxed.

## Components

### Buttons
Printed and square, like a stamped label.
- **Shape:** square corners (0px), 54px minimum height, 28px horizontal padding, 10px icon gap, 18px stroke icons.
- **Gold (primary):** gold fill and border, charcoal label. Reserved for the call action. Hover turns the fill cream.
- **Ink (secondary):** transparent with a 1.5px border in the surface's ink colour and an ink-coloured label (cream on stock, charcoal on leaf). Hover fills with ink and inverts the label.
- **Focus:** 2px gold outline, 3px offset. Transitions run 0.25s on `cubic-bezier(0.16, 1, 0.3, 1)`.

### Navigation
- **Cover nav:** label-style links in light stone, cream on hover, 26px apart, hidden under 900px.
- **Bar:** appears once the card has opened; 60px tall, charcoal at 94% with a charcoal rule beneath, slides down over 0.4s. It carries the 36px monogram, section links, and the phone number in cream with tabular figures; under 760px only the phone remains.

### Inputs / Fields
- **Style:** pressed-charcoal fill, no border except a 1.5px charcoal-rule underline, square, 10px 12px padding; labels sit above in light stone.
- **Focus:** the underline turns gold; no outline or glow.
- **Error:** the underline turns `#e07a5f` and the message reads in `#f0a48f`. (Off-palette; see Do's and Don'ts.)
- **Select:** custom chevron in light stone, no native appearance.

### Handover Leaf (signature)
One cream invitation leaf per finished building, paired with a before/after picture. The text half is centred inside an inset double-line frame: title, Marathi name, the family and place, a small definition list (Building, Promised, Handed over) with tabular figures, and a stamp line between two rules in uppercase Big Shoulders ("On the promised day").

### Before / After Slider (signature)
A square-cornered picture (min 420px tall, 4:5 under 860px) that drags from the bare plot with survey pegs to the finished dusk render. A 2px cream line and a 44px square cream knob mark the split; uppercase tags ("Plot", "Moving in") sit on charcoal at 82%. A hidden range input carries keyboard control; focus-within draws the gold ring.

### Ceremony and Site Ledgers
Lists that read like the order of events on a card: a 1.5px ink rule above, 1px surface rules between rows. Ceremonies pair a large Marathi name with the English title, when, and description. Site rows tint cream-2 on hover and invert to charcoal when selected; they drive the 3D map pins.

### Folding Cover Card (signature)
The first viewport: a charcoal card with the gold foil band across its head, an inset double frame, the bilingual horizontal logo (240px), the display headline, the Marathi invite, one sentence, and the gold call button beside an ink WhatsApp button. On scroll the foil sheen sweeps and the front folds up and back to reveal the building render and a closing note.

## Do's and Don'ts

### Do:
- **Do** alternate whole sections between `stock` and `leaf`, and let components inherit `--ink`, `--muted` and `--rule`.
- **Do** keep gold to the foil band and the call action, plus focus, selection and the active 3D slab or pin.
- **Do** pair every English heading with its Marathi line in Mukta, with `letter-spacing: 0`.
- **Do** keep every corner at 0px and divide with printed rules (1px, 1.5px for ledger heads, the 5px double rule).
- **Do** use tabular figures for phone numbers, years and dates.
- **Do** label placeholder content as placeholder in the visible copy.

### Don't:
- **Don't** set gold text, or gold thin lines, on cream.
- **Don't** add rounded corners, pill buttons, or shadows on components.
- **Don't** letter-space, uppercase, or set Marathi in Big Shoulders.
- **Don't** recolour, retype, fade or place the logo on gold, and keep the horizontal logo at 240px or wider.
- **Don't** introduce a third surface colour or a second accent hue in the interface.
- **Don't** fall back to the builder template of hero photo, stat row, service cards and project grid.
