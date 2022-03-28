<script lang="ts">
	import FieldLayout from './FieldLayout.svelte';

	export let label: string;
	export let value: number;
</script>

<FieldLayout {label}>
	<input type="number" id={label} bind:value class="field " />
</FieldLayout>
