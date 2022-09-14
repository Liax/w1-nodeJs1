export default function Skills({ name, rate }) {
	return (
		<li>
			<p>{name}</p>
			<span className="votes">{rate}</span>
		</li>
	);
}
