include .env

PROGRAM := npm
RM := rm -rf
MK := mkdir
CP := cp
ZIP := zip

ZIP_FOLDER := _v$(VERSION)

ENV_DEV := NODE_ENV=development
ENV_PROD := NODE_ENV=production

all: serve

build: clean transform prod

install:
	$(PROGRAM) install

clean:
	$(RM) dist

serve:
	$(ENV_DEV) $(PROGRAM) run dev

prod:
	$(ENV_PROD) $(PROGRAM) run prod

transform:
	sed -i "" -r "s/version\":[ ]?\"[.0-9]*/version\"\: \"${VERSION}/g" "package.json"
	sed -i "" -r "s/@[0-9]*\.[0-9]*\.[0-9]*\//@${VERSION}\//g" "README.md"

zip:
	$(RM) $(ZIP_FOLDER)
	$(MK) $(ZIP_FOLDER)
	$(CP) dist/js-scroll-effect-module.js examples/index.html $(ZIP_FOLDER)/
	$(CP) examples/scroll-effect-module.css examples/scroll-effect-module.css $(ZIP_FOLDER)/
	sed -i "" "s/..\/dist\//.\//g" "$(ZIP_FOLDER)/index.html"
	$(ZIP) $(ZIP_FOLDER)/$(SLUG)_v$(VERSION).zip -r $(ZIP_FOLDER)/*

.PHONY: all build serve clean prod zip install
