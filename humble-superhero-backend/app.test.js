const request = require("supertest");
const app = require("./app");

describe("Humble Superhero API", () => {
    it("should add a superhero", async () => {
        const response = await request(app)
            .post("/superheroes")
            .send({ name: "Spider-Man", superpower: "Web-slinging", humility_score: 9 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success");
    });

    it ("should return superheroes sorted by humility", async () => {
        await request(app).post("/superheroes").send({ name: "Iron Man", superpower: "Technology", humility_score: 7 });
        await request(app).post("/superheroes").send({ name: "Captain America", superpower: "Shield", humility_score: 10 });

        const response = await request(app).get("/superheroes");

        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe("Iron Man");
        expect(response.body[1].name).toBe("Spider-Man");
        
    });

    it ("should return 500 for invalid input", async () => {
        const response = await request(app)
            .post("/superheroes")
            .send({ name: "Thor", superpowerrerter: "Hammer", humility_score: 20 });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
    });
});
