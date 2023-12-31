<script>
	import { applyAction, enhance } from '$app/forms';
	import ContactsTable from '$lib/components/ContactsTable.svelte';

	/** @type {import('./$types').ActionData} */
	export let data;
	export let form;
	if (form) {
		console.log(form);
	}
</script>

<div>
	<div class="container">
		<h1>Contacts</h1>
		<form
			method="post"
			action="?/create"
			use:enhance={({ formElement }) => {
				// Before the form is submitted, we can do some validation
				return async ({ result, update }) => {
					// After the form is submitted, we can do some validation
					if (result.type === 'success') {
						formElement.reset();
					}
					if (result.type === 'failure') {
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div>
				<label for="name"><span>Name</span></label>
				<input type="text" name="name" placeholder="Name" value={form?.name ?? ''} />
			</div>
			<div>
				<label for="phone"><span>Phone</span></label>
				<input type="tel" name="phone" placeholder="08111111111" value={form?.phone ?? ''} />
			</div>
			<div>
				<label for="email"><span>Email</span></label>
				<input type="email" name="email" placeholder="name@email.com" value={form?.email ?? ''} />
			</div>
			<input type="submit" value="Add contact" />
			{#if form?.error}
				<p>{form?.message ?? ''}</p>
			{/if}
		</form>
		<ContactsTable contacts={data?.contacts} />
	</div>
</div>
