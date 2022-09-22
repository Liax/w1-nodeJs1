import { useState, FormEvent } from "react";
import { createWilder } from "../services/wilders";
import { IWilderCreate } from "../types/IWilder";

interface WilderFormProps {
	fetchWilders: () => void;
}

const FormWilder = ({ fetchWilders }: WilderFormProps) => {
	const [name, setName] = useState<IWilderCreate["name"]>("");
	const [city, setCity] = useState<IWilderCreate["city"]>("");
	const [bio, setBio] = useState<IWilderCreate["bio"]>("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createWilder({ name, bio, city });
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
			<label htmlFor="city">
				Ville:{""}
				<input
					type="text"
					onChange={(e) => {
						setCity(e.target.value);
					}}
					value={city}
				/>
			</label>
			<label htmlFor="bio">
				Bio:{""}
				<input
					type="text"
					onChange={(e) => {
						setBio(e.target.value);
					}}
					value={bio}
				/>
			</label>
			<button type="submit">Ajouter un wilder</button>
		</form>
	);
};

export default FormWilder;
