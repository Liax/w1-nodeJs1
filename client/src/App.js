import "./App.css";
import { useEffect, useState } from "react";
import CardWilders from "./components/CardWilders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormWilder from "./components/FormWilder";
import { getAllWilder } from "./services/wilders";

function App() {
	const [wilders, setwilders] = useState([]);

	const fetchWilders = async () => {
		try {
			setwilders(await getAllWilder());
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchWilders();
	}, []);

	return (
		<>
			<Header />
			<main className="container">
				<FormWilder fetchWilders={fetchWilders} setwilders={setwilders} />
				<h2>Wilders</h2>
				<section className="card-row">
					{wilders.map((wilder) => (
						<CardWilders
							key={wilder.id}
							id={wilder.id}
							name={wilder.name}
							skills={wilder.skills}
							fetchWilders={fetchWilders}
						/>
					))}
				</section>
			</main>
			<Footer />
		</>
	);
}

export default App;
