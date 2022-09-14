import "./App.css";
import CardWilders from "./components/CardWilders.js";

function App() {
	const wilders = [
		{
			id: 1,
			name: "John",
			skills: [
				{ id: 1, name: "PHP", rate: "5" },
				{ id: 2, name: "JS", rate: "2" },
			],
		},
		{ id: 2, name: "Jane", skills: [{ id: 2, name: "JS", rate: "5" }] },
		{ id: 3, name: "Jack", skills: [{ id: 1, name: "PHP", rate: "6" }] },
	];
	return (
		<div className="App">
			<header>
				<div className="container">
					<h1>Wilders Book</h1>
				</div>
			</header>
			<main className="container">
				<h2>Wilders</h2>
				<section className="card-row">
					{wilders.map((wilder) => (
						<CardWilders
							key={wilder.id}
							name={wilder.name}
							skills={wilder.skills}
						/>
					))}
				</section>
			</main>
			<footer>
				<div className="container">
					<p>&copy; 2022 Wild Code School</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
