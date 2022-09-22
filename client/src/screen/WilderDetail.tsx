import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWilder } from "../services/wilders";
import { IWilder } from "../types/IWilder";
import Skills from "../components/Skills";

const WilderDetail = () => {
	let { id } = useParams();

	const [wilder, setWilder] = useState<IWilder>();

	const fetchWilder = async () => {
		try {
			if (id !== undefined) {
				setWilder(await getWilder(parseInt(id)));
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchWilder();
	}, []);

	return (
		<div className="container">
			<h2>{wilder?.name}</h2>
			<h4>{wilder?.city}</h4>
			<p>{wilder?.bio}</p>
			<ul className="skills">
				{wilder?.skills.map((skill) => (
					<Skills key={skill.id} name={skill.name} votes={skill.votes} />
				))}
			</ul>
		</div>
	);
};

export default WilderDetail;
