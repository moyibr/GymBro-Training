# Building the mobile app (iOS / Android)

GymBro ships in two flavors from the same codebase:

| | **Mobile app** (`VITE_MOBILE=1`) | **Self-hosted** (`docker compose up`) |
|---|---|---|
| Runs | natively on iPhone / Android (Capacitor shell) | in any browser, against your own server |
| Accounts | none — the phone *is* the account | passkey sign-in, one profile per person |
| Data | stays on the device (file in the app's private storage) | synced to your server, readable on desktop |
| Reminders | native local notifications, no server involved | Web Push from your server |
| Exercise media | loaded from the jsDelivr CDN | served by your server (`img/`, `gif/`) |
| AI Coach | not included | optional |

**The mobile flavor is what goes to the app stores.** It never talks to a backend: no sign-in
screen, no sync, no telemetry. State is mirrored from `localStorage` into `gymbro-state.json` in
the app's private data directory on every change (iOS is allowed to evict WebView storage under
pressure — the file mirror is the durable copy and is restored on launch). Backups go out
through the OS share sheet instead of a browser download.

## Identity

| | |
|---|---|
| App name | **GymBro** |
| Application id / bundle id | **`io.github.moyibr.gymbro`** |
| Version | `frontend/package.json` — propagated by `npm run version:sync` |

The id is permanent: after the first store upload it can never change without starting a new
listing and losing every install.

## Prerequisites

- Node 20+
- **Android:** Android Studio (bundles the SDK) with **SDK Platform 36** installed, and a
  **JDK 21** for Gradle. Android Studio's SDK Manager (Tools → SDK Manager) installs the
  platform; if `java -version` finds nothing, install Temurin 21:
  `winget install EclipseAdoptium.Temurin.21.JDK` on Windows, `brew install --cask temurin@21` on macOS.
- **iOS:** a Mac with Xcode 16+ and CocoaPods (`brew install cocoapods`). A free Apple ID is
  enough to run the app on your own iPhone; the paid Developer Program is needed for TestFlight
  and the App Store.

No Mac? The [iOS release workflow](../.github/workflows/ios-release.yml) builds on a macOS
runner — see [RELEASE.md](RELEASE.md).

## Build & run

```sh
cd frontend
npm ci
npm run build:mobile        # VITE_MOBILE build + `cap sync` into android/ and ios/

npx cap open android        # opens Android Studio → run on emulator or device
npx cap open ios            # opens Xcode (Mac only) → set your signing team, then run
```

`npm run build:mobile` bakes the CDN media base into the bundle and copies the web build into
both native projects — re-run it after every web-code change before building natively.

> **Heads-up:** after `build:mobile`, `frontend/dist` contains the *mobile* bundle.
> Run a plain `npm run build` again before deploying `dist` to a server.

## App icons & splash screens

`frontend/resources/icon.svg` (1024 × 1024) and `resources/splash.svg` (2732 × 2732) are the
only sources. Regenerate every platform size from them:

```sh
cd frontend
npm run assets:generate
```

That rasterizes both SVGs with sharp, runs `@capacitor/assets` over the native projects, and
rewrites the two PWA icons in `public/`. Commit the result — the generated PNGs are checked in
so a clean clone builds without the toolchain.

## Versioning

One number, three places, one command:

```sh
npm run version:sync -- 1.1.0          # sets package.json, gradle and Xcode
npm run version:sync -- 1.1.0 --build 1  # same version, second upload attempt
```

`versionCode` / `CURRENT_PROJECT_VERSION` are derived as
`major×1 000 000 + minor×10 000 + patch×100 + build`, so they always increase — which both
stores require and neither forgives.

## Store notes worth knowing

- **`targetSdk` is 36** (`android/variables.gradle`). Play requires new apps to target API 36
  since 31 August 2026. API 36 also enforces edge-to-edge, so
  `capacitor.config.json` sets `"adjustMarginsForEdgeToEdge": "auto"` — the WebView keeps clear
  of the status and navigation bars instead of drawing under them.
- **No `SCHEDULE_EXACT_ALARM`.** Play gates that permission behind a declaration form for
  alarm-clock-grade apps. The workout reminder schedules inexactly and arrives within a short
  window — see the comment in `android/app/src/main/AndroidManifest.xml`.
- **iPhone only** (`TARGETED_DEVICE_FAMILY = 1`), portrait only. That is one screenshot set
  instead of three, and it matches how the app is actually laid out.
- **`PrivacyInfo.xcprivacy`** is part of the iOS app target. Adding a Capacitor plugin may add a
  required-reason API — check before uploading, because Apple rejects on a mismatch.

## Releasing

Keystore, secrets, tagging, and what each store console wants:
**[RELEASE.md](RELEASE.md)** and **[../store/README.md](../store/README.md)**.

## Licensing and the stores

GymBro is AGPL-3.0, which by itself sits badly with app-store terms of service.
[NOTICE.md](../NOTICE.md) carries an app-store exception (an additional permission under
AGPL §7) granted by the copyright holder, conditional on the source staying available under the
AGPL — so **keep the repository public**. The same file records what this fork changed, which
AGPL §5(a) asks for.
