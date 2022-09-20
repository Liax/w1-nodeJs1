import dataSource from "../db";
import Skill from "../entity/Skill";
import { IController } from "../types/IController";

const skillsController: IController = {
	create: async (req, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send(
					"The skill name should be at least 1 char and not more than 100 "
				);

		const existingSkill = await dataSource
			.getRepository(Skill)
			.findOneBy({ name });

		if (existingSkill) {
			return res.status(409).send("a skill with this name already exist");
		}
		try {
			const created = await dataSource.getRepository(Skill).save({ name });
			res.status(201).send(created);
		} catch (error) {
			res.send("Error while creating a skill");
		}
	},

	read: async (req, res) => {
		try {
			const skills = await dataSource.getRepository(Skill).find({});
			res.json(skills);
		} catch (err) {
			res.send("Error while fetching the skills");
		}
	},

	update: async (req, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The skill should have a length between 1 and 100 character");
		try {
			const { affected } = await dataSource
				.getRepository(Skill)
				.update(req.params.id, { name });
			if (affected) return res.send("skill updated");
			res.sendStatus(404);
		} catch (err) {
			res.send("Error while updating the skill");
		}
	},

	delete: async (req, res) => {
		try {
			const { affected } = await dataSource
				.getRepository(Skill)
				.delete(req.params.id);
			if (affected) return res.send("Skill succesfully deleted");
			res.sendStatus(404);
		} catch (error) {
			res.send("Error while deleting a skill");
		}
	},
};

export default skillsController;
