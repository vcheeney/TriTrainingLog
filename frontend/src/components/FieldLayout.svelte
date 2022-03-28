<script lang="ts">
	export let label: string;
</script>

<div class="grid sm:grid-cols-4 items-center">
	<label class="sm:col-span-1" for={label}>{label}</label>
	<div class="sm:col-span-3">
		<slot />
	</div>
</div>
