<script lang="ts">
    let links: { href: string, text: string }[] = [
      { href: "/enode/manageUsers", text: "Manage Enode Users" },
      { href: "/enode/vehicles", text: "Manage Enode Vehicles" },
      { href: "/enode/charging", text: "Manage EV Charging" },
      // add more links here...
    ];
</script>

<main>
    <h1>Hello to the Enode experience</h1>
    <ul>
        {#each links as link (link.href)}
          <li><a href={link.href}>{link.text}</a></li>
        {/each}
      </ul>
</main>
