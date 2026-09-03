#!/usr/bin/env node
// One version number, three places that have to agree.
//
//   npm run version:sync                 # push package.json's version into both native projects
//   npm run version:sync -- 1.1.0        # set that version everywhere first
//   npm run version:sync -- 1.1.0 --build 2   # same version, second upload (bumps the codes)
//
// frontend/package.json is the source of truth. Android's versionCode and iOS's
// CURRENT_PROJECT_VERSION are derived from it rather than hand-maintained, because both
// stores reject an upload whose build number isn't strictly greater than the last one, and
// "did I remember to bump the gradle file too?" is exactly the kind of thing that gets
// noticed at 2am with a rejected release.
//
//   versionCode = major*1_000_000 + minor*10_000 + patch*100 + build
//   1.0.0        → 1000000        1.2.3 → 1020300        1.2.3 (+1) → 1020301
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const buildIdx = args.indexOf('--build')
const build = buildIdx === -1 ? 0 : Number(args[buildIdx + 1])
const wanted = args.find(a => /^\d+\.\d+\.\d+$/.test(a))

if (buildIdx !== -1 && !Number.isInteger(build)) {
  console.error('--build takes an integer')
  process.exit(1)
}
if (build < 0 || build > 99) {
  console.error('--build must be 0-99 (bump the patch version instead)')
  process.exit(1)
}

const pkgPath = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
if (wanted && wanted !== pkg.version) {
  pkg.version = wanted
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}
const version = pkg.version
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`package.json version "${version}" is not major.minor.patch`)
  process.exit(1)
}
const [major, minor, patch] = version.split('.').map(Number)
const code = major * 1_000_000 + minor * 10_000 + patch * 100 + build

const edit = (path, edits) => {
  const file = join(root, path)
  let s = readFileSync(file, 'utf8')
  for (const [re, to] of edits) {
    if (!re.test(s)) {
      console.error(`${path}: no match for ${re}`)
      process.exit(1)
    }
    s = s.replace(re, to)
  }
  writeFileSync(file, s)
}

edit('android/app/build.gradle', [
  [/versionCode \d+/, `versionCode ${code}`],
  [/versionName "[^"]*"/, `versionName "${version}"`]
])
edit('ios/App/App.xcodeproj/project.pbxproj', [
  [/MARKETING_VERSION = [^;]+;/g, `MARKETING_VERSION = ${version};`],
  [/CURRENT_PROJECT_VERSION = [^;]+;/g, `CURRENT_PROJECT_VERSION = ${code};`]
])

console.log(`GymBro ${version} — versionCode/CURRENT_PROJECT_VERSION ${code}`)
