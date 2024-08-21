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
  const command = `mysql -u ${process.env.TEST_DB_USER} -p${process.env.TEST_DB_PASSWORD} ${process.env.TEST_DB_DATABASE} < ${filePath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return callback(error);
    }
    callback(null);
  });
};

describe("API Players", function() {  // Usa "function" en lugar de arrow function para acceder a "this"
  this.timeout(10000);  // Incrementar el timeout a 10 segundos

  // executem aquest funcion abans del testos
  before((done) => {
    console.log("beforeEach");    
    const sqlFilePath = path.join(__dirname, "../scripts/futbol_test.sql");
    executeSQLFile(sqlFilePath, done);
  });

  it("should create a new player", (done) => {
    console.log("create player");
    chai.request(URL)
      .post("/players")
      .send({ name: "New Player", teamId: 999 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("New Player");
        done();
      });
  });

  it("should get all players", (done) => {
    chai.request(URL)
      .get("/players")
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

 it("should get a player by ID", (done) => {
  const id = 999;
  chai.request(URL)
    .get(`/players/${id}`)
    .end((err, res) => {
      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${JSON.stringify(res.body)}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.id).to.equal(id);
      done();
    });
});

 it("should update a player by ID", (done) => {
    const id = 999;
    chai.request(URL)
      .put(`/players/${id}`)
      .send({ name: "Updated Player", teamId: 999 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("Updated Player");
        done();
      });
  });

  it("should delete a player by ID", (done) => {
    const id = 999;
    chai.request(URL)
      .delete(`/players/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});