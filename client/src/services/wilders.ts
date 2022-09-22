import API from "./APIclient";
import { IWilder, IWilderCreate } from "../types/IWilder";

export async function getAllWilder() {
	const { data } = await API.get("/wilders");
	return data;
}

export async function getWilder(id: number): Promise<IWilder> {
	const { data } = await API.get(`/wilders/${id}`);
	return data;
}

export async function createWilder(wilderProps: IWilderCreate) {
	return API.post("/wilders", wilderProps);
}

export async function deleteWilder(id: number) {
	return API.delete(`/wilders/${id}`);
}
