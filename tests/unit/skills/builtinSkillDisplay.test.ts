import { describe, expect, it } from 'vitest';
import type { TFunction } from 'i18next';
import zhCN from '@/renderer/services/i18n/locales/zh-CN/settings.json';
import { getBuiltinSkillDisplay } from '@/renderer/utils/skills/builtinSkillDisplay';

const builtinNames = [
  'aionui-troubleshooting',
  'aionui-webui-public',
  'aionui-webui-setup',
  'aionui-config',
  'conversation-create',
  'cron',
  'officecli',
  'session-message',
  'skill-creator',
  'mermaid',
  'moltbook',
  'morph-ppt',
  'morph-ppt-3d',
  'officecli-academic-paper',
  'officecli-data-dashboard',
  'officecli-docx',
  'officecli-financial-model',
  'officecli-pitch-deck',
  'officecli-pptx',
  'officecli-word-form',
  'officecli-xlsx',
  'openclaw-setup',
  'pdf',
  'story-roleplay',
  'weixin-file-send',
  'x-recruiter',
  'xiaohongshu-recruiter',
];

const t = ((key: string) => {
  const [, catalog, skillKey, field] = key.split('.');
  if (catalog !== 'builtinSkillCatalog') return key;
  return (
    zhCN.builtinSkillCatalog[skillKey as keyof typeof zhCN.builtinSkillCatalog]?.[field as 'name' | 'description'] ??
    key
  );
}) as TFunction;

describe('getBuiltinSkillDisplay', () => {
  it('has Chinese names and descriptions for every bundled skill', () => {
    expect(builtinNames).toHaveLength(27);
    for (const name of builtinNames) {
      const display = getBuiltinSkillDisplay({ name, description: 'English description', source: 'builtin' }, t);
      expect(display.name, name).toMatch(/[\u3400-\u9fff]/);
      expect(display.description, name).toMatch(/[\u3400-\u9fff]/);
    }
  });

  it('preserves custom skill metadata and unknown builtin identifiers', () => {
    expect(getBuiltinSkillDisplay({ name: 'cron', description: 'My skill', source: 'custom' }, t)).toEqual({
      name: 'cron',
      description: 'My skill',
    });
    expect(getBuiltinSkillDisplay({ name: 'future-skill', description: 'New skill', source: 'builtin' }, t)).toEqual({
      name: 'future-skill',
      description: 'New skill',
    });
  });
});
