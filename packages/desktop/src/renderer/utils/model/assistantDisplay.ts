/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Assistant } from '@/common/types/agent/assistantTypes';
import { resolveAgentDisplayName } from '@/common/config/branding';

type AssistantNameSource = Pick<Assistant, 'id' | 'name' | 'name_i18n'> & Partial<Pick<Assistant, 'source' | 'agent'>>;

/** Keep generated Aion CLI's locked identity consistent with its display name. */
export function resolveAssistantEditorName(assistant: AssistantNameSource | null | undefined, name: string): string {
  return assistant?.source === 'generated' && assistant.agent?.type === 'aionrs'
    ? resolveAgentDisplayName(assistant.agent.type, name)
    : name;
}

export function resolveAssistantName(
  assistant: AssistantNameSource | null | undefined,
  localeKey: string,
  fallback = 'Assistant'
): string {
  if (!assistant) {
    return fallback;
  }

  if (assistant.source === 'generated' && assistant.agent?.type === 'aionrs') {
    return resolveAgentDisplayName(assistant.agent.type, assistant.name);
  }

  const localizedName = assistant.name_i18n?.[localeKey] || assistant.name_i18n?.['en-US'];
  return localizedName?.trim() || assistant.name?.trim() || assistant.id || fallback;
}

/** Use a saved task name unless it is the generated assistant's old engine name. */
export function resolveAssistantTaskName(
  assistant: AssistantNameSource | null | undefined,
  localeKey: string,
  savedName?: string
): string {
  const displayName = resolveAssistantName(assistant, localeKey);
  const configuredName = savedName?.trim();
  if (assistant?.source !== 'generated' || !configuredName) return displayName;
  if (assistant.agent?.type === 'aionrs' && (configuredName === assistant.name || configuredName === 'Aion CLI')) {
    return displayName;
  }
  return configuredName;
}
