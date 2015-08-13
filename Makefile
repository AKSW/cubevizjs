default:
	@echo "CubeViz - CLI"
	@echo "make install-test-environment - Setup development environment"

install-dev-environment:
	git clone git@github.com:borisyankov/DefinitelyTyped.git typescript/declaration/DefinitelyTyped
