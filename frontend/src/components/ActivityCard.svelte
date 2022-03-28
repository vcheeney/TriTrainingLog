<script lang="ts">
	import { session } from '$app/stores';
	import { getDistanceString, getEmoji, type Activity } from 'src/utils/activity';
	import IconButton from './IconButton.svelte';
	import DeleteIcon from './icons/DeleteIcon.svelte';
	import EditIcon from './icons/EditIcon.svelte';

	export let activity: Activity;
	export let refetch: () => Promise<void>;

	export let editActivity: (a: Activity) => void;

	async function deleteActivity(id: string) {
		await fetch(`${$session.apiUrl}/activities/${id}`, {
			method: 'DELETE'
		});
		refetch();
	}
</script>

<div class="bg-white text-gray-700 p-4 rounded-xl relative">
	<div class="absolute top-2 right-2">
		<IconButton action={() => editActivity(activity)}>
			<EditIcon />
		</IconButton>
		<IconButton action={() => deleteActivity(activity.id)}>
			<DeleteIcon />
		</IconButton>
	</div>
	<p>📅 {new Date(activity.date).toDateString()}</p>
	<p>
		<span>{getEmoji(activity.sport)}</span>
		<span>{activity.name}</span>
	</p>
	<p>🛣 {getDistanceString(activity.distance)}</p>
	{#if activity.note}
		<p>📝 {activity.note}</p>
	{/if}
</div>
