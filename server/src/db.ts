import { DataSource } from "typeorm";
import Skill from "./entity/Skill";
import Wilder from "./entity/Wilder";
import Grade from "./entity/Grade";

const dataSource = new DataSource({
	type: "sqlite",
	database: "./wildersdb.sqlite",
	synchronize: true,
	entities: [Wilder, Skill, Grade],
	logging: ["query", "error"],
});

export default dataSource;
