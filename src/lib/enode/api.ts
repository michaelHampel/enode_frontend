import { error } from "@sveltejs/kit";
import { emptyListUsersResponse, type EnodeUser, type LinkUserResponse, type ListUsersResponse, type ListVehiclesResponse, type VehicleData } from "./models";
import { type Either, left, right, isLeft } from 'fp-ts/lib/Either';

const serverUrl: string = 'http://127.0.0.1:3000/enox/flow/enode/'; 

export type ApiError = {
  message: string;
}

export interface MyError {
  message: string;
}

export type Result<T> = Either<ApiError, T>;

export async function listUsers(): Promise<Result<ListUsersResponse>> {
  try {
    const uri ="users";
    const res = await fetch(serverUrl + uri);
    return right(await res.json());
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError getting users: '+ error});
  }
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
    return right(await res.json());
    //return JSON.stringify(data, null, 2);
  } catch(error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError linking user: '+ error});
  }
}

export async function findUser(userId: string): Promise<Result<EnodeUser>> {
  try {
    const uri ="users/" + userId;
    const res = await fetch(serverUrl + uri);
    return right(await res.json());
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError finding user: '+ error});
  }
}

export async function unlinkUser(userId: string): Promise<Result<string>> {
  try {
    const uri ="users/unlink/" + userId;
    const res = await fetch(serverUrl + uri);
    return right(userId);
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError unlinking user: '+ error});
  }
}

export async function listUserVehicles(userId: string): Promise<Result<ListVehiclesResponse>> {
  try {
    const uri ="users/" + userId + "/vehicles";
    const res = await fetch(serverUrl + uri);
    return right(await res.json());
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError getting user vehicles: '+ error});
  }
}

export async function listVehicles(): Promise<Result<ListVehiclesResponse>> {
  try {
    const uri ="vehicles";
    const res = await fetch(serverUrl + uri);
    return right(await res.json());
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError getting vehicles: '+ error});
  }
}

export async function getVehicle(vehicleId: string): Promise<Result<VehicleData>> {
  try {
    const uri = "vehicles/" + vehicleId;
    const res = await fetch(serverUrl + uri);
    return right(await res.json());
  } catch (error) {
    console.log(error);
    return left<ApiError>({ message: 'APIError getting vehicle: '+ error});
  }
}




