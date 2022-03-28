<script>
	import '../app.css';
</script>

<div class="bg-white font-semibold shadow-xl">
	<div class="container max-w-screen-sm mx-auto p-4 flex justify-between items-center">
		<h1 class="text-black text-xl font-bold">TRI <span class="text-red-500">TRAINING</span> LOG</h1>
		<a
			href="https://github.com/vcheeney/TriTrainingLog"
			target="blank"
			class="text-gray-500 text-sm underline">GitHub</a
		>
	</div>
</div>

<div class="bg-red-500 h-screen overflow-y-scroll text-white font-semibold">
	<div class="container max-w-screen-sm mx-auto p-4">
		<slot />
	</div>
	<div />
</div>
