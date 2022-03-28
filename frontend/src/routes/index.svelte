<script lang="ts">
  import ActivityCard from 'src/components/ActivityCard.svelte';
import type { Activity } from 'src/utils/activity';
import { onMount } from 'svelte';

  let activities: Activity[] = []

  onMount(async () => {
    fetchActivities()
  })

  async function fetchActivities() {
    const res = await fetch('http://localhost:3000/activities');
    activities = await res.json();
  }
</script>

<div class="space-y-4 mt-8">
  {#each activities as activity (activity.id)}
    <ActivityCard {activity} refetch={fetchActivities} />
  {/each}
</div>