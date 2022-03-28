<script lang="ts">
	import ActivityCard from 'src/components/ActivityCard.svelte';
	import ActivityForm from 'src/components/ActivityForm.svelte';
	import type { Activity, ActivityDto } from 'src/utils/activity';
	import { fixDateForTimezone, formatDateForInput, type FormMode } from 'src/utils/other';
	import { onMount } from 'svelte';

	let activities: Activity[] = [];

	onMount(async () => {
		fetchActivities();
	});

	let showForm = false;
	let mode: FormMode = 'create';
	let editingActivityId: string;
	let activityDto: ActivityDto = {
		name: 'Evening Run',
		sport: 'run',
		distance: 15000,
		note: 'Nice steady run. Good pace.',
		date: formatDateForInput(new Date())
	};

	async function handleSubmit() {
		const res = await fetch(
			`http://localhost:3000/activities${mode === 'edit' ? `/${editingActivityId}` : ''}`,
			{
				method: mode === 'edit' ? 'PATCH' : 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...activityDto,
					date: fixDateForTimezone(new Date(activityDto.date))
				})
			}
		);
		if (res.ok) {
			fetchActivities();
			handleReset();
		} else {
			const body = await res.json();
			const errorMessage = body.message.join('\n');
			alert(errorMessage);
		}
	}

	function handleReset() {
		showForm = false;
		mode = 'create';
		editingActivityId = '';
		activityDto = {
			name: '',
			sport: '',
			distance: 0,
			note: '',
			date: formatDateForInput(new Date())
		};
	}

	function triggerShowForm() {
		showForm = true;
	}

	function editActivity(a: Activity) {
		showForm = true;
		mode = 'edit';
		editingActivityId = a.id;
		activityDto = {
			name: a.name,
			sport: a.sport,
			distance: a.distance,
			note: a.note,
			date: formatDateForInput(new Date(a.date))
		};
	}

	async function fetchActivities() {
		const res = await fetch('http://localhost:3000/activities');
		activities = await res.json();
		activities = [
			...activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		];
	}
</script>

<div class="space-y-4 mt-8">
	<ActivityForm {activityDto} {handleSubmit} {handleReset} {mode} {showForm} {triggerShowForm} />
	{#if activities.length}
		<div class="space-y-4">
			{#each activities as activity (activity.id)}
				<ActivityCard {editActivity} {activity} refetch={fetchActivities} />
			{/each}
		</div>
	{:else if !showForm}
		<p>There are no activities... =(</p>
	{/if}
</div>
