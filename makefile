
# HTML
PUBLIC_HTML_DIR=public_html
HTML_INDEX=$(PUBLIC_HTML_DIR)/index.html

#php source
PHP_SOURCE != find ./inc -type f -name '*.php'


all: $(HTML_INDEX)

setup:
	npm install
	cp inc/environment_example.php inc/environment.php

reset:
	rm $(HTML_INDEX)

$(HTML_INDEX): $(PHP_SOURCE)
	php inc/pages/index.php > $(HTML_INDEX)