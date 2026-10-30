/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import i18next from 'i18next';
import { AION_CLI_DISPLAY_NAME, APP_BRAND_NAME } from '@/common/config/branding';
import { applyBrandName, brandNamePostProcessor } from '@/renderer/services/i18n/brandName';

describe('applyBrandName', () => {
  it('rewrites the product name inside sentences', () => {
    expect(applyBrandName('restart AionUi.')).toBe(`restart ${APP_BRAND_NAME}.`);
    expect(applyBrandName('Show AionUi')).toBe(`Show ${APP_BRAND_NAME}`);
    expect(applyBrandName("AionUi's dark panel")).toBe(`${APP_BRAND_NAME}'s dark panel`);
  });

  it('rewrites the built-in Agent name in translated copy', () => {
    expect(applyBrandName('Aion CLI 为内置 Agent')).toBe(`${AION_CLI_DISPLAY_NAME} 为内置 Agent`);
  });

  it('leaves URLs, wiki slugs and identifiers alone', () => {
    expect(applyBrandName('https://github.com/iOfficeAI/AionUi/issues/987')).toBe(
      'https://github.com/iOfficeAI/AionUi/issues/987'
    );
    expect(applyBrandName('AionUi/wiki/LLM-Configuration')).toBe('AionUi/wiki/LLM-Configuration');
    expect(applyBrandName('AionUi-Image-Generation-Tool-Model-Configuration-Guide')).toBe(
      'AionUi-Image-Generation-Tool-Model-Configuration-Guide'
    );
    expect(applyBrandName('aionui-assistant and AionCore')).toBe('aionui-assistant and AionCore');
  });
});

describe('brand post-processor wiring', () => {
  it('is applied to every resolved translation (incl. defaultValue fallbacks)', async () => {
    const instance = i18next.createInstance();
    await instance.use(brandNamePostProcessor).init({
      lng: 'en',
      resources: { en: { translation: { sentence: 'Open Dismiss AionUi to continue' } } },
      postProcess: ['brand'],
    });

    expect(instance.t('sentence')).toBe(`Open Dismiss ${APP_BRAND_NAME} to continue`);
    // Missing keys resolve to defaultValue — the processor must rewrite those too.
    expect(instance.t('missing', { defaultValue: 'Fallback for AionUi' })).toBe(`Fallback for ${APP_BRAND_NAME}`);
  });
});
