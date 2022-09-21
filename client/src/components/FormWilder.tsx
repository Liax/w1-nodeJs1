import { useState, FormEvent } from "react";
import { createWilder } from "../services/wilders";

interface WilderFormProps {
	fetchWilders: () => void;
}

const FormWilder = ({ fetchWilders }: WilderFormProps) => {
	const [name, setName] = useState("");
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createWilder({ name });
			fetchWilders();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">
				Nom:{""}
				<input
					type="text"
					onChange={(e) => {
						setName(e.target.value);
					}}
					value={name}
				/>
			</label>
			<button type="submit">Ajouter un wilder</button>
		</form>
	);
};

export default FormWilder;
