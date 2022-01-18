
developp:
	sass style/:css/ -w

release:
	rm -r css
	sass style/:css/  --no-source-map
	rm -r css/imports css/vendor