<script lang="ts">
  import {type Activity, getEmoji, getDistanceString} from 'src/utils/activity';

  export let activity: Activity
  export let refetch: () => Promise<void>

  async function deleteActivity(id: string) {
    await fetch(`http://localhost:3000/activities/${id}`, {
      method: 'DELETE',
    })
    refetch()
  }
</script>

<div class="bg-white text-gray-700 p-4 rounded-xl relative">
  <div class="absolute top-2 right-2">
    <button on:click={() => deleteActivity(activity.id)} class="bg-gray-200 hover:bg-gray-300 transition-colors active:bg-gray-400 p-2 rounded-full">
      <svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/></svg>
    </button>
  </div>
  <p>
    <span>{getEmoji(activity.sport)}</span>
    <span>{activity.name}</span>
  </p>
  <p>🛣 {getDistanceString(activity.distance)}</p>
  <p>📝 {activity.note}</p>
</div>