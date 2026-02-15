#!/bin/bash
# Spouštěč Truhlářského Editoru pro Linux/Mac
DIR="$(cd "$(dirname "$0")" && pwd)"

if command -v xdg-open &> /dev/null; then
    xdg-open "$DIR/index.html"
elif command -v open &> /dev/null; then
    open "$DIR/index.html"
else
    echo "Otevřete soubor v prohlížeči: $DIR/index.html"
fi
