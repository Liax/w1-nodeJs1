import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<div className="container">
				<h1>Wilders Book</h1>
				<nav>
					<NavLink to="/">Wilders</NavLink>
					<NavLink to="/skills">Skills</NavLink>
				</nav>
			</div>
		</header>
	);
}
