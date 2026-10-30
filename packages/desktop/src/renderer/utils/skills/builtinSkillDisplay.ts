import type { TFunction } from 'i18next';

type SkillIdentity = {
  name: string;
  description?: string;
  source?: string;
};

const BUILTIN_SKILL_KEYS: Record<string, string> = {
  'aionui-troubleshooting': 'aionuiTroubleshooting',
  'aionui-webui-public': 'aionuiWebuiPublic',
  'aionui-webui-setup': 'aionuiWebuiSetup',
  'aionui-config': 'aionuiConfig',
  'conversation-create': 'conversationCreate',
  cron: 'cron',
  officecli: 'officecli',
  'session-message': 'sessionMessage',
  'skill-creator': 'skillCreator',
  mermaid: 'mermaid',
  moltbook: 'moltbook',
  'morph-ppt': 'morphPpt',
  'morph-ppt-3d': 'morphPpt3d',
  'officecli-academic-paper': 'officecliAcademicPaper',
  'officecli-data-dashboard': 'officecliDataDashboard',
  'officecli-docx': 'officecliDocx',
  'officecli-financial-model': 'officecliFinancialModel',
  'officecli-pitch-deck': 'officecliPitchDeck',
  'officecli-pptx': 'officecliPptx',
  'officecli-word-form': 'officecliWordForm',
  'officecli-xlsx': 'officecliXlsx',
  'openclaw-setup': 'openclawSetup',
  pdf: 'pdf',
  'story-roleplay': 'storyRoleplay',
  'weixin-file-send': 'weixinFileSend',
  'x-recruiter': 'xRecruiter',
  'xiaohongshu-recruiter': 'xiaohongshuRecruiter',
};

export const getBuiltinSkillDisplay = (skill: SkillIdentity, t: TFunction) => {
  const key = skill.source === 'builtin' ? BUILTIN_SKILL_KEYS[skill.name] : undefined;
  return {
    name: key ? t(`settings.builtinSkillCatalog.${key}.name`, { defaultValue: skill.name }) : skill.name,
    description: key
      ? t(`settings.builtinSkillCatalog.${key}.description`, { defaultValue: skill.description ?? '' })
      : (skill.description ?? ''),
  };
};
