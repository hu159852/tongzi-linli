// ============================================================
// 桐梓邻里 · 单文件版（Worker / Pages _worker.js 通用）
// 所有页面、样式、脚本、接口都在这一个文件里
// 部署：GitHub 新建文件 public/_worker.js，粘贴本文件全部内容
// ============================================================

const HTML_INDEX = "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n  <meta name=\"theme-color\" content=\"#1D7A5F\" />\n  <meta name=\"description\" content=\"桐梓邻里——桐梓本地公益信息墙，免费发布求职招聘、二手闲置、房屋租售、拼车顺路、求助帮忙、失物招领、本地服务信息。\" />\n  <title>桐梓邻里 · 本地公益信息墙</title>\n  <link rel=\"stylesheet\" href=\"/app.css\" />\n  <link rel=\"icon\" href=\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231D7A5F'/><path d='M50 22L78 44v34H62v-22H38v22H22V44z' fill='white'/></svg>\" />\n</head>\n<body>\n  <header class=\"topbar\">\n    <div class=\"brand\">\n      <span class=\"logo\">桐</span>\n      <div>\n        <h1>桐梓邻里</h1>\n        <p class=\"sub\">本地公益信息墙 · 免费发布</p>\n      </div>\n    </div>\n    <a class=\"topbar-link\" href=\"#/about\">说明</a>\n  </header>\n\n  <main id=\"app\">\n    <div class=\"loading\">加载中…</div>\n  </main>\n\n  <nav class=\"tabbar\">\n    <a href=\"#/\" data-tab=\"/\">\n      <span class=\"ico\">🏠</span><span>首页</span>\n    </a>\n    <a href=\"#/write\" data-tab=\"/write\">\n      <span class=\"ico\">✏️</span><span>发布</span>\n    </a>\n    <a href=\"#/query\" data-tab=\"/query\">\n      <span class=\"ico\">🔎</span><span>查进度</span>\n    </a>\n    <a href=\"#/about\" data-tab=\"/about\">\n      <span class=\"ico\">ℹ️</span><span>关于</span>\n    </a>\n  </nav>\n\n  <div id=\"toast\" class=\"toast\"></div>\n\n  <script src=\"/app.js\"></script>\n</body>\n</html>\n";
const CSS_TEXT = "/* ============ 桐梓邻里 · 样式 ============ */\n:root {\n  --green: #1D7A5F;\n  --green-dark: #155E48;\n  --green-light: #E8F4EF;\n  --text: #1A1A1A;\n  --text-2: #666;\n  --text-3: #999;\n  --line: #EDEDED;\n  --bg: #F7F8F7;\n  --card: #FFFFFF;\n  --danger: #D9534F;\n  --radius: 12px;\n}\n\n* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  background: var(--bg);\n  color: var(--text);\n  font-family: -apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Helvetica Neue\", \"Microsoft YaHei\", sans-serif;\n  font-size: 15px;\n  line-height: 1.6;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody { padding-bottom: 72px; }\n\n/* ---------- 顶部 ---------- */\n.topbar {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: #fff;\n  border-bottom: 1px solid var(--line);\n}\n.brand { display: flex; align-items: center; gap: 10px; }\n.logo {\n  width: 36px; height: 36px;\n  border-radius: 9px;\n  background: var(--green);\n  color: #fff;\n  font-weight: 700;\n  font-size: 17px;\n  display: flex; align-items: center; justify-content: center;\n  flex: 0 0 auto;\n}\n.topbar h1 { margin: 0; font-size: 17px; font-weight: 600; line-height: 1.2; }\n.topbar .sub { margin: 2px 0 0; font-size: 11px; color: var(--text-3); line-height: 1.2; }\n.topbar-link {\n  font-size: 13px;\n  color: var(--green);\n  text-decoration: none;\n  padding: 6px 10px;\n  border: 1px solid var(--green);\n  border-radius: 20px;\n  flex: 0 0 auto;\n}\n\n/* ---------- 通用容器 ---------- */\n.wrap { max-width: 560px; margin: 0 auto; padding: 12px; }\n.loading { text-align: center; color: var(--text-3); padding: 60px 0; font-size: 14px; }\n.empty { text-align: center; color: var(--text-3); padding: 50px 20px; font-size: 14px; }\n\n/* ---------- 公告 ---------- */\n.notice {\n  display: flex; gap: 8px; align-items: flex-start;\n  background: var(--green-light);\n  color: var(--green-dark);\n  border-radius: var(--radius);\n  padding: 10px 12px;\n  font-size: 12.5px;\n  line-height: 1.5;\n  margin-bottom: 12px;\n}\n.notice .badge {\n  flex: 0 0 auto;\n  background: var(--green);\n  color: #fff;\n  font-size: 11px;\n  padding: 1px 6px;\n  border-radius: 4px;\n  margin-top: 1px;\n}\n\n/* ---------- 搜索 ---------- */\n.search {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 14px;\n}\n.search input {\n  flex: 1;\n  height: 42px;\n  border: 1px solid var(--line);\n  background: #fff;\n  border-radius: 21px;\n  padding: 0 16px;\n  font-size: 14px;\n  outline: none;\n  min-width: 0;\n}\n.search input:focus { border-color: var(--green); }\n.search button {\n  flex: 0 0 auto;\n  height: 42px;\n  padding: 0 18px;\n  border: none;\n  border-radius: 21px;\n  background: var(--green);\n  color: #fff;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n/* ---------- 分类宫格 ---------- */\n.cats {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.cat {\n  background: #fff;\n  border-radius: var(--radius);\n  padding: 14px 4px 11px;\n  text-align: center;\n  text-decoration: none;\n  color: var(--text);\n  border: 1px solid #F0F0F0;\n  transition: background .15s;\n}\n.cat:active { background: var(--green-light); }\n.cat .ico { font-size: 22px; display: block; line-height: 1.2; }\n.cat .nm { font-size: 12.5px; margin-top: 4px; display: block; color: #333; }\n\n/* ---------- 区块标题 ---------- */\n.sec-head {\n  display: flex; align-items: center; justify-content: space-between;\n  margin: 4px 2px 10px;\n}\n.sec-head h2 { margin: 0; font-size: 15px; font-weight: 600; }\n.sec-head a { font-size: 12.5px; color: var(--text-3); text-decoration: none; }\n\n/* ---------- 信息卡片 ---------- */\n.card {\n  display: block;\n  background: var(--card);\n  border-radius: var(--radius);\n  padding: 13px 14px;\n  margin-bottom: 10px;\n  text-decoration: none;\n  color: inherit;\n  border: 1px solid #F0F0F0;\n}\n.card:active { background: #FAFAFA; }\n\n.card-head { display: flex; align-items: flex-start; gap: 8px; }\n.card-title {\n  flex: 1;\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 1.45;\n  margin: 0;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.tag-top {\n  flex: 0 0 auto;\n  font-size: 11px;\n  color: #fff;\n  background: var(--green);\n  border-radius: 4px;\n  padding: 1px 5px;\n  line-height: 1.6;\n  margin-top: 2px;\n}\n.tag-price {\n  flex: 0 0 auto;\n  font-size: 13px;\n  color: var(--danger);\n  font-weight: 600;\n  margin-top: 2px;\n  white-space: nowrap;\n}\n.card-sum {\n  margin: 6px 0 9px;\n  font-size: 13.5px;\n  color: var(--text-2);\n  line-height: 1.5;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.card-thumb {\n  width: 100%;\n  height: auto;\n  max-height: 180px;\n  object-fit: cover;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  display: block;\n}\n.card-meta {\n  display: flex; align-items: center; gap: 8px;\n  font-size: 12px; color: var(--text-3);\n  flex-wrap: wrap;\n}\n.chip {\n  background: #F3F5F4;\n  color: #5A6B64;\n  border-radius: 4px;\n  padding: 1px 6px;\n  font-size: 11.5px;\n}\n\n/* ---------- 筛选条 ---------- */\n.filters {\n  display: flex; gap: 8px; margin-bottom: 12px;\n}\n.filters select {\n  flex: 1;\n  height: 38px;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  background: #fff;\n  font-size: 13.5px;\n  padding: 0 10px;\n  color: var(--text);\n  outline: none;\n}\n\n/* ---------- 详情页 ---------- */\n.detail-card {\n  background: #fff;\n  border-radius: var(--radius);\n  padding: 16px;\n  border: 1px solid #F0F0F0;\n}\n.detail-title { font-size: 18px; font-weight: 700; line-height: 1.45; margin: 0 0 10px; }\n.detail-meta { font-size: 12.5px; color: var(--text-3); margin-bottom: 12px; display: flex; gap: 10px; flex-wrap: wrap; }\n.detail-body { font-size: 15px; line-height: 1.8; color: #222; white-space: pre-wrap; word-break: break-word; }\n.detail-imgs { margin: 12px 0 4px; }\n.detail-imgs img { width: 100%; border-radius: 10px; margin-bottom: 8px; display: block; }\n\n.contact-box {\n  margin-top: 16px;\n  background: var(--green-light);\n  border-radius: var(--radius);\n  padding: 14px;\n}\n.contact-box h3 { margin: 0 0 8px; font-size: 14px; color: var(--green-dark); }\n.contact-line { font-size: 13px; color: #3C4A44; margin-bottom: 10px; }\n.btn {\n  display: block; width: 100%;\n  height: 46px;\n  border: none;\n  border-radius: 10px;\n  background: var(--green);\n  color: #fff;\n  font-size: 15px;\n  font-weight: 600;\n  text-align: center;\n  line-height: 46px;\n  text-decoration: none;\n}\n.btn:active { background: var(--green-dark); }\n.btn.ghost {\n  background: #fff;\n  color: var(--green);\n  border: 1px solid var(--green);\n  line-height: 44px;\n}\n.btn.danger { background: #fff; color: var(--danger); border: 1px solid #E4C3C3; line-height: 44px; }\n\n.phone-result {\n  margin-top: 10px;\n  background: #fff;\n  border-radius: 8px;\n  padding: 12px;\n  text-align: center;\n  font-size: 20px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  color: var(--green-dark);\n}\n\n/* ---------- 表单 ---------- */\n.form-card {\n  background: #fff;\n  border-radius: var(--radius);\n  padding: 16px;\n  border: 1px solid #F0F0F0;\n}\n.field { margin-bottom: 16px; }\n.field label {\n  display: block;\n  font-size: 13.5px;\n  font-weight: 600;\n  margin-bottom: 7px;\n  color: #333;\n}\n.field label .req { color: var(--danger); margin-left: 2px; }\n.field input[type=text],\n.field input[type=tel],\n.field textarea,\n.field select {\n  width: 100%;\n  border: 1px solid var(--line);\n  border-radius: 9px;\n  padding: 11px 12px;\n  font-size: 14.5px;\n  font-family: inherit;\n  outline: none;\n  background: #fff;\n  color: var(--text);\n  -webkit-appearance: none;\n  appearance: none;\n}\n.field textarea { min-height: 120px; resize: vertical; line-height: 1.65; }\n.field select { height: 44px; }\n.field input:focus, .field textarea:focus, .field select:focus { border-color: var(--green); }\n.field .hint { font-size: 11.5px; color: var(--text-3); margin-top: 5px; }\n.field .counter { float: right; font-size: 11.5px; color: var(--text-3); font-weight: 400; }\n\n.cat-picker { display: flex; flex-wrap: wrap; gap: 8px; }\n.cat-picker input { display: none; }\n.cat-picker label {\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 7px 12px;\n  font-size: 13px;\n  cursor: pointer;\n  background: #fff;\n  margin: 0;\n  font-weight: 400;\n}\n.cat-picker input:checked + label {\n  background: var(--green);\n  color: #fff;\n  border-color: var(--green);\n  font-weight: 500;\n}\n\n.uploader { display: flex; gap: 8px; flex-wrap: wrap; }\n.upload-btn {\n  width: 84px; height: 84px;\n  border: 1px dashed #C9D6D0;\n  border-radius: 9px;\n  display: flex; flex-direction: column;\n  align-items: center; justify-content: center;\n  color: var(--text-3);\n  font-size: 11.5px;\n  background: #FAFCFB;\n  cursor: pointer;\n}\n.upload-btn .plus { font-size: 24px; line-height: 1; color: var(--green); }\n.thumb { position: relative; width: 84px; height: 84px; }\n.thumb img { width: 100%; height: 100%; object-fit: cover; border-radius: 9px; display: block; }\n.thumb .del {\n  position: absolute; top: -5px; right: -5px;\n  width: 20px; height: 20px; border-radius: 50%;\n  background: rgba(0,0,0,.62); color: #fff;\n  font-size: 12px; line-height: 20px; text-align: center;\n  border: none;\n}\n#fileInput { display: none; }\n\n/* ---------- 查询结果 ---------- */\n.result-card {\n  background: #fff; border-radius: var(--radius);\n  padding: 18px; border: 1px solid #F0F0F0;\n}\n.status-pill {\n  display: inline-block;\n  font-size: 12px; padding: 2px 8px; border-radius: 4px;\n  font-weight: 500;\n}\n.s0 { background: #FFF4E5; color: #B26A00; }\n.s1 { background: var(--green-light); color: var(--green-dark); }\n.s2 { background: #FDECEC; color: #B33A3A; }\n.s3, .s4 { background: #F0F0F0; color: #777; }\n\n/* ---------- 关于页 ---------- */\n.about-block {\n  background: #fff; border-radius: var(--radius);\n  padding: 16px; margin-bottom: 12px; border: 1px solid #F0F0F0;\n}\n.about-block h3 { margin: 0 0 8px; font-size: 15px; }\n.about-block p { margin: 0 0 10px; font-size: 14px; line-height: 1.75; color: #333; white-space: pre-wrap; }\n.about-block p:last-child { margin-bottom: 0; }\n.about-block ul { margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.9; color: #333; }\n\n/* ---------- 底部导航 ---------- */\n.tabbar {\n  position: fixed;\n  left: 0; right: 0; bottom: 0;\n  z-index: 20;\n  display: flex;\n  background: #fff;\n  border-top: 1px solid var(--line);\n  padding-bottom: env(safe-area-inset-bottom);\n}\n.tabbar a {\n  flex: 1;\n  text-align: center;\n  padding: 7px 0 6px;\n  text-decoration: none;\n  color: var(--text-3);\n  font-size: 11.5px;\n  display: flex; flex-direction: column; align-items: center; gap: 1px;\n}\n.tabbar a .ico { font-size: 19px; line-height: 1.25; filter: grayscale(.5); }\n.tabbar a.on { color: var(--green); font-weight: 600; }\n.tabbar a.on .ico { filter: none; }\n\n/* ---------- Toast ---------- */\n.toast {\n  position: fixed;\n  left: 50%;\n  bottom: 84px;\n  transform: translateX(-50%) translateY(10px);\n  background: rgba(26,26,26,.9);\n  color: #fff;\n  font-size: 13.5px;\n  padding: 10px 16px;\n  border-radius: 8px;\n  max-width: 80vw;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .2s, transform .2s;\n  z-index: 100;\n  text-align: center;\n  line-height: 1.5;\n}\n.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }\n\n/* ---------- 加载更多 ---------- */\n.more {\n  display: block;\n  margin: 6px auto 10px;\n  padding: 10px 22px;\n  border: 1px solid var(--line);\n  background: #fff;\n  border-radius: 20px;\n  font-size: 13px;\n  color: var(--text-2);\n}\n";
const APP_JS = "/* ============================================================\n   桐梓邻里 · 前台逻辑（纯原生 JS，无构建）\n   ============================================================ */\n\n// 如果要启用人机校验，把 Turnstile 的 Site Key 填在这里；留空则不启用\nconst TURNSTILE_SITE_KEY = '';\n\nconst appEl = document.getElementById('app');\n\n// ---------- 工具 ----------\nfunction esc(s) {\n  return String(s == null ? '' : s).replace(/[&<>\"']/g, (c) => ({\n    '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;',\n  }[c]));\n}\n\nasync function api(path, opts) {\n  const res = await fetch('/api' + path, opts || {});\n  let j;\n  try {\n    j = await res.json();\n  } catch (e) {\n    throw new Error('网络异常，请稍后再试');\n  }\n  if (!j.ok) throw new Error(j.msg || '请求失败');\n  return j.data;\n}\n\nfunction fmtTime(iso) {\n  if (!iso) return '';\n  const d = new Date(iso);\n  const diff = (Date.now() - d.getTime()) / 1000;\n  if (diff < 60) return '刚刚';\n  if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';\n  if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';\n  if (diff < 86400 * 7) return Math.floor(diff / 86400) + ' 天前';\n  return (d.getMonth() + 1) + '月' + d.getDate() + '日';\n}\n\nlet toastTimer = null;\nfunction toast(msg) {\n  const el = document.getElementById('toast');\n  el.textContent = msg;\n  el.classList.add('show');\n  clearTimeout(toastTimer);\n  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);\n}\n\nfunction setTab(path) {\n  let key = '/';\n  if (path.indexOf('/write') === 0) key = '/write';\n  else if (path.indexOf('/query') === 0) key = '/query';\n  else if (path.indexOf('/about') === 0) key = '/about';\n  document.querySelectorAll('.tabbar a').forEach((a) => {\n    a.classList.toggle('on', a.getAttribute('data-tab') === key);\n  });\n}\n\n// ---------- 卡片 ----------\nfunction cardHTML(p) {\n  return `\n    <a class=\"card\" href=\"#/post/${p.id}\">\n      ${p.cover ? `<img class=\"card-thumb\" src=\"${esc(p.cover)}\" alt=\"\" loading=\"lazy\" />` : ''}\n      <div class=\"card-head\">\n        <h3 class=\"card-title\">${esc(p.title)}</h3>\n        ${p.isTop ? '<span class=\"tag-top\">置顶</span>' : ''}\n        ${p.price ? `<span class=\"tag-price\">${esc(p.price)}</span>` : ''}\n      </div>\n      ${p.summary ? `<p class=\"card-sum\">${esc(p.summary)}</p>` : ''}\n      <div class=\"card-meta\">\n        ${p.category ? `<span class=\"chip\">${esc(p.category)}</span>` : ''}\n        ${p.area ? `<span>${esc(p.area)}</span>` : ''}\n        <span>${fmtTime(p.publishedAt)}</span>\n        <span>${p.viewCount || 0} 次浏览</span>\n      </div>\n    </a>`;\n}\n\nfunction emptyHTML(text) {\n  return `<div class=\"empty\">${esc(text || '暂时还没有信息')}</div>`;\n}\n\n// ============================================================\n// 首页\n// ============================================================\nasync function renderHome() {\n  const [cats, posts, settings] = await Promise.all([\n    api('/categories'),\n    api('/posts?pageSize=10'),\n    api('/settings').catch(() => ({})),\n  ]);\n\n  const catGrid = cats\n    .map(\n      (c) => `<a class=\"cat\" href=\"#/list?cat=${c.id}\">\n        <span class=\"ico\">${esc(c.icon)}</span>\n        <span class=\"nm\">${esc(c.name)}</span>\n      </a>`\n    )\n    .join('');\n\n  const allCell = `<a class=\"cat\" href=\"#/list\">\n      <span class=\"ico\">📋</span><span class=\"nm\">全部信息</span>\n    </a>`;\n\n  return `\n    <div class=\"wrap\">\n      ${settings.notice ? `<div class=\"notice\"><span class=\"badge\">公告</span><span>${esc(settings.notice)}</span></div>` : ''}\n\n      <form class=\"search\" id=\"searchForm\">\n        <input type=\"text\" name=\"q\" placeholder=\"搜岗位、房源、二手、拼车…\" />\n        <button type=\"submit\">搜索</button>\n      </form>\n\n      <div class=\"cats\">\n        ${catGrid}\n        ${allCell}\n      </div>\n\n      <div class=\"sec-head\">\n        <h2>最新信息</h2>\n        <a href=\"#/list\">查看全部 ›</a>\n      </div>\n\n      <div id=\"homeList\">\n        ${posts.list.length ? posts.list.map(cardHTML).join('') : emptyHTML('还没有信息，你可以发第一条')}\n      </div>\n    </div>`;\n}\n\n// ============================================================\n// 列表页\n// ============================================================\nlet listState = { page: 1, cat: '', area: '', q: '', loading: false, done: false };\n\nasync function renderList(qs) {\n  const catId = qs.get('cat') || '';\n  const areaId = qs.get('area') || '';\n  const kw = qs.get('q') || '';\n\n  listState = { page: 1, cat: catId, area: areaId, q: kw, loading: false, done: false };\n\n  const [cats, areas, posts] = await Promise.all([\n    api('/categories'),\n    api('/areas'),\n    api(`/posts?page=${1}&pageSize=20&category=${catId}&area=${areaId}&q=${encodeURIComponent(kw)}`),\n  ]);\n\n  const catOptions = ['<option value=\"\">全部分类</option>']\n    .concat(cats.map((c) => `<option value=\"${c.id}\" ${String(c.id) === catId ? 'selected' : ''}>${esc(c.name)}</option>`))\n    .join('');\n\n  const areaOptions = ['<option value=\"\">全部区域</option>']\n    .concat(areas.map((a) => `<option value=\"${a.id}\" ${String(a.id) === areaId ? 'selected' : ''}>${esc(a.name)}</option>`))\n    .join('');\n\n  const head = kw ? `搜索结果：${esc(kw)}` : '信息列表';\n\n  return `\n    <div class=\"wrap\">\n      <form class=\"search\" id=\"searchForm\">\n        <input type=\"text\" name=\"q\" value=\"${esc(kw)}\" placeholder=\"搜岗位、房源、二手、拼车…\" />\n        <button type=\"submit\">搜索</button>\n      </form>\n\n      <div class=\"filters\">\n        <select id=\"fCat\">${catOptions}</select>\n        <select id=\"fArea\">${areaOptions}</select>\n      </div>\n\n      <div class=\"sec-head\"><h2>${head}</h2><span style=\"font-size:12.5px;color:#999\">共 ${posts.total} 条</span></div>\n\n      <div id=\"listBox\">\n        ${posts.list.length ? posts.list.map(cardHTML).join('') : emptyHTML('这个条件下还没有信息')}\n      </div>\n      <div id=\"moreBox\">${posts.list.length < posts.total ? '<button class=\"more\" id=\"moreBtn\">加载更多</button>' : ''}</div>\n    </div>`;\n}\n\nfunction bindList() {\n  const fCat = document.getElementById('fCat');\n  const fArea = document.getElementById('fArea');\n  const searchForm = document.getElementById('searchForm');\n\n  const go = () => {\n    const p = new URLSearchParams();\n    if (fCat.value) p.set('cat', fCat.value);\n    if (fArea.value) p.set('area', fArea.value);\n    const kw = searchForm.q.value.trim();\n    if (kw) p.set('q', kw);\n    location.hash = '#/list' + (p.toString() ? '?' + p.toString() : '');\n  };\n\n  if (fCat) fCat.addEventListener('change', go);\n  if (fArea) fArea.addEventListener('change', go);\n  if (searchForm) {\n    searchForm.addEventListener('submit', (e) => {\n      e.preventDefault();\n      go();\n    });\n  }\n\n  const moreBtn = document.getElementById('moreBtn');\n  if (moreBtn) {\n    moreBtn.addEventListener('click', async () => {\n      if (listState.loading) return;\n      listState.loading = true;\n      moreBtn.textContent = '加载中…';\n      try {\n        listState.page += 1;\n        const d = await api(\n          `/posts?page=${listState.page}&pageSize=20&category=${listState.cat}&area=${listState.area}&q=${encodeURIComponent(listState.q)}`\n        );\n        if (d.list.length) {\n          document.getElementById('listBox').insertAdjacentHTML('beforeend', d.list.map(cardHTML).join(''));\n        }\n        if (listState.page * 20 >= d.total) {\n          document.getElementById('moreBox').innerHTML = '<div class=\"empty\" style=\"padding:16px 0\">已经到底了</div>';\n        } else {\n          moreBtn.textContent = '加载更多';\n        }\n      } catch (e) {\n        listState.page -= 1;\n        toast(e.message);\n        moreBtn.textContent = '加载更多';\n      }\n      listState.loading = false;\n    });\n  }\n}\n\n// ============================================================\n// 详情页\n// ============================================================\nasync function renderDetail(id) {\n  const d = await api('/posts/' + id);\n\n  const imgs = d.images && d.images.length\n    ? `<div class=\"detail-imgs\">${d.images.map((u) => `<img src=\"${esc(u)}\" alt=\"\" />`).join('')}</div>`\n    : '';\n\n  return `\n    <div class=\"wrap\">\n      <div class=\"detail-card\">\n        <h2 class=\"detail-title\">${esc(d.title)}</h2>\n        <div class=\"detail-meta\">\n          ${d.category ? `<span class=\"chip\">${esc(d.category)}</span>` : ''}\n          ${d.area ? `<span>${esc(d.area)}</span>` : ''}\n          <span>${fmtTime(d.publishedAt)}</span>\n          <span>${d.viewCount} 次浏览</span>\n        </div>\n        ${d.price ? `<div style=\"color:#D9534F;font-weight:600;margin-bottom:10px\">${esc(d.price)}</div>` : ''}\n        <div class=\"detail-body\">${esc(d.content)}</div>\n        ${imgs}\n\n        <div class=\"contact-box\">\n          <h3>联系方式</h3>\n          <div class=\"contact-line\">\n            发布人：${esc(d.contactName || '匿名')}　手机：${esc(d.phoneMasked)}\n          </div>\n          <button class=\"btn\" id=\"showPhone\" data-id=\"${d.id}\">点击查看完整手机号</button>\n          <div id=\"phoneResult\"></div>\n          <div style=\"font-size:11.5px;color:#7A8A83;margin-top:10px;line-height:1.6\">\n            平台仅作信息展示，不参与交易、不担保。请当面核实，先要钱的都是骗子。\n          </div>\n        </div>\n\n        <div style=\"margin-top:14px\">\n          <button class=\"btn danger\" id=\"reportBtn\" data-id=\"${d.id}\">举报这条信息</button>\n        </div>\n\n        <div style=\"text-align:center;font-size:11.5px;color:#BBB;margin-top:14px\">\n          编号 ${esc(d.postNo)}\n        </div>\n      </div>\n    </div>`;\n}\n\nfunction bindDetail() {\n  const btn = document.getElementById('showPhone');\n  if (btn) {\n    btn.addEventListener('click', async () => {\n      const id = btn.getAttribute('data-id');\n      btn.disabled = true;\n      btn.textContent = '读取中…';\n      try {\n        const d = await api('/posts/' + id + '/contact', { method: 'POST' });\n        document.getElementById('phoneResult').innerHTML =\n          `<div class=\"phone-result\"><a href=\"tel:${esc(d.phone)}\" style=\"color:inherit;text-decoration:none\">${esc(d.phone)}</a></div>`;\n        btn.style.display = 'none';\n      } catch (e) {\n        toast(e.message);\n        btn.disabled = false;\n        btn.textContent = '点击查看完整手机号';\n      }\n    });\n  }\n\n  const rp = document.getElementById('reportBtn');\n  if (rp) {\n    rp.addEventListener('click', async () => {\n      const reason = prompt('请简单说明举报理由（如：疑似诈骗、虚假信息、联系方式打不通）');\n      if (!reason) return;\n      try {\n        await api('/reports', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({ postId: Number(rp.getAttribute('data-id')), reason: reason }),\n        });\n        toast('举报已提交，感谢你帮忙盯着');\n      } catch (e) {\n        toast(e.message);\n      }\n    });\n  }\n}\n\n// ============================================================\n// 投稿页\n// ============================================================\nlet uploadImages = [];\n\nasync function renderWrite() {\n  uploadImages = [];\n  const [cats, areas] = await Promise.all([api('/categories'), api('/areas')]);\n\n  const catRadios = cats\n    .map(\n      (c, i) => `<input type=\"radio\" id=\"cat${c.id}\" name=\"cat\" value=\"${c.id}\" ${i === 0 ? 'checked' : ''} />\n        <label for=\"cat${c.id}\">${esc(c.icon)} ${esc(c.name)}</label>`\n    )\n    .join('');\n\n  const areaOpts = ['<option value=\"\">请选择区域（可不选）</option>']\n    .concat(areas.map((a) => `<option value=\"${a.id}\">${esc(a.name)}</option>`))\n    .join('');\n\n  const turnstileHTML = TURNSTILE_SITE_KEY ? '<div id=\"turnstileBox\" style=\"margin-bottom:14px\"></div>' : '';\n\n  return `\n    <div class=\"wrap\">\n      <div class=\"form-card\">\n        <form id=\"writeForm\">\n          <div class=\"field\">\n            <label>选择分类<span class=\"req\">*</span></label>\n            <div class=\"cat-picker\">${catRadios}</div>\n          </div>\n\n          <div class=\"field\">\n            <label>标题<span class=\"req\">*</span><span class=\"counter\"><span id=\"titleCount\">0</span>/30</span></label>\n            <input type=\"text\" id=\"title\" maxlength=\"30\" placeholder=\"一句话说清楚，比如「县城仓库招搬运工 2 名」\" />\n          </div>\n\n          <div class=\"field\">\n            <label>详细内容<span class=\"req\">*</span><span class=\"counter\"><span id=\"contentCount\">0</span>/500</span></label>\n            <textarea id=\"content\" maxlength=\"500\" placeholder=\"写清时间、地点、要求、价格。二手物品请注明成色和是否可当面验货。\"></textarea>\n          </div>\n\n          <div class=\"field\">\n            <label>价格 / 待遇<span class=\"counter\">选填</span></label>\n            <input type=\"text\" id=\"price\" maxlength=\"20\" placeholder=\"如 面议 / 3500-4500元 / 800元\" />\n          </div>\n\n          <div class=\"field\">\n            <label>图片<span class=\"counter\">选填，最多 3 张</span></label>\n            <div class=\"uploader\" id=\"uploader\">\n              <div class=\"upload-btn\" id=\"addImg\"><span class=\"plus\">+</span><span>加图片</span></div>\n            </div>\n            <input type=\"file\" id=\"fileInput\" accept=\"image/*\" />\n            <div class=\"hint\">图片会自动压缩，省流量也省存储</div>\n          </div>\n\n          <div class=\"field\">\n            <label>所在区域<span class=\"counter\">选填</span></label>\n            <select id=\"area\">${areaOpts}</select>\n          </div>\n\n          <div class=\"field\">\n            <label>你的称呼<span class=\"counter\">选填</span></label>\n            <input type=\"text\" id=\"contactName\" maxlength=\"20\" placeholder=\"如 王师傅 / 李姐\" />\n          </div>\n\n          <div class=\"field\">\n            <label>联系手机号<span class=\"req\">*</span></label>\n            <input type=\"tel\" id=\"phone\" maxlength=\"11\" placeholder=\"只在有人点击查看时显示，列表里看不到\" />\n            <div class=\"hint\">手机号加密存储，公开页面只显示 138****1234 这种形式</div>\n          </div>\n\n          ${turnstileHTML}\n\n          <button type=\"submit\" class=\"btn\" id=\"submitBtn\">提交，等待审核</button>\n        </form>\n      </div>\n    </div>`;\n}\n\nfunction bindWrite() {\n  const title = document.getElementById('title');\n  const content = document.getElementById('content');\n  title.addEventListener('input', () => (document.getElementById('titleCount').textContent = title.value.length));\n  content.addEventListener('input', () => (document.getElementById('contentCount').textContent = content.value.length));\n\n  const addImg = document.getElementById('addImg');\n  const fileInput = document.getElementById('fileInput');\n\n  addImg.addEventListener('click', () => {\n    if (uploadImages.length >= 3) return toast('最多 3 张图片');\n    fileInput.click();\n  });\n\n  fileInput.addEventListener('change', async () => {\n    const file = fileInput.files && fileInput.files[0];\n    fileInput.value = '';\n    if (!file) return;\n    addImg.querySelector('.plus').textContent = '…';\n    try {\n      const dataUrl = await compressImage(file);\n      if (dataUrl.length > 120000) throw new Error('图片还是太大，换一张或裁小一点');\n      uploadImages.push(dataUrl);\n      renderThumbs();\n    } catch (e) {\n      toast(e.message || '图片处理失败');\n    }\n    addImg.querySelector('.plus').textContent = '+';\n  });\n\n  document.getElementById('uploader').addEventListener('click', (e) => {\n    const del = e.target.closest('[data-del]');\n    if (!del) return;\n    const idx = Number(del.getAttribute('data-del'));\n    uploadImages.splice(idx, 1);\n    renderThumbs();\n  });\n\n  document.getElementById('writeForm').addEventListener('submit', submitWrite);\n}\n\nfunction renderThumbs() {\n  const box = document.getElementById('uploader');\n  const addBtn = document.getElementById('addImg');\n  box.querySelectorAll('.thumb').forEach((n) => n.remove());\n  uploadImages.forEach((u, i) => {\n    addBtn.insertAdjacentHTML(\n      'beforebegin',\n      `<div class=\"thumb\"><img src=\"${esc(u)}\" alt=\"\" /><button type=\"button\" class=\"del\" data-del=\"${i}\">×</button></div>`\n    );\n  });\n  addBtn.style.display = uploadImages.length >= 3 ? 'none' : 'flex';\n}\n\nfunction compressImage(file, maxW, quality) {\n  maxW = maxW || 600;\n  quality = quality || 0.6;\n  return new Promise((resolve, reject) => {\n    const img = new Image();\n    const url = URL.createObjectURL(file);\n    img.onload = () => {\n      let w = img.naturalWidth;\n      let h = img.naturalHeight;\n      if (w > maxW) {\n        h = Math.round((h * maxW) / w);\n        w = maxW;\n      }\n      const maxH = Math.round(maxW * 1.6);\n      if (h > maxH) {\n        w = Math.round((w * maxH) / h);\n        h = maxH;\n      }\n      const canvas = document.createElement('canvas');\n      canvas.width = w;\n      canvas.height = h;\n      const ctx = canvas.getContext('2d');\n      ctx.fillStyle = '#ffffff';\n      ctx.fillRect(0, 0, w, h);\n      ctx.drawImage(img, 0, 0, w, h);\n      URL.revokeObjectURL(url);\n      resolve(canvas.toDataURL('image/jpeg', quality));\n    };\n    img.onerror = () => {\n      URL.revokeObjectURL(url);\n      reject(new Error('图片读取失败'));\n    };\n    img.src = url;\n  });\n}\n\nasync function uploadImage(blob) {\n  const fd = new FormData();\n  fd.append('file', new File([blob], 'photo.jpg', { type: 'image/jpeg' }));\n  const res = await fetch('/api/upload', { method: 'POST', body: fd });\n  const j = await res.json().catch(() => ({ ok: false, msg: '上传失败' }));\n  if (!j.ok) throw new Error(j.msg || '上传失败');\n  return j.data.url;\n}\n\nasync function submitWrite(e) {\n  e.preventDefault();\n  const btn = document.getElementById('submitBtn');\n  if (btn.disabled) return;\n\n  const catEl = document.querySelector('input[name=cat]:checked');\n  const title = document.getElementById('title').value.trim();\n  const content = document.getElementById('content').value.trim();\n  const price = document.getElementById('price').value.trim();\n  const area = document.getElementById('area').value;\n  const contactName = document.getElementById('contactName').value.trim();\n  const phone = document.getElementById('phone').value.trim();\n\n  if (!catEl) return toast('请选择一个分类');\n  if (title.length < 4) return toast('标题至少 4 个字');\n  if (content.length < 10) return toast('正文至少 10 个字，多写点别人好判断');\n  if (!/^1[3-9]\\d{9}$/.test(phone)) return toast('手机号填得不对');\n\n  let turnstileToken = '';\n  if (TURNSTILE_SITE_KEY && window.turnstile) {\n    turnstileToken = window.turnstile.getResponse() || '';\n    if (!turnstileToken) return toast('请完成人机验证');\n  }\n\n  btn.disabled = true;\n  btn.textContent = '提交中…';\n\n  try {\n    const d = await api('/posts', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({\n        categoryId: Number(catEl.value),\n        areaId: area ? Number(area) : null,\n        title,\n        content,\n        price,\n        contactName,\n        phone,\n        images: uploadImages,\n        turnstileToken,\n      }),\n    });\n\n    appEl.innerHTML = `\n      <div class=\"wrap\">\n        <div class=\"result-card\" style=\"text-align:center;padding:32px 18px\">\n          <div style=\"font-size:46px;line-height:1;margin-bottom:12px\">✅</div>\n          <h2 style=\"margin:0 0 10px;font-size:18px\">提交成功</h2>\n          <p style=\"color:#666;font-size:14px;line-height:1.7;margin:0 0 18px\">\n            信息已进入审核队列，24 小时内人工审核，通过后自动上墙。\n          </p>\n          <div style=\"background:#E8F4EF;border-radius:10px;padding:14px;margin-bottom:18px\">\n            <div style=\"font-size:12px;color:#5A6B64;margin-bottom:4px\">记下你的投稿编号</div>\n            <div style=\"font-size:22px;font-weight:700;color:#155E48;letter-spacing:1px\">${esc(d.postNo)}</div>\n          <div style=\"font-size:12px;color:#7A8A83;margin-top:6px\">用编号 + 手机号后四位可查审核进度</div>\n          </div>\n          <a class=\"btn\" href=\"#/query\">去查审核进度</a>\n          <div style=\"height:10px\"></div>\n          <a class=\"btn ghost\" href=\"#/\">回到首页</a>\n        </div>\n      </div>`;\n    window.scrollTo(0, 0);\n  } catch (err) {\n    toast(err.message);\n    btn.disabled = false;\n    btn.textContent = '提交，等待审核';\n  }\n}\n\n// ============================================================\n// 进度查询\n// ============================================================\nasync function renderQuery() {\n  return `\n    <div class=\"wrap\">\n      <div class=\"form-card\">\n        <div class=\"field\">\n          <label>投稿编号</label>\n          <input type=\"text\" id=\"qNo\" placeholder=\"如 TZ261122001，提交成功时显示过\" style=\"text-transform:uppercase\" />\n        </div>\n        <div class=\"field\">\n          <label>手机号后四位</label>\n          <input type=\"tel\" id=\"qTail\" maxlength=\"4\" placeholder=\"如 8899\" />\n        </div>\n        <button class=\"btn\" id=\"qBtn\">查询进度</button>\n        <div id=\"qResult\" style=\"margin-top:16px\"></div>\n      </div>\n      <div style=\"text-align:center;font-size:12px;color:#999;margin-top:14px;line-height:1.7\">\n        找不到编号？翻一下提交成功那个页面，或者问帮你发布的人。\n      </div>\n    </div>`;\n}\n\nfunction bindQuery() {\n  const btn = document.getElementById('qBtn');\n  btn.addEventListener('click', async () => {\n    const no = document.getElementById('qNo').value.trim().toUpperCase();\n    const tail = document.getElementById('qTail').value.trim();\n    if (!no || !/^\\d{4}$/.test(tail)) return toast('编号和后四位都要填');\n\n    btn.disabled = true;\n    btn.textContent = '查询中…';\n    try {\n      const d = await api('/posts/query?postNo=' + encodeURIComponent(no) + '&tail=' + encodeURIComponent(tail));\n      const cls = 's' + d.status;\n      document.getElementById('qResult').innerHTML = `\n        <div class=\"result-card\">\n          <div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px\">\n            <strong style=\"font-size:15px\">${esc(d.title)}</strong>\n            <span class=\"status-pill ${cls}\">${esc(d.statusText)}</span>\n          </div>\n          <div style=\"font-size:13px;color:#666;line-height:1.8\">\n            提交时间：${esc(fmtTime(d.createdAt))}<br/>\n            ${d.publishedAt ? '上墙时间：' + esc(fmtTime(d.publishedAt)) : ''}\n          </div>\n          ${d.rejectReason ? `<div style=\"margin-top:10px;background:#FDECEC;color:#B33A3A;border-radius:8px;padding:10px;font-size:13px;line-height:1.7\">驳回理由：${esc(d.rejectReason)}</div>` : ''}\n          ${d.status === 0 ? `<div style=\"margin-top:10px;font-size:13px;color:#B26A00;background:#FFF4E5;border-radius:8px;padding:10px\">还在排队，一般 24 小时内审完。</div>` : ''}\n        </div>`;\n    } catch (e) {\n      document.getElementById('qResult').innerHTML = `<div class=\"empty\" style=\"padding:20px 0\">${esc(e.message)}</div>`;\n    }\n    btn.disabled = false;\n    btn.textContent = '查询进度';\n  });\n}\n\n// ============================================================\n// 关于页\n// ============================================================\nasync function renderAbout() {\n  const s = await api('/settings').catch(() => ({}));\n\n  return `\n    <div class=\"wrap\">\n      <div class=\"about-block\">\n        <h3>这是什么</h3>\n        <p>${esc(s.site_name || '桐梓邻里')} 是桐梓本地的公益信息墙。求职招聘、二手闲置、房屋租售、拼车顺路、求助帮忙、失物招领、本地服务，都可以免费发。</p>\n        <p>不收费、不抽成、不担保。信息由网友投稿，人工审核后上墙。</p>\n      </div>\n\n      <div class=\"about-block\">\n        <h3>怎么发信息</h3>\n        <ul>\n          <li>点底部「发布」，填标题、内容、手机号</li>\n          <li>提交后拿到一个投稿编号，记下来</li>\n          <li>24 小时内人工审核，通过了自动上墙</li>\n          <li>30 天后自动过期，还在用就重新发一次</li>\n        </ul>\n      </div>\n\n      <div class=\"about-block\">\n        <h3>免责声明</h3>\n        <p>${esc(s.disclaimer || '本平台仅提供本地信息展示服务，不参与任何交易、不作任何担保、不收取任何费用。')}</p>\n      </div>\n\n      <div class=\"about-block\">\n        <h3>防骗提示</h3>\n        <p>这几种一律别信：让你先交押金、保证金、培训费的；让你刷单返利的；让你先垫钱买东西的；说能帮你贷款、套现的；让你加群做任务的。</p>\n        <p>看到这类信息，点详情页的「举报」，我们马上处理。</p>\n      </div>\n\n      <div class=\"about-block\">\n        <h3>隐私说明</h3>\n        <p>我们只收集发布信息所必需的手机号，用于核实和追溯，加密存储。列表页不展示手机号，只有别人点「查看联系方式」时才显示。不向任何第三方提供。</p>\n      </div>\n\n      <div style=\"text-align:center;font-size:11.5px;color:#C0C0C0;padding:16px 0 8px\">\n        桐梓邻里 · 公益信息墙 · 本地自建\n      </div>\n    </div>`;\n}\n\n// ============================================================\n// 路由\n// ============================================================\nconst routes = [\n  [/^\\/$/, () => renderHome()],\n  [/^\\/list$/, (q) => renderList(q)],\n  [/^\\/post\\/(\\d+)$/, (q, m) => renderDetail(Number(m[1]))],\n  [/^\\/write$/, () => renderWrite()],\n  [/^\\/query$/, () => renderQuery()],\n  [/^\\/about$/, () => renderAbout()],\n];\n\nlet currentPath = '';\n\nasync function render() {\n  const raw = location.hash.replace(/^#/, '') || '/';\n  const parts = raw.split('?');\n  const path = parts[0] || '/';\n  const qs = new URLSearchParams(parts[1] || '');\n\n  currentPath = path;\n  setTab(path);\n  appEl.innerHTML = '<div class=\"loading\">加载中…</div>';\n\n  const hit = routes.find((r) => r[0].test(path));\n  if (!hit) {\n    appEl.innerHTML = `<div class=\"wrap\"><div class=\"empty\">页面不存在<br/><br/><a href=\"#/\" style=\"color:#1D7A5F\">回首页</a></div></div>`;\n    return;\n  }\n\n  try {\n    const m = path.match(hit[0]);\n    appEl.innerHTML = await hit[1](qs, m);\n\n    if (path === '/list') bindList();\n    if (path.indexOf('/post/') === 0) bindDetail();\n    if (path === '/write') bindWrite();\n    if (path === '/query') bindQuery();\n\n    // 绑定首页搜索\n    const sf = document.getElementById('searchForm');\n    if (sf && path === '/') {\n      sf.addEventListener('submit', (e) => {\n        e.preventDefault();\n        const kw = sf.q.value.trim();\n        location.hash = kw ? '#/list?q=' + encodeURIComponent(kw) : '#/list';\n      });\n    }\n  } catch (err) {\n    appEl.innerHTML = `<div class=\"wrap\"><div class=\"empty\">${esc(err.message || '加载失败')}<br/><br/><a href=\"#/\" style=\"color:#1D7A5F\">回首页</a></div></div>`;\n  }\n}\n\nwindow.addEventListener('hashchange', render);\ninit();\n\nfunction init() {\n  render();\n  if (TURNSTILE_SITE_KEY) {\n    const s = document.createElement('script');\n    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';\n    s.async = true;\n    s.defer = true;\n    s.onload = () => {\n      const box = document.getElementById('turnstileBox');\n      if (box && window.turnstile) window.turnstile.render(box, { sitekey: TURNSTILE_SITE_KEY });\n    };\n    document.head.appendChild(s);\n  }\n}\n";
const HTML_ADMIN = "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <meta name=\"robots\" content=\"noindex, nofollow\" />\n  <title>桐梓邻里 · 后台管理</title>\n  <link rel=\"stylesheet\" href=\"/app.css\" />\n  <style>\n    body { padding-bottom: 20px; background: #F2F4F3; }\n    .adm-top {\n      background: #fff; border-bottom: 1px solid #EDEDED;\n      padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;\n      position: sticky; top: 0; z-index: 10;\n    }\n    .adm-top h1 { margin: 0; font-size: 16px; }\n    .adm-top .out { font-size: 12.5px; color: #999; background: none; border: 1px solid #DDD; padding: 5px 10px; border-radius: 14px; }\n    .stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin: 12px 12px 0; }\n    .stat { background: #fff; border-radius: 10px; padding: 10px 4px; text-align: center; }\n    .stat .n { font-size: 19px; font-weight: 700; color: #1D7A5F; line-height: 1.2; }\n    .stat .t { font-size: 11px; color: #888; margin-top: 2px; }\n    .stat.warn .n { color: #D9534F; }\n    .tabs { display: flex; gap: 6px; padding: 12px; overflow-x: auto; }\n    .tabs button {\n      flex: 0 0 auto; border: 1px solid #E5E5E5; background: #fff; border-radius: 16px;\n      padding: 6px 14px; font-size: 13px; color: #666;\n    }\n    .tabs button.on { background: #1D7A5F; color: #fff; border-color: #1D7A5F; font-weight: 600; }\n    .item { background: #fff; border-radius: 12px; padding: 14px; margin: 0 12px 10px; }\n    .item .h { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }\n    .item .t { font-size: 15px; font-weight: 600; line-height: 1.45; flex: 1; word-break: break-all; }\n    .item .no { font-size: 11px; color: #AAA; margin-top: 2px; }\n    .item .c { font-size: 13.5px; color: #444; line-height: 1.7; margin: 9px 0; white-space: pre-wrap; word-break: break-word; }\n    .item .meta { font-size: 11.5px; color: #888; display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 9px; }\n    .item .imgs { display: flex; gap: 6px; margin-bottom: 9px; flex-wrap: wrap; }\n    .item .imgs img { width: 76px; height: 76px; object-fit: cover; border-radius: 7px; }\n    .warnbar { background: #FFF4E5; color: #B26A00; font-size: 12px; padding: 7px 10px; border-radius: 7px; margin-bottom: 9px; }\n    .acts { display: flex; gap: 7px; flex-wrap: wrap; }\n    .acts button {\n      border: none; border-radius: 8px; padding: 9px 15px; font-size: 13.5px; font-weight: 500;\n    }\n    .b-pass { background: #1D7A5F; color: #fff; }\n    .b-reject { background: #FDECEC; color: #B33A3A; }\n    .b-plain { background: #F3F5F4; color: #555; }\n    .b-line { background: #fff; color: #666; border: 1px solid #E0E0E0 !important; }\n    .login { max-width: 380px; margin: 60px auto; background: #fff; border-radius: 14px; padding: 26px; }\n    .login h2 { margin: 0 0 6px; font-size: 18px; }\n    .login p { margin: 0 0 18px; font-size: 13px; color: #888; }\n    .login input { width: 100%; height: 44px; border: 1px solid #E5E5E5; border-radius: 9px; padding: 0 12px; font-size: 14px; margin-bottom: 12px; outline: none; }\n    .login button { width: 100%; height: 44px; border: none; border-radius: 9px; background: #1D7A5F; color: #fff; font-size: 15px; font-weight: 600; }\n    .modal { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 50; }\n    .modal .box { background: #fff; border-radius: 14px; padding: 18px; width: 100%; max-width: 460px; }\n    .modal h3 { margin: 0 0 12px; font-size: 15px; }\n    .modal input, .modal textarea {\n      width: 100%; border: 1px solid #E5E5E5; border-radius: 8px; padding: 10px; font-size: 14px;\n      font-family: inherit; margin-bottom: 10px; outline: none;\n    }\n    .modal textarea { min-height: 120px; }\n    .modal .row { display: flex; gap: 10px; }\n    .modal .row button { flex: 1; height: 42px; border: none; border-radius: 8px; font-size: 14px; }\n  </style>\n</head>\n<body>\n  <div id=\"root\"></div>\n  <div id=\"toast\" class=\"toast\"></div>\n\n  <script>\n    let TOKEN = localStorage.getItem('tz_admin_token') || '';\n    let tab = '0';\n    let stats = {};\n    let cache = {};\n\n    const esc = (s) => String(s == null ? '' : s).replace(/[&<>\"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));\n\n    let toastTimer = null;\n    function toast(msg) {\n      const el = document.getElementById('toast');\n      el.textContent = msg;\n      el.classList.add('show');\n      clearTimeout(toastTimer);\n      toastTimer = setTimeout(() => el.classList.remove('show'), 2200);\n    }\n\n    async function call(path, opts) {\n      opts = opts || {};\n      opts.headers = Object.assign({ 'X-Admin-Token': TOKEN }, opts.headers || {});\n      const res = await fetch('/api' + path, opts);\n      const j = await res.json().catch(() => ({ ok: false, msg: '网络错误' }));\n      if (!j.ok) throw new Error(j.msg || '请求失败');\n      return j.data;\n    }\n\n    function fmt(iso) {\n      if (!iso) return '';\n      const d = new Date(iso);\n      return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;\n    }\n\n    // ---------- 登录 ----------\n    function loginView(mode) {\n      if (!TOKEN || mode === 'login') {\n        document.getElementById('root').innerHTML = `\n          <div class=\"login\">\n            <h2>桐梓邻里 · 后台</h2>\n            <p>输入管理口令进入。口令在 Cloudflare 环境变量 ADMIN_TOKEN 里。</p>\n            <input type=\"password\" id=\"tk\" placeholder=\"管理口令\" />\n            <button id=\"loginBtn\">进后台</button>\n          </div>`;\n        document.getElementById('loginBtn').addEventListener('click', async () => {\n          const v = document.getElementById('tk').value.trim();\n          if (!v) return toast('请输入口令');\n          TOKEN = v;\n          try {\n            await call('/admin/stats');\n            localStorage.setItem('tz_admin_token', v);\n            boot();\n          } catch (e) {\n            TOKEN = '';\n            toast(e.message);\n          }\n        });\n        return true;\n      }\n      return false;\n    }\n\n    // ---------- 主体 ----------\n    async function boot() {\n      try {\n        stats = await call('/admin/stats');\n      } catch (e) {\n        if (/口令|权限/.test(e.message)) { TOKEN = ''; loginView('login'); return; }\n        toast(e.message);\n        return;\n      }\n      renderShell();\n      await loadTab(tab);\n    }\n\n    function renderShell() {\n      document.getElementById('root').innerHTML = `\n        <div class=\"adm-top\">\n          <h1>桐梓邻里 · 审核台</h1>\n          <button class=\"out\" id=\"logout\">退出</button>\n        </div>\n        <div class=\"stats\">\n          <div class=\"stat\"><div class=\"n\">${stats.todayCount}</div><div class=\"t\">今日投稿</div></div>\n          <div class=\"stat ${stats.pending ? 'warn' : ''}\"><div class=\"n\">${stats.pending}</div><div class=\"t\">待审</div></div>\n          <div class=\"stat\"><div class=\"n\">${stats.published}</div><div class=\"t\">已发布</div></div>\n          <div class=\"stat\"><div class=\"n\">${stats.views}</div><div class=\"t\">总浏览</div></div>\n          <div class=\"stat ${stats.newReports ? 'warn' : ''}\"><div class=\"n\">${stats.newReports}</div><div class=\"t\">举报</div></div>\n        </div>\n        <div class=\"tabs\">\n          <button data-tab=\"0\" class=\"${tab === '0' ? 'on' : ''}\">待审 ${stats.pending}</button>\n          <button data-tab=\"1\" class=\"${tab === '1' ? 'on' : ''}\">已发布</button>\n          <button data-tab=\"2\" class=\"${tab === '2' ? 'on' : ''}\">已驳回</button>\n          <button data-tab=\"reports\" class=\"${tab === 'reports' ? 'on' : ''}\">举报 ${stats.newReports}</button>\n        </div>\n        <div id=\"listBox\"><div class=\"loading\">加载中…</div></div>`;\n\n      document.getElementById('logout').addEventListener('click', () => {\n        localStorage.removeItem('tz_admin_token');\n        TOKEN = '';\n        loginView('login');\n      });\n\n      document.querySelectorAll('.tabs button').forEach((b) => {\n        b.addEventListener('click', () => {\n          tab = b.getAttribute('data-tab');\n          document.querySelectorAll('.tabs button').forEach((x) => x.classList.toggle('on', x === b));\n          loadTab(tab);\n        });\n      });\n    }\n\n    async function loadTab(which) {\n      const box = document.getElementById('listBox');\n      box.innerHTML = '<div class=\"loading\">加载中…</div>';\n      try {\n        if (which === 'reports') return await loadReports(box);\n        const d = await call('/admin/posts?status=' + which);\n        cache[which] = d.list || [];\n        if (!d.list.length) {\n          box.innerHTML = `<div class=\"empty\">${which === '0' ? '没有待审信息，可以歇会儿' : '这里还是空的'}</div>`;\n          return;\n        }\n        box.innerHTML = d.list.map((p) => itemHTML(p, which)).join('');\n        bindItems(box);\n      } catch (e) {\n        box.innerHTML = `<div class=\"empty\">${esc(e.message)}</div>`;\n      }\n    }\n\n    function itemHTML(p, which) {\n      const imgs = p.images && p.images.length\n        ? `<div class=\"imgs\">${p.images.map((u) => `<img src=\"${esc(u)}\" onclick=\"window.open(this.src)\" />`).join('')}</div>`\n        : '';\n\n      const acts = which === '0'\n        ? `<button class=\"b-pass\" data-act=\"pass\" data-id=\"${p.id}\">通过上墙</button>\n           <button class=\"b-reject\" data-act=\"reject\" data-id=\"${p.id}\">驳回</button>\n           <button class=\"b-line\" data-act=\"phone\" data-id=\"${p.id}\">看手机号</button>\n           <button class=\"b-line\" data-act=\"edit\" data-id=\"${p.id}\">编辑</button>`\n        : `<button class=\"b-plain\" data-act=\"top\" data-id=\"${p.id}\" data-top=\"${p.isTop ? 1 : 0}\">${p.isTop ? '取消置顶' : '置顶'}</button>\n           <button class=\"b-plain\" data-act=\"phone\" data-id=\"${p.id}\">看手机号</button>\n           <button class=\"b-line\" data-act=\"edit\" data-id=\"${p.id}\">编辑</button>\n           <button class=\"b-reject\" data-act=\"offline\" data-id=\"${p.id}\">下架</button>`;\n\n      return `\n        <div class=\"item\" data-pid=\"${p.id}\">\n          <div class=\"h\">\n            <div>\n              <div class=\"t\">${esc(p.title)}</div>\n              <div class=\"no\">${esc(p.postNo)} · ${esc(p.category || '')} · ${esc(p.area || '')}${p.price ? ' · ' + esc(p.price) : ''}</div>\n            </div>\n          </div>\n          <div class=\"c\">${esc(p.content)}</div>\n          ${imgs}\n          ${p.rejectReason ? `<div class=\"warnbar\">驳回理由：${esc(p.rejectReason)}</div>` : ''}\n          ${p.adminNote ? `<div class=\"warnbar\">${esc(p.adminNote)}</div>` : ''}\n          <div class=\"meta\">\n            <span>${fmt(p.createdAt)}</span>\n            <span>发布人 ${esc(p.contactName || '未填')}</span>\n            <span>手机 ***${esc(p.phoneTail)}</span>\n            <span>${p.viewCount} 浏览 / ${p.contactCount} 次看号</span>\n          </div>\n          <div class=\"acts\">${acts}</div>\n        </div>`;\n    }\n\n    function findPost(id) {\n      for (const k in cache) {\n        const arr = cache[k] || [];\n        const hit = arr.find((x) => String(x.id) === String(id));\n        if (hit) return hit;\n      }\n      return null;\n    }\n\n    function bindItems(box) {\n      box.querySelectorAll('[data-act]').forEach((btn) => {\n        btn.addEventListener('click', async () => {\n          const act = btn.getAttribute('data-act');\n          const id = btn.getAttribute('data-id');\n          const post = findPost(id);\n\n          if (act === 'pass') {\n            btn.disabled = true;\n            try {\n              await call('/admin/posts/' + id + '/review', {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify({ action: 'pass' }),\n              });\n              toast('已通过，上墙了');\n              refresh();\n            } catch (e) { toast(e.message); btn.disabled = false; }\n          }\n\n          if (act === 'reject') {\n            const reason = prompt('驳回理由（用户能看到，写清楚点，比如「无公司名称，疑似虚假招聘」）');\n            if (!reason) return;\n            btn.disabled = true;\n            try {\n              await call('/admin/posts/' + id + '/review', {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify({ action: 'reject', reason }),\n              });\n              toast('已驳回');\n              refresh();\n            } catch (e) { toast(e.message); btn.disabled = false; }\n          }\n\n          if (act === 'top') {\n            const cur = btn.getAttribute('data-top') === '1';\n            try {\n              await call('/admin/posts/' + id + '/top', {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify({ isTop: !cur }),\n              });\n              toast(!cur ? '已置顶' : '已取消置顶');\n              refresh();\n            } catch (e) { toast(e.message); }\n          }\n\n          if (act === 'offline') {\n            if (!confirm('确定下架这条？')) return;\n            try {\n              await call('/admin/posts/' + id + '/offline', { method: 'POST' });\n              toast('已下架');\n              refresh();\n            } catch (e) { toast(e.message); }\n          }\n\n          if (act === 'phone') {\n            try {\n              const d = await call('/admin/phone/' + id);\n              alert('完整手机号：' + d.phone);\n            } catch (e) { toast(e.message); }\n          }\n\n          if (act === 'edit' && post) openEdit(post);\n        });\n      });\n    }\n\n    function openEdit(post) {\n      const m = document.createElement('div');\n      m.className = 'modal';\n      m.innerHTML = `\n        <div class=\"box\">\n          <h3>编辑文案</h3>\n          <input id=\"eTitle\" maxlength=\"30\" value=\"${esc(post.title)}\" />\n          <textarea id=\"eContent\" maxlength=\"500\">${esc(post.content)}</textarea>\n          <div class=\"row\">\n            <button class=\"b-line\" id=\"eCancel\" style=\"border:1px solid #E0E0E0\">取消</button>\n            <button class=\"b-pass\" id=\"eSave\">保存</button>\n          </div>\n        </div>`;\n      document.body.appendChild(m);\n      m.querySelector('#eCancel').addEventListener('click', () => m.remove());\n      m.querySelector('#eSave').addEventListener('click', async () => {\n        try {\n          await call('/admin/posts/' + post.id, {\n            method: 'PUT',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({\n              title: m.querySelector('#eTitle').value.trim(),\n              content: m.querySelector('#eContent').value.trim(),\n            }),\n          });\n          toast('已保存');\n          m.remove();\n          refresh();\n        } catch (e) { toast(e.message); }\n      });\n    }\n\n    async function loadReports(box) {\n      const d = await call('/admin/reports');\n      if (!d.length) { box.innerHTML = '<div class=\"empty\">没有待处理的举报</div>'; return; }\n      box.innerHTML = d.map((r) => `\n        <div class=\"item\">\n          <div class=\"t\">${esc(r.title || '（信息已删除）')}</div>\n          <div class=\"no\">举报于 ${fmt(r.created_at)}</div>\n          <div class=\"c\">理由：${esc(r.reason)}</div>\n          ${r.contact ? `<div class=\"meta\">举报人联系：${esc(r.contact)}</div>` : ''}\n          <div class=\"acts\">\n            <button class=\"b-reject\" data-rid=\"${r.id}\" data-act=\"r-offline\">下架该信息</button>\n            <button class=\"b-plain\" data-rid=\"${r.id}\" data-act=\"r-ignore\">忽略举报</button>\n          </div>\n        </div>`).join('');\n\n      box.querySelectorAll('[data-rid]').forEach((btn) => {\n        btn.addEventListener('click', async () => {\n          const id = btn.getAttribute('data-rid');\n          const act = btn.getAttribute('data-act');\n          try {\n            await call('/admin/reports/' + id, {\n              method: 'POST',\n              headers: { 'Content-Type': 'application/json' },\n              body: JSON.stringify({ action: act === 'r-offline' ? 'offline' : 'ignore' }),\n            });\n            toast(act === 'r-offline' ? '已下架' : '已忽略');\n            refresh();\n          } catch (e) { toast(e.message); }\n        });\n      });\n    }\n\n    async function refresh() {\n      try {\n        stats = await call('/admin/stats');\n        const top = document.querySelector('.stats');\n        if (top) {\n          top.innerHTML = `\n            <div class=\"stat\"><div class=\"n\">${stats.todayCount}</div><div class=\"t\">今日投稿</div></div>\n            <div class=\"stat ${stats.pending ? 'warn' : ''}\"><div class=\"n\">${stats.pending}</div><div class=\"t\">待审</div></div>\n            <div class=\"stat\"><div class=\"n\">${stats.published}</div><div class=\"t\">已发布</div></div>\n            <div class=\"stat\"><div class=\"n\">${stats.views}</div><div class=\"t\">总浏览</div></div>\n            <div class=\"stat ${stats.newReports ? 'warn' : ''}\"><div class=\"n\">${stats.newReports}</div><div class=\"t\">举报</div></div>`;\n        }\n      } catch (e) {}\n      loadTab(tab);\n    }\n\n    // 启动\n    if (loginView()) {\n      // 显示登录\n    } else {\n      boot();\n    }\n  </script>\n</body>\n</html>\n";

