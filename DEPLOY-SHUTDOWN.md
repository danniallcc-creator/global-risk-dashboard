# 🚀 一键部署到 GitHub - 快速指南

## 前置要求

- 已安装 Git（项目已初始化）
- 拥有 GitHub 账号
- 已配置 Git 用户信息（如未配置，见下方步骤 0）

---

## 部署步骤（5 步完成）

### 步骤 0：配置 Git 用户信息（首次使用需要）

```bash
cd /Users/zaiyu/.real/users/user-185b6c62546265b128e6cb9efe8d315d/workspace/global-risk-dashboard

# 替换为你的 GitHub 用户名和邮箱
git config --global user.name "你的 GitHub 用户名"
git config --global user.email "你的邮箱@example.com"
```

---

### 步骤 1：在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写以下信息：
   - **Repository name**: `global-risk-dashboard`
   - **Description**: `全球风险预警实时分析系统 - Global Risk Early Warning & Real-time Analysis System`
   - **Public**（公开仓库，GitHub Pages 免费托管需要）
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要添加 .gitignore
   - ❌ 不要选择许可证

3. 点击 **"Create repository"** 按钮

---

### 步骤 2：复制仓库 URL

创建成功后，GitHub 会显示快速设置指南。找到类似这样的内容：

```
git remote add origin https://github.com/YOUR_USERNAME/global-risk-dashboard.git
```

**重要**：将 `YOUR_USERNAME` 替换为你的实际 GitHub 用户名。

---

### 步骤 3：在本地终端执行推送命令

回到终端，在项目目录下执行：

```bash
cd /Users/zaiyu/.real/users/user-185b6c62546265b128e6cb9efe8d315d/workspace/global-risk-dashboard

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/global-risk-dashboard.git

# 验证远程仓库配置
git remote -v

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

如果提示需要认证，输入你的 GitHub 密码或个人访问令牌（Personal Access Token）。

---

### 步骤 4：启用 GitHub Pages

1. 进入你的仓库页面：`https://github.com/YOUR_USERNAME/global-risk-dashboard`
2. 点击顶部的 **"Settings"** 标签
3. 在左侧菜单找到并点击 **"Pages"**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`，文件夹选择 `/ (root)`
5. 点击 **"Save"**

---

### 步骤 5：等待部署完成

GitHub 会自动构建并部署你的网站，通常需要 1-2 分钟。

部署完成后，你会看到类似这样的提示：

```
Your site is live at https://YOUR_USERNAME.github.io/global-risk-dashboard/
```

🎉 **恭喜！你的全球风险预警系统已经上线！**

---

## 🔧 常见问题

### Q1: 推送时提示认证失败？

**解决方案 1**：使用 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成后复制 token（只显示一次！）
5. 推送时使用 token 代替密码

**解决方案 2**：配置 SSH 密钥

```bash
# 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 复制输出内容，添加到 GitHub: Settings → SSH and GPG keys → New SSH key
```

然后使用 SSH URL：
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/global-risk-dashboard.git
git push -u origin main
```

---

### Q2: GitHub Pages 显示 404？

- 等待 2-3 分钟，GitHub 需要时间构建
- 检查 `index.html` 是否在仓库根目录
- 确认 Pages 设置中 Branch 选择了 `main`

---

### Q3: 如何更新代码？

修改代码后，执行：

```bash
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会自动重新部署（约 1 分钟）。

---

## 📊 项目文件清单

```
global-risk-dashboard/
├── index.html          # 主页面（42KB）
├── styles.css          # 样式文件（19KB）
├── app.js              # 应用逻辑（13KB）
├── README.md           # 项目说明
├── DEPLOYMENT.md       # 详细部署指南
├── QUICKSTART.md       # 快速启动指南
└── .gitignore          # Git 忽略配置
```

---

## 🌐 访问你的网站

部署成功后，通过以下地址访问：

```
https://YOUR_USERNAME.github.io/global-risk-dashboard/
```

将 `YOUR_USERNAME` 替换为你的 GitHub 用户名即可。

---

## 💡 下一步建议

1. **自定义域名**：在 GitHub Pages 设置中添加自定义域名
2. **数据对接**：修改 `app.js` 中的模拟数据为真实 API 调用
3. **功能扩展**：基于原型继续开发后端服务和 AI 模型
4. **团队协作**：邀请同事加入仓库共同开发

---

**祝你部署顺利！** 🎉
