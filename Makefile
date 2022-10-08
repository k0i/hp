SHELL=/bin/bash

test:
	TEST_LOG=true cargo test
run:
	cargo watch -x run
deps:
	cargo +nightly udeps

