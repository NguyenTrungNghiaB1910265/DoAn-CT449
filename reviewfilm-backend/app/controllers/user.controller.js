const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");


// Create and Save a new User
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the film")
        );
    }
};

// Retrieve all users of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was updated sucessfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
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
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findFavorite();
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