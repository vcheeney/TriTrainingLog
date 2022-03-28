<script lang="ts">
	import type { ActivityDto } from 'src/utils/activity';
	import FieldDate from './FieldDate.svelte';
	import FieldNumber from './FieldNumber.svelte';
	import FieldSelect from './FieldSelect.svelte';
	import FieldText from './FieldText.svelte';

	export let isEditing: boolean;
	export let activityDto: ActivityDto;
	export let handleSubmit: () => Promise<void>;
	export let handleReset: () => void;
</script>

<div class="bg-white p-4 rounded-xl">
	<div class="grid sm:grid-cols-4 w-full mb-4">
		<div class="col-span-1" />
		<div class="col-span-3 space-x-2">
			<h2 class="text-gray-800 text-3xl uppercase">
				{isEditing ? 'Edit an activity' : 'Log a new activity'}
			</h2>
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
				<button type="submit" class="px-4 py-2 bg-gray-800 rounded-lg text-white"
					>{isEditing ? 'Edit' : 'Create'}</button
				>
				<button type="reset" class="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">Cancel</button>
			</div>
		</div>
	</form>
</div>
