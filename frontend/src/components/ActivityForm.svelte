<script lang="ts">
	import { formatDateForInput, type ActivityDto } from 'src/utils/activity';
	import FieldDate from './FieldDate.svelte';
	import FieldNumber from './FieldNumber.svelte';
	import FieldSelect from './FieldSelect.svelte';
	import FieldText from './FieldText.svelte';

	export let refetch: () => Promise<void>;

	let activityDto: ActivityDto = {
		name: 'Evening Run',
		sport: 'run',
		distance: 15000,
		note: 'Nice steady run. Good pace.',
		date: formatDateForInput(new Date())
	};

	async function handleSubmit() {
		const res = await fetch('http://localhost:3000/activities', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(activityDto)
		});
		if (res.ok) {
			refetch();
		} else {
			const body = await res.json();
			const errorMessage = body.message.join('\n');
			alert(errorMessage);
		}
	}

	function handleReset() {
		activityDto = {
			name: '',
			sport: '',
			distance: 0,
			note: '',
			date: formatDateForInput(new Date())
		};
	}

	$: console.log(formatDateForInput(new Date()));
</script>

<div class="bg-white p-4 rounded-xl">
	<div class="grid sm:grid-cols-4 w-full mb-4">
		<div class="col-span-1" />
		<div class="col-span-3 space-x-2">
			<h2 class="text-gray-800 text-3xl uppercase">Log a new activity</h2>
		</div>
	</div>
	<form
		class="text-gray-500 space-y-2"
		on:submit|preventDefault={handleSubmit}
		on:reset|preventDefault={handleReset}
	>
		<FieldText label="Name" bind:value={activityDto.name} />
		<FieldSelect
			label="Sport"
			bind:value={activityDto.sport}
			options={[
				{
					label: '🏊‍♂️ Swim',
					value: 'swim'
				},
				{
					label: '🚴‍♂️ Bike',
					value: 'bike'
				},
				{
					label: '🏃‍♂️ Run',
					value: 'run'
				}
			]}
		/>
		<FieldNumber label="Distance (m)" bind:value={activityDto.distance} />
		<FieldText label="Note" bind:value={activityDto.note} />
		<FieldDate label="Date" bind:value={activityDto.date} />
		<div class="grid sm:grid-cols-4 w-full pt-4">
			<div class="col-span-1" />
			<div class="col-span-3 space-x-2">
				<button type="submit" class="px-4 py-2 bg-gray-800 rounded-lg text-white">Create</button>
				<button type="reset" class="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">Cancel</button>
			</div>
		</div>
	</form>
</div>
