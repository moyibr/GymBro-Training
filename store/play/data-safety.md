# Google Play — Data safety form

Play Console → Policy → App content → Data safety. Answer exactly this; every answer is a
statement about what the shipped APK/AAB actually does, and Play does test it.

## Data collection and security

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **No** |
| Is all of the user data collected by your app encrypted in transit? | *(n/a — nothing is collected)* |
| Do you provide a way for users to request that their data is deleted? | *(n/a)* — data never leaves the device; uninstalling removes it |

That single **No** is the whole form. It is accurate because:

- there is **no account, no sign-in and no server** in the mobile build (`VITE_MOBILE=1`
  compiles the sync and passkey code out entirely);
- the training log, body-weight history and settings are written to `localStorage` and mirrored
  to `gymbro-state.json` in the app's private data directory — both device-local;
- there is **no analytics, crash-reporting or advertising SDK** of any kind, and no advertising
  identifier is read;
- backups leave only when the user taps Export, and go through the Android share sheet to a
  destination the user picks.

## The one third-party connection, and why it is not collection

Exercise images and animations (~140 MB in total, far too much to bundle) are fetched on demand
from the public **jsDelivr** CDN:

```
https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@7455efae…/images/
https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@7455efae…/videos/
```

These are ordinary static asset requests. No identifier, cookie, account or workout data is
attached; the CDN sees only the IP address and the file being requested, as any web request
does. Play's Data safety form is about data your app **collects or shares**, and an image
download carrying nothing about the user is neither. Nothing else on the form changes.

If you would rather disclose it anyway, the honest wording is: *"Exercise demonstration media is
loaded from a public content delivery network; no user data is sent with the request."* Put that
in the privacy policy (it already is) rather than inventing a data type on the form.

## Permissions the app declares, and why

| Permission | Source | Why |
|---|---|---|
| `INTERNET` | the app | fetch exercise images/animations from the CDN |
| `POST_NOTIFICATIONS` | local-notifications plugin | the workout-day reminder, asked for only when the user turns it on |
| `RECEIVE_BOOT_COMPLETED` | local-notifications plugin | re-arm a scheduled reminder after a reboot |
| `WAKE_LOCK` | local-notifications plugin | deliver a reminder while the device is dozing |

**Not declared:** `SCHEDULE_EXACT_ALARM`. Play gates it behind a declaration form for
alarm-clock-grade apps, and a daily reminder does not qualify — the reminder is scheduled
inexactly instead and arrives within a short window.

## Families / target audience

Target age: **18+** (or 13+ if you prefer). GymBro is not designed for children and should not
be enrolled in the Designed for Families programme — strength-training loads are not a
children's topic, and staying out of it avoids the extra policy surface.
