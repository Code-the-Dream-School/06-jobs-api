const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

module.exports = async function get_chai() {
  return {
    expect: chai.expect,
    request: chai.request,
  };
};
