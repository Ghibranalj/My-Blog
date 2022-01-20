

sass:
	sass style/:css/ -w
serve:
	live-server .

release:
	rm -r css
	sass style/:css/  --no-source-map
	rm -r css/imports css/imports