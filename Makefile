all: editor serve

serve:
	npm run dev

editor:
	mvim './src/js-scroll-effect-module.js'

build:
	@echo "--------------------"
	@echo "js-scroll-effect-module\nbuild..."
	@echo "--------------------"
	@git status -bs
	@echo "--------------------"
	rm -rf "./dist/"
	@echo "--------------------"
	npm run prod
