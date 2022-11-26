const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    

    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { favorite: user.favorite === true } },
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

module.exports = UserService;