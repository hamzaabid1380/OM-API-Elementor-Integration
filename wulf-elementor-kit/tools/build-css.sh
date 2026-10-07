#!/bin/sh
# Rebuild assets/css/wulf-kit.css. Usage (from the plugin folder): sh tools/build-css.sh
#
# Weight ladder, low to high, so the right thing always wins:
#   theme + Elementor global kit (up to 0,2,1)
#   < theme shield in kit-reset.css ("html .wk ...", 0,1,2 / 0,2,2)
#   < section styles (".wk.wk ...", 0,3,0 and up)
#   < your Elementor style settings ("{{WRAPPER}} .wk ...", printed after this file).
set -e
cat tools/kit-reset.css > assets/css/wulf-kit.css
{
	python3 tools/scope-css.py tools/mockup-v8.css \
		| sed -e 's/#dr-count/.dr-count/g' -e 's/#studio-save/.studio-save/g' -e 's/#tray-thumbs/.tray-thumbs/g' -e 's/#ann-status/.ann-status/g' -e 's/^\.wk { padding-bottom: 76px; }/body.wk-has-actbar { padding-bottom: 76px; }/'
	cat tools/kit-extra.css
} | sed -e 's/\(^\|[	 ,{(]\)\.wk \([.:#[a-z]\)/\1.wk.wk \2/g' >> assets/css/wulf-kit.css
