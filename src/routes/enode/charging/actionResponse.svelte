<script lang="ts">
    export let action_response: Array<{key: string, value: any}>;

    export function getInterfaceMembers<T>(obj: T): Array<{key: string, value: any}> {
        const indexableObj = obj as {[key: string]: any};
        return Object.keys(indexableObj).map(key => ({key, value: indexableObj[key]}));
    }
  </script>

<div>
    <h2><b>Action Response: </b></h2>
</div>
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        {#each action_response as { key, value }}
            <tr>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        {/each}
    </tbody>
</table>
  
  <style>
    p {
      margin: 0;
      line-height: 30px;
    }
  </style>