#!/bin/bash

PROTO_DIR=./src/proto
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

#Generate JavaScript code
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${PROTO_DIR} \
  --grpc_out=grpc_js:${PROTO_DIR} \
  -I ./src/proto \
  ./src/proto/*.proto

#Generate Typescript code (d.ts)
grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
  --ts_out=${PROTO_DIR} \
  -I ./src/proto \
  ./src/proto/*.proto