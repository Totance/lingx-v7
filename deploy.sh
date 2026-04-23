#!/bin/bash
# LINGX V7 部署脚本

echo "=== LINGX 零想科技 V7 部署 ==="

# 1. 构建项目
echo "📦 构建项目中..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"

# 2. 部署选项
echo ""
echo "请选择部署方式:"
echo "1. Vercel (推荐)"
echo "2. Netlify"
echo "3. GitHub Pages"
echo "4. Cloudflare Pages"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo "🚀 部署到 Vercel..."
        npx vercel --prod
        ;;
    2)
        echo "🚀 部署到 Netlify..."
        npx netlify deploy --prod --dir=dist
        ;;
    3)
        echo "🚀 部署到 GitHub Pages..."
        npx gh repo create lingx-website-v7 --public --source=. --push
        ;;
    4)
        echo "🚀 部署到 Cloudflare Pages..."
        npx wrangler pages deploy dist
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "✨ 部署完成！"