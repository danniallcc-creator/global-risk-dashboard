# 📦 部署指南

## 方式一：GitHub Pages（推荐）

### 步骤 1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `global-risk-dashboard`
   - Description: "全球风险预警实时分析系统"
   - 选择 **Public**
   - 不要勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 步骤 2：推送代码到 GitHub

在终端执行以下命令（替换 YOUR_USERNAME 为你的 GitHub 用户名）：

```bash
cd /Users/zaiyu/.real/users/user-185b6c62546265b128e6cb9efe8d315d/workspace/global-risk-dashboard

# 配置 Git 用户信息（首次使用需要）
git config --global user.name "载堉"
git config --global user.email "your-email@example.com"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/global-risk-dashboard.git

# 推送代码
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）标签
3. 左侧菜单找到并点击 **Pages**
4. 在 "Build and deployment" 部分：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**

等待 1-2 分钟，页面刷新后会显示你的网站地址：
```
https://YOUR_USERNAME.github.io/global-risk-dashboard/
```

### 步骤 4：访问你的网站

在浏览器中打开上述链接，即可看到你的全球风险预警系统！

---

## 方式二：Vercel 部署

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：部署项目

```bash
cd global-risk-dashboard
vercel --prod
```

按照提示登录 Vercel 账号，完成后会获得一个访问链接。

---

## 方式三：Netlify 部署

### 方法 A：拖拽部署（最简单）

1. 访问 [Netlify Drop](https://app.netlify.com/drop)
2. 将 `global-risk-dashboard` 文件夹拖拽到网页
3. 等待上传完成，获得访问链接

### 方法 B：Git 集成

1. 先将代码推送到 GitHub（参考方式一）
2. 访问 [Netlify](https://www.netlify.com)
3. 点击 "Add new site" → "Import an existing project"
4. 连接 GitHub 账号，选择你的仓库
5. 构建设置保持默认，点击 "Deploy site"

---

## 方式四：本地测试服务器

### 使用 Python

```bash
cd global-risk-dashboard
python3 -m http.server 8080
```

访问：http://localhost:8080

### 使用 Node.js (需安装 http-server)

```bash
npm install -g http-server
cd global-risk-dashboard
http-server -p 8080
```

访问：http://localhost:8080

---

## 更新部署

当你对代码进行修改后：

### GitHub Pages 更新

```bash
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会自动重新构建，通常 1-2 分钟后生效。

### Vercel/Netlify 更新

如果绑定了 GitHub 仓库，推送代码后会自动重新部署。

---

## 自定义域名（可选）

### GitHub Pages

1. 进入仓库 Settings → Pages
2. 在 "Custom domain" 输入你的域名
3. 点击 Save
4. 在你的 DNS 服务商处添加 CNAME 记录

### Vercel/Netlify

在平台设置中添加自定义域名，按指引配置 DNS 即可。

---

## 故障排查

### 页面显示空白

- 检查浏览器控制台是否有错误
- 确认所有文件路径正确
- 清除浏览器缓存后重试

### GitHub Pages 404 错误

- 确认已启用 Pages 功能
- 检查分支名称是否为 main
- 等待 2-3 分钟让构建完成

### 地图不显示

- 检查网络连接
- Leaflet.js 需要从 CDN 加载资源
- 确认没有被防火墙拦截

---

## 生产环境建议

1. **数据接口**：将模拟数据替换为真实 API
2. **HTTPS**：确保使用 HTTPS 协议
3. **性能优化**：压缩图片、启用 CDN、代码分割
4. **监控统计**：接入 Google Analytics 或类似工具
5. **安全防护**：添加 CSP 头、防止 XSS 攻击

---

**祝你部署顺利！** 🚀

如有问题，请在 GitHub 仓库提交 Issue。
