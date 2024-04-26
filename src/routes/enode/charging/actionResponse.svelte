<script lang="ts">
    import type { EnodeActionResponse } from "$lib/enode/models";

    export let action_response: EnodeActionResponse;

    function getInterfaceMembers<T>(obj: T): {[key: string]: any} {
        const indexableObj = obj as {[key: string]: any};
        let result: {[key: string]: any} = {};
        for (const key of Object.keys(indexableObj)) {
            const value = indexableObj[key];
            if (typeof value === 'object' && value !== null) {
                result[key] = getInterfaceMembers(value);
            } else {
                result[key] = value;
            }
        }
        return result;
}
  </script>

<div>
    <h2><b>Action Response: </b></h2>
</div>
<pre>
    {JSON.stringify(getInterfaceMembers(action_response), null, 2)}
</pre>
  
  <style>
    p {
      margin: 0;
      line-height: 30px;
    }
  </style>