
import { emptyListUsersResponse, type EnodeActionResponse, type EnodeErrorResponse, type EnodeUser, type LinkUserResponse, type ListUsersResponse, type ListVehiclesResponse, type VehicleData } from "./models";
import { type Either, left, right, isLeft, isRight } from 'fp-ts/lib/Either';

const serverUrl: string = 'http://127.0.0.1:3000/enox/flow/enode/'; 

export type ApiError = {
  message: string;
}

export type Result<T> = Either<EnodeErrorResponse, T>;

export async function listUsers(): Promise<Result<ListUsersResponse>> {
  const uri ="users";
  return sendGet(uri, "getting users: ")
}

export async function linkUser(userId: string, vendor: string, vendorType: string): Promise<Result<LinkUserResponse>> {
  const uri ="users/link";
  try {
    const res = await fetch( 
      serverUrl + uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, vendor, vendorType })
    });
    if (res.ok) {
      return right(await res.json());
    } else {
      return left<EnodeErrorResponse>(await res.json());
    } 
  } catch (error) {
    return left<EnodeErrorResponse>(handleError(error, "Error Linking User: "));
  }
}

export async function findUser(userId: string): Promise<Result<EnodeUser>> {
  const uri ="users/" + userId;
  return sendGet(uri, "finding user: ")
}

export async function unlinkUser(userId: string): Promise<Result<string>> {
  const uri ="users/unlink/" + userId;
  return sendGet(uri, "unlinking user: ")
}

export async function listUserVehicles(userId: string): Promise<Result<ListVehiclesResponse>> {
  const uri ="users/" + userId + "/vehicles";
  return sendGet(uri, "getting user vehicles: ");
}

export async function listVehicles(): Promise<Result<ListVehiclesResponse>> {
  const uri ="vehicles";
  return sendGet(uri, 'getting vehicles: ');
}

export async function getVehicleIds(): Promise<Result<string[]>> {
  const uri ="vehicles";
  const ids: string[] = [];
  let res: Result<ListVehiclesResponse> = await sendGet(uri, 'getting vehicles: ');
  if(isRight(res)) {
    res.right.data.forEach(data => ids.push(data.id))
    return right(ids)
  }
  return res
}


export async function getVehicle(vehicleId: string): Promise<Result<VehicleData>> {
  const uri = "vehicles/" + vehicleId;
  return sendGet(uri, 'getting vehicle: ');
}

export async function setChargeAction(vehicleId: string, action: string): Promise<Result<EnodeActionResponse>> {
  const uri = "vehicles/" + vehicleId + "/charging";
  try {
    const res = await fetch( 
      serverUrl + uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
    });
    if (res.ok) {
      return right(await res.json());
    } else {
      return left<EnodeErrorResponse>(await res.json());
    } 
  } catch (error) {
    return left<EnodeErrorResponse>(handleError(error, "Error sending ChargeAction: "));
  }
}

export async function getVehicleAction(actionId: string): Promise<Result<EnodeActionResponse>> {
  const uri = "vehicles/action/" + actionId;
  return sendGet(uri, 'getting vehicle action: ');
}

async function sendGet(uri: string, error_msg: string): Promise<Result<any>> {
  try {
    const res = await fetch(serverUrl + uri);
    if (res.ok) {
      return right(await res.json());
    } else {
      return left<EnodeErrorResponse>(await res.json());
    } 
  } catch (error) {
    return left<EnodeErrorResponse>(handleError(error, error_msg));
  }
}

function handleError(error: any, error_msg: String): EnodeErrorResponse {
  console.log(error_msg + error);
  return { type: "EnodeError", detail: error_msg + error, error: "EnodeError", message: error_msg + error};
}