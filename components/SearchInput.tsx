'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

const forChema = z.object({
	input: z.string().min(2).max(50),
});
export default function SearchInput() {
	const router = useRouter();

	const form = useForm<z.infer<typeof forChema>>({
		resolver: zodResolver(forChema),
		defaultValues: {
			input: '',
		},
	});

	function onSubmit(values: z.infer<typeof forChema>) {
		console.log(values);

		router.push(`/search/${values.input}`);

		form.reset();
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='input'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Search..' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</FormProvider>
	);
}
