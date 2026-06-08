include .env

PROGRAM := npm
RM := rm -rf
MK := mkdir
CP := cp
ZIP := zip
NODE := node

VERSION := $(shell $(NODE) -p "require('./package.json').version")
ZIP_FOLDER := _v$(VERSION)

ENV_DEV := NODE_ENV=development
ENV_PROD := NODE_ENV=production

all: serve

build: clean sync-version prod

install:
	$(PROGRAM) install

clean:
	$(RM) dist

serve:
	$(ENV_DEV) $(PROGRAM) run dev

prod:
	$(PROGRAM) run prod

sync-version:
	$(PROGRAM) run sync-version

zip:
	$(RM) $(ZIP_FOLDER)
	$(MK) $(ZIP_FOLDER)
	$(CP) dist/js-scroll-effect-module.js examples/index.html $(ZIP_FOLDER)/
	$(CP) examples/scroll-effect-module.css examples/scroll-effect-module.css $(ZIP_FOLDER)/
	sed -i "" "s/..\/dist\//.\//g" "$(ZIP_FOLDER)/index.html"
	$(ZIP) $(ZIP_FOLDER)/$(SLUG)_v$(VERSION).zip -r $(ZIP_FOLDER)/*

.PHONY: all build serve clean prod zip install sync-version
