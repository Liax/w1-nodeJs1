import express from "express";
import cors from "cors";
import wildersController from "./controller/wilders";
import skillsController from "./controller/skills";

import dataSource from "./db";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.read);
app.get("/wilders/:id", wildersController.readOne);
app.patch("/wilders/:id", wildersController.update);
app.delete("/wilders/:id", wildersController.delete);

app.post("/wilders/:wilderId/skills", wildersController.addSkill);
app.delete("/wilders/:wilderId/skills/:skillId", wildersController.deleteSkill);

app.post("/skills", skillsController.create);
app.get("/skills", skillsController.read);
app.patch("/skills/:id", skillsController.update);
app.delete("/skills/:id", skillsController.delete);

const start = async (): Promise<void> => {
	await dataSource.initialize();
	app.listen(5000, () => console.log("Server started on 5000"));
};

void start();