// ============================================================
// 桐梓邻里 · 后端接口
// 运行环境：Cloudflare Pages Functions
// 文件路径：functions/api/[[path]].js  （捕获所有 /api/* 请求）
//
// 需要绑定的资源：
//   D1 数据库绑定变量名：DB
//   R2 存储桶绑定变量名：BUCKET （可选，不绑则图片功能报错）
// 需要设置的环境变量（Settings → Environment variables）：
//   PHONE_KEY        必填。32 字节随机值的 Base64，用于手机号加密
//   ADMIN_TOKEN      必填。后台登录口令，自己设一个长字符串
//   IP_SALT          必填。IP 哈希盐，随便一串长随机字符
//   TURNSTILE_SECRET 选填。不填则跳过人机校验
// ============================================================

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,X-Admin-Token',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Cache-Control': 'no-store',
      ...CORS,
    },
  });
}

function nowISO() {
  return new Date().toISOString();
}

// ---------- 基础工具 ----------

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function ab2b64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function b64Toab(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

function maskPhone(p) {
  if (!p || p.length < 7) return '';
  return p.slice(0, 3) + '****' + p.slice(-4);
}

function clientIP(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '0.0.0.0';
}

async function ipHash(env, request) {
  return sha256Hex(clientIP(request) + (env.IP_SALT || 'tzlinli'));
}

// ---------- 手机号加密（AES-GCM）---------

let _keyCache = null;
async function getAesKey(env) {
  if (_keyCache) return _keyCache;
  if (!env.PHONE_KEY) throw new Error('PHONE_KEY 未配置');
  // 任意长度 ≥16 的字符串都可以，用 SHA-256 派生出 32 字节密钥
  const raw = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(env.PHONE_KEY));
  _keyCache = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);
  return _keyCache;
}

