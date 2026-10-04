#!/bin/sh
set -eu

runtime_uid="$(id -u "${APP_USER:-appuser}")"
runtime_gid="$(id -g "${APP_USER:-appuser}")"

mkdir -p storage/app/private storage/app/public storage/framework/cache/data \
    storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R "${runtime_uid}:${runtime_gid}" storage bootstrap/cache

# Repair files created by the previous root-based development installation.
if [ "${1:-}" = development ]; then
    if [ -d vendor ]; then
        chown -R "${runtime_uid}:${runtime_gid}" vendor
    fi
    if [ -f composer.lock ]; then
        chown "${runtime_uid}:${runtime_gid}" composer.lock
    fi
fi
