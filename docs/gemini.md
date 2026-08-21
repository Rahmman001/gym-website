# gemini.md — Leo's Gym Landing Page

## Project Context
This is a single-page marketing landing page for **Leo's Gym**, a fitness/gym brand. The goal is to build a pixel-faithful implementation of the reference design (desktop + mobile mockups provided) as a responsive, production-quality web page. This file is the source of truth for design tokens, layout structure, and content — refer to it before making assumptions.

---

## Brand
- **Name:** Leo's Gym
- **Category:** Fitness / gym / training
- **Tone:** Bold, confident, high-energy, no-fluff. Editorial sports-brand feel (think athletic apparel campaign, not a soft wellness studio).
- **Hero headline:** "Find Your Strength"
- **Hero overlay sub-line:** "Inside and out."
- **Mission statement:** "Fitness should be accessible to everyone."
- **Closing statement (dark section):** "Your body is your temple."

---

## Design System

### Typography
- **Headline font:** Heavy, condensed, all-caps grotesque/display sans (visual match: Anton, Archivo Black Condensed, or similar ultra-bold condensed sans). Used for the hero headline, section headlines ("TRAININGS," "THE CLUB"), membership tier names, and the closing statement — this is the dominant visual element throughout the page.
- **Body/nav font:** Clean, neutral sans-serif (e.g. Inter, Helvetica Neue, or similar), regular weight, sentence case — used for nav links, body copy, captions, buttons, and testimonial quotes.
- **Eyebrow label style:** Small, bold, all-caps, letter-spaced (e.g. "ACHIEVE YOUR FITNESS GOALS") sits above the hero headline.
- **Overlay headline (on image):** Same condensed display font as hero, rendered in white, layered over the photo.

