#!/bin/bash

# ============================================
# GitHub Pages 一键部署脚本
# 全球风险预警实时分析系统
# ============================================

echo "🚀 开始部署到 GitHub Pages..."
echo ""

# 检查 Git 是否已安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：Git 未安装。请先安装 Git: https://git-scm.com/"
    exit 1
fi

# 配置 Git 用户信息（如果尚未配置）
echo "📝 配置 Git 用户信息..."
read -p "请输入你的 GitHub 用户名：" GITHUB_USERNAME
read -p "请输入你的邮箱地址：" USER_EMAIL

git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$USER_EMAIL"

echo "✅ Git 用户信息已配置"
echo ""

# 检查是否已有远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    echo "🔗 添加远程仓库..."
    echo "请按照以下步骤操作:"
    echo ""
    echo "1. 打开浏览器访问：https://github.com/new"
    echo "2. 创建新仓库，仓库名称填写：global-risk-dashboard"
    echo "3. 描述填写：全球风险预警实时分析系统"
    echo "4. 选择 Public（公开）"
    echo "5. ❌ 不要勾选 'Add a README file'"
    echo "6. 点击 'Create repository'"
    echo ""
    read -p "创建完成后按回车继续..."
    
    # 获取远程仓库 URL
    read -p "请输入仓库的 Git URL (例如：https://github.com/yourname/global-risk-dashboard.git): " REPO_URL
    
    git remote add origin "$REPO_URL"
    echo "✅ 远程仓库已添加"
else
    echo "✅ 远程仓库已存在：$REMOTE_URL"
fi

echo ""
echo "📤 推送代码到 GitHub..."

# 确保分支名为 main
git branch -M main

# 推送代码
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "🌐 启用 GitHub Pages:"
    echo "   1. 访问你的仓库页面：https://github.com/$GITHUB_USERNAME/global-risk-dashboard"
    echo "   2. 点击 Settings → Pages"
    echo "   3. Source 选择 'Deploy from a branch'"
    echo "   4. Branch 选择 'main'，文件夹选择 '/ (root)'"
    echo "   5. 点击 Save"
    echo ""
    echo "⏱️  1-2 分钟后，你的网站将在以下地址上线:"
    echo "   https://$GITHUB_USERNAME.github.io/global-risk-dashboard/"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查:"
    echo "   1. 仓库 URL 是否正确"
    echo "   2. 是否已登录 GitHub"
    echo "   3. 是否有仓库访问权限"
    echo ""
    echo "如需使用 Personal Access Token，请将远程 URL 改为:"
    echo "   https://YOUR_TOKEN@github.com/YOUR_USERNAME/global-risk-dashboard.git"
    exit 1
fi
