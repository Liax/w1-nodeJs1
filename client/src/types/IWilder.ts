export interface ISkillOfWilder {
	id: number;
	name: string;
	votes: number;
}

export interface IWilder {
	id: number;
	name: string;
	city: string | null;
	bio: string | null;
	skills: ISkillOfWilder[];
}

export interface IWilderCreate {
	name: string;
	city?: string;
	bio?: string;
}
