require("dotenv").config();  // Cargar las variables de entorno del archivo .env

const chai = require("chai");
const chaiHttp = require("chai-http");
const { exec } = require("child_process");
const path = require("path");
const expect = chai.expect;

chai.use(chaiHttp);

const URL = "http://localhost:3000";

// Helper function to execute SQL file
const executeSQLFile = (filePath, callback) => {
    console.log("SQL file path:", filePath);  // Añadir log para verificar la ruta del archivo SQL
    const command = `mysql -u ${process.env.TEST_DB_USER} -p${process.env.TEST_DB_PASSWORD} ${process.env.TEST_DB_DATABASE} < ${filePath}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return callback(error);
        }
        console.log("SQL execution complete:", stdout);  // Añadir log para verificar la salida de la ejecución
        callback(null);
    });
};

describe("API Teams", function() {
    this.timeout(10000);  // Configurar el tiempo de espera para todos los tests dentro de este bloque

    before((done) => {
        const sqlFilePath = path.join(__dirname, "../scripts/futbol_test.sql");
        executeSQLFile(sqlFilePath, done);
    });

    it("should create a new team", (done) => {
        chai.request(URL)
            .post("/teams")
            .send({ name: "Test Team", country: "Spain" })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object");
                expect(res.body.name).to.equal("Test Team");
                done();
            });
    });

    it("should get all teams", (done) => {
        chai.request(URL)
            .get("/teams")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
    });

    it("should get a team by ID", (done) => {
        const id = 999;  // Asegúrate de que el ID 999 existe en la base de datos de pruebas
        chai.request(URL)
            .get(`/teams/${id}`)
            .end((err, res) => {
                console.log("Response status:", res.status);  // Añadir log para verificar el estado de respuesta
                console.log("Response body:", res.body);      // Añadir log para verificar el cuerpo de respuesta
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.id).to.equal(id);
                done();
            });
    });

    it("should update a team by ID", (done) => {
        const id = 999;
        chai.request(URL)
            .put(`/teams/${id}`)
            .send({ name: "Updated Team", country: "Spain" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.name).to.equal("Updated Team");
                done();
            });
    });

    it("should delete a team by ID", (done) => {
        const id = 999;
        chai.request(URL)
            .delete(`/teams/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});