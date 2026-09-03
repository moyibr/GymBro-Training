#!/usr/bin/env node
// Regenerate every icon and splash screen GymBro ships, from two SVGs.
//
//   npm run assets:generate
//
// resources/icon.svg and resources/splash.svg are the only sources. This script rasterizes
// them with sharp (a @capacitor/assets dependency, so nothing extra to install), then hands
// the PNGs to @capacitor/assets, which writes the Android mipmaps/drawables and the iOS
// asset catalogue. The two PWA icons in public/ are written here directly — @capacitor/assets
// only knows about the native projects, and a web build that kept the old mark would show a
// different icon on the home screen than the app store one.
import { execFileSync } from 'node:child_process'
import { rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const res = join(root, 'resources')
const pub = join(root, 'public')

const render = (src, out, size) =>
  sharp(join(res, src), { density: 384 })     // density: rasterize the SVG large, then fit
    .resize(size, size, { fit: 'contain', background: { r: 12, g: 14, b: 18, alpha: 1 } })
    .png()
    .toFile(out)

console.log('rasterizing sources…')
await render('icon.svg', join(res, 'icon.png'), 1024)
await render('icon.svg', join(res, 'icon-foreground.png'), 1024)
await render('splash.svg', join(res, 'splash.png'), 2732)
await render('splash.svg', join(res, 'splash-dark.png'), 2732)

console.log('generating platform assets…')
// Called through its bin script rather than `npx`: node refuses to spawn a .cmd shim on
// Windows without a shell, and this has to run the same way on a dev laptop and on CI.
execFileSync(
  process.execPath,
  [join(root, 'node_modules', '@capacitor', 'assets', 'bin', 'capacitor-assets'),
   'generate',
   '--iconBackgroundColor', '#0c0e12',
   '--iconBackgroundColorDark', '#0c0e12',
   '--splashBackgroundColor', '#0c0e12',
   '--splashBackgroundColorDark', '#0c0e12'],
  { cwd: root, stdio: 'inherit' }
)

// After the generator, not before: its PWA pass writes its own `icons/` folder and clears
// what it finds in the web output, which would take the two icons manifest.json names with it.
console.log('writing PWA icons…')
await rm(join(root, 'icons'), { recursive: true, force: true })
await render('icon.svg', join(pub, 'icon-180.png'), 180)
await render('icon.svg', join(pub, 'icon-512.png'), 512)

console.log('done — android/ios assets and public/icon-*.png are up to date')
