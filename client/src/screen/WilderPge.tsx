import { useEffect, useState } from "react";
import { getAllWilder } from "../services/wilders";
import { IWilder } from "../types/IWilder";
import CardWilders from "../components/CardWilders";
import FormWilder from "../components/FormWilder";

function WilderPge() {
	const [wilders, setWilders] = useState<IWilder[]>([]);

	const fetchWilders = async () => {
		try {
			setWilders(await getAllWilder());
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchWilders();
	}, []);

	return (
		<>
			<main className="container">
				<FormWilder fetchWilders={fetchWilders} />
				<h2>Wilders</h2>
				<section className="card-row">
					{wilders.map((wilder) => (
						<CardWilders
							key={wilder.id}
							wilder={wilder}
							fetchWilders={fetchWilders}
						/>
					))}
				</section>
			</main>
		</>
	);
}

export default WilderPge;
