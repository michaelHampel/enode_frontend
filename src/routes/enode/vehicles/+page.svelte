<script lang="ts">
    import { getVehicle, listUserVehicles, listVehicles, type ApiError, type Result } from "$lib/enode/api";
    import type { EnodeErrorResponse, ListVehiclesResponse, VehicleData } from "$lib/enode/models";
    import { onMount } from 'svelte';
    import ListVehicle from './listVehicle.svelte';
    import { writable } from 'svelte/store';
    import { isLeft, isRight, left, right } from "fp-ts/lib/Either";
    import ErrorResponse from "$lib/enode/errorResponse.svelte";

    let vehiclesResponse: Result<ListVehiclesResponse> = right({ data: [], pagination: { after: '', before: '' }});
    let vehicleResponse: Result<VehicleData> = left<EnodeErrorResponse>({ type: '', detail: '', error: '', message: ''});
    let userVehiclesResponse: Result<ListVehiclesResponse> = right({ data: [], pagination: { after: '', before: '' }});
    let get_vehicleId = '';
    let userId = '';
    let vehicle_show = false;
    let user_vehicles_show = false;

    onMount(async () => {
        await refreshVehicles();
    });

    async function refreshVehicles() {
        vehiclesResponse = await listVehicles();
    }

    async function findVehicle() {
        vehicleResponse = await getVehicle(get_vehicleId);
        vehicle_show = true;
    }

    async function findUserVehicles() {
        userVehiclesResponse = await listUserVehicles(userId);
        user_vehicles_show = true;
    }

</script>

<main>
    <h1>Registered Vehicles:</h1> <button on:click={refreshVehicles}>Refresh</button>
    {#if isRight(vehiclesResponse) }
        <ul class="grid-view">
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
            <ErrorResponse err_response = {vehiclesResponse.left}></ErrorResponse>
    {/if}

    
    <!-- render for pagination 
    <div>
        <p>After: {listUsersResponse.pagination.after || 'No data available'}</p>
        <p>Before: {listUsersResponse.pagination.before || 'No data available'}</p>
    </div> -->

    <pre>______________________________________________________________________________________________________________________________________</pre>

    <h1>Get Vehicle</h1>
    <input type="text" bind:value={get_vehicleId} placeholder="Vehicle ID" />
    <button on:click={findVehicle}>Get Vehicle</button>
    {#if isRight(vehicleResponse)  && vehicle_show }
        <div>
            <p class="grid-view"><ListVehicle vehicle_data={vehicleResponse.right}/></p>
        </div>
    {:else if isLeft(vehicleResponse) && vehicle_show}
        <ErrorResponse err_response = {vehicleResponse.left}></ErrorResponse>
    {/if}

    <pre>______________________________________________________________________________________________________________________________________</pre>
    
    <h1>Get User Vehicles</h1>
    <input type="text" bind:value={userId} placeholder="User ID" />
    <button on:click={findUserVehicles}>Get User Vehicles</button>
    {#if isRight(userVehiclesResponse) && user_vehicles_show }
        <ul class="grid-view">
            {#each userVehiclesResponse.right.data as data }
            <li>
                <ListVehicle vehicle_data={data}/>
            </li>
            {:else}
                <li>No vehicles registered for User: {userId}</li>
            {/each}
        </ul>
    {:else if isLeft(userVehiclesResponse) && user_vehicles_show}
        <ErrorResponse err_response = {userVehiclesResponse.left}></ErrorResponse>
    {/if}
</main>

<style>
    .grid-view {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 15px;
        list-style: none;
        padding: 0;
    }
    
</style>
