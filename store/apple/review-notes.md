# App Store — App Review Information

## Sign-in required?

**No.** Leave the demo-account fields empty and tick "Sign-in not required".

## Notes for the reviewer (paste into the Notes field)

```
GymBro is a fully offline workout tracker. There is no account, no sign-in and no server —
open the app and everything is available immediately.

Getting to the main features in under a minute:
1. On first launch the app opens on Home with an empty week.
2. Tap Plan → New routine → add a few exercises from the library → save.
3. Assign the routine to today in the weekly plan, then tap Start workout on Home to see the
   guided session, rest timer and set logging.
4. Settings → Export writes a JSON backup through the system share sheet.

Notes:
- Exercise images and animations are downloaded from the public jsDelivr CDN
  (cdn.jsdelivr.net) the first time they are shown, so the demos need a network connection.
  No user data is sent with those requests. Everything else works fully offline.
- The optional workout reminder uses local notifications only; there is no push server. The
  notification permission is requested only when the user turns the reminder on in Settings.
- The app does not use HealthKit. Body weight is entered by the user, or imported from a file
  the user exports themselves.
- GymBro is open-source software under the AGPL-3.0 (https://github.com/moyibr/GymBro-Training). The
  copyright holder has granted an additional permission under AGPL section 7 that expressly
  allows distribution through app stores; it is documented in NOTICE.md in the repository.
```

## Contact information

Use an email you actually read — Apple's resolution centre messages go there, and a stalled
reply is a stalled release.

## Common first-submission snags for this app

| Rejection | Fix |
|---|---|
| Guideline 2.1 — "we could not find the account" | Ensure "Sign-in not required" is ticked; the notes above say it explicitly. |
| Guideline 4.2 — "minimum functionality / web page wrapper" | GymBro is a native shell over its own offline app with local notifications and share-sheet export, not a wrapper around a website. If asked, say the app has no website to wrap: the entire app is bundled and runs without a network. |
| Missing/incorrect privacy manifest | Already shipped — see [app-privacy.md](app-privacy.md). |
| Screenshots don't match the app | Retake from the current build; see [../screenshots.md](../screenshots.md). |
