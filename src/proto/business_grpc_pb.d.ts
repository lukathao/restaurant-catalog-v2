// package: business
// file: business.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as business_pb from "./business_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IBusinessServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBusiness: IBusinessServiceService_IgetBusiness;
    getBusinesses: IBusinessServiceService_IgetBusinesses;
    saveBusiness: IBusinessServiceService_ISaveBusiness;
    updateBusiness: IBusinessServiceService_IUpdateBusiness;
    deactivateBusiness: IBusinessServiceService_IDeactivateBusiness;
}

interface IBusinessServiceService_IgetBusiness extends grpc.MethodDefinition<business_pb.BusinessId, business_pb.BusinessFull> {
    path: "/business.BusinessService/getBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.BusinessId>;
    requestDeserialize: grpc.deserialize<business_pb.BusinessId>;
    responseSerialize: grpc.serialize<business_pb.BusinessFull>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessFull>;
}
interface IBusinessServiceService_IgetBusinesses extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, business_pb.Business> {
    path: "/business.BusinessService/getBusinesses";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<business_pb.Business>;
    responseDeserialize: grpc.deserialize<business_pb.Business>;
}
interface IBusinessServiceService_ISaveBusiness extends grpc.MethodDefinition<business_pb.Business, business_pb.BusinessId> {
    path: "/business.BusinessService/SaveBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.Business>;
    requestDeserialize: grpc.deserialize<business_pb.Business>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}
interface IBusinessServiceService_IUpdateBusiness extends grpc.MethodDefinition<business_pb.BusinessFull, business_pb.BusinessId> {
    path: "/business.BusinessService/UpdateBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.BusinessFull>;
    requestDeserialize: grpc.deserialize<business_pb.BusinessFull>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}
interface IBusinessServiceService_IDeactivateBusiness extends grpc.MethodDefinition<business_pb.BusinessId, business_pb.BusinessId> {
    path: "/business.BusinessService/DeactivateBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.BusinessId>;
    requestDeserialize: grpc.deserialize<business_pb.BusinessId>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}

export const BusinessServiceService: IBusinessServiceService;

export interface IBusinessServiceServer {
    getBusiness: grpc.handleUnaryCall<business_pb.BusinessId, business_pb.BusinessFull>;
    getBusinesses: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, business_pb.Business>;
    saveBusiness: grpc.handleUnaryCall<business_pb.Business, business_pb.BusinessId>;
    updateBusiness: grpc.handleUnaryCall<business_pb.BusinessFull, business_pb.BusinessId>;
    deactivateBusiness: grpc.handleUnaryCall<business_pb.BusinessId, business_pb.BusinessId>;
}

export interface IBusinessServiceClient {
    getBusiness(request: business_pb.BusinessId, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    getBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    getBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    getBusinesses(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<business_pb.Business>;
    getBusinesses(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<business_pb.Business>;
    saveBusiness(request: business_pb.Business, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    saveBusiness(request: business_pb.Business, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    saveBusiness(request: business_pb.Business, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    updateBusiness(request: business_pb.BusinessFull, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    updateBusiness(request: business_pb.BusinessFull, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    updateBusiness(request: business_pb.BusinessFull, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    deactivateBusiness(request: business_pb.BusinessId, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    deactivateBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    deactivateBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
}

export class BusinessServiceClient extends grpc.Client implements IBusinessServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getBusiness(request: business_pb.BusinessId, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    public getBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    public getBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessFull) => void): grpc.ClientUnaryCall;
    public getBusinesses(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<business_pb.Business>;
    public getBusinesses(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<business_pb.Business>;
    public saveBusiness(request: business_pb.Business, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public saveBusiness(request: business_pb.Business, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public saveBusiness(request: business_pb.Business, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public updateBusiness(request: business_pb.BusinessFull, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public updateBusiness(request: business_pb.BusinessFull, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public updateBusiness(request: business_pb.BusinessFull, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public deactivateBusiness(request: business_pb.BusinessId, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public deactivateBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
    public deactivateBusiness(request: business_pb.BusinessId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: business_pb.BusinessId) => void): grpc.ClientUnaryCall;
}
