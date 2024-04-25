<script lang="ts">
    import { getVehicle, listUserVehicles, listVehicles, type ApiError, type Result } from "$lib/enode/api";
    import type { ListVehiclesResponse, VehicleData } from "$lib/enode/models";
    import { onMount } from 'svelte';
    import ListVehicle from './listVehicle.svelte';
    import { writable } from 'svelte/store';
    import { isRight, left, right } from "fp-ts/lib/Either";

    let vehiclesResponse: Result<ListVehiclesResponse> = right({ data: [], pagination: { after: '', before: '' }});
    let vehicleResponse: Result<VehicleData> = left<ApiError>({ message: 'Error getting vehicle'});;
    let userVehiclesResponse: Result<ListVehiclesResponse> = right({ data: [], pagination: { after: '', before: '' }});
    let get_vehicleId = '';
    let userId = '';

    onMount(async () => {
        await refreshVehicles();
    });

    async function refreshVehicles() {
        vehiclesResponse = await listVehicles();
    }

    async function findVehicle() {
        vehicleResponse = await getVehicle(get_vehicleId);
    }

    async function findUserVehicles() {
        userVehiclesResponse = await listUserVehicles(userId);
    }

</script>

<main>
    <h1>Registered Vehicles:</h1>
    {#if isRight(vehiclesResponse) }
        <ul>
            {#each vehiclesResponse.right.data as data }
                <li>
                    <ListVehicle vehicle_data={data}/>
                </li>
            {:else}
            <!-- this block renders when users.length === 0 -->
            <li>No vehicles available!!</li>
            {/each}
        </ul>
        {:else}
            <p>{vehiclesResponse.left.message}</p>
    {/if}

    <button on:click={refreshVehicles}>Refresh Vehicles</button>
    <!-- render for pagination 
    <div>
        <p>After: {listUsersResponse.pagination.after || 'No data available'}</p>
        <p>Before: {listUsersResponse.pagination.before || 'No data available'}</p>
    </div> -->

    <pre>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</pre>
    <h1>Get Vehicle</h1>
    <input type="text" bind:value={get_vehicleId} placeholder="Vehicle ID" />
    <button on:click={findVehicle}>Get Vehicle</button>
    {#if isRight(vehicleResponse) }
        <div>
            <p><ListVehicle vehicle_data={vehicleResponse.right}/></p>
        </div>
    {:else}
        <p>No vehicle found for ID: {get_vehicleId} {vehicleResponse.left.message}</p>
    {/if}

    <pre>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</pre>
    <h1>Get User Vehicles</h1>
    <input type="text" bind:value={userId} placeholder="User ID" />
    <button on:click={findUserVehicles}>Get User Vehicles</button>
    {#if isRight(userVehiclesResponse) }
        <ul>
            {#each userVehiclesResponse.right.data as data }
            <li>
                <ListVehicle vehicle_data={data}/>
            </li>
            {:else}
                <li>No vehicles registered for User: {userId}</li>
            {/each}
        </ul>
        {:else}
        <p>{userVehiclesResponse.left.message}</p>
    {/if}
</main>
