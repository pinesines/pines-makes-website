.PHONY: help install dev build preview serve-docs

help: ## Show targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (npm)
	npm install

dev: ## Vite dev server
	npm run dev

build: ## Production build → docs/ (for GitHub Pages /docs)
	npm run build

preview: ## Preview production build (output is docs/)
	npm run preview

serve-docs: ## Python http.server: same as *.github.io root — run `make build` first; open http://127.0.0.1:8888/
	@test -f docs/index.html || (echo "No docs/ build found. Run: make build" && exit 1)
	cd docs && python3 -m http.server 8888 --bind 127.0.0.1