### Color Palette
- **Background (light sections):** Off-white / near-white (`#FAFAFA`–`#FFFFFF`)
- **Background (dark section):** Near-black (`#0A0A0A`–`#111111`) — used for the closing "Your Body Is Your Temple" section and testimonial strip
- **Primary text/ink (light sections):** Near-black (`#111111`–`#1A1A1A`)
- **Primary text (dark section):** White / off-white
- **Accent:** Neon yellow-green (visible on athlete's headband/top — approx `#D4FF3F`–`#E4FF4D`), used sparingly as an accent color, not a dominant one
- **Overlay text on imagery:** White, high contrast against photo
- **Buttons:** Outlined pill/rounded-rectangle button, consistent style in both light and dark sections ("JOIN TODAY") — black border/text on white background in light sections, white border/text on dark background in the dark section
- **Decorative accent:** A small 4-point sparkle/star glyph used repeatedly as a section divider and next to membership tier names (both light and dark sections)

### Layout & Grid
Full single-page scroll, sections stacked top to bottom:

1. **Header** — Fixed/sticky top nav. Logo "LEO'S GYM" (left), center nav links (About, Trainings, Testimonials, Contacts), CTA pill button "JOIN TODAY" (right). On mobile, nav links collapse behind a hamburger icon; logo and hamburger remain visible.

2. **Hero** — Centered eyebrow label → large centered condensed headline (2 lines: "FIND YOUR / STRENGTH") → full-width rounded-corner photo block below with white overlay headline ("INSIDE / AND OUT.") layered mid-image. Bottom-left of photo: two-line caption in white/light gray. Bottom-right of photo: circular white play button with black triangle + duration label ("3 min").

3. **Divider** — Small centered sparkle/star glyph marks the transition between hero and mission statement.

4. **Mission statement** — Centered, condensed bold headline ("FITNESS SHOULD BE ACCESSIBLE TO EVERYONE."), short centered body paragraph below, centered "JOIN TODAY" pill button beneath the text.

5. **Trainings** — Section header with "TRAININGS" label (left) and "SEE ALL" link + circular arrow icon (right). Below: a vertically stacked list of large rounded-corner photo cards, each showing a training category name in bold white overlay text (bottom-left) and a right-pointing arrow icon (right edge). Categories shown: Personal Training, Group Fitness Classes, Functional Training.

6. **The Club (membership tiers)** — Section header "THE CLUB". Below: a simple horizontal-rule-separated list of membership tier names in large bold condensed type (Basic, Premium, Elite), each row paired with a small sparkle/star glyph and a plus icon on the right (implies expandable/accordion behavior to reveal tier details/pricing).

7. **Closing CTA (dark section)** — Full-width black background. Centered sparkle glyph at top, large bold white headline ("YOUR BODY IS YOUR TEMPLE"), centered body paragraph, centered "JOIN TODAY" pill button (white outline on dark).

8. **Testimonials strip** — Row of small dark cards at the bottom of the dark section, each containing a short quote and attribution (e.g. "I absolutely love this gym!", "Great place to work out! — Alex K.", "Love it! Big difference.", "This is the place for you."). Cards sit edge-to-edge in a horizontal row on desktop; likely horizontally scrollable on mobile.

### Navigation
- Logo: "LEO'S GYM" — bold, tight tracking, top-left (black on light header, adapts if a dark header state is ever introduced)
- Nav links (center, desktop only): About, Trainings, Testimonials, Contacts
- CTA (top-right): "JOIN TODAY" — pill-shaped outlined button
- Mobile: nav links replaced by a hamburger icon (top-right, left of/instead of the CTA — confirm exact placement against mobile mockup during build)

### Imagery Style
- High-contrast, editorial fitness photography — real athletes mid-motion, natural light, desaturated/neutral gray backgrounds, letting the neon accent color pop against skin tone and gray backdrop.
- Used in: hero photo block, all three training category cards.
- Photos should feel candid/kinetic, not posed gym-stock-photo energy.

### Interactive Elements
- Video play button: circular white button with black play triangle, bottom-right of hero image, paired with a duration label.
- Buttons: outlined pill shape, minimal hover states expected (fill or invert on hover — implementer's discretion, keep it subtle). Style stays consistent between light-section and dark-section CTAs (colors invert).
- Training cards: right-arrow icon suggests these are clickable/link out to category detail.
- Membership tier rows: plus icon suggests expandable rows (accordion) revealing pricing/details on click/tap.
- "SEE ALL" link (Trainings section): circular arrow-icon button, likely links to a full trainings listing.

### Responsive Behavior (from mobile mockups)
- Hero headline and section headlines scale down but remain in the same bold condensed style — no loss of visual weight.
- Sections stack in the same top-to-bottom order as desktop; no reordering observed.
- Training cards remain full-width stacked cards on mobile (same treatment as desktop, just narrower).
- Testimonial cards appear to run edge-to-edge / partially off-screen on mobile, implying horizontal scroll rather than wrapping.
- Nav collapses to hamburger below tablet breakpoint.

---

## Build Requirements
- **Output format:** Single HTML file with embedded CSS/JS, OR React component structure — confirm with project owner before scaffolding.
- **Responsiveness:** Must match the provided mobile mockups closely — hero type scale shrinks proportionally, nav collapses to hamburger, sections remain full-width and stacked.
- **Fidelity bar:** Match the reference images' proportions, spacing, type scale, and section order closely — this is a high-fidelity design implementation task, not a loose interpretation.
- **Placeholder content:** Where copy isn't specified above (e.g. full membership pricing, additional testimonials), use realistic fitness-brand placeholder copy consistent with the bold/confident tone — do not default to generic lorem ipsum for visible headline/CTA text.
- **Accessibility:** Maintain sufficient contrast for overlay text on images (add gradient scrim behind text if needed at smaller sizes); nav and accordion-style membership rows must be keyboard-navigable; dark section must meet contrast requirements for white-on-black text.

---

## Out of Scope (unless instructed otherwise)
- Backend/booking functionality
- Multi-page routing (this is a one-page site; "SEE ALL" and nav links can point to placeholder anchors/sections)
- CMS integration
- Payment/membership signup flow (CTA can link to a placeholder anchor/section for now)
- Full membership tier pricing details (structure for accordion expansion, but content can be placeholder)