async function encryptPhone(env, phone) {
  const key = await getAesKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(phone));
  return ab2b64(iv.buffer) + '.' + ab2b64(ct);
}

async function decryptPhone(env, cipher) {
  const [ivB64, ctB64] = String(cipher).split('.');
  const key = await getAesKey(env);
  const iv = new Uint8Array(b64Toab(ivB64));
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, b64Toab(ctB64));
  return new TextDecoder().decode(pt);
}

// ---------- 人机校验 ----------

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // 未配置则跳过，方便先上线
  if (!token) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const j = await res.json();
    return j.success === true;
  } catch {
    return false;
  }
}

// ---------- 限流 ----------

async function rateAllow(env, hash, action, limit, windowSec) {
  const since = new Date(Date.now() - windowSec * 1000).toISOString();
  const row = await env.DB.prepare(
    'SELECT COUNT(*) AS c FROM rate_log WHERE ip_hash = ?1 AND action = ?2 AND created_at >= ?3'
  )
    .bind(hash, action, since)
    .first();
  if ((row && row.c) >= limit) return false;
  await env.DB.prepare('INSERT INTO rate_log (ip_hash, action, created_at) VALUES (?1, ?2, ?3)')
    .bind(hash, action, nowISO())
    .run();
  return true;
}

// ---------- 敏感词 ----------

