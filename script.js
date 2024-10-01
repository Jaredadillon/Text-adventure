//input character name on start
let charName;
while (!charName) {
    charName = prompt("Input Character Name:");
    console.log('Character name: ' + charName);
}

//setup world
let world = {
    'starting room': {
        'description': 'You wake up in a dark cave with a horrible headache. Water slowly drips from the ceiling.<br>You see a light coming from the north.',
        'items': {take: [], look: []},
        'NPC': {},
        'exits': {'north': 'second room'}
    },
    'second room': {
        'description': 'It looks like you are in a prison cell. There is a bed and a bucket in the corner of the room. A torch is hanging high on the wall.<br>There is an exit to the south and to the west.',
        'items': {take: ['key'], look: {'bucket': 'You see a shiny key inside the bucket', 'torch': 'The flames let you see a little in the darkness. Unfortunately it is just out of reach', 'bed': 'I just woke up, I\'m not tired right now.', 'key': 'Where there\'s a key there\'s bound to be a lock.'}},
        'NPC': {},
        'exits': {'south': 'starting room', 'west': 'third room'}
    },
    'third room': {
        'description': 'You are in a tight hallway. A giant iron door is to the north.<br>The way back is to the east.',
        'items': {take: [], look: {'door': 'The door is locked tight. No way through without a key.'}},
        'NPC': {},
        'exits': {'east': 'second room'},
    },
    'fourth room': {
        'description': 'You see an ogre reclining in a chair smoking a pipe. He does not seem concerned by your presence.<br>There is an exit to the south and to the east.',
        'items': {take: [], look: {'ogre': 'Big, fat, and green. So much smoke is coming off of his pipe you feel as if you might choke.'}},
        'NPC': { Name: 'ogre', timesTalked: 0, talk: ['Ogre: "Hello there ' + charName + ', I see you\'ve escaped your cell."', 'You ask who he is and why he is here.<br>Ogre: "My name is Seenee. My job is to make sure you do not escape."', 'You tell him he is not doing a very good job so far.<br>Seenee: "Well it\'s not like you will ever get through the endless maze up ahead."', 'You ask why you were locked up in the first place<br>Seenee: "The wizard Skord wanted you locked up. Dunno why, you don\'t look that dangerous, but I guess that\'s none of my business."', 'You ask if he is stuck here too because of the endless maze.<br>Seenee: "Oh I know the way through. The path is a part of me, it\'s impossible for me to forget. Try all you want, you will never get through. Now stop pestering me."', 'Seenee: "Leave me alone, I\'m busy doing nothing."']}, //name: seenee
        'exits': {'south': 'third room', 'east': 'maze'},
    },
    'maze': {
        'description': 'You enter into the maze. So far so good.',
        'items': {take: [], look: []},
    },
    'surface': {
        'description': 'You made it out of the maze and onto the surface. The fresh air feels nice for a change.<br>There is what looks like a dilapidated castle to the south.',
        'items': {take: [], look: []},
        'exits': {'south': 'castle entrance'}
    },
    'castle entrance': {
        'description': 'The castle looks incredibly ominous in the dark, and the large full moon doesn\'t help either. Bunches of nasty weeds align the front of the castle. To the south on the front wall you see an old wooden door. A flickering light comes through a large window next to the door.<br>You came from the north.',
        'items': {take: ['rocks'], look: {'door': 'The door is blocked by a bunch of rocks', 'window': 'You peer inside through the thick glass. Looks as cozy as a creepy castle can. The light you saw is coming from the fireplace.', 'rock': 'There are some nice hefty ones here. Looks like they could do some serious damage.', 'rocks': 'There are some nice hefty ones here. Looks like they could do some serious damage.'}},
        'exits': {}
    },
    'foyer': {
        'description': 'You are in the foyer. The fireplace is lit with a firepoker sitting next to it. Above it on the mantle is a ornate looking shield.<br>There is a spiral staircase to the west and a hallway to the east. You came in through the north entrance.',
        'items': {take: ['firepoker'], look: {'fireplace': 'Toasty', 'fire': 'Toasy', 'firepoker': 'A long iron poker', 'shield': 'It\'s too high to reach.'}},
        'exits': {'north': 'castle entrance', 'west': 'upstairs', 'east': 'hallway'}
    },
    'hallway': {
        'description': 'You enter the hallway. There is a small vase atop a nightstand. There are voices coming the east, and they sound angry.',
        'items': {take: ['mirror'], look: {'vase': 'The flowers inside smell rotten.', 'nightstand': 'The nightstand is covered in cobwebs. There is a single drawer with a knob on it.', 'drawer': 'You open the drawer. There is a pocket-sized mirror inside.', 'mirror': 'Is that what I look like?', 'flowers': 'No thank you'}},
        'exits': {'west': 'foyer', 'east': 'guard room'}
    },
    'guard room': {
        'description': 'You burst into the room. A group of knights in armor suddenly stop arguing and look at you.<br>"It\'s ' + charName + '! The one Skord wanted locked up. Get him before he escapes!" yells one of the knights.<br>You turn to run and trip on the uneven flooring. Spears suddenly pierce your back.',
        'items': {take: [], look: []},
        'exits': {'': ''}
    },
    'upstairs': {
        'description': 'After ascending the spiral staircase, you see a strange essence moving across most of the floor.<br>The way back down is to the east.',
        'items': {take: [], look: {'essence': 'You concentrate on the strange essence. It is swirling around the floor slowly. It has a captivating purple hue. You lean closer to get a better look. Oops, too far! You fall into the mist-like essence down. down.. down...'}},
        'exits': {'east': 'foyer'}
    },
    'final room': {
        'description': '*Oof*<br>You land on a small floating brick platform. You see what looks like the most intense aurora all around you. A person in dark robes is floating a small distance from you.',
        'items': {take: [], look: {'person': 'He\'s just floating there. He appears to be muttering to himself.'}},
        'NPC': {Name: 'person', timesTalked: 0, talk: ['The robed figure turns around.<br>Robed Figure: "Huh? Who dares disturb the wizard Skord? Wait a minute, you\'re ' + charName + '. I thought I locked you up!"<br>Skord: "No matter, the prophecy will not come true if I have anything to say about it! Prepare to die, ' + charName + '!"<br>Skord begins to charge a lightning spell.', 'Don\'t just stand there, do something!']}
    }
}

