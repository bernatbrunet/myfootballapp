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
  
  console.log("Executing SQL file:", filePath);  // Debugging line
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return callback(error);
    }
    console.log("SQL execution complete:", stdout);  // Debugging line
    callback(null);
  });
};

describe("API Leagues", function() {
  this.timeout(20000);  // Incrementa el tiempo de espera

  before((done) => {
    const sqlFilePath = path.join(__dirname, "../scripts/futbol_test.sql");
    console.log("SQL file path:", sqlFilePath);  // Debugging line
    executeSQLFile(sqlFilePath, (err) => {
      if (err) {
        console.error("Error in before hook:", err);  // Debugging line
        done(err);
      } else {
        done();
      }
    });
  });

  it("should create a new league", (done) => {
    chai.request(URL)
      .post("/leagues")
      .send({ name: "New League" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("New League");
        done();
      });
  });

  it("should get all leagues", (done) => {
    chai.request(URL)
      .get("/leagues")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should get a league by ID", (done) => {
    const id = 999;  // Asumiendo que este ID existe en la base de datos
    chai.request(URL)
      .get(`/leagues/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal(id);
        done();
      });
  });

  it("should update a league by ID", (done) => {
    const id = 999;  // Asumiendo que este ID existe en la base de datos
    chai.request(URL)
      .put(`/leagues/${id}`)
      .send({ name: "Updated League" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("Updated League");
        done();
      });
  });

  it("should delete a league by ID", (done) => {
    const id = 999;  // Asumiendo que este ID existe en la base de datos
    chai.request(URL)
      .delete(`/leagues/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

});