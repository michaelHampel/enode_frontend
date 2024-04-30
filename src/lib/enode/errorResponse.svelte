<script lang="ts">
    import type { EnodeErrorResponse } from '$lib/enode/models';
    export let err_response: EnodeErrorResponse;
  </script>

<div>
    <p><b>Error Type:    </b>{err_response.type}</p>
    <p><b>Error Detail:  </b>{err_response.detail}</p>
    <p><b>Error:         </b>{err_response.error}</p>
    <p><b>Error Message: </b>{err_response.message}</p>
</div>
  
  <style>
    p {
      margin: 0;
      line-height: 30px;
    }
  </style>