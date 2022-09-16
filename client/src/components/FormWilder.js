import { useState } from "react";
import { createWilder } from "../services/wilders";
import { addSkill } from "../services/skills";

const FormWilder = ({ fetchWilders, skills }) => {
	const [name, setName] = useState("");
	const [skillId, setSkillId] = useState("");

	// const [skill, setSkill] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await createWilder({ name });
			const wilderId = await res.data.id;
			const skillAdded = await addSkill(wilderId, { skillId });

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
			<select
				placeholder="Select a skill"
				onChange={(e) => {
					setSkillId(e.target.value);
					console.log(skillId);
				}}
			>
				{skills.map((skill) => (
					<option value={skill.id}>{skill.name}</option>
				))}
			</select>
			<button type="submit">Ajouter un wilder</button>
		</form>
	);
};

export default FormWilder;
