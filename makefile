
# HTML
PUBLIC_HTML_DIR=public_html
HTML_INDEX=$(PUBLIC_HTML_DIR)/index.html

#php source
PHP_SOURCE != find ./inc -type f -name '*.php'


all: $(HTML_INDEX)

reset:
	rm $(HTML_INDEX)

release: $(HTML_INDEX)
	npm run deploy

$(HTML_INDEX): $(PHP_SOURCE)
	php inc/pages/index.php > $(HTML_INDEX)