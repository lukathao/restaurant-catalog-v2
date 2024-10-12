// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var business_pb = require('./business_pb.js');

function serialize_Business(arg) {
  if (!(arg instanceof business_pb.Business)) {
    throw new Error('Expected argument of type Business');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Business(buffer_arg) {
  return business_pb.Business.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BusinessFull(arg) {
  if (!(arg instanceof business_pb.BusinessFull)) {
    throw new Error('Expected argument of type BusinessFull');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BusinessFull(buffer_arg) {
  return business_pb.BusinessFull.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BusinessId(arg) {
  if (!(arg instanceof business_pb.BusinessId)) {
    throw new Error('Expected argument of type BusinessId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BusinessId(buffer_arg) {
  return business_pb.BusinessId.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessServiceService = exports.BusinessServiceService = {
  saveBusiness: {
    path: '/BusinessService/SaveBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.Business,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_Business,
    requestDeserialize: deserialize_Business,
    responseSerialize: serialize_BusinessId,
    responseDeserialize: deserialize_BusinessId,
  },
  updateBusiness: {
    path: '/BusinessService/UpdateBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessFull,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_BusinessFull,
    requestDeserialize: deserialize_BusinessFull,
    responseSerialize: serialize_BusinessId,
    responseDeserialize: deserialize_BusinessId,
  },
  deactivateBusiness: {
    path: '/BusinessService/DeactivateBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessId,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_BusinessId,
    requestDeserialize: deserialize_BusinessId,
    responseSerialize: serialize_BusinessId,
    responseDeserialize: deserialize_BusinessId,
  },
};

exports.BusinessServiceClient = grpc.makeGenericClientConstructor(BusinessServiceService);
