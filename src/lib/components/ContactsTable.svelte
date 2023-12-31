<script>
	import { enhance } from '$app/forms';
	export let contacts = [];
</script>

<div>
	<table>
		<thead>
			<tr>
				<th><input type="checkbox" /></th>
				<th>Name</th>
				<th>Phone</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			{#each contacts as contact}
				<tr>
					<td><input type="checkbox" /></td>
					<td>{contact.name}</td>
					<td>{contact.phone}</td>
					<td>{contact.email}</td>
					<td>
						<form method="post" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={contact.id} />
							<button>Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
