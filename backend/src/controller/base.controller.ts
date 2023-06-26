import { Repository } from "typeorm";


export abstract class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const entity = this.repository.create(req.body);

        try {
            const entityAdded = await this.repository.save(entity);
            res.json(entityAdded);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne({where:{id:id}});

            if (!entity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            await this.repository.delete(entity);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne({where:{id:id}});

            if (!entity) {
                return res.status(404).json({ message: 'Entity not found.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            const id = req.params.id;
            const entityToUpdate = await this.repository.findOne({where:{id:id}});

            const result = await this.repository.save(entity);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }

    handleError(res, err = null, status = 500, message = 'Unexpected server error') {
        if (err) {
            console.error(err);
        }

        res.status(status);
        res.json({ error: message });
    }
}