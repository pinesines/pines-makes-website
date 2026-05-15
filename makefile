.PHONY: help install dev build preview serve-docs

help: ## Show targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (npm)
	npm install

dev: ## Vite dev server
	npm run dev

build: ## Production build → docs/ (for GitHub Pages /docs)
	npm run build

preview: ## Preview production build (serves under /pines-makes-website/ like GitHub Pages)
	npm run preview

serve-docs: ## python http.server with /pines-makes-website/ → docs/ (same base as GitHub Pages project site)
	@test -f docs/index.html || (echo "No docs/ build found. Run: make build" && exit 1)
	@tmpdir=$$(mktemp -d); \
	  trap 'rm -rf "$$tmpdir"' EXIT INT TERM; \
	  ln -sf "$(CURDIR)/docs" "$$tmpdir/pines-makes-website"; \
	  printf 'Open: http://127.0.0.1:8888/pines-makes-website/\n'; \
	  cd "$$tmpdir" && python3 -m http.server 8888 --bind 127.0.0.1
