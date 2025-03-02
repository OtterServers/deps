#!/bin/bash
LAST_ARG="${@: -1}"
if [ ! -f "$LAST_ARG" ]; then
    echo "Error: File '$LAST_ARG' does not exist."
    exit 1
fi
cat "$LAST_ARG" | ~/.bun/bin/bun run -
