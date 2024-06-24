const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleStorageModule", (m) => {
  const initialValue = m.getParameter("initialValue", 0);

  const simpleStorage = m.contract("SimpleStorage", [initialValue]);

  return { simpleStorage };
});