//Setup character
let character = {'inventory': [], 'location': 'starting room'};
let lose = true;
document.getElementById('textfield').focus();
addText(world['starting room'].description);
addText("(Type 'help' for a list of actions)");

// Functions used in other functions. not specific to gameplay
//remove an item from an array
function arrayRemove(arr, obj) {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] === obj) {
            arr.splice(i, 1);
            i--;
        }
    }
}

//split input into two keywords
function splitCommand(str) {
    let split = str.split(/\s+/);
    console.log('The input phrase is: ' + split);
    return split
}

//add text block to the screen
function addText(text) {
    let para = document.createElement('p');
    para.innerHTML = text;
    let element = document.getElementById('main_output');
    element.appendChild(para);
    document.getElementById('textfield').value = '';
    window.scrollTo(0, document.body.scrollHeight);
}

// check if two arrays are equal. I will admit I stole this code word for word, most of the other code I found though I repurposed for my own use.
function arrayEquals(a, b) {
    return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

// Functions specific to gameplay
//maze function
let charPath = [];
let correctPath = [ "south", "east", "east", "north", "east", "east" ]
let moves = 0;
function mazePath(lastDirection) {
    
    charPath[moves] = lastDirection;
    moves += 1;
    
    if (moves > 6) {
        addText('You finally admit to yourself you have no idea where you are going.<br>You end up wandering around forever.');
        gameOver();
    } else {   
        if (arrayEquals(charPath, correctPath)) {
            character.location = 'surface';
            addText(world[character.location].description);
        } else {
            addText('This room looks just like the last.')
        }
        
        console.log('Charpath:' + charPath);
        console.log(moves);
    }
}

//move character to a different location
function moveChar(direction) {
    if (direction == 'north' || direction == 'south' || direction == 'east' || direction == 'west') {        
        let currentLocation = character.location;
        if (currentLocation == 'maze') {
            mazePath(direction);
        }
        if (direction in world[currentLocation].exits) {
            character.location = world[currentLocation].exits[direction];
            addText(world[character.location].description);
            
            console.log('there is an exit to the ' + direction);
            console.log('the current location is ' + character.location);
            
            if (character.location == 'guard room') {
                gameOver();
            }
            
        } else {
            addText('You cannot go that way');
        }
    } else {
        addText('Sorry I don\'t understand that');
    }
}

//gives a description about an object
function lookAt(POI) {
    if (POI in world[character.location].items.look) {
        if ((POI == 'person') && world['final room'].NPC.timesTalked > 0) {
            addText('Hmm... It looks like he is about to launch a lightning spell at you.');
            return;
        }
        addText(world[character.location].items.look[POI]);
        if (POI == 'essence') {
            character.location = 'final room';
            addText(world[character.location].description);
        }
    } else {
        addText('There is nothing there');
    }
}

//talk to a character
function talkTo(person) {
    let NPC = world[character.location].NPC
    if (person == NPC.Name) {
        addText(NPC.talk[NPC.timesTalked]);
        if (NPC.timesTalked < (NPC.talk.length - 1)) {
            NPC.timesTalked += 1;
        }
        console.log(NPC.timesTalked);
        console.log(NPC.talk.length);
    } else {
        addText('No response');
    }
}

//remove an item from the world and place it in players inventory
function takeItem(item) {
    if (item == world[character.location].items.take) {
        arrayRemove(world[character.location].items.take, item);
        character.inventory.push(item);
        addText('You obtained an item: ' + item);
    } else {
        addText('You cannot take that');
    }
}

// use an item under specific circumstances
function useItem(item) {
    if (character.inventory.includes(item) && item === 'key' && character.location === 'third room') {
        addText('You unlock the door. It screeches as you open it.');
        world['third room'].exits.north = 'fourth room';
        arrayRemove(character.inventory, item);
    } else if (character.inventory.includes(item) && item === 'rocks' && character.location === 'castle entrance') {
        addText('You throw a rock with all of your strength at the window, shattering it.');
        world['castle entrance'].exits.south = 'foyer';
        arrayRemove(character.inventory, item);
    } else if (character.inventory.includes(item) && item === 'firepoker' && character.location === 'foyer') {
        addText('You reach up and knock the shield off of the wall.');
        character.inventory.push('shield');
        addText('You obtained an item: shield');
        arrayRemove(character.inventory, item);
    } else if (character.inventory.includes(item) && item === 'shield' && character.location === 'final room') {
        addText('You pull out your shield. Skord unleashes his lightning spell. It disintegrates your shield, along with your body.');
        gameOver();
    } else if (character.inventory.includes(item) && item === 'mirror' && character.location === 'final room') {
        addText('Skord shoots lightning at you. You pull out the mirror and reflect the spell back at him!<br>Skord: "AAEYIIEEE!! Curses! How could I be defeated by a loser like you? This isn\'t the end I swear it!"<br><br>You have defeated the evil wizard. Your adventure is now complete.<br>YOU WIN!<br>Thanks for playing!');
        lose = false;
        gameOver();
    } else if (character.inventory.includes(item)) {
        addText('You cannot use that here');
    } else {
        addText('You do not have that item');
    }
}

//print current player inventory
function printInventory() {
    if (character.inventory.length == 0) {
        addText('You do not have anything');
    } else {
        addText('You have: ' + character.inventory.join(', '));
    }
}

//show controls/actions
function displayHelp() {
    let help = ['-- List of Actions --', "'go' (direction) - Move into a different room", "'look' (object) - Get a description for an object", "'take' (object) - Add an item to your inventory", "'bag' - Check your inventory", "'use' (item) - Use an item from your inventory in the current room", "'talk' (character) - Get dialog from a character", "'quit' - End the game", "'help' - Displays controls", "-- How to Play --", "This game uses a two word input method. For example: 'look bed' will let you look at the bed, while 'look at bed' will throw an error.", "'bag', 'quit', and 'help' are single word commands.", "The directions of movement are: 'north', 'south', 'east', and 'west'.", "When talking to someone, use the description given to talk to them e.g. 'talk person' instead of 'talk Bobby' (Because you don't know their name before you speak to them)", "Stuck? Try looking around at things and see what happens."];
    help.forEach(element => {
        addText(element);
    });
}

//game over
function gameOver() {
    if (lose) {
        addText('GAME OVER');
    }
    addText('Would you like to play again?');
    let textBox = document.getElementById('textfield');
    let yes = document.getElementById('playAgain');
    let no = document.getElementById('gameOver');
    textBox.style.display = 'none';
    yes.style.display = 'flex';
    no.style.display = 'flex';
}

//quit game
function quitGame() {
    let yes = document.getElementById('playAgain');
    let no = document.getElementById('gameOver');
    yes.style.display = 'none';
    no.style.display = 'none';
    addText('Womp womp, maybe next time');
}


//get input
let input = document.getElementById("textfield");

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
    }
});

function getInputValue() {
    let inputVal = document.getElementById("textfield").value;
    if (inputVal == '') { return };
    addText('>> ' + inputVal);
    inputVal = inputVal.toLowerCase();
    command = splitCommand(inputVal);

    action = command[0];
    object = command[1];
    console.log('action: ' + action + ', object: ' + object);

    if (!object) {
        switch (action) {
            case 'go':
                addText('go where?');
                break;
            case 'look':
                addText('look at what?');
                break;
            case 'take':
                addText('take what?');
                break;
            case 'talk':
                addText('talk to who?');
                break;
            case 'bag':
                printInventory();
                break;
            case 'help':
                displayHelp();
                break;
            case 'quit':
                quitGame();
                break;
            default:
                addText('Sorry I don\'t understand that');
                break;
        }
    } else {
        switch (action) {
            case 'go':
                moveChar(object);
                break;
            case 'look':
                lookAt(object);
                break;
            case 'talk':
                talkTo(object);
                break;
            case 'take':
                takeItem(object);
                break;
            case 'use':
                useItem(object);
                break;
            default:
                addText('Sorry I don\'t understand that')
        }
    }
}