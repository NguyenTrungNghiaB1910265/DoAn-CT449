const ApiError = require("../api-error");
const FilmService = require("../services/film.service");
const MongoDB = require("../utils/mongodb.util");


// Create and Save a new Film
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const filmService = new FilmService(MongoDB.client);
        const document = await filmService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the film")
        );
    }
};

// Retrieve all films of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const filmService = new FilmService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await filmService.findByName(name);
        } else {
            documents = await filmService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving films")
        );
    }

    return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const filmService = new FilmService(MongoDB.client);
        const document = await filmService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Film not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving film with id=${req.params.id}`
            )
        );
    }
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const filmService = new FilmService(MongoDB.client);
        const document = await filmService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Film not found"));
        }
        return res.send({ message: "FIlm was updated sucessfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating film with id=${req.params.id}`)
        );
    }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const filmService = new FilmService(MongoDB.client);
        const document = await filmService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Film not found"));
        }
        return res.send({ message: "Film was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete film with id=${req.params.id}`
            )
        );
    }
};

// Delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const filmService = new FilmService(MongoDB.client);
        const deletedCount = await filmService.deleteAll();
        return res.send({
            message: `${deletedCount} films were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all films")
        );
    }
};

// Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const filmService = new FilmService(MongoDB.client);
        const documents = await filmService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite films"
            )
        );
    }
};