async function scanWords(env, text) {
  const { results } = await env.DB.prepare('SELECT word, level FROM sensitive_words').all();
  const block = [];
  const review = [];
  for (const r of results || []) {
    if (text.includes(r.word)) {
      if (r.level === 1) block.push(r.word);
      else review.push(r.word);
    }
  }
  return { block, review };
}

// ---------- 投稿编号 ----------

async function genPostNo(env) {
  const d = new Date(Date.now() + 8 * 3600 * 1000);
  const yy = String(d.getUTCFullYear()).slice(2);
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const prefix = `TZ${yy}${mm}${dd}`;
  const row = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts WHERE post_no LIKE ?1').bind(prefix + '%').first();
  return prefix + String(((row && row.c) || 0) + 1).padStart(3, '0');
}

// ---------- 管理员鉴权 ----------

function isAdmin(request, env) {
  if (!env.ADMIN_TOKEN) return false;
  const t = request.headers.get('X-Admin-Token') || '';
  return t === env.ADMIN_TOKEN;
}

// ---------- 过期惰性处理 ----------

async function expireOldPosts(env) {
  try {
    await env.DB.prepare("UPDATE posts SET status = 3 WHERE status = 1 AND expire_at IS NOT NULL AND expire_at <= ?1")
      .bind(nowISO())
      .run();
  } catch (_) {}
}

