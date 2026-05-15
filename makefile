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

serve-docs: ## Preview ./docs with correct Pages base (same as preview; prefer over raw http.server)
	npm run preview
