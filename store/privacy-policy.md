# GymBro — Privacy Policy

**Last updated: 3 September 2026**

GymBro does not collect your data. There is no account, no server of ours, and no analytics.
This page exists because both app stores require a privacy policy at a public URL, and because
you should be able to check the claim rather than take it on trust — the whole app is open
source at <https://github.com/moyibr/GymBro-Training>.

## What GymBro stores, and where

Everything you enter — your routines, weekly plan, logged workouts, body-weight history,
settings and language — is stored **on your device only**, in the app's private storage. It is
not uploaded anywhere. We never see it, because there is nowhere for it to arrive.

Deleting the app deletes that data. There is no copy elsewhere to request or erase, and no
backup unless you made one yourself.

## What leaves your device

**Exercise images and animations.** The exercise library ships with the app, but its ~140 MB of
images and animations do not. When an exercise demo is displayed, the app downloads that image
from the public jsDelivr content delivery network:

> `https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@…`

Like any web request, this reveals your IP address and the file requested to the CDN. Nothing
about you, your workouts or your device is attached — no account, no identifier, no cookie set
by us. jsDelivr's own privacy policy is at <https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net>.

**A backup you export.** Settings → Export writes your data to a file and hands it to your
system's share sheet. Where it goes from there — Files, iCloud Drive, Google Drive, email — is
your choice, and is governed by whichever service you pick.

**A plan you share.** Sharing a weekly plan produces a small file containing routines and the
week schedule only — no workouts, no body-weight history — that you send yourself.

Nothing else. No telemetry, no crash reporting, no advertising, no tracking across apps or
websites.

## Notifications

The optional workout-day reminder uses your device's **local** notifications. It is scheduled on
the device, fires on the device, and involves no server and no push token. The app asks for
notification permission only when you switch the reminder on, and the reminder stops entirely
when you switch it off.

## Health data

GymBro does not connect to Apple Health, Google Fit or Health Connect, and holds no permission
to read from them. Body weight is what you type in, or what you import from a file you exported
yourself.

## Children

GymBro is not directed at children and collects nothing from anyone, children included.

## The self-hosted version

The same source also builds a self-hosted web version that some people run on their own server,
with passkey sign-in and sync between their devices. In that case the data lives on **their**
server under their control, and this policy — which covers the mobile apps published on Google
Play and the App Store — does not describe that deployment. The mobile apps never talk to any
server.

## Changes

If a future version of GymBro ever collects anything, this page will say so before that version
ships, and the store listings' privacy sections will be updated to match.

## Contact

Questions, or something here that doesn't match what the app does: open an issue at
<https://github.com/moyibr/GymBro-Training/issues>.
