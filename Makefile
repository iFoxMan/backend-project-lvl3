install: install-deps

run:
	mkdir ./temp
	bin/cli.js --output ./temp https://www.google.com/
	less ./temp/www-google-com.html
	rm -r ./temp

install-deps:
	npm ci

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
