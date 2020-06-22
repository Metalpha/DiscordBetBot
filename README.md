# DiscordBetBot
A Discord Bot for moneymatches. Personnal project, absolutely not failproof.

## Usage
Run the bot using Node Javascript environment.

### Setup
Replace the .env token with your bot's token, and rename **dist.env** in **.env**.
Rename **moneymatch.dist.json** in **moneymatch.json**.

Start the bot by running
```Node bot.js```

### Commands
#### Help
`%help [command]`

* `[command]` is the command you need help on (optionnal)

Gives you a list of all commands in DM. If a command is specified, gives the usage for this command.
#### Create a moneymatch
`%moneymatch <value> <length> [pseudo]`

* `<value>` is the ammount you decide to bet
* `<length>` is the duration of the match, only use odd numbers
* `[pseudo]` is your opponent (optionnal)

The bot will confirm the match creation and return the **id** you'll use later. You can also use `%mm`.
#### Create a drink match
`%drinkmatch <length> [pseudo]`

* `<length>` is the duration of the match, only use odd numbers
* `[pseudo]` is your opponent (optionnal)

The bot will confirm the match creation and return the **id** you'll use later. You can also use `%dm`.
#### List all matches
`%list`

Gives a complete list of all matches with main details.
#### Sidebet on a match
`%sidebet <id> <value> <player> <member>`

* `<id>` is the match id
* `<value>` is the sidebet value
* `<player>` is the player you bet on
* `<member>` is the guild member you make the bet with

The bot will confirm the sidebet creation and return the **id** you'll use later. You can also use `%sb`.
#### Get info on a match
`%info <id>`

* `<id>` is the match id

The bot will respond with an embed message giving all info on a match.

![Image of match info](https://i.imgur.com/WhB9AcC.png)
#### Clear all matches
`%clear`
#### Delete a match by ID
`%delete <id>`

* `<id>` is the match id

The bot will confirm the match deletion. You can also use `%remove`.
#### Delete a sidebet
`%delete <idmatch> <idsb>`

* `<idmatch>` is the match id
* `<idsb>` is the sidebet id

The bot will confirm the sidebet deletion.
#### Others commands
More commands are available for devs use. They are listed and explained further in the code.