// ============================================================
// 路由入口
// ============================================================

async function apiHandler(request, env, seg) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  const method = request.method;

  try {
    // POST /api/upload   图片上传
    if (seg[0] === 'upload' && method === 'POST') return await handleUpload(request, env);

    // GET  /api/img/:key  读取图片
    if (seg[0] === 'img' && method === 'GET') return await handleImage(env, seg[1]);

    // GET  /api/settings  站点公告与免责文案
    if (seg[0] === 'settings' && method === 'GET') {
      const { results } = await env.DB.prepare(
        "SELECT key, value FROM settings WHERE key IN ('site_name','notice','disclaimer')"
      ).all();
      const obj = {};
      for (const r of results || []) obj[r.key] = r.value;
      return json({ ok: true, data: obj });
    }

    // GET  /api/categories
    if (seg[0] === 'categories' && method === 'GET') {
      const { results } = await env.DB.prepare('SELECT id, name, icon FROM categories WHERE enabled = 1 ORDER BY sort ASC').all();
      return json({ ok: true, data: results });
    }

    // GET  /api/areas
    if (seg[0] === 'areas' && method === 'GET') {
      const { results } = await env.DB.prepare('SELECT id, name, type FROM areas ORDER BY sort ASC').all();
      return json({ ok: true, data: results });
    }

    // ---- 信息相关 ----
    if (seg[0] === 'posts') {
      // GET /api/posts        列表
      if (seg.length === 1 && method === 'GET') return await listPosts(request, env);

      // GET /api/posts/query  进度查询
      if (seg[1] === 'query' && method === 'GET') return await queryPost(request, env);

      // POST /api/posts       投稿
      if (seg.length === 1 && method === 'POST') return await submitPost(request, env);

      // GET /api/posts/:id    详情
      if (seg.length === 2 && method === 'GET') return await getPost(env, Number(seg[1]));

      // POST /api/posts/:id/contact  查看联系方式
      if (seg.length === 3 && seg[2] === 'contact' && method === 'POST') {
        return await viewContact(request, env, Number(seg[1]));
      }
    }

    // POST /api/reports  举报
    if (seg[0] === 'reports' && seg.length === 1 && method === 'POST') return await submitReport(request, env);

    // ---- 后台 ----
    if (seg[0] === 'admin') {
      if (!isAdmin(request, env)) return json({ ok: false, msg: '口令错误或无权限' }, 401);
      return await handleAdmin(seg, request, env, method);
    }

    return json({ ok: false, msg: '接口不存在' }, 404);
  } catch (e) {
    return json({ ok: false, msg: '服务器错误：' + (e && e.message ? e.message : '未知') }, 500);
  }
}

