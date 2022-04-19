<script lang="ts">
	import { session } from '$app/stores';
	import ActivityCard from 'src/components/ActivityCard.svelte';
	import ActivityForm from 'src/components/ActivityForm.svelte';
	import type { Activity, ActivityDto } from 'src/utils/activity';
	import { fixDateForTimezone, formatDateForInput, type FormMode } from 'src/utils/other';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let activities: Activity[] = [];

	onMount(async () => {
		fetchActivities();
	});

	let showForm = false;
	let mode: FormMode = 'create';
	let editingActivityId: string;
	let activityDto: ActivityDto = {
		name: '',
		sport: '',
		distance: 0,
		note: '',
		date: formatDateForInput(new Date())
	};

	async function handleSubmit() {
		const res = await fetch(
			`${$session.apiUrl}/activities${mode === 'edit' ? `/${editingActivityId}` : ''}`,
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
		const res = await fetch(`${$session.apiUrl}/activities`);
		activities = await res.json();
		activities = [
			...activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		];
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<div class="space-y-4 my-8">
	<ActivityForm {activityDto} {handleSubmit} {handleReset} {mode} {showForm} {triggerShowForm} />
	{#if activities.length}
		<div class="space-y-4">
			{#each activities as activity (activity.id)}
				<div in:receive={{ key: activity.id }} out:send={{ key: activity.id }} animate:flip>
					<ActivityCard {editActivity} {activity} refetch={fetchActivities} />
				</div>
			{/each}
		</div>
	{:else if !showForm}
		<p>There are no activities... =(</p>
	{/if}
</div>
