import API from "./APIclient";

export async function getAllSkills() {
	const { data } = await API.get("/skills");
	return data;
}

export async function addSkill(wilderId, skillId) {
	return API.post(`/wilders/${wilderId}/skills`, skillId);
}
