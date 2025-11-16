"use client";
import createManager from "@/actions/managers/create";
import { Input, Button } from "@nextui-org/react";
import SelectStore from "../[id]/_components/SelectStore";
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';

export default function FormCreateManager({ stores, onClose }: { stores?: any[], onClose?: () => void }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(formData: FormData) {
		startTransition(async () => {
			setError(null);
			const result = await createManager(formData);
			if (result?.success) {
				if (onClose) onClose();
				router.refresh();
			} else {
				setError(result?.error || 'Error creating manager');
				console.error(result?.error || 'Error creating manager');
			}
		});
	}

	return (
		<form action={handleSubmit} className="bg-orange-400 py-2 flex flex-col gap-6 w-full rounded-lg p-4">
			<h1 className="text-xl text-white text-center">Crear Manager</h1>
			<Input isRequired label="Nombre completo" placeholder="Marco Aurelio" name="managerFullName" />
			<Input isRequired label="Email" placeholder="marco@mail.com" name="managerEmail" />
			<Input isRequired label="Teléfono" placeholder="+52 442 123 4567" name="managerPhoneNumber" />
			<Input isRequired label="Salario" placeholder="5000" name="managerSalary" type="number" />
			{stores && <SelectStore stores={stores} defaultStore={0} />}
			{error && (
				<div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
					{error}
				</div>
			)}
			<Button type="submit" color="primary" isLoading={isPending}> Crear </Button>
		</form>
	);
}
