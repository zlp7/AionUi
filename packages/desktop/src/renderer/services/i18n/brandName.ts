/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { AION_CLI_DISPLAY_NAME, APP_BRAND_NAME } from '@/common/config/branding';

/**
 * Product name inside translated copy.
 *
 * Locale files mention the upstream brand inside sentences ("AionUi opened, but
 * …", "Show AionUi", "AionUi Skills Market"). Rewriting every occurrence in
 * every language pack would mean maintaining the name in ~900 places, so the
 * resolved string is rewritten at runtime from the single source in
 * `common/config/branding.ts` instead (see the `brand` post-processor in
 * ./index.ts).
 *
 * The product name and built-in Agent display name are rewritten. For the
 * product name, path-shaped tokens remain untouched:
 * - a token adjacent to `/` or `-` is left alone, so URLs and wiki slugs such as
 *   `github.com/iOfficeAI/AionUi`, `AionUi/wiki/...` or
 *   `AionUi-Image-Generation-Tool-Model-Configuration-Guide` stay valid;
 * - lowercase identifiers (`aionui`, `aionui-assistant`) and `AionCore` never match.
 */
const BRAND_TOKEN = /(?<!\/)AionUi(?![-/])/g;
const AGENT_TOKEN = /Aion CLI/g;

/** Rewrite configured names in a translated (or default) string. */
export function applyBrandName(value: string): string {
  return value.replace(BRAND_TOKEN, APP_BRAND_NAME).replace(AGENT_TOKEN, AION_CLI_DISPLAY_NAME);
}

/**
 * i18next post-processor: applied to every resolved string, including
 * `defaultValue` fallbacks, so both translated and untranslated copy stays in sync.
 */
export const brandNamePostProcessor = {
  type: 'postProcessor' as const,
  name: 'brand',
  process: (value: string) => applyBrandName(value),
};
