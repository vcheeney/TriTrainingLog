<script lang="ts">
	import FieldLayout from './FieldLayout.svelte';

	export let label: string;
	export let value: string;
</script>

<FieldLayout {label}>
	<input type="text" id={label} bind:value class="field " />
</FieldLayout>
