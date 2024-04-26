<script lang="ts">
    import { getVehicleIds, setChargeAction, type Result } from "$lib/enode/api";
    import { emptyActionResponse, type EnodeActionResponse } from "$lib/enode/models";
    import { isRight, right } from "fp-ts/lib/Either";
    import { onMount } from "svelte";
    import ActionResponse from "./actionResponse.svelte";

    const validChargeCommands = ['START', 'STOP'];

    let vehicleIdsResponse: Result<string[]> = right([]);
    let chargeActionResponse: Result<EnodeActionResponse> = right(emptyActionResponse);
    let vehicle_id = '';
    let charge_command = '';

    onMount(async () => {
        await refreshVehicleIds();
    });

    async function refreshVehicleIds() {
        vehicleIdsResponse = await getVehicleIds();
    }

    async function sendChargeAction() {
        chargeActionResponse = await setChargeAction(vehicle_id, charge_command);
    }

</script>

<main>
    <h1>Registered VehicleIDs:</h1> <button on:click={refreshVehicleIds}>Refresh</button>
    {#if isRight(vehicleIdsResponse) }
        <ul>
            {#each vehicleIdsResponse.right as id }
                <li>
                    <p>VehicleID: {id}</p>
                </li>
            {:else}
            <!-- this block renders when users.length === 0 -->
            <li>No vehicles available!!</li>
            {/each}
        </ul>
    {:else}
        <p>{vehicleIdsResponse.left.message}</p>
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
  </style>

