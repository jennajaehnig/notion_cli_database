require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

console.log(process.env);

const prompt = require("prompt-sync")();

const intro_msg =
  "Welcome to NotionMail!\n - send: Send mail to a user.\n - read all: Check all messages.\n - read from: Check messages from a particular sender.\n - delete: Delete messages.";

async function appendMsg(sender, recipient, msg) {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: "d85f6ded53654e29b1ca078ce35d5534",
    },
    properties: {
      Message: {
        title: [
          {
            text: {
              content: msg,
            },
          },
        ],
      },
      Sender: {
        rich_text: [
          {
            text: {
              content: sender,
            },
          },
        ],
      },
      Recipient: {
        rich_text: [
          {
            text: {
              content: recipient,
            },
          },
        ],
      },
    },
  });
}

async function getAllMsgs(user) {
  const databaseId = "d85f6ded53654e29b1ca078ce35d5534";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Recipient",
      rich_text: {
        equals: user,
      },
    },
  });
  return response;
}

async function getMsgs(recipient, sender) {
  const databaseId = "d85f6ded53654e29b1ca078ce35d5534";
  const response = await notion.databases.query({
    database_id: databaseId,
    //   filter = {
    filter: {
      and: [
        {
          property: "Recipient",
          rich_text: {
            equals: recipient,
          },
        },
        {
          property: "Sender",
          rich_text: {
            equals: sender,
          },
        },
      ],
    },
    //   },
  });
  return response;
}

async function readMsgs(response, sender) {
  const count = response.results.length;
  console.log(`Messages (${count}): `);
  if (count == 0) {
    if (sender) console.log(`You have no messages from ${sender}!\n`);
    else console.log(`You have no messages!\n`);
  } else {
    for (const key in response.results) {
      const sender =
        response.results[key].properties.Sender.rich_text[0].plain_text;
      const msg = response.results[key].properties.Message.title[0].plain_text;
      console.log(`Message ${key}:\n\tfrom: ${sender}\n\t${msg}\n`);
    }
  }
}

async function deleteMsgs(response) {
  const count = response.results.length;
  const map = new Map();
  if (count == 0) {
    console.log("You have no messages to delete.\n");
    return;
  } else {
    for (const key in response.results) {
      const sender =
        response.results[key].properties.Sender.rich_text[0].plain_text;
      const msg = response.results[key].properties.Message.title[0].plain_text;
      console.log(`Message ${key}:\n\tfrom: ${sender}\n\t${msg}\n`);
      const id = response.results[key].id;
      map.set(key, id);
    }
  }

  const msgs_to_delete = prompt(
    'Which message would you like to delete? (Type "all" or the message ID): '
  );
  if (msgs_to_delete.toLowerCase() == "all") {
    map.forEach(async (value, key) => {
      pageId = map.get(key);
      notion.pages.update({
        page_id: pageId,
        archived: true, // or in_trash: true
      });
      map.delete(key);
    });
  } else {
    try {
      pageId = map.get(msgs_to_delete);
      await notion.pages.update({
        page_id: pageId,
        archived: true, // or in_trash: true
      });
      map.delete(pageId);
    } catch (error) {
      console.error("Error deleting messages: ", error);
    }
  }
}

async function main() {
  console.log(intro_msg);
  const cmd = prompt("Selection: ");
  if (cmd == "send") {
    const sender = prompt("Sender: ");
    const recipient = prompt("Recipient: ");
    const msg = prompt("Message: ");
    appendMsg(sender, recipient, msg);
  } else if (cmd == "read all") {
    const user = prompt("User: ");
    const msgs = await getAllMsgs(user);
    readMsgs(msgs, null);
  } else if (cmd == "read from") {
    const recipient = prompt("Recipient: ");
    const sender = prompt("Sender: ");
    const msgs = await getMsgs(recipient, sender);
    readMsgs(msgs, sender);
  } else if (cmd == "delete") {
    const user = prompt("User: ");
    const msgs = await getAllMsgs(user);
    deleteMsgs(msgs);
  }
}

main();

(module.exports = deleteMsgs), readMsgs, getMsgs, getAllMsgs, appendMsg;
