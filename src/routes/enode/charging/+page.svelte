<script lang="ts">
    import { setChargeAction, type Result, listVehicles } from "$lib/enode/api";
    import { emptyActionResponse, type EnodeActionResponse, type ListVehiclesResponse } from "$lib/enode/models";
    import { isRight, right } from "fp-ts/lib/Either";
    import { onMount } from "svelte";
    import ActionResponse from "./actionResponse.svelte";

    const validChargeCommands = ['START', 'STOP'];

    let vehicleIdsResponse: Result<string[]> = right([]);
    let vehiclesResponse: Result<ListVehiclesResponse> = right({ data: [], pagination: { after: '', before: '' }});
    let chargeActionResponse: Result<any> = right(emptyActionResponse);
    let vehicle_id = '';
    let charge_command = '';

    onMount(async () => {
        await refreshVehicles();
    });

    async function refreshVehicles() {
        vehiclesResponse = await listVehicles();
    }

    async function sendChargeAction() {
        chargeActionResponse = await setChargeAction(vehicle_id, charge_command);
    }

</script>

<main>
    <h1>Registered VehicleInfo:</h1> <button on:click={refreshVehicles}>Refresh</button>
    {#if isRight(vehiclesResponse) }
        <ul class="grid-view">
            {#each vehiclesResponse.right.data as data }
                <li class= "vehicle-info">
                    <p><b>VehicleID: </b>{data.id}</p>
                    <p><b>UserID: </b>{data.userId}</p>
                </li>
            {:else}
            <!-- this block renders when users.length === 0 -->
            <li>No vehicles available!!</li>
            {/each}
        </ul>
    {:else}
        <p>{vehiclesResponse.left.message}</p>
    {/if}

    <h1>Send Charge Command: START or STOP</h1>
    <input type="text" bind:value={vehicle_id} placeholder="Vehicle ID" />
    <input type="text" bind:value={charge_command} placeholder="Charge Command" />
    <button class="create" on:click={sendChargeAction}>Send</button>
    {#if isRight(chargeActionResponse) }
        <ActionResponse action_response = {chargeActionResponse.right}></ActionResponse>
    {:else}
        <p>{chargeActionResponse.left.message}</p>
    {/if}
</main>

<style>
    p {
      margin: 0;
      line-height: 30px;
    }

    .grid-view {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 15px;
        list-style: none;
        padding: 0;
    }

    .vehicle-info {
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

  </style>

