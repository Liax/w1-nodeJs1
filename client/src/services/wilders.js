import API from "./APIclient";

export async function getAllWilder() {
	const { data } = await API.get("/wilders");
	return data;
}

export async function createWilder(wilderProps) {
	return API.post("/wilders", wilderProps);
}

export async function deleteWilder(id) {
	return API.delete(`/wilders/${id}`);
}
