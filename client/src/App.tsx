import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import CardWilders from "./components/CardWilders";
import FormWilder from "./components/FormWilder";
import Header from "./components/Header";
import { getAllWilder } from "./services/wilders";
import { IWilder } from "./types/IWilder";

function App() {
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
			<Header />
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
			<Footer />
		</>
	);
}

export default App;
