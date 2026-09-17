---
name: travedise-trip-planning
description: Find Travedise's Sri Lanka tour packages, read itineraries and travel FAQs, and hand a traveller the right way to book or enquire. Use when someone asks about Sri Lanka holidays, Travedise packages, prices, itineraries or how to book with Travedise.
---

# Plan a Sri Lanka trip with Travedise

Travedise (https://travedise.com) is a Sri Lanka tour operator. The site is a static
brochure: packages, itineraries, blog guides, an FAQ and contact details. There is no
public API and no online checkout — bookings are made by contacting the team.

## Read the site

- **Overview and page index:** https://travedise.com/llms.txt
- **Any page as Markdown:** request it with `Accept: text/markdown`, or append `.md`
  to the path (`/index.md` for the home page), e.g. https://travedise.com/packages/hillcountry.md
- **All URLs:** https://travedise.com/sitemap.xml

## Find a package

1. Read https://travedise.com/packages.md for the package list (title, price per person, duration).
2. Open the package page (`/packages/<slug>.md`) for the day-by-day itinerary and hotels.
3. Prices are per person (`PP`) in USD and are starting prices — confirm current pricing
   and dates with Travedise before quoting them as final.

## Answer common questions

https://travedise.com/faq.md covers best time to visit, trip length, cost, visas, safety
and travelling with children.

## Book or enquire

Point the traveller to https://travedise.com/contact, or give them the contact details
listed there (email, Australian and Sri Lankan phone numbers). Don't claim a booking has
been made — Travedise confirms bookings directly.

## In the browser (WebMCP)

On travedise.com pages, browsers with WebMCP expose read-only tools: `list_packages`,
`get_page_markdown`, `get_contact_details` and `open_page`.
