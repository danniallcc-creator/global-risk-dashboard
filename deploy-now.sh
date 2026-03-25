#!/bin/bash
set -e

echo "🚀 开始自动部署..."

# 从环境变量读取或使用默认值
GITHUB_USERNAME="${GITHUB_USERNAME:-}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_USERNAME" ]; then
    read -p "GitHub 用户名：" GITHUB_USERNAME
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "请输入 GitHub Personal Access Token (ghp_xxx):"
    read -s GITHUB_TOKEN
    echo ""
fi

REPO_NAME="global-risk-dashboard"

# 创建仓库
echo "📝 创建仓库..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"全球风险预警实时分析系统\",\"auto_init\":false}" || true

# 配置远程
git remote remove origin 2>/dev/null || true
git remote add origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# 推送
echo "📤 推送代码..."
git push -u origin main --force

echo "✅ 完成！访问：https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
