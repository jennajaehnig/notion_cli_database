# Email Integration with Notion

## Description of program and improvements
This is a program that uses Javascript (Node.js) to update a Notion table with messages sent to and recieved from various users. This application supports sending messages to a designated Recipient as a specified Sender, reading messages for a given Recipient, and deleting messages for a given recipient. A user can read all of their messages or read all of their messages sent from a particular user. A user can delete all of their messages or specify a particular messsage to delete. These actions all use the Notion API to read and write from the database. Timestamps are also included in the database to indicate when messages were sent. The additional functionality that I added beyond the suggested improvements was making a more flexible system of reading and deleting messages such that a user has more control over which messages they read and delete. 

## How to install and run
To run the program type "node server.js" into the terminal/ command line. A message prompting the user to select from a list of options will pop up. For each interaction with the database repeat these steps.

## References used:
- https://developers.notion.com/docs/working-with-databases#filtering-database-pages
- https://developers.notion.com/docs/create-a-notion-integration#getting-started
- https://developers.notion.com/reference/property-value-object#title-property-values
- https://developers.notion.com/reference/post-database-query-filter
- https://developers.notion.com/reference/retrieve-a-database
- https://developers.notion.com/reference/post-page
- https://developers.notion.com/reference/patch-page
- https://developers.notion.com/reference/archive-a-page
- https://stackoverflow.com/questions/61394928/get-user-input-through-node-js-console

## Future improvements:
- The first improvement I would make would be adding a testing suite. I tested various cases on my own through the command line such as:
  - Delete when user has no messages
  - Delete single message from user with multiple messages
  - Delete all messages from user with single message
  - Read when user has no messages
  - Read all messages when user has 1 message
  - Read all messages from particular sender when user has multiple from sender
  - Read all messages from particular sender when user has only one message from sender
  - Send to existing user
  - Send to new user
  While I did do these tests, an improvement would be to create a testing suite with these tests written so others who are interested in using this program know that it works.
- Some other features I would include would be a read implementation that tells a user if any new messages have come in since they last checked the page. Off the top of my head, I would think of using some data structure to store a user's most recent check in time and using the time stamp attribute from the time stamp column to compare.
- To make this function more like a real mail app, login and logout functionality would be helpful as well, although that seemed beyond the scope of this initial assignment.
- Another idea would be to have some system of favoriting senders for each recipient and maybe making a read functionality that lists all messages from all favorited senders. I think this could be done by adding another propterty to the table and filtering messages by the presence of this property. I imagine this would be similar to the way I implemented reading all messages from a particular sender using filtering.

## Design choices:
- One design choice I made was making a generic getMsgs function. This function could get all messages for a particular user or all messages for a particular user from a specified sender. Having this function was helpful to reduce code duplication.
- The decision to make the improvements I did was based on thinking about how a mail app works and what functionality I think would be most useful. Being able to delete many messages or single ones I think is a fundamental email characteristic. I also think users commonly search to find emails from a particular person so I included that behavior in my read functionality.


