import { useState } from "react";
import { createWilder } from "../services/wilders";

const FormWilder = ({ fetchWilders }) => {
	const [name, setName] = useState("");
	// const [skill, setSkill] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await createWilder({ name });
			console.log("wilder created", res.data);
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
