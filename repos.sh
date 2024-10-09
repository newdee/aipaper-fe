#!/bin/bash

# 设置变量
REMOTE_ORIGIN="origin"  # 远程仓库 origin
REMOTE_GITHUB="github"  # 远程仓库 github
BRANCHES=("dev" "main")  # 需要推送的分支
MESSAGE="部署更改"  # 默认提交信息
TAG_NAME="v1.0.0"  # 默认标签名称

# 检查是否有传递的提交信息
if [ ! -z "$1" ]; then
  MESSAGE="$1"
fi

# 检查是否有传递的标签名称
if [ ! -z "$2" ]; then
  TAG_NAME="$2"
fi

# 获取当前分支名称
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 检查是否有未提交的更改
if git status | grep -q "Changes not staged for commit"; then
  echo "有未提交的更改。请先提交或暂存它们。"
  exit 1
fi

# 拉取最新的代码
echo "从 $REMOTE_ORIGIN/$CURRENT_BRANCH 拉取最新代码..."
git pull $REMOTE_ORIGIN $CURRENT_BRANCH

# 添加所有更改
echo "添加所有更改..."
git add .

# 提交更改
echo "使用消息 '$MESSAGE' 提交更改..."
git commit -m "$MESSAGE"

# 推送更改到 origin 仓库
for BRANCH in "${BRANCHES[@]}"; do
  echo "向 $REMOTE_ORIGIN/$BRANCH 推送更改..."
  git push $REMOTE_ORIGIN $CURRENT_BRANCH:$BRANCH
done

# 推送更改到 github 仓库
for BRANCH in "${BRANCHES[@]}"; do
  echo "向 $REMOTE_GITHUB/$BRANCH 推送更改..."
  git push $REMOTE_GITHUB $CURRENT_BRANCH:$BRANCH
done

# 切换到 main 分支
echo "切换到 main 分支..."
git checkout main

# 拉取最新的 main 分支代码
echo "从 $REMOTE_GITHUB/main 拉取最新代码..."
git pull $REMOTE_GITHUB main

# 合并 dev 分支到 main 分支
echo "合并 dev 分支到 main 分支..."
git merge --no-ff dev

# 解决可能的冲突
if [ $? -ne 0 ]; then
  echo "合并过程中出现冲突，请手动解决冲突后继续。"
  exit 1
fi

# 推送合并后的 main 分支到 github 仓库
echo "向 $REMOTE_GITHUB/main 推送合并后的 main 分支..."
git push $REMOTE_GITHUB main

# 创建标签
echo "创建标签 $TAG_NAME..."
git tag $TAG_NAME

# 推送标签到 github 仓库
echo "向 $REMOTE_GITHUB 推送标签 $TAG_NAME..."
git push $REMOTE_GITHUB $TAG_NAME

echo "部署完成！"
