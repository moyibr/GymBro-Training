# Shipping GymBro to the stores

Everything the two consoles ask for, in the order they ask for it. The code side is already
done — this is the account and paperwork side.

| | Google Play | Apple App Store |
|---|---|---|
| Cost | **$25 once** | **$99 / year** |
| Signup | [play.google.com/console/signup](https://play.google.com/console/signup) | [developer.apple.com/programs](https://developer.apple.com/programs/) |
| Identity check | Yes — D-U-N-S for orgs, ID + address for individuals | Yes — ID, and D-U-N-S for orgs |
| Wait before you can ship | **~14 days of closed testing with 12 testers** (personal accounts) | none beyond account approval |
| Review time | hours to ~3 days | typically < 24 h, first submission can be longer |

> **The 12-tester rule is the long pole.** A personal (non-organization) Play account opened
> after Nov 2023 must run a closed test with **at least 12 testers opted in for 14 continuous
> days** before production access unlocks. Start that clock the day the account exists, with
> whatever build you have — production polish can land during the 14 days.

## Order of operations

### 1. Before either account (do this today)

- [ ] Push this repository to `github.com/moyibr/GymBro-Training`, public — the AGPL and the
      app-store exception in [NOTICE.md](../NOTICE.md) both hinge on the source staying available.
- [ ] Publish the privacy policy so it has a real URL. In the repo: **Settings → Pages →
      Source: GitHub Actions**. The `pages.yml` workflow then puts the site at
      `https://moyibr.github.io/GymBro-Training/` and the policy at
      `…/privacy.html` (the app demo lands at `…/demo/`). Open the URL in a private window
      before pasting it into either console — **both stores refuse a listing without a
      reachable privacy-policy URL**, and they do check.
- [ ] Create the release keystore and back it up — see [docs/RELEASE.md](../docs/RELEASE.md).
- [ ] Take screenshots — see [screenshots.md](screenshots.md).

### 2. Google Play

- [ ] Pay the $25, complete identity verification (can take a few days).
- [ ] **Create app** → name `GymBro`, English (US), App, Free.
- [ ] Fill the store listing from [play/listing.md](play/listing.md).
- [ ] Answer **Data safety** from [play/data-safety.md](play/data-safety.md).
- [ ] Content rating questionnaire → answers in [play/listing.md](play/listing.md#content-rating).
- [ ] Upload `app-release.aab` (from the Android release workflow) to a **closed testing** track,
      opt in 12 testers, and leave it running 14 days.
- [ ] **Enrol in Play App Signing** at first upload. It keeps a copy of the signing key, which
      is the only insurance against losing the keystore.
- [ ] After 14 days: apply for production access, then promote the release.

### 3. Apple App Store

- [ ] Pay the $99, complete enrolment.
- [ ] In the developer portal, register the App ID **`io.github.moyibr.gymbro`**.
- [ ] Create an **App Store Connect API key** (Users and Access → Integrations) and an
      **Apple Distribution certificate** + App Store provisioning profile; put them in the
      repo secrets listed in `.github/workflows/ios-release.yml`.
- [ ] **App Store Connect → New App**: name `GymBro`, bundle id as above, SKU `gymbro-001`.
- [ ] Fill the listing from [apple/listing.md](apple/listing.md), the privacy questionnaire from
      [apple/app-privacy.md](apple/app-privacy.md), and paste [apple/review-notes.md](apple/review-notes.md)
      into App Review Information.
- [ ] Tag a release → the iOS workflow uploads a build to TestFlight → submit for review.

### 4. Every release after that

```bash
cd frontend
npm run version:sync -- 1.1.0     # or `-- 1.1.0 --build 1` to re-upload the same version
git commit -am "GymBro 1.1.0" && git tag v1.1.0 && git push --follow-tags
```

Both release workflows fire on the tag. Full detail in [docs/RELEASE.md](../docs/RELEASE.md).

## What is in this folder

```
store/
├── README.md              this checklist
├── privacy-policy.md      source of website/privacy.html
├── screenshots.md         sizes both stores require, and how to capture them
├── play/listing.md        Play title, descriptions, category, content rating
├── play/data-safety.md    the Data safety form, answer by answer
├── apple/listing.md       App Store name, subtitle, keywords, description
├── apple/app-privacy.md   the App Privacy questionnaire, answer by answer
└── apple/review-notes.md  what to paste into App Review Information
```

## Two things reviewers reliably ask about

**"Your app is open source / AGPL — can you distribute it here?"** Yes: `NOTICE.md` carries an
additional permission under AGPL §7 from the copyright holder specifically allowing app-store
distribution, provided the source stays available. It is, at the repository above.

**"Where is the account / login?"** There isn't one. The app is fully offline; open it and
everything works. Say so in the review notes (already written in `apple/review-notes.md`).
