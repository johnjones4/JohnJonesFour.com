.PHONY:

content: .PHONY
	rm -rf site/public/data || true
	cd content && node index.js
	mv content/outdata site/public/data
