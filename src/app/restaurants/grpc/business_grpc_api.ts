import { client } from "@/app/utilities/utils";
import { Business, BusinessFull, BusinessId } from "@/proto/business_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export function getBusiness(business_id: number) {
  return new Promise<BusinessFull>((resolve, reject) => {
    const request = new BusinessId()
      .setBusinessId(business_id);

    client.getBusiness(request, (err, business) => {
      if (err) reject(err);
      else resolve(business);
    });
  });
}

export function getAllBusinesses() {
  return new Promise<Business[]>((resolve, reject) => {
    const stream = client.getBusinesses(new Empty());
    const businesses: Business[] = [];
    stream.on("data", (business: Business) => businesses.push(business));
    stream.on("error", reject);
    stream.on("end", () => resolve(businesses));
  });
}

export function createBusiness(business: Business) {
  return new Promise<BusinessId>((resolve, reject) => {
    const request = new Business()
      .setBusinessId(-1)
      .setBusinessName(business.getBusinessName())
      .setBusinessOwner(business.getBusinessOwner())
      .setEmail(business.getEmail());

    client.saveBusiness(request, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
}

export function updateBusiness(business: BusinessFull) {
  return new Promise<BusinessId>((resolve, reject) => {
    // TODO add the other parameters here and in protobuf and generate new code
    const request = new BusinessFull()
      .setBusinessId(business.getBusinessId())
      .setBusinessOwner(business.getBusinessOwner())
      .setBusinessName(business.getBusinessName())
      .setEmail(business.getEmail());

    client.updateBusiness(request, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
}

export function deactivateBusiness(id: number) {
  return new Promise<BusinessId>((resolve, reject) => {
    const request = new BusinessId()
      .setBusinessId(id);

    client.deactivateBusiness(request, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
}
