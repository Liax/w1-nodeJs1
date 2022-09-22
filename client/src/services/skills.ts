import { ISkillsCreate } from "../types/ISkills";
import API from "./APIclient";

export async function getAllSkills() {
	const { data } = await API.get("/skills");
	return data;
}

export async function addSkill(wilderId: number, skillId: number) {
	return API.post(`/wilders/${wilderId}/skills`, skillId);
}

export async function createSkill(skillProp: ISkillsCreate) {
	return API.post("/skills", skillProp);
}
