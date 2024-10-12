// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var business_pb = require('./business_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_business_Business(arg) {
  if (!(arg instanceof business_pb.Business)) {
    throw new Error('Expected argument of type business.Business');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_business_Business(buffer_arg) {
  return business_pb.Business.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_business_BusinessFull(arg) {
  if (!(arg instanceof business_pb.BusinessFull)) {
    throw new Error('Expected argument of type business.BusinessFull');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_business_BusinessFull(buffer_arg) {
  return business_pb.BusinessFull.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_business_BusinessId(arg) {
  if (!(arg instanceof business_pb.BusinessId)) {
    throw new Error('Expected argument of type business.BusinessId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_business_BusinessId(buffer_arg) {
  return business_pb.BusinessId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessServiceService = exports.BusinessServiceService = {
  getBusiness: {
    path: '/business.BusinessService/getBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessId,
    responseType: business_pb.BusinessFull,
    requestSerialize: serialize_business_BusinessId,
    requestDeserialize: deserialize_business_BusinessId,
    responseSerialize: serialize_business_BusinessFull,
    responseDeserialize: deserialize_business_BusinessFull,
  },
  getBusinesses: {
    path: '/business.BusinessService/getBusinesses',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: business_pb.Business,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_business_Business,
    responseDeserialize: deserialize_business_Business,
  },
  saveBusiness: {
    path: '/business.BusinessService/SaveBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.Business,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_business_Business,
    requestDeserialize: deserialize_business_Business,
    responseSerialize: serialize_business_BusinessId,
    responseDeserialize: deserialize_business_BusinessId,
  },
  updateBusiness: {
    path: '/business.BusinessService/UpdateBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessFull,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_business_BusinessFull,
    requestDeserialize: deserialize_business_BusinessFull,
    responseSerialize: serialize_business_BusinessId,
    responseDeserialize: deserialize_business_BusinessId,
  },
  deactivateBusiness: {
    path: '/business.BusinessService/DeactivateBusiness',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessId,
    responseType: business_pb.BusinessId,
    requestSerialize: serialize_business_BusinessId,
    requestDeserialize: deserialize_business_BusinessId,
    responseSerialize: serialize_business_BusinessId,
    responseDeserialize: deserialize_business_BusinessId,
  },
};

exports.BusinessServiceClient = grpc.makeGenericClientConstructor(BusinessServiceService);
