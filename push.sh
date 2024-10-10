#!/bin/bash

# 检查是否提供了提交信息
if [ -z "$1" ]; then
  echo "请提供提交信息作为第一个参数"
  exit 1
fi

# 获取提交信息
COMMIT_MESSAGE="$1"

# 检查是否在 Git 仓库中
if [ ! -d .git ]; then
  echo "当前目录不是一个 Git 仓库"
  exit 1
fi

# 设置变量
REMOTE="origin"
BRANCHES=("dev" "main")

# 更新所有分支前先 fetch 最新的远程仓库信息
echo "Fetching latest from remote..."
git fetch $REMOTE

# 遍历每个分支
for BRANCH in "${BRANCHES[@]}"; do
  # 切换到目标分支
  git checkout $BRANCH || { echo "切换到分支 $BRANCH 失败"; exit 1; }

  # 添加所有更改
  git add .

  # 检查是否有更改需要提交
  if git diff --cached --quiet; then
    echo "没有更改需要提交到分支 $BRANCH"
  else
    # 提交更改
    git commit -m "$COMMIT_MESSAGE" || { echo "提交到分支 $BRANCH 失败"; exit 1; }

    # 推送到远程仓库
    git push $REMOTE $BRANCH || { echo "推送分支 $BRANCH 失败"; exit 1; }
  fi
done

# 如果需要同步 dev 和 main 分支的代码，可以将 dev 分支的更改合并到 main 分支
git checkout main
git merge dev -m "合并 dev 分支到 main"

# 再次推送到远程仓库
git push $REMOTE main

echo "操作完成"
