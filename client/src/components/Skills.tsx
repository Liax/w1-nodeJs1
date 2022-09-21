interface SkillProps {
	name: string;
	votes: number;
}

export default function Skills({ name, votes }: SkillProps) {
	return (
		<li>
			<p>{name}</p>
			<span className="votes">{votes}</span>
		</li>
	);
}
