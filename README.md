# Node
Sapiens War Bot

This is for the following Intra Organisation Company

Our game goes by many different names, but “Standoff” or ”James Bond”
are the most widely known. (to see a video explanation here).
The game plays out as a series of rounds like “rock, paper, scissors”. The
goal is to be the last player standing. In each round you choose one
action, out of three possible actions:
1. Shoot - point your guns at an opponent of your choice;
2. Reload – holster your two guns by your waist;
3. Block – place your two arms in an x-shape across your chest;
Rules:
1. Each player is a bot function that can be written in any
development language you choose. The bot can choose one of the
possible three actions, and only one.
The bot should decide which action to provide by feedback given
after each turn.
2. Each player has 3 lives. Once all of them are spent- the player is out
of the game. After each tournament, if a player wins, lives will reset
back to 3.
3. As mentioned, each player has by default actions
‘Shoot’=1, ‘Block’=0.
4. Every player always uses dual pistols and both pistols can hold only
one bullet, that will require you to reload. If a player used the bullet
(with the “shoot” action) then the only actions he may use next are
either ‘block’ or ‘reload’.
5. Each player can use the ‘Block’ action maximum 3 times in a row,
while the gun is empty or full. After a player used ‘Reload’ or ‘Shoot’,
they gain 3 more possible ‘Block’ actions.
6. Once the gun is full (with 1 bullet) and a player reloads again- it still
leaves 1 bullet, there is no option to save extra shots.
7. If a player already spent 3 ‘Block’ actions and will try to ‘Block’
again- the action will be skipped, and after each of the following
‘Block’ actions, the player will lose one life.
www.sapiens.com
2
8. If a player uses the ‘Shoot’ action several times, for each sequence
a ‘life’ will be lost.
How the tournament works:
• The tournament is defined as the time when all players are playing,
until we have the last winner.
• If even number of players have entered the game, all the players
will be divided into pairs randomly and start playing.
• In case the number of players is not even, one player will wait until
the first winner appears and then they will challenge each other.
• The number of total tournaments depends on the number of
players who joined the game.
How each turn works:
The turn is a sequence of requests for bot functions (only two bots at a
time).
The first turn in the tournament is with body:
============================================================
Request from game to BOT function:
Method: POST
{
“game”: “begin”
}
Which mean that the tournament has started and the player should return
the first action.
============================================================
An example of a response from the bot function:
Method: POST
{
“action”: “shoot”
}
A player may receive “game” several times with status “begin” if the
player won in previous tournament, but if the player lost then is { “game”:
“game over” }.will be received
The winner will receive { “game”: “winner” }.
www.sapiens.com
3
While the game is going on, the player can receive feedback from the
previous clash.
The feedback will be also in JSON format and will contain the following
parameters:
1. “playerAction”: the previous action the player did;
2. “playerLife”: the rest of lives the player has;
3. “opponentAction”: the previous action the opponent did;
4. “opponentLife”: the rest of lives the opponent has;
5. “result”: “not hurt”, “hurt”, “killed”.
In real request it should look like:
============================================================
BOT function response:
Method: POST
Body: {
“action”: “shoot”
}
============================================================
Request from game:
Method: POST
Body: {
“playerAction”: “shoot”,
“playerLife”: 3,
“opponentAction”: “block”,
“opponentLife”: 3,
“result”: “not hurt”
}
In schema above, we may see that the competitor has blocked the
player’s attack, and no one was hurt. But the next possible action of the
bot may be only “Block” or “Reload”.
The names of properties are the same as explained here.
Following this state, the player should decide what to do next.

 
www.sapiens.com
4
Force Majeure:
If the bot function is not able to respond because of CORS or any other
issues in the appropriate time, the player will be automatically declared
dead and the opponent will be the winner.
To enter the game, we need to receive the name of the player and
endpoint.
Like:
{
“name”: “John Brice”,
“endpoint”: “http://aws.azure. .../bot”
}
The results of the game will be published on a web page.
