# Leo's Gym frontend

A dependency-free static site. Serve the repository root with any static server; no build step is required.

## Local preview

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Structure

```
assets/
  images/       Local coach photography
  scripts/      Page behavior and progressive-enhancement reveals
  styles/       Site stylesheet
  videos/       Gym tour video
docs/           Content notes, design reference, and provenance
index.html      Deployable entry point
```

## Backend handoff

The form is ready for a JSON endpoint. Set `data-join-endpoint` on the `<body>` to the endpoint URL, for example:

```html
<body data-join-endpoint="/api/memberships">
```

It sends a `POST` with `application/json`:

```json
{
  "first": "Alex",
  "last": "Kim",
  "email": "alex@example.com",
  "phone": "+1 555 010 0000",
  "tier": "premium"
}
```

Return any `2xx` status for success. Non-2xx responses keep the form open and show a retry message.

The page's CSP permits same-origin API requests only. If the backend is hosted on another origin, add that exact origin to the `connect-src` directive in `index.html` and configure CORS on the API.

Before public launch, replace the placeholder business details and legal links with final values. Image provenance is recorded in `assets/images/ATTRIBUTION.md`.
