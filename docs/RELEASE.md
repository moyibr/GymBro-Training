# Cutting a GymBro release

Both store builds are produced by GitHub Actions, so a release is: bump the version, push a
tag, collect the artifacts. Everything that needs a secret degrades gracefully — the workflows
run and produce something useful before you own any signing material.

## One-time setup

### 1. The Android keystore

This is the single most important file in the project. Android identifies your app by the key it
was signed with: **an update signed with a different key cannot be installed over the old app**,
ever, by anyone.

```sh
keytool -genkeypair -v -keystore gymbro-release.jks -alias gymbro \
        -keyalg RSA -keysize 2048 -validity 10950
```

- Keep it **outside** the repository (`android/.gitignore` blocks `*.jks` and
  `keystore.properties` in case it lands there anyway).
- Back it up somewhere you will still have in 10 years — a password manager attachment plus one
  offline copy. Note the store password, key alias and key password alongside it.
- Enrol in **Play App Signing** at your first upload. Google then keeps the actual app-signing
  key and yours becomes an upload key, which *can* be reset if you lose it. Without that
  enrolment, losing this file means a new listing.

To build signed releases locally, copy the template and fill it in:

```sh
cd frontend/android
cp keystore.properties.example keystore.properties   # git-ignored
./gradlew bundleRelease assembleRelease
```

Without a keystore the same commands still work and simply produce unsigned artifacts.

### 2. Repository secrets

Settings → Secrets and variables → Actions.

| Secret | For | How to get it |
|---|---|---|
| `ANDROID_KEYSTORE_BASE64` | Android signing | `base64 -w0 gymbro-release.jks` (macOS: `base64 -i …`) |
| `ANDROID_KEYSTORE_PASSWORD` | Android signing | the store password you chose |
| `ANDROID_KEY_ALIAS` | Android signing | `gymbro` |
| `ANDROID_KEY_PASSWORD` | Android signing | the key password you chose |
| `PLAY_SERVICE_ACCOUNT_JSON` | *optional* Play upload | Play Console → Setup → API access → service account with "Release apps to testing tracks" |
| `APPLE_TEAM_ID` | iOS signing | developer.apple.com → Membership |
| `APPLE_CERT_P12_BASE64` | iOS signing | export your Apple Distribution certificate from Keychain as `.p12`, then base64 it |
| `APPLE_CERT_P12_PASSWORD` | iOS signing | the password you set on the `.p12` |
| `APPLE_PROVISIONING_PROFILE_BASE64` | iOS signing | App Store provisioning profile for `io.github.moyibr.gymbro`, base64'd |
| `APPSTORE_API_KEY_ID` / `APPSTORE_ISSUER_ID` / `APPSTORE_API_PRIVATE_KEY` | *optional* TestFlight upload | App Store Connect → Users and Access → Integrations → App Store Connect API |

Never commit any of these. The workflows delete the decoded keystore and the temporary keychain
when they finish, including on failure.

## Every release

```sh
cd frontend
npm ci
npm test && node scripts/check-locales.mjs      # what CI will run anyway

npm run version:sync -- 1.1.0                   # package.json + gradle + Xcode
git commit -am "GymBro 1.1.0"
git tag v1.1.0
git push --follow-tags
```

The tag triggers both release workflows:

| Workflow | Runner | Output |
|---|---|---|
| `android-release.yml` | ubuntu | `app-release.aab` (Play) + `app-release.apk` (sideload/QA), signed if the secrets exist; optional upload to the Play **internal** track |
| `ios-release.yml` | macos-15 | unsigned build (no Apple secrets) or a signed `.ipa`, optionally uploaded to **TestFlight** |

Download them from the run's **Artifacts** section.

### Re-uploading the same version

A store rejects a build whose build number isn't higher than the last one, even for the same
version string. Bump the build counter instead of inventing a version:

```sh
npm run version:sync -- 1.1.0 --build 1
```

## First release: the order that actually works

1. Repository public, Pages on, privacy policy reachable at
   `https://moyibr.github.io/GymBro-Training/privacy.html`.
2. Keystore created and backed up; Android secrets added.
3. Tag `v1.0.0` → download the AAB and APK.
4. Install the APK on a real phone and use it for a session. Icon and name correct, reminder
   fires, export shares, nothing draws under the status bar.
5. Play Console: create the app, fill the listing from [`store/`](../store/), upload the AAB to
   **closed testing**, start the 14-day / 12-tester clock.
6. Apple: enrol, register the App ID, add the iOS secrets, re-run the iOS workflow, submit the
   TestFlight build for review.
7. After the Play testing window closes, apply for production and promote.

Full console-by-console checklist: [`store/README.md`](../store/README.md).

## Troubleshooting

**`SDK location not found` locally.** Android Studio writes `android/local.properties` the first
time you open the project; CI sets it from the SDK image. Opening `frontend/android` once in
Android Studio fixes it.

**Gradle can't find a JDK.** Point it at one explicitly:
`./gradlew -Dorg.gradle.java.home="/path/to/jdk-21" bundleRelease`.

**`compileSdk 36` unavailable.** Install SDK Platform 36 in Android Studio → SDK Manager, or
`sdkmanager "platforms;android-36" "build-tools;36.0.0"`.

**The iOS job fails at `pod install`.** Usually a stale spec cache on the runner —
`pod install --repo-update` is already used; re-run the job.

**A release build works in debug but not in release.** `minifyEnabled` is deliberately `false`;
if someone turns R8 on, Capacitor's reflection into plugin classes is the first thing to check.
