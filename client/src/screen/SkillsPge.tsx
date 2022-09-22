import { useEffect, useState, FormEvent } from "react";
import { createSkill, getAllSkills } from "../services/skills";
import { ISkills, ISkillsCreate } from "../types/ISkills";

const SkillsPge = () => {
	const [skills, setSkills] = useState<ISkills[]>([]);
	const [name, setName] = useState<ISkillsCreate["name"]>("");

	const fetchSkills = async () => {
		try {
			setSkills(await getAllSkills());
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchSkills();
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createSkill({
				name,
			});
			fetchSkills();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<h2>SKILLS</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">
					Skill name:{""}
					<input
						type="text"
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
					/>
				</label>
				<button type="submit">Ajouter un skill</button>
			</form>
			<ul className="skills">
				{skills.map((skill) => (
					<li>{skill.name} </li>
				))}
			</ul>
		</div>
	);
};

export default SkillsPge;
