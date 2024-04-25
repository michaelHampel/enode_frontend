<script lang="ts">
    import type { ListUserModel } from '$lib/enode/models';
    export let list_user: ListUserModel;
  </script>

<div>
    <p><b>UserId: {list_user.id}</b></p>
    <p>CreatedAt: {list_user.createdAt}</p>
    <p>Scopes: {list_user.scopes ? list_user.scopes.join(', ') : 'No scopes available'}</p>
  </div>
  
  <style>
    p {
      margin: 0;
      line-height: 30px;
    }
  </style>