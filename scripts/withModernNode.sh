#!/bin/sh
# Vite 8 needs Node ^20.19 || >=22.12. If the active `node` doesn't qualify
# (e.g. Homebrew Node 18), switch to the newest qualifying Node installed through nvm.

# Exit 0 when the given node binary satisfies Vite 8's engine range.
supports_vite() {
  "$1" -e 'const [a, b] = process.versions.node.split(".").map(Number);
    process.exit(a > 22 || (a === 22 && b >= 12) || (a === 20 && b >= 19) ? 0 : 1)' 2>/dev/null
}

if ! supports_vite node; then
  nvm_root="${NVM_DIR:-$HOME/.nvm}/versions/node"
  chosen=""
  # Sort version names only (not full paths), newest first, and take the first that qualifies.
  for version in $(ls "$nvm_root" 2>/dev/null | grep '^v[0-9]' | sort -rV); do
    if supports_vite "$nvm_root/$version/bin/node"; then
      chosen="$nvm_root/$version"
      break
    fi
  done

  if [ -n "$chosen" ]; then
    echo "› Node $(node -v 2>/dev/null) can't run Vite 8 — using $("$chosen/bin/node" -v) from nvm"
    PATH="$chosen/bin:$PATH"
    export PATH
  else
    echo "✗ Vite 8 needs Node ^20.19 or >=22.12 (found $(node -v 2>/dev/null || echo none))."
    echo "  Install one with:  nvm install 22   (or: brew install node@22)"
    exit 1
  fi
fi

exec "$@"
