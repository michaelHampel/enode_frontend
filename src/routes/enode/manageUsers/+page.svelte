<script lang="ts">
    import { emptyListUsersResponse, type ListUserModel, type LinkUserResponse, type ListUsersResponse, type EnodeUser } from '$lib/enode/models';
    import { onMount } from 'svelte';
    import { findUser, linkUser, listUsers, unlinkUser, type Result } from '$lib/enode/api';
    import ListUser from './listUser.svelte';
    import { writable } from 'svelte/store';
    import { isRight, right } from 'fp-ts/lib/Either';

    let listUsersResponse: Result<ListUsersResponse> = right(emptyListUsersResponse);
    let create_userId: string = '';
    let get_userId: string = '';
    let delete_userId: string = '';
    let vendor: string = '';
    let vendorType: string = '';
    let linkResponse: Result<LinkUserResponse> = right({ linkUrl: '', linkToken: ''});
    let enodeUserResponse: Result<EnodeUser> = right({id: '', linkedVendors: []});
    let deletedUserId: Result<string> = right('');

    onMount(async () => {
        await refreshUsers();
    });

    async function refreshUsers() {
        listUsersResponse = await listUsers();
    }

    async function createUser() {
      linkResponse = await linkUser(create_userId, vendor, vendorType);
    }

    async function getUser() {
      enodeUserResponse = await findUser(get_userId);
    }

    async function deleteUser() {
      deletedUserId = await unlinkUser(delete_userId);
    }

</script>

<main>
    <h1>Registered Users:</h1>
    {#if isRight(listUsersResponse) }
      <ul>
        {#each listUsersResponse.right.data as enode_user (enode_user.id)}
          <li>
            <ListUser list_user={enode_user}/>
          </li>
        {:else}
          <!-- this block renders when users.length === 0 -->
          <li>No users available</li>
        {/each}
      </ul>
      {:else}
      <p>{listUsersResponse.left.message}</p>
    {/if}
    <!--button on:click={() => fetchData("users")}>Get Users</button-->
    <button on:click={refreshUsers}>Refresh Users</button>
    <!-- render for pagination 
    <div>
        <p>After: {listUsersResponse.pagination.after || 'No data available'}</p>
        <p>Before: {listUsersResponse.pagination.before || 'No data available'}</p>
    </div> -->

    <pre>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</pre>
    <h1>Link User</h1>
    <input type="text" bind:value={create_userId} placeholder="User ID" />
    <input type="text" bind:value={vendor} placeholder="Vendor" />
    <input type="text" bind:value={vendorType} placeholder="Vendor Type" />
    <button class="create" on:click={createUser}>Create + Link User</button>
    {#if isRight(linkResponse)}
      <div>
        <p>Enode Link URL: {linkResponse.right.linkUrl}</p>
      </div>
      {:else}
      <p>{linkResponse.left.message}</p>
    {/if}

    <pre>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</pre>
    <h1>Get User</h1>
    <input type="text" bind:value={get_userId} placeholder="User ID" />
    <button class="create" on:click={getUser}>Get Enode User</button>
    {#if isRight(enodeUserResponse)}
      {#if enodeUserResponse.right.id != ''}
        <div>
          <p>User ID: {enodeUserResponse.right.id}</p>
          {#each enodeUserResponse.right.linkedVendors as linkedVendor (linkedVendor.vendor)}
            <div>
              <p>Vendor: {linkedVendor.vendor}</p>
              <p>Is Valid: {linkedVendor.isValid ? 'Yes' : 'No'}</p>
            </div>
            {:else}
              <!-- this block renders when vendors.length === 0 -->
              <p>No linked Vendors found!!</p>
          {/each}
        </div>
        {:else}
        <p>No user found with ID: {get_userId}</p>
      {/if}
      {:else}
      <p>{enodeUserResponse.left.message}</p>
      {/if}

    <pre>++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</pre>
    <h1>Delete User</h1>
    <input type="text" bind:value={delete_userId} placeholder="User ID" />
    <button class="create" on:click={deleteUser}>Delete Enode User</button>
    {#if isRight(deletedUserId) }
      <div>
        <h3>Successfully deleted Enode User: {deletedUserId.right}</h3>
      </div>
      {:else}
      <p>{deletedUserId.left.message}</p>
    {/if}
</main>
