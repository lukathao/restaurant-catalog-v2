// package: 
// file: business.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Business extends jspb.Message { 
    getBusinessName(): string;
    setBusinessName(value: string): Business;
    getBusinessOwner(): string;
    setBusinessOwner(value: string): Business;
    getEmail(): string;
    setEmail(value: string): Business;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Business.AsObject;
    static toObject(includeInstance: boolean, msg: Business): Business.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Business, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Business;
    static deserializeBinaryFromReader(message: Business, reader: jspb.BinaryReader): Business;
}

export namespace Business {
    export type AsObject = {
        businessName: string,
        businessOwner: string,
        email: string,
    }
}

export class BusinessFull extends jspb.Message { 
    getBusinessId(): number;
    setBusinessId(value: number): BusinessFull;
    getBusinessName(): string;
    setBusinessName(value: string): BusinessFull;
    getBusinessOwner(): string;
    setBusinessOwner(value: string): BusinessFull;
    getEmail(): string;
    setEmail(value: string): BusinessFull;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BusinessFull.AsObject;
    static toObject(includeInstance: boolean, msg: BusinessFull): BusinessFull.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BusinessFull, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BusinessFull;
    static deserializeBinaryFromReader(message: BusinessFull, reader: jspb.BinaryReader): BusinessFull;
}

export namespace BusinessFull {
    export type AsObject = {
        businessId: number,
        businessName: string,
        businessOwner: string,
        email: string,
    }
}

export class BusinessId extends jspb.Message { 
    getBusinessId(): number;
    setBusinessId(value: number): BusinessId;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BusinessId.AsObject;
    static toObject(includeInstance: boolean, msg: BusinessId): BusinessId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BusinessId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BusinessId;
    static deserializeBinaryFromReader(message: BusinessId, reader: jspb.BinaryReader): BusinessId;
}

export namespace BusinessId {
    export type AsObject = {
        businessId: number,
    }
}
