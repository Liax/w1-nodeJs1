import dataSource from "../db";
import Skill from "../entity/Skill";
import Wilder from "../entity/Wilder";
import { Request } from "express";

import { IController } from "../types/IController";

const wildersController: IController = {
	create: async (req: Request, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		try {
			const created = await dataSource.getRepository(Wilder).save({ name });
			res.status(201).send(created);
		} catch (err) {
			res.send("Error while creating wilder");
		}
	},

	read: async (req, res) => {
		try {
			const wilders = await dataSource.getRepository(Wilder).find({});
			res.json(wilders);
		} catch (err) {
			res.send("Error while fetching wilder");
		}
	},

	update: async (req, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		try {
			const { affected } = await dataSource
				.getRepository(Wilder)
				.update(req.params.id, { name });
			if (affected) return res.send("wilder updated");
			res.sendStatus(404);
		} catch (err) {
			res.send("Error while updating wilder");
		}
	},

	delete: async (req, res) => {
		try {
			const { affected } = await dataSource
				.getRepository(Wilder)
				.delete(req.params.id);
			if (affected) return res.send("Success while deleting");
			res.sendStatus(404);
		} catch (error) {
			res.send("Error while deleting wilder");
		}
	},

	addSkill: async (req, res) => {
		try {
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: req.params.wilderId });
			if (!wilderToUpdate) return res.status(404).send("Wilder not found");

			const skillToAdd = await dataSource
				.getRepository(Skill)
				.findOneBy({ id: req.body.skillId });
			if (!skillToAdd) return res.status(404).send("Skill not found");

			wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
			await dataSource.getRepository(Wilder).save(wilderToUpdate);
			res.send("Skill added to wilder");
		} catch (error) {
			res.send("error while adding skill to wilder");
		}
	},

	deleteSkill: async (req, res) => {
		try {
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: req.params.wilderId });
			if (!wilderToUpdate) return res.status(404).send("Wilder not found");
			console.log(wilderToUpdate);

			const skillToDelete = await dataSource
				.getRepository(Skill)
				.findOneBy({ id: req.params.skillId });
			if (!skillToDelete) return res.status(404).send("Skill not found");
			console.log(skillToDelete);

			wilderToUpdate.skills = wilderToUpdate.skills.filter(
				(skill) => skill.id !== skillToDelete.id
			);
			await dataSource.getRepository(Wilder).save(wilderToUpdate);
			res.send("Skill removed to wilder");
		} catch (err) {
			res.send("error while removing skill to wilder");
		}
	},
};

export default wildersController;
