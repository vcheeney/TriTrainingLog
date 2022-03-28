<script lang="ts">
	import ActivityCard from 'src/components/ActivityCard.svelte';
	import ActivityForm from 'src/components/ActivityForm.svelte';
	import type { Activity } from 'src/utils/activity';
	import { onMount } from 'svelte';

	let activities: Activity[] = [];

	onMount(async () => {
		fetchActivities();
	});

	async function fetchActivities() {
		const res = await fetch('http://localhost:3000/activities');
		activities = await res.json();
		activities = [
			...activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		];
	}
</script>

<div class="space-y-4 mt-8">
	<ActivityForm refetch={fetchActivities} />
	{#each activities as activity (activity.id)}
		<ActivityCard {activity} refetch={fetchActivities} />
	{/each}
</div>
