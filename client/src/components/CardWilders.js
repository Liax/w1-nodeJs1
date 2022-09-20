import blank_profile from "../assets/blank_profil.png";
import Skills from "./Skills.js";

import { deleteWilder } from "../services/wilders";

export default function CardWilders({ name, skills = [], id, fetchWilders }) {
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await deleteWilder(id);
			console.log("wilder created", res.data);
			fetchWilders();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<article className="card">
			<img src={blank_profile} alt="Profile" />
			<h3>{name}</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</p>
			<h4>Wild Skills</h4>
			<ul className="skills">
				{skills.map((skill) => (
					<Skills key={skill.id} name={skill.name} rate={skill.rate} />
				))}
			</ul>
			<button onClick={handleDelete} value={id}>
				Supprimer
			</button>
		</article>
	);
}