// ============================================================
// 列表
// ============================================================

async function listPosts(request, env) {
  await expireOldPosts(env);

  const url = new URL(request.url);
  const categoryId = url.searchParams.get('category');
  const areaId = url.searchParams.get('area');
  const q = (url.searchParams.get('q') || '').trim();
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const pageSize = Math.min(30, Math.max(1, Number(url.searchParams.get('pageSize') || 20)));

  const wheres = ['p.status = 1'];
  const binds = [];

  if (categoryId) {
    wheres.push('p.category_id = ?');
    binds.push(Number(categoryId));
  }
  if (areaId) {
    wheres.push('p.area_id = ?');
    binds.push(Number(areaId));
  }
  if (q) {
    wheres.push('(p.title LIKE ? OR p.content LIKE ?)');
    binds.push('%' + q + '%', '%' + q + '%');
  }

  const whereSql = wheres.join(' AND ');

  const totalRow = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts p WHERE ' + whereSql)
    .bind(...binds)
    .first();

  const listSql =
    'SELECT p.id, p.title, p.content, p.price, p.images, p.is_top, p.published_at, p.view_count, ' +
    'c.name AS category_name, a.name AS area_name ' +
    'FROM posts p LEFT JOIN categories c ON c.id = p.category_id LEFT JOIN areas a ON a.id = p.area_id ' +
    'WHERE ' + whereSql + ' ORDER BY p.is_top DESC, p.published_at DESC LIMIT ? OFFSET ?';

  const { results } = await env.DB.prepare(listSql)
    .bind(...binds, pageSize, (page - 1) * pageSize)
    .all();

  const list = (results || []).map((r) => ({
    id: r.id,
    title: r.title,
    summary: (r.content || '').slice(0, 60),
    price: r.price || '',
    cover: '', // 列表不返回图片，省流量；图片只在详情页加载
    isTop: r.is_top === 1,
    publishedAt: r.published_at,
    viewCount: r.view_count,
    category: r.category_name,
    area: r.area_name,
  }));

  return json({ ok: true, data: { list, total: (totalRow && totalRow.c) || 0, page, pageSize } });
}

