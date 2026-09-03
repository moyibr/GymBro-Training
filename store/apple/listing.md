# App Store — listing

App Store Connect → your app → App Information / iOS App / Version Information.

## App Name (30 max)

```
GymBro: Workout Tracker
```
`23 characters`

> If "GymBro" alone is taken, Apple will reject the name at submission, not at creation.
> Fallbacks that keep the brand: `GymBro Lift Log`, `GymBro Training Log`.

## Subtitle (30 max)

```
Plan, lift, log. No account.
```
`28 characters`

## Promotional text (170 max, editable without a review)

```
Your training log, on your phone and nowhere else. Weekly plans, guided sessions, automatic
progression, 1RM curves and a body-weight chart. No account, no ads, no tracking.
```

## Description (4000 max)

```
GymBro is a gym and body-weight tracker that keeps its hands off your data. There is no account
to create, no subscription, no ads and no analytics — your training log lives on your iPhone and
goes nowhere else.

PLAN YOUR WEEK
Build a routine for each training day from a library of 1,324 exercises, each with an animated
demo, or add your own with nothing more than a name and a body part. Missed a session? Move it
to another day without rewriting your week.

TRAIN WITH IT IN YOUR HAND
GymBro knows what day it is and opens today's session. Your weights are pre-filled from last
time, the rest timer starts itself, personal records are spotted as you hit them, and the screen
stays awake until you finish the workout.

PROGRESSION THAT FOLLOWS A RULE
Pick one per routine and override it per exercise: linear, Greyskull LP, double progression
through a rep range, or adding time. Every target tells you why it is that number. Missed reps
never advance the load, stalls trigger a deload, and bodyweight exercises progress in reps.

SEE WHAT IS ACTUALLY HAPPENING
An estimated 1RM per exercise with its own curve, an activity heatmap for the year, a body map
shaded by how much work each muscle got — including the muscles you have been quietly skipping —
and a body-weight chart with a goal line you set.

BUILT FOR REAL SESSIONS
Supersets logged back to back. Planks, hangs and carries logged by time instead of reps, with
their own work timer. Cardio logged as time and speed. An optional effort column in RIR or RPE.

BRING YOUR HISTORY
Import from FitNotes, Strong or Hevy, or body weight straight out of an Apple Health export.
Anything the library doesn't recognise becomes one of your own exercises, so nothing is dropped.

YOURS TO KEEP
One-tap JSON backup through the share sheet, and an import that reads it straight back. Share a
weekly plan with a training partner, or print it as a clean PDF.

12 LANGUAGES
English, German, Spanish, French, Italian, Portuguese, Polish, Turkish, Russian, Chinese, Korean
and Hindi, with exercise instructions localized in ten of them.

FREE AND OPEN SOURCE
GymBro is AGPL-3.0, forked from openGym. The whole source is on GitHub — read it, build it
yourself, or fork it again: github.com/moyibr/GymBro-Training

Exercise images and animations are downloaded from a public CDN the first time you view them, so
the exercise demos need a connection. Everything else works offline, permanently.

GymBro records what you type. It is not a medical device and gives no medical advice.
```

## Keywords (100 characters max, comma-separated, no spaces)

```
workout,gym,lifting,strength,tracker,log,sets,reps,1rm,progression,bodyweight,fitness,routine
```
`93 characters`

Don't repeat words already in the name or subtitle (Apple indexes those separately), and don't
use competitor names — that gets listings rejected.

## URLs and details

| Field | Value |
|---|---|
| Support URL | `https://github.com/moyibr/GymBro-Training/issues` |
| Marketing URL | `https://github.com/moyibr/GymBro-Training` |
| Privacy Policy URL | `https://moyibr.github.io/GymBro-Training/privacy.html` |
| Primary category | **Health & Fitness** |
| Secondary category | Sports |
| Age rating | **4+** — no objectionable content; answer "None" to every questionnaire item |
| Copyright | `2026 <your name>. AGPL-3.0. Forked from openGym by Duarte Santos.` |
| Pricing | Free, no in-app purchases |

## Version release notes (What's New) — 1.0.0

```
First release. GymBro is a fork of the open-source openGym tracker: same training engine, new
name, now on the App Store. No account, no ads, nothing leaves your phone.
```

## Encryption / export compliance

`ITSAppUsesNonExemptEncryption` is set to `false` in `Info.plist`, so App Store Connect stops
asking on every upload. This is accurate: GymBro ships no cryptography of its own and only
benefits from the OS's HTTPS when it fetches exercise images.
