import { BusinessServiceClient } from "@/proto/business_grpc_pb";

const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "@/proto/business.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const port = 9001;

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options).BusinessService;

export const client = new BusinessServiceClient(
  `localhost:${port}`,
  grpc.credentials.createInsecure()
);

export const noop = () => { };
