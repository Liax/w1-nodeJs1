import blank_profile from "../assets/blank_profil.png";
import Skills from "./Skills.js";

export default function CardWilders({ name, skills }) {
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
		</article>
	);
}
