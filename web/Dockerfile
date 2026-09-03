# Multi-stage: build the React app, then serve it with nginx.
# Self-hosters never need Node locally — `docker compose up` builds everything.
#
# --platform=$BUILDPLATFORM pins the build stage to the host's native arch even when
# cross-building for other targets (e.g. amd64 host building an arm64 image). The build
# output (static JS/CSS/HTML) is arch-independent, so there's no reason to run it under
# QEMU — and QEMU-emulated npm installs are known to corrupt esbuild/rollup's platform-
# specific native binaries, which is what breaks `vite build` with unrelated-looking
# module-resolution errors.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci 2>/dev/null || npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY web/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Fail the image build on a malformed config instead of at somebody's `docker compose up` —
# the CI job that builds this image is where a broken header snippet gets caught.
#
# The substitution is why this isn't a plain `nginx -t`: nginx resolves proxy_pass upstreams
# while parsing, and the `api` container does not exist during an image build, so the real
# config fails with "host not found in upstream". The check therefore runs against a copy with
# that one hostname swapped for a literal address; every other line, the header snippet
# included, is exactly what ships.
RUN cp /etc/nginx/conf.d/default.conf /tmp/default.conf \
 && sed -i 's|http://api:3000|http://127.0.0.1:3000|' /etc/nginx/conf.d/default.conf \
 && nginx -t \
 && cp /tmp/default.conf /etc/nginx/conf.d/default.conf \
 && rm /tmp/default.conf
# exercise media (img/gif) is mounted at runtime from the media volume
