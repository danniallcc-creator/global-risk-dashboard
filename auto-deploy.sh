#!/bin/bash

# ============================================
# 全球风险预警系统 - 一键自动部署脚本
# ============================================

set -e

echo "🚀 全球风险预警系统 - 自动部署到 GitHub Pages"
echo "=============================================="
echo ""

# 检查 Git 是否已配置
if ! git config --global user.name > /dev/null 2>&1; then
    echo "⚙️  配置 Git 用户名..."
    read -p "请输入你的 Git 用户名：" git_username
    git config --global user.name "$git_username"
fi

if ! git config --global user.email > /dev/null 2>&1; then
    echo "⚙️  配置 Git 邮箱..."
    read -p "请输入你的 Git 邮箱：" git_email
    git config --global user.email "$git_email"
fi

# 确保分支名为 main
git branch -M main 2>/dev/null || true

# 获取 GitHub 用户名
echo ""
echo "📦 准备创建 GitHub 仓库..."
read -p "请输入你的 GitHub 用户名：" github_username

# 生成 Personal Access Token 指引
echo ""
echo "🔐 需要生成 GitHub Personal Access Token"
echo "----------------------------------------"
echo "请按以下步骤操作："
echo "1. 访问：https://github.com/settings/tokens/new"
echo "2. Note: 填写 'global-risk-dashboard-deploy'"
echo "3. Expiration: 选择 7 days 或 30 days"
echo "4. Select scopes: 勾选 'repo' (Full control of private repositories)"
echo "5. 点击 'Generate token'"
echo "6. 复制生成的 token（以 ghp_ 开头）"
echo ""
read -p "请输入你的 GitHub Personal Access Token：" gh_token

# 创建仓库
echo ""
echo "📝 正在创建 GitHub 仓库..."
REPO_NAME="global-risk-dashboard"
REPO_DESC="全球风险预警实时分析系统 - Global Risk Warning Real-time Analysis System"

# 使用 GitHub API 创建仓库
curl -s -X POST \
  -H "Authorization: token $gh_token" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESC\",\"auto_init\":false}"

if [ $? -eq 0 ]; then
    echo "✅ 仓库创建成功！"
else
    echo "❌ 仓库创建失败，可能已存在同名仓库"
    echo "   继续尝试推送到现有仓库..."
fi

# 添加远程仓库
echo ""
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$github_username:$gh_token@github.com/$github_username/$REPO_NAME.git"

# 推送代码
echo ""
echo "📤 正在推送代码到 GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅✅✅ 部署成功！"
    echo "=========================================="
    echo ""
    echo "🌐 你的网站地址是："
    echo "   https://$github_username.github.io/$REPO_NAME/"
    echo ""
    echo "📋 启用 GitHub Pages 的步骤："
    echo "1. 访问：https://github.com/$github_username/$REPO_NAME/settings/pages"
    echo "2. Source: 选择 'Deploy from a branch'"
    echo "3. Branch: 选择 'main'，Folder: '/'"
    echo "4. 点击 'Save'"
    echo ""
    echo "⏱️  等待几分钟后，你的网站将上线！"
    echo ""
else
    echo "❌ 推送失败，请检查网络或权限设置"
    exit 1
fi
