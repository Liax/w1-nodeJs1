import { Link } from "react-router-dom";
import blank_profile from "../assets/blank_profil.png";
import { deleteWilder } from "../services/wilders";
import { IWilder } from "../types/IWilder";
import Skills from "./Skills";

export interface WilderProps {
	wilder: IWilder;
	fetchWilders: () => void;
}

export default function CardWilders({
	wilder: { name, city, bio, skills = [], id },
	fetchWilders,
}: WilderProps) {
	const handleDelete = async () => {
		try {
			const res = await deleteWilder(id);
			console.log("wilder deleted", res.data);
			fetchWilders();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<article className="card">
			<img src={blank_profile} alt="Profile" />
			<h3>{name}</h3>
			<h4>{city}</h4>
			<p>{bio}</p>
			<h4>Wild Skills</h4>
			<ul className="skills">
				{skills.map((skill) => (
					<Skills key={skill.id} name={skill.name} votes={skill.votes} />
				))}
			</ul>
			<button onClick={handleDelete} value={id}>
				Supprimer
			</button>
			<button>
				<Link to={`/wilders/${id}`}>Détails</Link>
			</button>
		</article>
	);
}
