# 🚀 快速启动指南

## 立即预览（推荐）

### 方法 1：直接打开 HTML 文件

双击 `index.html` 文件即可在浏览器中打开查看效果。

### 方法 2：使用本地服务器（功能更完整）

打开终端，进入项目目录后执行：

```bash
# macOS / Linux
python3 -m http.server 8080

# Windows
py -m http.server 8080
```

然后在浏览器访问：**http://localhost:8080**

---

## 部署到 GitHub（5 分钟完成）

### 第 1 步：创建 GitHub 账号

如果你还没有 GitHub 账号，访问 https://github.com 注册一个免费账号。

### 第 2 步：配置 Git

打开终端，执行以下命令（只需首次配置）：

```bash
git config --global user.name "载堉"
git config --global user.email "your-email@example.com"
```

### 第 3 步：创建新仓库

1. 访问 https://github.com/new
2. Repository name: `global-risk-dashboard`
3. 选择 **Public**
4. 点击 **Create repository**

### 第 4 步：推送代码

复制页面上的命令行指引，或执行：

```bash
cd /Users/zaiyu/.real/users/user-185b6c62546265b128e6cb9efe8d315d/workspace/global-risk-dashboard

git remote add origin https://github.com/YOUR_USERNAME/global-risk-dashboard.git
git push -u origin main
```

⚠️ 记得将 `YOUR_USERNAME` 替换为你的 GitHub 用户名！

### 第 5 步：启用 GitHub Pages

1. 进入你的仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择 **main** 分支
4. 点击 **Save**

等待 1-2 分钟，刷新页面即可获得访问链接！

---

## 系统功能演示

### 📡 情报输入模块

- 查看世界地图上的航运线路
- 切换不同图层（航运/空运/风险热点）
- 监控五大类情报卡片数据

### 💼 决策输出模块

- 尝试动态报价计算器
- 查看客户风险评估示例
- 对比不同交付策略
- 查看库存情景推演建议

### ⚠️ AI 预警看板

- 查看红黄绿三级预警统计
- 浏览各级别预警详情
- 点击"查看应对方案"按钮

### ⚙️ 系统设置

- 调整预警阈值滑块
- 配置通知方式
- 选择数据源和 AI 模型

---

## 下一步计划

### 短期优化（v1.1）

- [ ] 接入真实数据 API
- [] 添加用户登录系统
- [ ] 实现数据定时刷新
- [] 增加导出报告功能

### 中期扩展（v2.0）

- [ ] AI 风险评分模型
- [ ] 自动化日报生成
- [ ] 多渠道消息推送
- [ ] 移动端 App

### 长期愿景（v3.0）

- [ ] 预测性风险分析
- [ ] 对话式 AI 助手
- [ ] 供应链全景图谱
- [ ] 行业对标分析

---

## 获取帮助

### 常见问题

**Q: 地图不显示怎么办？**
A: 检查网络连接，Leaflet 地图需要从 CDN 加载资源。

**Q: 如何修改模拟数据？**
A: 编辑 `app.js` 文件中的数据对象，或对接真实 API。

**Q: 可以自定义颜色主题吗？**
A: 可以，修改 `styles.css` 中的颜色变量。

### 技术支持

- 📖 查看 [README.md](./README.md) 了解完整功能
- 📦 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解详细部署步骤
- 💬 在 GitHub 仓库提交 Issue

---

## 分享你的成果

部署成功后，你可以：

1. 将链接分享给团队成员
2. 在项目文档中嵌入演示链接
3. 作为案例展示给客户
4. 基于此原型继续开发生产版本

**祝你使用愉快！** ✨

如有任何建议或反馈，欢迎随时提出！
