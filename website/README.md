# The GymBro site

Source of <https://moyibr.github.io/GymBro-Training/> — plain hand-written HTML/CSS/JS, no
build step.

Deployed by [`.github/workflows/pages.yml`](../.github/workflows/pages.yml), which assembles
the published site from three places:

| On the site | Comes from |
|---|---|
| `/` | this folder (`*.html`, `styles.css`, `site.js`) |
| `/img/` | `../assets/screenshots/` |
| `/icon-180.png`, `/icon-512.png` | `../frontend/public/` — the same icons the PWA and the apps use |
| `/demo/` | a `VITE_DEMO=1` build of `../frontend` |

So nothing here needs to be copied by hand, and previewing locally just means opening
`index.html` — the screenshots and the embedded demo will be missing until it is deployed.

`privacy.html` is the privacy policy both app stores require at a public URL; its source of
truth is [`../store/privacy-policy.md`](../store/privacy-policy.md) — change both together.

`site.js` fetches the star/fork counts from the public GitHub API at view time.