function parseImages(s) {
  try {
    const arr = JSON.parse(s || '[]');
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string').slice(0, 3) : [];
  } catch {
    return [];
  }
}

// ============================================================
// 详情
// ============================================================

async function getPost(env, id) {
  if (!id) return json({ ok: false, msg: '参数错误' }, 400);

  const row = await env.DB.prepare(
    'SELECT p.*, c.name AS category_name, a.name AS area_name ' +
      'FROM posts p LEFT JOIN categories c ON c.id = p.category_id LEFT JOIN areas a ON a.id = p.area_id ' +
      'WHERE p.id = ?1 AND p.status = 1'
  )
    .bind(id)
    .first();

  if (!row) return json({ ok: false, msg: '信息不存在或已下架' }, 404);

  await env.DB.prepare('UPDATE posts SET view_count = view_count + 1 WHERE id = ?1').bind(id).run();

  let phoneMasked = '';
  try {
    phoneMasked = maskPhone(await decryptPhone(env, row.phone_cipher));
  } catch (_) {
    phoneMasked = '';
  }

  return json({
    ok: true,
    data: {
      id: row.id,
      title: row.title,
      content: row.content,
      images: parseImages(row.images),
      price: row.price || '',
      contactName: row.contact_name || '',
      phoneMasked,
      category: row.category_name,
      area: row.area_name,
      publishedAt: row.published_at,
      viewCount: row.view_count + 1,
      postNo: row.post_no,
    },
  });
}

// ============================================================
// 查看联系方式（点击后单独下发）
// ============================================================

async function viewContact(request, env, id) {
  if (!id) return json({ ok: false, msg: '参数错误' }, 400);

  const hash = await ipHash(env, request);
  const allowed = await rateAllow(env, hash, 'contact', 30, 3600);
  if (!allowed) return json({ ok: false, msg: '查看太频繁，请稍后再试' }, 429);

  const row = await env.DB.prepare('SELECT phone_cipher, phone_tail, status FROM posts WHERE id = ?1').bind(id).first();
  if (!row || row.status !== 1) return json({ ok: false, msg: '信息不存在或已下架' }, 404);

  let phone = '';
  try {
    phone = await decryptPhone(env, row.phone_cipher);
  } catch (_) {
    return json({ ok: false, msg: '手机号读取失败，请联系管理员' }, 500);
  }

  await env.DB.prepare('UPDATE posts SET contact_count = contact_count + 1 WHERE id = ?1').bind(id).run();

  return json({ ok: true, data: { phone } });
}

// ============================================================
// 投稿
// ============================================================

async function submitPost(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, msg: '请求格式错误' }, 400);

  // 人机校验
  const passHuman = await verifyTurnstile(env, body.turnstileToken, clientIP(request));
  if (!passHuman) return json({ ok: false, msg: '人机校验未通过，请刷新重试' }, 400);

  const categoryId = Number(body.categoryId);
  const areaId = body.areaId ? Number(body.areaId) : null;
  const title = String(body.title || '').trim();
  const content = String(body.content || '').trim();
  const price = String(body.price || '').trim().slice(0, 20);
  const contactName = String(body.contactName || '').trim().slice(0, 20);
  const phone = String(body.phone || '').trim();
  const images = Array.isArray(body.images)
    ? body.images
        .filter(
          (x) =>
            typeof x === 'string' &&
            /^data:image\/(jpeg|png|webp);base64,/.test(x) &&
            x.length <= 130000
        )
        .slice(0, 3)
    : [];

  if (!categoryId) return json({ ok: false, msg: '请选择分类' }, 400);
  if (title.length < 4) return json({ ok: false, msg: '标题至少 4 个字' }, 400);
  if (title.length > 30) return json({ ok: false, msg: '标题最多 30 个字' }, 400);
  if (content.length < 10) return json({ ok: false, msg: '正文至少 10 个字' }, 400);
  if (content.length > 500) return json({ ok: false, msg: '正文最多 500 个字' }, 400);
  if (!/^1[3-9]\d{9}$/.test(phone)) return json({ ok: false, msg: '手机号格式不对' }, 400);

  // 格式都对了，再开始限流计数（避免用户填错两次就被锁一小时）
  const hash = await ipHash(env, request);
  const allowedHour = await rateAllow(env, hash, 'post', 2, 3600);
  if (!allowedHour) return json({ ok: false, msg: '投稿太频繁，每小时最多 2 条，请稍后再试' }, 429);

  // 敏感词
  const scan = await scanWords(env, title + ' ' + content);
  if (scan.block.length) {
    return json({ ok: false, msg: '内容含违规信息，已被拦截：' + scan.block.join('、') }, 400);
  }

  // 每日上限
  const dailyLimit = 5;
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const dailyRow = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts WHERE ip_hash = ?1 AND created_at >= ?2')
    .bind(hash, since)
    .first();
  if ((dailyRow && dailyRow.c) >= dailyLimit) {
    return json({ ok: false, msg: '今日投稿已达上限，明天再来' }, 429);
  }

  const phoneCipher = await encryptPhone(env, phone);
  const tail = phone.slice(-4);
  const postNo = await genPostNo(env);
  const created = nowISO();

  await env.DB.prepare(
    'INSERT INTO posts (category_id, area_id, title, content, images, price, contact_name, ' +
      'phone_cipher, phone_tail, post_no, status, ip_hash, admin_note, created_at) ' +
      'VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,0,?11,?12,?13)'
  )
    .bind(
      categoryId,
      areaId,
      title,
      content,
      JSON.stringify(images),
      price,
      contactName,
      phoneCipher,
      tail,
      postNo,
      hash,
      scan.review.length ? '敏感词待复核：' + scan.review.join('、') : '',
      created
    )
    .run();

  return json({
    ok: true,
    data: { postNo, msg: '投稿成功，24 小时内人工审核，通过后上墙' },
  });
}

