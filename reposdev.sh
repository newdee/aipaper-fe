#!/bin/bash

# 检查提交信息是否提供
if [ -z "$1" ]; then
  echo "错误: 请提供提交信息作为第一个参数。"
  exit 1
fi

# 获取提交信息
COMMIT_MESSAGE="$1"

# 定义需要操作的仓库路径数组
REPOS=(
  "/path/to/repo1"
  "/path/to/repo2"
  # 添加更多仓库路径...
)

# 定义远程名称和分支名称
REMOTE="origin"
BRANCH="dev"

# 遍历每个仓库
for REPO in "${REPOS[@]}"; do
  echo "处理仓库: $REPO"

  # 检查仓库路径是否存在
  if [ ! -d "$REPO/.git" ]; then
    echo "错误: $REPO 不是一个有效的 Git 仓库。"
    continue
  fi

  # 进入仓库目录
  cd "$REPO" || { echo "错误: 无法进入目录 $REPO。"; continue; }

  # 更新远程信息
  echo "Fetching latest from remote '$REMOTE'..."
  git fetch $REMOTE || { echo "错误: Fetch 失败，请检查远程仓库连接。"; continue; }

  # 切换到 dev 分支
  echo "切换到分支 $BRANCH..."
  git checkout $BRANCH || { echo "错误: 切换到分支 $BRANCH 失败。"; continue; }

  # 检查是否有未提交的更改
  if ! git diff --quiet || ! git diff --cached --quiet; then
    # 暂存当前更改
    echo "暂存当前更改..."
    git stash || { echo "错误: 暂存更改失败。"; continue; }

    # 拉取最新的远程更改
    echo "从远程仓库拉取最新更改..."
    git pull $REMOTE $BRANCH || { echo "错误: 拉取远程更改失败。"; git stash pop; continue; }

    # 恢复暂存的更改
    echo "恢复暂存的更改..."
    git stash pop || { echo "错误: 恢复暂存更改失败。"; continue; }
  else
    # 直接拉取最新的远程更改
    echo "从远程仓库拉取最新更改..."
    git pull $REMOTE $BRANCH || { echo "错误: 拉取远程更改失败。"; continue; }
  fi

  # 添加所有更改
  echo "添加所有更改到分支 $BRANCH..."
  git add . || { echo "错误: 添加更改失败。"; continue; }

  # 检查是否有更改需要提交
  if git diff --cached --quiet; then
    echo "提示: 分支 $BRANCH 没有更改需要提交。"
  else
    # 提交更改
    echo "提交更改到分支 $BRANCH..."
    git commit -m "$COMMIT_MESSAGE" || { echo "错误: 提交到分支 $BRANCH 失败。"; continue; }

    # 推送到远程仓库
    echo "推送分支 $BRANCH 到远程仓库..."
    git push $REMOTE $BRANCH || { echo "错误: 推送分支 $BRANCH 失败。"; continue; }
  fi

  echo "仓库 $REPO 处理完成。"
done

echo "所有操作完成。"
