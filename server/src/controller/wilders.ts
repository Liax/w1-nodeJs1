import dataSource from "../db";
import Skill from "../entity/Skill";
import Grade from "../entity/Grade";
import Wilder from "../entity/Wilder";

import { IController } from "../types/IController";

const wildersController: IController = {
	create: async (req, res) => {
		const { name, bio, city } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		try {
			const created = await dataSource
				.getRepository(Wilder)
				.save({ name, city, bio });
			res.status(201).send(created);
		} catch (err) {
			res.send("Error while creating wilder");
		}
	},

	read: async (req, res) => {
		try {
			const wilders = await dataSource
				.getRepository(Wilder)
				.find({ relations: { grades: { skill: true } } });
			res.send(
				wilders.map((wilder) => ({
					...wilder,
					grades: undefined,
					skills: wilder.grades.map((grade) => ({
						id: grade.skill.id,
						name: grade.skill.name,
						votes: grade.votes,
					})),
				}))
			);
		} catch (err) {
			res.send("Error while fetching wilder");
		}
	},
	readOne: async (req, res) => {
		try {
			const id = parseInt(req.params.id, 10);
			const wilder = await dataSource
				.getRepository(Wilder)
				.findOne({ where: { id }, relations: { grades: { skill: true } } });
			wilder !== null
				? res.send({
						...wilder,
						grades: undefined,
						skills: wilder?.grades.map((g) => ({
							id: g.skill.id,
							name: g.skill.name,
							vote: g.votes,
						})),
				  })
				: res.send("Wilder not found");
		} catch (err) {
			res.send("Error while fetching wilder");
		}
	},

	update: async (req, res) => {
		const { name } = req.body;
		if (name?.length > 100 || name?.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		try {
			const { affected } = await dataSource
				.getRepository(Wilder)
				.update(req.params.id, req.body);
			if (affected !== 0) return res.send("wilder updated");
			else {
				res.sendStatus(404);
			}
		} catch (err) {
			res.send("Error while updating wilder");
		}
	},

	delete: async (req, res) => {
		try {
			const { affected } = await dataSource
				.getRepository(Wilder)
				.delete(req.params.id);
			if (affected !== 0) return res.send("Success while deleting");
			res.sendStatus(404);
		} catch (error) {
			res.send("Error while deleting wilder");
		}
	},

	addSkill: async (req, res) => {
		try {
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: parseInt(req.params.wilderId, 10) });
			if (wilderToUpdate === null)
				return res.status(404).send("Wilder not found");

			const skillToAdd = await dataSource
				.getRepository(Skill)
				.findOneBy({ id: parseInt(req.params.skillId, 10) });
			if (skillToAdd === null) return res.status(404).send("Skill not found");

			await dataSource
				.getRepository(Grade)
				.insert({ wilder: wilderToUpdate, skill: skillToAdd });
			res.send("Skill added to wilder");
		} catch (error) {
			res.send("error while adding skill to wilder");
		}
	},

	deleteSkill: async (req, res) => {
		try {
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: parseInt(req.params.wilderId, 10) });
			if (wilderToUpdate === null)
				return res.status(404).send("Wilder not found");

			const skillToDelete = await dataSource
				.getRepository(Skill)
				.findOneBy({ id: parseInt(req.params.skillId, 10) });
			if (skillToDelete === null)
				return res.status(404).send("Skill not found");
			console.log(skillToDelete);

			await dataSource.getRepository(Grade).delete({
				wilderId: wilderToUpdate.id,
				skillId: wilderToUpdate.id,
			});
			res.send("Skill removed to wilder");
		} catch {
			res.send("error while removing skill to wilder");
		}
	},
};

export default wildersController;
