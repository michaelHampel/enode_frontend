<script lang="ts">
    import type { EnodeActionResponse } from "$lib/enode/models";

    export let action_response: any;
    //export let keyValuePairs = Object.entries(getInterfaceMembers(action_response));

    export function getInterfaceMembers<T>(obj: T): {[key: string]: any} {
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
<ul class= "action-info">
  {#each Object.entries(getInterfaceMembers(action_response)) as [key, value]}
      <li><b>{key}: </b>{value}</li>
  {/each}
</ul>

<style>
  p {
    margin: 0;
    line-height: 30px;
  }

  .action-info {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    margin-bottom: 1rem;
    font-size: 0.8em; /* Smaller font size for compact representation */
  }

  .action-info h2,
  .action-info h3 {
    color: #333;
    cursor: pointer; /* Change cursor to pointer when hovering over headers */
  }

  .action-info p {
    color: #666;
    margin: 0;
    line-height: 30px;
  }

  .hidden {
    display: none; /* Hide sections when they are closed */
  }
</style>
