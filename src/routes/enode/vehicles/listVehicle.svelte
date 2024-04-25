<script lang="ts">
    import type { Capability, VehicleData } from '$lib/enode/models';
    export let vehicle_data: VehicleData;
    export let capabilities: {name: string, value: Capability}[] = Object.entries(vehicle_data.capabilities).map(([name, value]) => ({name, value}));

    let openSections: {[key: string]: boolean} = {}; // Keep track of which sections are open

    export function toggleSection(section: string): void {
        openSections[section] = !openSections[section];
    }
  </script>

<div class="vehicle-info-container">
<div class="vehicle-info">
   <h2><b>VehicleInfo: </b></h2> 
    <p>Id: {vehicle_data.id}</p>
    <p>User Id: {vehicle_data.userId}</p>
    <p>Vendor: {vehicle_data.vendor}</p>
    <p>Is Reachable: {vehicle_data.isReachable}</p>
    <p>Last Seen: {vehicle_data.lastSeen}</p>
    <h3 on:click={() => toggleSection('general')}><b>General: </b></h3>
    <div class={openSections.general ? '' : 'hidden'}>
        <p>VIN: {vehicle_data.information.vin}</p>
        <p>Brand: {vehicle_data.information.brand}</p>
        <p>Model: {vehicle_data.information.model}</p>
        <p>Year: {vehicle_data.information.year}</p>
    </div>
    <h3 on:click={() => toggleSection('chargeState')}><b>ChargeState: </b></h3>
    <div class={openSections.chargeState ? '' : 'hidden'}>
        <p>Charge Time Remaining: {vehicle_data.chargeState.chargeTimeRemaining}</p>
        <p>Charge Rate: {vehicle_data.chargeState.chargeRate}</p>
        <p>Is Fully Charged: {vehicle_data.chargeState.isFullyCharged}</p>
        <p>Is Plugged In: {vehicle_data.chargeState.isPluggedIn}</p>
        <p>Is Charging: {vehicle_data.chargeState.isCharging}</p>
        <p>Battery Level: {vehicle_data.chargeState.batteryLevel}</p>
        <p>Range: {vehicle_data.chargeState.range}</p>
        <p>Battery Capacity: {vehicle_data.chargeState.batteryCapacity}</p>
        <p>Charge Limit: {vehicle_data.chargeState.chargeLimit}</p>
        <p>Last Updated (Charge State): {vehicle_data.chargeState.lastUpdated}</p>
        <p>Power Delivery State: {vehicle_data.chargeState.powerDeliveryState}</p>
        <p>Max Current: {vehicle_data.chargeState.maxCurrent}</p>
        <p>Location Id: {vehicle_data.locationId}</p>
    </div>
    <h3 on:click={() => toggleSection('smartCharging')}><b>SmartCharging: </b></h3>
    <div class={openSections.smartCharging ? '' : 'hidden'}>
        <p>Deadline (Smart Charging Policy): {vehicle_data.smartChargingPolicy.deadline}</p>
        <p>Is Enabled (Smart Charging Policy): {vehicle_data.smartChargingPolicy.isEnabled}</p>
        <p>Minimum Charge Limit: {vehicle_data.smartChargingPolicy.minimumChargeLimit}</p>
    </div>
    <h3 on:click={() => toggleSection('location')}><b>Location: </b></h3>
    <div class={openSections.location ? '' : 'hidden'}>
        <p>Longitude: {vehicle_data.location.longitude}</p>
        <p>Latitude: {vehicle_data.location.latitude}</p>
        <p>Last Updated (Location): {vehicle_data.location.lastUpdated}</p>
    </div>
    <h3 on:click={() => toggleSection('odometer')}><b>Odometer: </b></h3>
    <div class={openSections.odometer ? '' : 'hidden'}>
        <p>Distance: {vehicle_data.odometer.distance}</p>
        <p>Last Updated (Odometer): {vehicle_data.odometer.lastUpdated}</p>
    </div>
    <h3><b>Scopes:</b></h3><p> {vehicle_data.scopes ? vehicle_data.scopes.join(', ') : 'No scopes available.'}</p>
    <h3 on:click={() => toggleSection('capabilities')}><b>Capabilities: </b></h3>
    <div class={openSections.capabilities ? '' : 'hidden'}>
        <ul>
            {#each capabilities as {name, value}}
            <li>
                <strong>{name}</strong>
                <ul>
                    <li>Is Capable: {value.isCapable ? 'Yes' : 'No'}</li>
                    <li>Intervention IDs: {value.interventionIds ? value.interventionIds.join(', ') : 'No intervention Ids available.'}</li>
                </ul>
            </li>
            {/each}
        </ul>
    </div>
    <p>Location Id: {vehicle_data.locationId}</p>
</div>
</div>


<style>
    .vehicle-info-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  
    .vehicle-info {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
      margin-bottom: 1rem;
      font-size: 0.8em; /* Smaller font size for compact representation */
    }
  
    .vehicle-info h2,
    .vehicle-info h3 {
      color: #333;
      cursor: pointer; /* Change cursor to pointer when hovering over headers */
    }
  
    .vehicle-info p {
      color: #666;
      margin: 0;
      line-height: 30px;
    }
  
    .hidden {
      display: none; /* Hide sections when they are closed */
    }
  </style>

  
 

 