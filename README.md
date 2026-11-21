# michelesettepani.dev

Personal site for [michelesettepani.dev](https://michelesettepani.dev). Plain
HTML/CSS/JS, copied to `dist/` by `build.js` — no bundler, no dependencies.

It shares its brand system with the photoblog at
[photo.michelesettepani.dev](https://photo.michelesettepani.dev): same colours,
type, masthead, hairlines and theme preference (a `pb-theme` cookie scoped to
`*.michelesettepani.dev`).

The three "recent photographs" are fetched at runtime from the photoblog's
`https://photo.michelesettepani.dev/stories.json`, so they stay current without
a rebuild. If that request fails the section stays hidden.

## Development

```bash
npm run dev    # builds dist/ and serves it on http://localhost:3000
npm run build  # just builds dist/
```

Cloudflare Pages builds with `yarn build` and publishes `dist/`.
