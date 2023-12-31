import { fail, redirect } from '@sveltejs/kit';

let contacts = [
	{
		id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d981',
		name: 'Saul Goodman',
		email: 'saul@example.com',
		phone: '08111012345'
	}
];

/** @type {import('./$types').PageServerLoad} */
export const load = () => {
	return {
		contacts
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const phone = formData.get('phone');
		const email = formData.get('email');
		const id = crypto.randomUUID();

		if (name.length < 3) {
			return fail(400, {
				error: true,
				message: 'Name must be at least 3 characters',
				name,
				phone,
				email
			});
		}

		const contact = {
			id,
			name,
			phone,
			email
		};

		contacts.push(contact);

		throw redirect(303, '/');
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		contacts = contacts.filter((contact) => contact.id !== id);
		console.log(contacts);

		return {
			success: true
		};
	}
};
