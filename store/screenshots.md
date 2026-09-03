# Screenshots and graphics

Both stores reject a listing with missing or wrongly-sized images, and both compare what they
see to what the app does — so capture from the real build, not a mockup.

## What each store needs

### Google Play

| Asset | Spec | Count |
|---|---|---|
| Phone screenshots | 16:9 or 9:16, min 1080 px on the short side, PNG/JPEG | **2 minimum**, 8 maximum |
| App icon | 512 × 512 PNG, 32-bit | 1 (already generated: `frontend/resources/icon.png`, resize to 512) |
| Feature graphic | **1024 × 500** PNG/JPEG, no alpha | 1, required |
| Tablet screenshots | only if you list tablet support | — |

The feature graphic is the banner at the top of the listing. `assets/banner.svg` is the GymBro
wordmark on the app background — export it at 1024 × 500 and it is done:

```bash
cd frontend
node -e "require('sharp')('../assets/banner.svg',{density:400}).resize(1024,500,{fit:'contain',background:'#0c0e12'}).png().toFile('../store/play/feature-graphic.png')"
```

### Apple App Store

| Display size | Pixels (portrait) | Required? |
|---|---|---|
| 6.9″ (iPhone 16 Pro Max / 17 Pro Max) | **1290 × 2796** | **Yes** |
| 6.5″ (iPhone 11 Pro Max / XS Max) | 1242 × 2688 | Only if you don't supply 6.9″ |
| iPad | 2064 × 2752 | Not needed — the app is iPhone-only (`TARGETED_DEVICE_FAMILY = 1`) |

3–10 screenshots per size. Apple scales the 6.9″ set down for smaller devices, so one set is
enough.

## The five screens worth showing

In this order — the first two are all most people look at:

1. **Home** — today's workout card and the body-weight chart
2. **Guided workout** — a set being logged, rest timer running, animated demo visible
3. **Plan** — the week with routines assigned
4. **Stats** — the activity heatmap and a 1RM curve
5. **Muscle map** — the body diagram shaded by recent work

Seed a realistic history first, or the charts are empty and the listing looks dead: build the
demo bundle (`VITE_DEMO=1 npm run build`) in a browser to see what a populated app looks like,
then reproduce roughly that in the real app before capturing.

## Capturing

**Android** — Android Studio → Device Manager → a Pixel 8 Pro image (1344 × 2992, above Play's
minimum), install the release APK, then the camera button in the emulator toolbar. Or on a real
phone: power + volume-down, then `adb pull`.

**iPhone** — Xcode → Simulator → **iPhone 17 Pro Max** (1290 × 2796 exactly). Run the app, then
`Cmd+S` (File → Save Screen) or:

```bash
xcrun simctl io booted screenshot ~/Desktop/gymbro-1.png
```

Simulator screenshots are the exact pixel size Apple wants — no resizing, which is where most
"invalid screenshot dimensions" rejections come from.

## Where to put them

```
store/play/screenshots/1-home.png …
store/play/feature-graphic.png
store/apple/screenshots/6.9/1-home.png …
```

They are listing assets, not app assets — nothing in the build reads them, and keeping them in
the repo means the next release can reuse or diff them.
