<script>
	import GitHubIcon from 'src/components/icons/GitHubIcon.svelte';
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
	<div class="bg-white font-semibold shadow-xl">
		<div class="container max-w-screen-sm mx-auto p-4 flex justify-between items-center">
			<h1 class="text-black text-xl font-bold">
				TRI <span class="text-red-500">TRAINING</span> LOG
			</h1>
			<a
				href="https://github.com/vcheeney/TriTrainingLog"
				target="blank"
				class="space-x-2 flex items-center  text-gray-500 hover:text-gray-600 active:bg-gray-300 uppercase bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-1 transition-colors"
			>
				<span>Source</span>
				<GitHubIcon />
			</a>
		</div>
	</div>

	<div class="bg-red-500 overflow-y-scroll text-white font-semibold flex-grow">
		<div class="container max-w-screen-sm mx-auto p-4">
			<slot />
		</div>
	</div>
	<div class="bg-white py-2">
		<div class="container bg-white text-gray-800 font-bold max-w-screen-sm mx-auto text-center">
			<p>Made with ❤ by Victor Cheeney</p>
		</div>
	</div>
</div>