// ============================================================
// 进度查询
// ============================================================

async function queryPost(request, env) {
  const url = new URL(request.url);
  const postNo = (url.searchParams.get('postNo') || '').trim().toUpperCase();
  const tail = (url.searchParams.get('tail') || '').trim();

  if (!postNo || !/^\d{4}$/.test(tail)) {
    return json({ ok: false, msg: '请输入投稿编号和手机号后四位' }, 400);
  }

  const row = await env.DB.prepare(
    'SELECT title, status, reject_reason, created_at, published_at FROM posts WHERE post_no = ?1 AND phone_tail = ?2'
  )
    .bind(postNo, tail)
    .first();

  if (!row) return json({ ok: false, msg: '没找到这条投稿，请核对编号和后四位' }, 404);

  const statusText = { 0: '待审核', 1: '已发布', 2: '已驳回', 3: '已过期', 4: '已下架' }[row.status] || '未知';

  return json({
    ok: true,
    data: {
      title: row.title,
      status: row.status,
      statusText,
      rejectReason: row.reject_reason || '',
      createdAt: row.created_at,
      publishedAt: row.published_at || '',
    },
  });
}

// ============================================================
// 举报
// ============================================================

async function submitReport(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, msg: '请求格式错误' }, 400);

  const postId = Number(body.postId);
  const reason = String(body.reason || '').trim().slice(0, 200);
  const contact = String(body.contact || '').trim().slice(0, 50);

  if (!postId || !reason) return json({ ok: false, msg: '请填写举报理由' }, 400);

  const hash = await ipHash(env, request);
  const allowed = await rateAllow(env, hash, 'report', 5, 3600);
  if (!allowed) return json({ ok: false, msg: '举报太频繁，请稍后再试' }, 429);

  const post = await env.DB.prepare('SELECT id FROM posts WHERE id = ?1').bind(postId).first();
  if (!post) return json({ ok: false, msg: '信息不存在' }, 404);

  await env.DB.prepare('INSERT INTO reports (post_id, reason, contact, status, created_at) VALUES (?1,?2,?3,0,?4)')
    .bind(postId, reason, contact, nowISO())
    .run();

  await env.DB.prepare('UPDATE posts SET report_count = report_count + 1 WHERE id = ?1').bind(postId).run();

  return json({ ok: true, msg: '举报已收到，我们会尽快处理' });
}

// ============================================================
// 图片上传 / 读取（R2）
// ============================================================

async function handleUpload(request, env) {
  if (!env.BUCKET) return json({ ok: false, msg: '未绑定 R2 存储桶' }, 500);

  const hash = await ipHash(env, request);
  const allowed = await rateAllow(env, hash, 'upload', 12, 3600);
  if (!allowed) return json({ ok: false, msg: '上传太频繁，请稍后再试' }, 429);

  const form = await request.formData().catch(() => null);
  const file = form && form.get('file');
  if (!file || typeof file === 'string') return json({ ok: false, msg: '没有收到图片' }, 400);

  const allowTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowTypes.includes(file.type)) return json({ ok: false, msg: '只支持 jpg / png / webp' }, 400);
  if (file.size > 3 * 1024 * 1024) return json({ ok: false, msg: '图片不能超过 3MB' }, 400);

  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type];
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = await file.arrayBuffer();

  await env.BUCKET.put(key, buf, {
    httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000' },
  });

  return json({ ok: true, data: { url: `/api/img/${key}` } });
}

async function handleImage(env, key) {
  if (!env.BUCKET || !key) return new Response('Not Found', { status: 404 });
  const obj = await env.BUCKET.get(key);
  if (!obj) return new Response('Not Found', { status: 404 });

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Access-Control-Allow-Origin', '*');
  return new Response(obj.body, { headers });
}

// ============================================================
// 后台接口
// ============================================================

async function handleAdmin(seg, request, env, method) {
  // GET  /api/admin/stats
  if (seg[1] === 'stats' && method === 'GET') {
    const today = new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
    const todayCount = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts WHERE created_at LIKE ?1').bind(today + '%').first();
    const pending = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts WHERE status = 0').first();
    const published = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts WHERE status = 1').first();
    const views = await env.DB.prepare('SELECT COALESCE(SUM(view_count),0) AS c FROM posts WHERE status = 1').first();
    const newReports = await env.DB.prepare('SELECT COUNT(*) AS c FROM reports WHERE status = 0').first();

    return json({
      ok: true,
      data: {
        todayCount: (todayCount && todayCount.c) || 0,
        pending: (pending && pending.c) || 0,
        published: (published && published.c) || 0,
        views: (views && views.c) || 0,
        newReports: (newReports && newReports.c) || 0,
      },
    });
  }

  // GET /api/admin/posts?status=0&page=1
  if (seg[1] === 'posts' && seg.length === 2 && method === 'GET') {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const pageSize = 20;

    let whereSql = '1=1';
    const binds = [];
    if (status !== null && status !== '') {
      whereSql = 'p.status = ?';
      binds.push(Number(status));
    }

    const total = await env.DB.prepare('SELECT COUNT(*) AS c FROM posts p WHERE ' + whereSql).bind(...binds).first();

    const { results } = await env.DB.prepare(
      'SELECT p.id, p.title, p.content, p.images, p.price, p.contact_name, p.phone_tail, p.post_no, ' +
        'p.status, p.reject_reason, p.is_top, p.admin_note, p.created_at, p.published_at, p.view_count, p.contact_count, ' +
        'c.name AS category_name, a.name AS area_name ' +
        'FROM posts p LEFT JOIN categories c ON c.id = p.category_id LEFT JOIN areas a ON a.id = p.area_id ' +
        'WHERE ' + whereSql + ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?'
    )
      .bind(...binds, pageSize, (page - 1) * pageSize)
      .all();

    const list = (results || []).map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      images: parseImages(r.images),
      price: r.price || '',
      contactName: r.contact_name || '',
      phoneTail: r.phone_tail,
      postNo: r.post_no,
      status: r.status,
      rejectReason: r.reject_reason || '',
      isTop: r.is_top === 1,
      adminNote: r.admin_note || '',
      createdAt: r.created_at,
      publishedAt: r.published_at || '',
      viewCount: r.view_count,
      contactCount: r.contact_count,
      category: r.category_name,
      area: r.area_name,
    }));

    return json({ ok: true, data: { list, total: (total && total.c) || 0, page, pageSize } });
  }

  // GET /api/admin/phone/:id  解密查看完整手机号
  if (seg[1] === 'phone' && seg.length === 3 && method === 'GET') {
    const row = await env.DB.prepare('SELECT phone_cipher FROM posts WHERE id = ?1').bind(Number(seg[2])).first();
    if (!row) return json({ ok: false, msg: '不存在' }, 404);
    const phone = await decryptPhone(env, row.phone_cipher);
    return json({ ok: true, data: { phone } });
  }

  // POST /api/admin/posts/:id/xxx
  if (seg[1] === 'posts' && seg.length === 4 && method === 'POST') {
    const id = Number(seg[2]);
    const action = seg[3];
    const body = await request.json().catch(() => ({}));

    if (!id) return json({ ok: false, msg: '参数错误' }, 400);

    if (action === 'review') {
      const pass = body.action === 'pass';
      const reason = String(body.reason || '').slice(0, 200);
      if (pass) {
        const publishedAt = nowISO();
        const expireAt = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
        await env.DB.prepare('UPDATE posts SET status = 1, reject_reason = NULL, published_at = ?1, expire_at = ?2 WHERE id = ?3')
          .bind(publishedAt, expireAt, id)
          .run();
        return json({ ok: true, msg: '已通过并上墙' });
      } else {
        if (!reason) return json({ ok: false, msg: '驳回要填理由，用户能看到' }, 400);
        await env.DB.prepare('UPDATE posts SET status = 2, reject_reason = ?1 WHERE id = ?2').bind(reason, id).run();
        return json({ ok: true, msg: '已驳回' });
      }
    }

    if (action === 'top') {
      const isTop = body.isTop ? 1 : 0;
      await env.DB.prepare('UPDATE posts SET is_top = ?1 WHERE id = ?2').bind(isTop, id).run();
      return json({ ok: true, msg: isTop ? '已置顶' : '已取消置顶' });
    }

    if (action === 'offline') {
      await env.DB.prepare("UPDATE posts SET status = 4 WHERE id = ?1").bind(id).run();
      return json({ ok: true, msg: '已下架' });
    }

    return json({ ok: false, msg: '未知操作' }, 400);
  }

  // PUT /api/admin/posts/:id  编辑文案
  if (seg[1] === 'posts' && seg.length === 3 && method === 'PUT') {
    const id = Number(seg[2]);
    const body = await request.json().catch(() => ({}));
    const title = String(body.title || '').trim().slice(0, 30);
    const content = String(body.content || '').trim().slice(0, 500);
    if (!id || !title || !content) return json({ ok: false, msg: '标题和正文不能为空' }, 400);

    await env.DB.prepare('UPDATE posts SET title = ?1, content = ?2 WHERE id = ?3').bind(title, content, id).run();
    return json({ ok: true, msg: '已保存' });
  }

  // GET /api/admin/reports
  if (seg[1] === 'reports' && seg.length === 2 && method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT r.id, r.post_id, r.reason, r.contact, r.status, r.created_at, p.title ' +
        'FROM reports r LEFT JOIN posts p ON p.id = r.post_id WHERE r.status = 0 ORDER BY r.created_at DESC LIMIT 50'
    ).all();
    return json({ ok: true, data: results || [] });
  }

  // POST /api/admin/reports/:id  { action: 'offline' | 'ignore' }
  if (seg[1] === 'reports' && seg.length === 3 && method === 'POST') {
    const id = Number(seg[2]);
    const body = await request.json().catch(() => ({}));

    if (body.action === 'offline') {
      const row = await env.DB.prepare('SELECT post_id FROM reports WHERE id = ?1').bind(id).first();
      if (row) {
        await env.DB.prepare('UPDATE posts SET status = 4 WHERE id = ?1').bind(row.post_id).run();
      }
      await env.DB.prepare('UPDATE reports SET status = 1 WHERE id = ?1').bind(id).run();
      return json({ ok: true, msg: '已下架并结案' });
    }

    await env.DB.prepare('UPDATE reports SET status = 2 WHERE id = ?1').bind(id).run();
    return json({ ok: true, msg: '已忽略' });
  }

  return json({ ok: false, msg: '后台接口不存在' }, 404);
}


function htmlPage(s) {
  return new Response(s, {
    headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-cache' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    if (p === '/' || p === '/index.html') return htmlPage(HTML_INDEX);

    if (p === '/app.css') {
      return new Response(CSS_TEXT, {
        headers: { 'Content-Type': 'text/css;charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (p === '/app.js') {
      return new Response(APP_JS, {
        headers: { 'Content-Type': 'application/javascript;charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (p === '/admin' || p === '/admin/' || p === '/admin/index.html') return htmlPage(HTML_ADMIN);

    if (p === '/favicon.ico') return new Response(null, { status: 204 });

    if (p.startsWith('/api/')) {
      const seg = p.replace(/^\/api\/?/, '').split('/').filter(Boolean);
      return apiHandler(request, env, seg);
    }

    return new Response('404 页面不存在', { status: 404, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
  },
};
