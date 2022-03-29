<script lang="ts">
	import FieldLayout from './FieldLayout.svelte';

	export let label: string;
	export let value: string;
	export let options: { value: string; label: string }[];
</script>

<FieldLayout {label}>
	<select class="field" bind:value id={label}>
		{#each options as option (option.label)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</FieldLayout>
