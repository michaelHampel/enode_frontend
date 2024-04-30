
export interface ListUserModel {
    id: string;
    createdAt: string;
    scopes: string[] | null;
  }

export interface EnodeUser {
    id: string;
    linkedVendors: LinkedVendors[];
  }

export interface LinkedVendors {
    vendor: string;
    isValid: boolean;
  }
  
export interface Pagination {
    after: string | null;
    before?: string | null;
  }
  
export interface ListUsersResponse {
    data: ListUserModel[];
    pagination: Pagination;
  }

export interface LinkUserResponse {
  linkUrl: string;
  linkToken: string;

} 

export let emptyListUsersResponse: ListUsersResponse = {
    data: [],
    pagination: {
        after: null,
        before: null
    }
};

export interface GeneralVehicleInfo {
  vin: string;
  brand: string;
  model: string;
  year: number;
}

export interface ChargeState {
  chargeTimeRemaining: null | number;
  chargeRate: null | number;
  isFullyCharged: boolean;
  isPluggedIn: boolean;
  isCharging: boolean;
  batteryLevel: number;
  range: number;
  batteryCapacity: number;
  chargeLimit: number;
  lastUpdated: string;
  powerDeliveryState: string;
  maxCurrent: number;
}

export interface SmartChargingPolicy {
  deadline: null | string;
  isEnabled: boolean;
  minimumChargeLimit: number;
}

export interface Location {
  lastUpdated: null | string;
  longitude: null | number;
  latitude: null | number;
}

export interface Odometer {
  distance: number;
  lastUpdated: string;
}

export interface Capability {
  isCapable: boolean;
  interventionIds: string[];
}

export interface Capabilities {
  information: Capability;
  chargeState: Capability;
  location: Capability;
  odometer: Capability;
  setMaxCurrent: Capability;
  startCharging: Capability;
  stopCharging: Capability;
  smartCharging: Capability;
}

export interface VehicleData {
  id: string;
  userId: string;
  vendor: string;
  isReachable: boolean;
  lastSeen: string;
  locationId: null | string;
  information: GeneralVehicleInfo;
  chargeState: ChargeState;
  smartChargingPolicy: SmartChargingPolicy;
  location: Location;
  odometer: Odometer;
  capabilities: Capabilities;
  scopes: string[];
}

export interface ListVehiclesResponse {
  data: VehicleData[];
  pagination: Pagination;
}

export interface Action {
  action: string;
}

export interface EnodeActionResponse {
  id: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  completedAt: null | string,
  state: string,
  targetId: string,
  targetType: string,
  kind: string,
  failureReason: null | FailureReason
}

export interface FailureReason {
  type: string,
  datail: string
}

export const emptyActionResponse: EnodeActionResponse = {
  id: '',
  userId: '',
  createdAt: '',
  updatedAt: '',
  completedAt: null,
  state: '',
  targetId: '',
  targetType: '',
  kind: '',
  failureReason: null
};

export interface EnodeErrorResponse {
  type: string,
  detail: string,
  error: string,
  message: string
}
