# App Store — App Privacy questionnaire

App Store Connect → your app → App Privacy. Apple asks one gateway question and then branches.

## The answer

> **Do you or your third-party partners collect data from this app?**
> → **No, we do not collect data from this app**

That ends the questionnaire, and the product page shows **"Data Not Collected"**.

## Why that is accurate

Apple's definition of *collect* is transmitting data off the device and retaining it beyond
what is needed to service the request in the moment. GymBro:

- has **no account, no sign-in, no server** — the mobile build compiles the sync and passkey
  code out entirely (`VITE_MOBILE=1`);
- stores the training log, body-weight history and settings in `localStorage`, mirrored to
  `gymbro-state.json` in the app's private container, both on-device;
- contains **no analytics, attribution, crash-reporting or advertising SDK**, and never touches
  the advertising identifier (`ATTrackingManager` is not linked);
- schedules workout reminders as **local** notifications — no push server, no device token;
- exports a backup only when the user taps Export, through the system share sheet to a
  destination the user chooses.

The one outbound request is exercise images and animations from the public **jsDelivr** CDN.
It carries no identifier and nothing about the user, so it is neither collection nor tracking —
the same category as a webpage loading an image. It is disclosed in the privacy policy anyway.

## Privacy manifest

`ios/App/App/PrivacyInfo.xcprivacy` ships in the app target and declares:

| | |
|---|---|
| `NSPrivacyTracking` | `false` |
| `NSPrivacyTrackingDomains` | empty |
| `NSPrivacyCollectedDataTypes` | empty |
| Required-reason APIs | `NSPrivacyAccessedAPICategoryUserDefaults` → `CA92.1` (WebView/Capacitor state), `NSPrivacyAccessedAPICategoryFileTimestamp` → `C617.1` (files the app itself wrote) |

Missing or inconsistent privacy manifests are a routine rejection for Capacitor and Cordova
apps. If a future plugin is added, check whether it needs another required-reason entry before
uploading.

## App Tracking Transparency

Not applicable, and no `NSUserTrackingUsageDescription` is present — the app does not track. Do
not add ATT: an app that shows the prompt without tracking is itself a rejection reason.

## Health data

GymBro does **not** read or write HealthKit. Body weight is typed in by the user or imported
from a file the user exports from the Health app themselves; the app has no entitlement and asks
for no health permission. Answer any HealthKit question with **No**.
