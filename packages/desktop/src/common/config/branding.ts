/**
 * 全局品牌 Logo 配置（唯一数据源 / single source of truth）。
 *
 * 换 logo 时只需要替换 BRAND_LOGO_FILE 指向的那张图片；如果连文件名或目录也要改，
 * 也只改下面这一行路径。侧边栏、登录页、浏览器标签页图标（favicon）、PWA 图标
 * 全部由这一处推导出来，不需要再改任何组件或 HTML。
 *
 * 同步动作由 electron.vite.config.ts 里的 `aionui:brand-logo` 插件在 dev/build 开始时完成：
 * 它把 BRAND_LOGO_FILE 复制到 BRAND_LOGO_OUTPUT_PATHS（仓库 public/ 下的副本），
 * 这些副本再随构建产物 / 安装包一起发布。
 */

/** logo 源文件路径（换 logo 只需要改这一行）。 */
export const BRAND_LOGO_FILE = '/home/zlp/aionui/logo/logo.png';

/**
 * logo 需要占用的所有站点路径（相对 public/ 与站点根目录）。
 * 这些路径同时被 renderer/index.html（favicon / apple-touch-icon）、
 * public/manifest.webmanifest、public/sw.js 引用；只要文件名不变，它们会自动生效。
 */
export const BRAND_LOGO_OUTPUT_PATHS = [
  'logo.png',
  'pwa/icon-180.png',
  'pwa/icon-192.png',
  'pwa/icon-512.png',
] as const;

/** 页面里引用 logo 的统一 URL（相对 index.html，兼容 file:// 与子路径部署）。 */
export const BRAND_LOGO_URL = `./${BRAND_LOGO_OUTPUT_PATHS[0]}`;

/**
 * 前端显示的品牌名：侧边栏 wordmark、窗口/标签页标题、登录页、PWA 应用名、
 * 以及代码里写死的界面文案。改这一行即可全局生效。
 *
 * i18n 文案里的品牌名走 `{{brand}}` 占位符，调用处统一传这个常量
 * （见 login/index.tsx 与 DocumentTitle.tsx）。
 */
export const APP_BRAND_NAME = 'wxzAI';

/** 内置 aionrs Agent 在界面中的名称；不改变后端标识。 */
export const AION_CLI_DISPLAY_NAME = '星地网络Agent';

/** 将内置 Agent 的后端类型映射为统一的界面显示名。 */
export const resolveAgentDisplayName = (agentType: string | undefined, name: string): string =>
  agentType === 'aionrs' ? AION_CLI_DISPLAY_NAME : name;

/** index.html 里品牌名的占位符，由 electron.vite.config.ts 的 aionui:brand 插件替换。 */
export const APP_BRAND_NAME_PLACEHOLDER = '%APP_BRAND_NAME%';
