#!/usr/bin/env bash

SRC_SELECTORS=$(grep -hro 'data-cy="[^"]*"' src | cut -d \" -f2 | sort | uniq)
echo $SRC_SELECTORS | sed "s/ /'\n| '/g; s/^/&export type Selectors = \n| '/; s/.$/&'/;" | cat > cypress/support/selectors.d.ts
