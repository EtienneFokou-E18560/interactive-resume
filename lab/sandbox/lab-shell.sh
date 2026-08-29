#!/bin/sh
# Restricted line-oriented shell for the Engineering Lab (hardened PoC).
# Commands are dispatched without `sh -c` to avoid chaining/injection.
set -eu

WORKSPACE="${HOME}/lab"
SAMPLE_SRC="/opt/lab/sample-repo"

mkdir -p "$WORKSPACE"
if [ ! -f "$WORKSPACE/README.md" ]; then
  cp -a "$SAMPLE_SRC/." "$WORKSPACE/"
fi
cd "$WORKSPACE"

print_help() {
  cat <<'EOF'
Engineering Lab (hardened PoC)

Workspace: ~/lab  (copy of the sample GitOps repo on tmpfs)

Allowed commands:
  help ls pwd tree cat head tail grep find touch
  git kubectl terraform clear cd echo exit

Examples:
  ls
  tree
  cat k8s/deployment.yaml
  touch notes.txt
  kubectl get deploy
  terraform plan
EOF
}

# Reject path escape attempts
safe_path() {
  case "$1" in
    ''|-*|/*|~*|..|../*|*/..|*/../*) return 1 ;;
  esac
  return 0
}

run_kubectl() {
  echo "kubectl (lab stub): local manifests in k8s/ only — no cluster API"
  echo "Files:"
  ls -1 k8s 2>/dev/null || true
  if [ -f k8s/deployment.yaml ]; then
    echo "---"
    head -n 20 k8s/deployment.yaml
  fi
}

run_terraform() {
  echo "terraform (lab stub): local files in terraform/ only"
  if [ -f terraform/main.tf ]; then
    cat terraform/main.tf
  fi
  echo "No remote backend or cloud credentials are configured."
}

echo "Welcome to visitor@etienne-lab"
echo "Temporary sandbox — type 'help'. Session ends when the gateway times out."
echo

while true; do
  printf 'visitor@etienne-lab:~/lab$ '
  IFS= read -r line || exit 0
  line=$(printf '%s' "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  [ -z "$line" ] && continue

  # Disallow shell metacharacters that enable chaining / substitution
  if printf '%s' "$line" | grep -qE '[;|&$`<>\\]'; then
    echo "Rejected: shell metacharacters are not allowed."
    continue
  fi

  set -- $line
  cmd=$1
  shift || true

  case "$cmd" in
    exit|quit)
      echo "Session closed."
      exit 0
      ;;
    clear)
      printf '\033[H\033[2J'
      ;;
    help)
      print_help
      ;;
    pwd)
      pwd
      ;;
    ls)
      ls "$@"
      ;;
    tree)
      if command -v tree >/dev/null 2>&1; then
        tree "$@"
      else
        find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
      fi
      ;;
    cat|head|tail)
      if [ "$#" -lt 1 ]; then
        echo "$cmd: missing file operand"
        continue
      fi
      for f in "$@"; do
        if ! safe_path "$f"; then
          echo "$cmd: invalid path: $f"
          continue 2
        fi
      done
      "$cmd" "$@"
      ;;
    grep)
      if [ "$#" -lt 1 ]; then
        echo "grep: usage: grep PATTERN [FILE...]"
        continue
      fi
      grep "$@" || true
      ;;
    find)
      find "$@" || true
      ;;
    echo)
      echo "$@"
      ;;
    touch)
      if [ "$#" -lt 1 ]; then
        echo "touch: missing file operand"
        continue
      fi
      for f in "$@"; do
        if ! safe_path "$f"; then
          echo "touch: invalid path: $f"
          continue 2
        fi
      done
      touch "$@"
      ;;
    cd)
      target=${1:-.}
      if ! safe_path "$target" && [ "$target" != "." ]; then
        echo "cd: stay inside ~/lab"
        continue
      fi
      if [ -d "$target" ]; then
        cd "$target"
      else
        echo "cd: no such directory: $target"
      fi
      ;;
    git)
      sub=${1:-}
      case "$sub" in
        status|log|diff|show|ls-files)
          git -C "$WORKSPACE" "$@" || true
          ;;
        *)
          echo "git (lab): allowed subcommands: status log diff show ls-files"
          ;;
      esac
      ;;
    python|python3)
      echo "python3 is not available in the hardened lab. Use cat/ls/git stubs instead."
      ;;
    kubectl)
      run_kubectl
      ;;
    terraform)
      run_terraform
      ;;
    *)
      echo "Command not allowed: $cmd"
      echo "Type 'help' for the allowlist."
      ;;
  esac
done
