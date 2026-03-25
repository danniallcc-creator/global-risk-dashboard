# 🌍 全球风险预警实时分析系统

Global Risk Early Warning & Real-time Analysis System

## 项目简介

这是一个面向出口贸易企业的全球风险预警与决策支持系统，通过 AI 技术将分散的全球商业信号自动采集、去噪、打分，生成可执行的行动建议，帮助企业从"盲目行动"转向"数据触发的纪律性行动"。

## 核心功能

### 📡 情报输入监控

实时采集五大类合规商业信号：

- **航运与通道信号**：全球航线动态、运价指数、战争险附加费、港口拥堵、准班率
- **能源与原料信号**：油价/航油、化工原料、关键材料价格波动
- **支付与信用信号**：汇率变化、外汇紧张程度、银行合规政策、客户付款行为
- **政策与舆情信号**：制裁管制动态、行业监管变化、重大事件热度趋势
- **竞品与渠道信号**：竞品价格/库存/交付动态、渠道库存周转

### 💼 决策输出支持

AI 辅助四大经营动作：

1. **动态报价系统**：将运费、保险、改港等做成浮动因子，计算安全报价区间与有效期
2. **客户分层授信**：基于付款历史、宏观变量、行业波动，输出风险等级与建议账期
3. **交付策略选择**：直发 vs 区域仓 vs 本土交付，综合评估总成本 + 确定性 + 风险敞口
4. **库存与备货**：情景推演安全库存、分批发运、替代料方案

### ⚠️ AI 预警看板

三级预警体系：

- 🔴 **红色预警（立即动作）**：战争险突增、港口拥堵跳变、客户付款异常、政策黑名单更新
- 🟡 **黄色预警（48 小时内复核）**：运价持续上行、油价突破阈值、汇率急跌、竞品缺货
- 🟢 **绿色优化（常态监控）**：毛利变化、转化率、退货率、渠道库存周转

## 技术栈

- **前端框架**：原生 HTML5 + CSS3 + JavaScript (ES6+)
- **地图可视化**：Leaflet.js（世界地图、航运线路）
- **图表库**：Chart.js（趋势图、柱状图）
- **UI 设计**：深色主题、响应式布局、玻璃态效果
- **部署方式**：GitHub Pages / Vercel / Netlify

## 快速开始

### 本地运行

1. 克隆项目到本地
```bash
git clone https://github.com/YOUR_USERNAME/global-risk-dashboard.git
cd global-risk-dashboard
```

2. 直接在浏览器打开
```bash
# 方法 1: 直接打开 HTML 文件
open index.html

# 方法 2: 使用本地服务器（推荐）
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### 部署到 GitHub Pages

1. 创建 GitHub 仓库
```bash
git init
git add .
git commit -m "Initial commit: 全球风险预警系统"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/global-risk-dashboard.git
git push -u origin main
```

2. 启用 GitHub Pages
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - 保存后获得访问链接：`https://YOUR_USERNAME.github.io/global-risk-dashboard/`

## 项目结构

```
global-risk-dashboard/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js              # 应用逻辑
├── README.md           # 项目说明
└── .gitignore          # Git 忽略配置
```

## 主要界面

### 1. 情报输入模块
- 交互式世界地图展示航运/空运线路
- 五大类情报卡片实时监控
- 关键指标趋势图表

### 2. 决策输出模块
- 动态报价计算器
- 客户风险评估工具
- 交付策略对比分析
- 库存情景推演

### 3. AI 预警看板
- 三级预警概览统计
- 分级预警详情列表
- 一键触发应对方案

### 4. 系统设置
- 数据源配置
- 预警阈值调整
- 通知方式管理
- AI 模型参数

## 数据集成（扩展方向）

当前版本使用模拟数据演示，生产环境可对接以下 API：

| 数据类型 | 推荐数据源 | API 示例 |
|---------|-----------|---------|
| 航运数据 | FreightWaves, Drewry | 运价指数、航线动态 |
| 能源价格 | Bloomberg, Reuters | 原油、航油价格 |
| 汇率数据 | XE.com, OANDA | 实时汇率、历史走势 |
| 政策信息 | 政府官网、行业协会 | 制裁清单、监管政策 |
| 竞品信息 | 爬虫采集、第三方数据 | 价格、库存、交期 |

## AI 能力集成

后续可扩展的 AI 功能：

1. **智能数据采集**：自动爬取多源数据，去重去噪
2. **风险评分模型**：机器学习训练客户风险预测
3. **自然语言报告**：自动生成日报/周报摘要
4. **预测性预警**：基于时间序列预测风险趋势
5. **对话式查询**：支持自然语言询问风险状况

## 响应式设计

- ✅ 桌面端（1920x1080+）
- ✅ 笔记本（1366x768）
- ✅ 平板（768x1024）
- ✅ 移动端（375x667+）

## 浏览器兼容性

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## 开发计划

### v1.0（当前版本）
- [x] 基础 UI 框架
- [x] 情报输入展示
- [x] 决策输出界面
- [x] 预警看板
- [x] 地图可视化
- [ ] 真实数据接入

### v1.1
- [ ] 后端 API 服务
- [] 数据库设计
- [ ] 用户认证系统
- [ ] 数据定时采集

### v2.0
- [ ] AI 风险评分模型
- [ ] 自动化报告生成
- [ ] 多渠道通知推送
- [ ] 移动端 App

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件

## 联系方式

如有问题或合作意向，请通过以下方式联系：

- 📧 Email: your.email@example.com
- 💬 Issues: GitHub Issues

---

**让数据驱动决策，让风险提前预警！** 🚀
