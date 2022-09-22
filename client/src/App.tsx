import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WilderPge from "./screen/WilderPge";
import WilderDetail from "./screen/WilderDetail";
import SkillsPge from "./screen/SkillsPge";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<WilderPge />}></Route>
				<Route path="/wilders/:id" element={<WilderDetail />}></Route>
				<Route path="/skills" element={<SkillsPge />}></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
