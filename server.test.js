const getAllMsgs = require('./getAllMsgs')
const getMsgs = require("./getMsgs");
const readMsgs = require("./readMsgs");
const appendMsg = require("./appendMsg");
const deleteMsgs = require("./deleteMsgs");

test("adds new message to user1", () => {
    expect(appendMsg())
})