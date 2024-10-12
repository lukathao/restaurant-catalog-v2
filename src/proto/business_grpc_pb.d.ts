// package: 
// file: business.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as business_pb from "./business_pb";

interface IBusinessServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    saveBusiness: IBusinessServiceService_ISaveBusiness;
    updateBusiness: IBusinessServiceService_IUpdateBusiness;
    deactivateBusiness: IBusinessServiceService_IDeactivateBusiness;
}

interface IBusinessServiceService_ISaveBusiness extends grpc.MethodDefinition<business_pb.Business, business_pb.BusinessId> {
    path: "/BusinessService/SaveBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.Business>;
    requestDeserialize: grpc.deserialize<business_pb.Business>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}
interface IBusinessServiceService_IUpdateBusiness extends grpc.MethodDefinition<business_pb.BusinessFull, business_pb.BusinessId> {
    path: "/BusinessService/UpdateBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.BusinessFull>;
    requestDeserialize: grpc.deserialize<business_pb.BusinessFull>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}
interface IBusinessServiceService_IDeactivateBusiness extends grpc.MethodDefinition<business_pb.BusinessId, business_pb.BusinessId> {
    path: "/BusinessService/DeactivateBusiness";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<business_pb.BusinessId>;
    requestDeserialize: grpc.deserialize<business_pb.BusinessId>;
    responseSerialize: grpc.serialize<business_pb.BusinessId>;
    responseDeserialize: grpc.deserialize<business_pb.BusinessId>;
}

export const BusinessServiceService: IBusinessServiceService;

export interface IBusinessServiceServer {
    saveBusiness: grpc.handleUnaryCall<business_pb.Business, business_pb.BusinessId>;
    updateBusiness: grpc.handleUnaryCall<business_pb.BusinessFull, business_pb.BusinessId>;
    deactivateBusiness: grpc.handleUnaryCall<business_pb.BusinessId, business_pb.BusinessId>;
}

export interface IBusinessServiceClient {
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
