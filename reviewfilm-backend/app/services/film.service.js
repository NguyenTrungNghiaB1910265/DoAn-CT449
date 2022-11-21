const { ObjectId } = require("mongodb");

class FilmService {
    constructor(client) {
        this.Film = client.db().collection("films");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractFilmData(payload) {
        const film = {
            name: payload.name,
            description: payload.description,
            time: payload.time,
            director: payload.director,
            nation: payload.nation,
            category: payload.category,
            premiere: payload.premiere,
            imageURL: payload.imageURL,
            // favorite: payload.favorite
        };
        // Remove undefined fields
        Object.keys(film).forEach(
            (key) => film[key] === undefined && delete film[key]
        );
        return film;
    }

    async create(payload) {
        const film = this.extractFilmData(payload);
        const result = await this.Film.findOneAndUpdate(
            film,
            { $set: { favorite: film.favorite === true } },
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Film.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Film.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractFilmData(payload);
        const result = await this.Film.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Film.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Film.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = FilmService;