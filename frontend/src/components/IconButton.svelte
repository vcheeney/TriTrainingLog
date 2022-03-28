<script lang="ts">
	export let action;
</script>

<button
	on:click={action}
	class="bg-gray-200 hover:bg-gray-300 transition-colors active:bg-gray-400 p-2 rounded-full"
>
	<slot />
</button>
