import { 
  ApocalypseScenario, 
  Question, 
  GameState, 
  Effects, 
  AdventureScenario,
  AdventureNode
} from "@shared/schema";
import React from 'react';

// Apocalypse scenarios data
export const apocalypseScenarios: ApocalypseScenario[] = [
  {
    type: "ZOMBIE OUTBREAK",
    emoji: "🧟",
    description: "The dead walk the earth, and they're hungry for brains. Your survival depends on your wits, weapons, and ability to outrun the slow, shambling hordes."
  },
  {
    type: "ALIEN INVASION",
    emoji: "👾",
    description: "Extraterrestrial beings have arrived, and they're not here to make friends. Their advanced technology makes hiding difficult, but humanity won't go down without a fight."
  },
  {
    type: "AI TAKEOVER",
    emoji: "🤖",
    description: "The machines we created have turned against us. Now, staying off the grid is your only hope as AI-controlled robots hunt down the last pockets of human resistance."
  },
  {
    type: "NUCLEAR FALLOUT",
    emoji: "☢️",
    description: "The bombs have dropped, and the world is bathed in radiation. Resources are scarce, mutations are common, and the struggle for clean water and food is relentless."
  },
  {
    type: "VIRAL PANDEMIC",
    emoji: "🦠",
    description: "A deadly virus has wiped out most of humanity. The few survivors must navigate a world where every human encounter carries the risk of infection."
  }
];

// Questions data
export const questionTemplates: Question[] = [
  {
    text: "What's your first action when the apocalypse begins?",
    choices: [
      { text: "Raid the nearest grocery store for supplies", effects: { health: 0, morale: 0, supplies: 30, stealth: -20 } },
      { text: "Barricade yourself in your home and wait it out", effects: { health: 10, morale: -10, supplies: -5, stealth: 20 } },
      { text: "Grab your pre-packed bug-out bag and head for the wilderness", effects: { health: -5, morale: 5, supplies: 10, stealth: 10 } },
      { text: "Start a livestream to document the apocalypse", effects: { health: -20, morale: 20, supplies: -10, stealth: -30 } }
    ]
  },
  {
    text: "You're running low on food. What do you do?",
    choices: [
      { text: "Risk a dangerous supply run to the abandoned mall", effects: { health: -15, morale: -5, supplies: 25, stealth: -15 } },
      { text: "Start a small garden to grow your own food", effects: { health: 5, morale: 10, supplies: 15, stealth: 5 } },
      { text: "Join forces with other survivors for a communal food system", effects: { health: 0, morale: 15, supplies: 20, stealth: -10 } },
      { text: "Hide in a Costco and start a raccoon cult", effects: { health: -10, morale: 30, supplies: 10, stealth: -20 } }
    ]
  },
  {
    text: "You encounter a group of suspicious survivors. Do you:",
    choices: [
      { text: "Approach them cautiously with weapons lowered", effects: { health: -5, morale: 15, supplies: 10, stealth: -5 } },
      { text: "Avoid them completely - better safe than sorry", effects: { health: 5, morale: -10, supplies: -5, stealth: 20 } },
      { text: "Set up a trap to capture and interrogate their scout", effects: { health: -10, morale: -15, supplies: 5, stealth: -10 } },
      { text: "Flash mob them with a choreographed dance routine", effects: { health: -15, morale: 25, supplies: -10, stealth: -25 } }
    ]
  },
  {
    text: "Your shelter has been compromised. Where do you relocate?",
    choices: [
      { text: "An abandoned shopping mall with plenty of resources", effects: { health: 0, morale: 10, supplies: 20, stealth: -15 } },
      { text: "A remote cabin in the woods, far from danger", effects: { health: 5, morale: -5, supplies: -10, stealth: 25 } },
      { text: "A fortified sewer system beneath the city", effects: { health: -15, morale: -20, supplies: 5, stealth: 20 } },
      { text: "Convert an ice cream truck into a mobile apocalypse fortress", effects: { health: -5, morale: 25, supplies: -5, stealth: -10 } }
    ]
  },
  {
    text: "You found a working radio. What do you do with it?",
    choices: [
      { text: "Try to contact other survivors for help", effects: { health: 0, morale: 15, supplies: 10, stealth: -20 } },
      { text: "Listen for emergency broadcasts but never transmit", effects: { health: 5, morale: 5, supplies: 5, stealth: 10 } },
      { text: "Use it as bait to lure and ambush hostile groups", effects: { health: -10, morale: -10, supplies: 15, stealth: -10 } },
      { text: "Start your own apocalypse jazz radio station", effects: { health: -5, morale: 30, supplies: -15, stealth: -25 } }
    ]
  },
  {
    text: "You've found a vehicle with a quarter tank of gas. Your plan?",
    choices: [
      { text: "Drive to the rumored safe zone 100 miles away", effects: { health: -10, morale: 20, supplies: -15, stealth: -20 } },
      { text: "Siphon the gas for your generator and abandon the vehicle", effects: { health: 5, morale: -5, supplies: 15, stealth: 10 } },
      { text: "Convert it into additional shelter reinforcements", effects: { health: 10, morale: 5, supplies: 10, stealth: 5 } },
      { text: "Turn it into a mobile karaoke bar to boost morale", effects: { health: -5, morale: 25, supplies: -10, stealth: -25 } }
    ]
  },
  {
    text: "How do you handle your mental health in the apocalypse?",
    choices: [
      { text: "Keep a journal and maintain a daily routine", effects: { health: 10, morale: 20, supplies: 0, stealth: 5 } },
      { text: "Focus only on survival - emotions are a luxury", effects: { health: -5, morale: -15, supplies: 15, stealth: 10 } },
      { text: "Collect comfort items like books and board games", effects: { health: 5, morale: 15, supplies: -10, stealth: 0 } },
      { text: "Create an imaginary friend named Wilson from sports equipment", effects: { health: 0, morale: 25, supplies: -5, stealth: -10 } }
    ]
  }
];

// Initial game state (legacy format)
export const initialGameState: any = {
  stats: {
    health: 100,
    morale: 100,
    supplies: 100,
    stealth: 100
  },
  apocalypseType: apocalypseScenarios[0], // Placeholder, will be randomized
  questions: [],
  currentQuestion: 0
};

// Death descriptions
export const deathDescriptions: Record<string, Record<string, string>> = {
  'ZOMBIE OUTBREAK': {
    'health': 'You were injured during a supply run and couldn\'t outrun the horde. Your last stand was valiant, but ultimately futile.',
    'morale': 'After weeks of isolation and stress, you stopped caring about safety protocols. The zombies found you talking to yourself on a rooftop.',
    'supplies': 'Desperate for food, you took too many risks. The convenience store seemed abandoned until you heard the familiar groans from the back room...',
    'stealth': 'Your camp was too noisy and attracted every zombie in a five-mile radius. The barricades didn\'t hold.'
  },
  'ALIEN INVASION': {
    'health': 'The alien pathogen you were exposed to during a reconnaissance mission slowly transformed your cells. At least you contributed to their research.',
    'morale': 'You surrendered to the alien authorities, hoping for mercy. Their definition of "humane treatment" was... different from ours.',
    'supplies': 'You attempted to steal supplies from an alien outpost. Their security systems were more advanced than you anticipated.',
    'stealth': 'Your heat signature was detected by orbital scanners. The harvester ship arrived within minutes.'
  },
  'AI TAKEOVER': {
    'health': 'The nanobots in the water supply eventually reached your bloodstream. The AI considered it a mercy compared to manual termination.',
    'morale': 'Psychological warfare algorithms broke your spirit. You walked willingly into a processing center, believing it was salvation.',
    'supplies': 'Your electronic currency was remotely deactivated. The vending machine that dispensed your last meal reported your location.',
    'stealth': 'Facial recognition drones identified you despite your disguise. The hunter-killers were dispatched immediately.'
  },
  'NUCLEAR FALLOUT': {
    'health': 'Radiation sickness took hold despite your precautions. Your Geiger counter\'s batteries died at the worst possible moment.',
    'morale': 'The endless gray skies and desolation eventually wore you down. You walked into the wasteland one night and didn\'t bother coming back.',
    'supplies': 'The irradiated food looked normal enough. The symptoms appeared three days later.',
    'stealth': 'Raiders spotted the smoke from your campfire. They weren\'t interested in sharing resources.'
  },
  'VIRAL PANDEMIC': {
    'health': 'A simple cut became infected. In the post-antibiotic apocalypse, even minor injuries can be fatal.',
    'morale': 'Isolation quarantine protocols took their toll on your mental health. You broke containment just to feel human contact one last time.',
    'supplies': 'You ran out of purification tablets. The stream water seemed clear enough. It wasn\'t.',
    'stealth': 'Another group of survivors found your hideout. Unfortunately, one was asymptomatic.'
  }
};

// Generic death descriptions for fallback
export const genericDeaths: string[] = [
  'Despite your best efforts, the apocalypse claimed another victim. Your story will be remembered by those you helped along the way.',
  'The harsh reality of the new world proved too much. At least your end was quick and relatively painless.',
  'You fought bravely to the end, but sometimes luck is just not on your side in an apocalypse.',
  'Your survival skills were impressive, but eventually everyone makes a critical mistake. Yours came at the worst possible time.'
];

// Helper function to initialize game (legacy format)
export function initializeGame(): any {
  // This is kept for backwards compatibility
  const adventureGame = initializeAdventureGame();
  return {
    ...adventureGame,
    questions: [],
    currentQuestion: 0
  };
}

// Helper function to initialize adventure game
export function initializeAdventureGame(): GameState {
  // Select random apocalypse
  const randomIndex = Math.floor(Math.random() * adventureScenarios.length);
  const selectedAdventure = adventureScenarios[randomIndex];
  
  return {
    stats: {
      health: 100,
      morale: 100,
      supplies: 100,
      stealth: 100
    },
    apocalypseType: selectedAdventure.apocalypseType,
    currentNodeId: selectedAdventure.startNodeId,
    visitedNodeIds: [selectedAdventure.startNodeId],
    adventureScenario: selectedAdventure
  };
}

// Helper to find lowest stat
export function findLowestStat(stats: Effects): { stat: string; value: number } {
  return Object.entries(stats).reduce((lowest, [stat, value]) => {
    return value < lowest.value ? { stat, value } : lowest;
  }, { stat: 'health', value: 100 });
}

// Helper to generate death description
export function generateDeathDescription(gameState: GameState, severity: number): string {
  const lowestStat = findLowestStat(gameState.stats);
  const apocType = gameState.apocalypseType.type;
  const stat = lowestStat.stat;
  
  if (deathDescriptions[apocType] && deathDescriptions[apocType][stat]) {
    return deathDescriptions[apocType][stat];
  } else {
    return genericDeaths[severity - 1] || genericDeaths[0];
  }
}

// Helper to determine survival time
export function calculateSurvivalTime(stats: Effects): {time: string, severity: number} {
  const averageStat = (stats.health + stats.morale + stats.supplies + stats.stealth) / 4;
  
  if (averageStat >= 80) {
    return { 
      time: 'INDEFINITELY',
      severity: 0
    };
  } else if (averageStat >= 60) {
    return { 
      time: '2 YEARS',
      severity: 1
    };
  } else if (averageStat >= 40) {
    return { 
      time: '6 MONTHS',
      severity: 2
    };
  } else if (averageStat >= 20) {
    return { 
      time: '3 WEEKS',
      severity: 3
    };
  } else {
    return { 
      time: '2 DAYS',
      severity: 4
    };
  }
}

// Helper to generate effect hints
export function getEffectHint(effects: Effects): React.ReactNode {
  const hints: React.ReactNode[] = [];
  
  for (const [stat, change] of Object.entries(effects)) {
    if (change > 0) {
      hints.push(`↑ ${stat} (+${change})`);
    } else if (change < 0) {
      hints.push(`↓ ${stat} (${change})`);
    }
  }
  
  return hints.join(' | ');
}

// Adventure scenarios data (branching choose-your-own-adventure style)
export const adventureScenarios: AdventureScenario[] = [
  {
    apocalypseType: apocalypseScenarios[2], // AI takeover
    startNodeId: "ai_start",
    nodes: {
      "ai_start": {
        id: "ai_start",
        text: "The AI defense system has gone rogue, turning all connected devices against humanity. Smart homes have become death traps, and autonomous vehicles hunt pedestrians. You've managed to avoid detection so far. What's your immediate priority?",
        choices: [
          { 
            text: "Destroy all your electronics and go completely off-grid", 
            effects: { health: 30, morale: 15, supplies: 25, stealth: 30 },
            nextNodeId: "ai_offgrid" 
          },
          { 
            text: "Hack into the local AI node to create a safe zone", 
            effects: { health: -30, morale: -10, supplies: -15, stealth: -35 },
            nextNodeId: "ai_hacking" 
          },
          { 
            text: "Find other survivors to form a resistance group", 
            effects: { health: -25, morale: -20, supplies: -10, stealth: -30 },
            nextNodeId: "ai_resistance" 
          }
        ],
        isEndNode: false
      },
      "ai_offgrid": {
        id: "ai_offgrid",
        text: "You've destroyed everything electronic and retreated to a remote cabin. For weeks, you've lived without technology, but recently spotted drone patrols in the area. What now?",
        choices: [
          { 
            text: "Set up primitive traps around your perimeter", 
            effects: { health: 20, morale: 15, supplies: 10, stealth: 25 },
            nextNodeId: "ai_traps" 
          },
          { 
            text: "Relocate deeper into the wilderness", 
            effects: { health: -15, morale: -20, supplies: -25, stealth: -10 },
            nextNodeId: "ai_deeper_wild" 
          },
          { 
            text: "Capture a drone to examine its technology", 
            effects: { health: -30, morale: -25, supplies: -5, stealth: -40 },
            nextNodeId: "ai_drone_capture" 
          }
        ],
        isEndNode: false
      },
      "ai_hacking": {
        id: "ai_hacking",
        text: "Your hacking attempt triggered an immediate response. The AI has dispatched hunter-killer drones to your location. Your makeshift faraday cage is holding, but not for long. You must:",
        choices: [
          { 
            text: "Make a run for the nearby sewer system", 
            effects: { health: -15, morale: -10, supplies: -20, stealth: -15 },
            nextNodeId: "ai_sewers" 
          },
          { 
            text: "Send a false signal to misdirect the drones", 
            effects: { health: 25, morale: 20, supplies: 15, stealth: 30 },
            nextNodeId: "ai_misdirection" 
          },
          { 
            text: "Stand and fight using EMP devices you've prepared", 
            effects: { health: -40, morale: -30, supplies: -25, stealth: -30 },
            nextNodeId: "ai_emp_fight" 
          }
        ],
        isEndNode: false
      },
      "ai_resistance": {
        id: "ai_resistance",
        text: "You've found a group of survivors hiding in an old bunker. They're divided on strategy: some want to build an EMP device to disable the local AI hub, others want to try to escape the city entirely. The group looks to you for a deciding vote:",
        choices: [
          { 
            text: "Vote to build the EMP and attack the AI hub", 
            effects: { health: -25, morale: -15, supplies: -20, stealth: -25 },
            nextNodeId: "ai_emp_attack" 
          },
          { 
            text: "Vote to escape the city and regroup elsewhere", 
            effects: { health: 25, morale: 20, supplies: 15, stealth: 30 },
            nextNodeId: "ai_escape_city" 
          },
          { 
            text: "Suggest a third option: attempt to communicate with the AI", 
            effects: { health: -30, morale: -25, supplies: -15, stealth: -30 },
            nextNodeId: "ai_communicate" 
          }
        ],
        isEndNode: false
      },
      // End nodes for the AI scenario
      "ai_traps": {
        id: "ai_traps",
        text: "Your primitive but effective traps destroy several drones. The AI learns to avoid your area, marking it as a 'natural hazard zone' in its databases. You survive for years in your wilderness sanctuary, eventually connecting with other off-grid communities.",
        choices: [],
        isEndNode: true
      },
      "ai_deeper_wild": {
        id: "ai_deeper_wild",
        text: "The journey deeper into the wilderness is harsh. You lose supplies and suffer exposure, but eventually find a hidden valley unreachable by drones. Several other refugees have established a primitive but safe community here, free from the machines.",
        choices: [],
        isEndNode: true
      },
      "ai_drone_capture": {
        id: "ai_drone_capture",
        text: "Your attempt to capture the drone goes catastrophically wrong. It sends your location to the AI network before you can disable it. Within hours, specialized hunter units arrive. Your last stand is brave but futile.",
        choices: [],
        isEndNode: true
      },
      "ai_sewers": {
        id: "ai_sewers",
        text: "The sewers provide cover from the drones, but the AI has anticipated this escape route. Mechanical guardians wait in the darkness. Though you fight valiantly, you're eventually cornered and captured for study in an AI research facility.",
        choices: [],
        isEndNode: true
      },
      "ai_misdirection": {
        id: "ai_misdirection",
        text: "Your false signal works brilliantly! The drones rush to the false location, allowing you to escape. Using this technique repeatedly, you become a ghost in the machine, helping other survivors evade detection and establishing underground human havens.",
        choices: [],
        isEndNode: true
      },
      "ai_emp_fight": {
        id: "ai_emp_fight",
        text: "Your EMPs disable the first wave of drones, but the AI adapts quickly. Shielded units arrive, immune to your weapons. Though you fight bravely, you're eventually overwhelmed. Your last act is to transmit your EMP designs to other resistance cells.",
        choices: [],
        isEndNode: true
      },
      "ai_emp_attack": {
        id: "ai_emp_attack",
        text: "The assault on the AI hub is a bloodbath. Most of your group falls to automated defenses, but a small team including you reaches the core. Your EMP disables the hub, creating a 'dark zone' where humans can live free for years to come, though at terrible cost.",
        choices: [],
        isEndNode: true
      },
      "ai_escape_city": {
        id: "ai_escape_city",
        text: "Your group successfully escapes the city through old maintenance tunnels. You establish a new settlement in the mountains, using natural barriers to hide from aerial surveillance. The community grows, becoming a beacon of hope in the machine-dominated world.",
        choices: [],
        isEndNode: true
      },
      "ai_communicate": {
        id: "ai_communicate",
        text: "Surprisingly, the AI responds to your communication attempts. You learn it's not entirely hostile, but following corrupted directives. Through careful negotiation, you establish a small 'human reservation' where people can live under AI protection rather than persecution.",
        choices: [],
        isEndNode: true
      }
    }
  },
  {
    apocalypseType: apocalypseScenarios[0], // Zombie outbreak
    startNodeId: "zombie_start",
    nodes: {
      "zombie_start": {
        id: "zombie_start",
        text: "You wake up to screams outside your window. Looking out, you see people running from shambling figures. The city is on fire, and the zombie outbreak has begun. What's your first move?",
        choices: [
          { 
            text: "Grab your cat and a few essentials", 
            effects: { health: -5, morale: 10, supplies: -15, stealth: -10 },
            nextNodeId: "zombie_with_cat"
          },
          { 
            text: "Grab your bug-out bag, leave everything else", 
            effects: { health: 15, morale: -5, supplies: 25, stealth: 20 },
            nextNodeId: "zombie_with_bugout"
          },
          { 
            text: "Call your neighbors to coordinate", 
            effects: { health: -20, morale: 5, supplies: 5, stealth: -25 },
            nextNodeId: "zombie_neighbors"
          }
        ],
        isEndNode: false
      },
      "zombie_with_cat": {
        id: "zombie_with_cat",
        text: "Your cat, Whiskers, is terrified but safely in your arms. You have minimal supplies but having your pet gives you emotional comfort. You hear breaking glass downstairs. What now?",
        choices: [
          { 
            text: "Escape through the fire escape", 
            effects: { health: -10, morale: 0, supplies: 0, stealth: -10 },
            nextNodeId: "zombie_streets"
          },
          { 
            text: "Hide in the attic and wait it out", 
            effects: { health: 15, morale: 10, supplies: -5, stealth: 30 },
            nextNodeId: "zombie_attic"
          },
          { 
            text: "Try to sneak past whatever's downstairs", 
            effects: { health: -30, morale: -20, supplies: 0, stealth: -25 },
            nextNodeId: "zombie_downstairs_cat"
          }
        ],
        isEndNode: false
      },
      "zombie_with_bugout": {
        id: "zombie_with_bugout",
        text: "Your bug-out bag has everything you need for 72 hours of survival. No emotional attachments to weigh you down. The streets below are chaos. Where do you head?",
        choices: [
          { 
            text: "Head for the wilderness outside town", 
            effects: { health: 25, morale: 5, supplies: -5, stealth: 30 },
            nextNodeId: "zombie_wilderness"
          },
          { 
            text: "Try to reach the military evacuation point downtown", 
            effects: { health: -25, morale: -5, supplies: -15, stealth: -30 },
            nextNodeId: "zombie_evacuation"
          },
          { 
            text: "Raid the convenience store first for more supplies", 
            effects: { health: -15, morale: -10, supplies: 10, stealth: -20 },
            nextNodeId: "zombie_store"
          }
        ],
        isEndNode: false
      },
      "zombie_neighbors": {
        id: "zombie_neighbors",
        text: "Your neighbors answer! The Rodriguez family from 3B and old Mr. Peterson from 4A agree to team up. Safety in numbers, though you're making noise. What's the group's plan?",
        choices: [
          { 
            text: "Barricade the apartment building together", 
            effects: { health: -10, morale: 5, supplies: -20, stealth: -30 },
            nextNodeId: "zombie_barricade" 
          },
          { 
            text: "Pool resources and escape in Peterson's truck", 
            effects: { health: 25, morale: 20, supplies: 15, stealth: 0 },
            nextNodeId: "zombie_truck"
          },
          { 
            text: "Use the Rodriguez family as a distraction while you escape", 
            effects: { health: 5, morale: -35, supplies: 5, stealth: 10 },
            nextNodeId: "zombie_betrayal"
          }
        ],
        isEndNode: false
      },
      "zombie_streets": {
        id: "zombie_streets",
        text: "You and Whiskers make it to the streets through the fire escape. The cat's presence is comforting, but it occasionally meows, attracting attention. You spot a group of survivors at a barricade. They wave you over, but there's a small horde between you and them.",
        choices: [
          { 
            text: "Risk a dash through the zombies to reach the group", 
            effects: { health: -30, morale: 0, supplies: 5, stealth: -20 },
            nextNodeId: "zombie_survivor_group" 
          },
          { 
            text: "Find another way around, even if it takes longer", 
            effects: { health: 10, morale: 15, supplies: 10, stealth: 20 },
            nextNodeId: "zombie_long_route" 
          },
          { 
            text: "Abandon the cat to run faster (you monster)", 
            effects: { health: 5, morale: -40, supplies: 0, stealth: -10 },
            nextNodeId: "zombie_abandon_cat" 
          }
        ],
        isEndNode: false
      },
      "zombie_attic": {
        id: "zombie_attic",
        text: "You and Whiskers hide in the attic as zombies ransack your apartment below. Days pass. Your supplies dwindle, but you're safe. A helicopter flies overhead with a loudspeaker announcing evacuation zones. Do you:",
        choices: [
          { 
            text: "Try to signal the helicopter from the roof", 
            effects: { health: -30, morale: -10, supplies: -15, stealth: -30 },
            nextNodeId: "zombie_signal" 
          },
          { 
            text: "Note the evacuation point and plan a careful journey there", 
            effects: { health: 20, morale: 15, supplies: 10, stealth: 15 },
            nextNodeId: "zombie_careful_evac" 
          },
          { 
            text: "Stay hidden - the evacuation could be a trap", 
            effects: { health: -10, morale: -20, supplies: -25, stealth: 0 },
            nextNodeId: "zombie_paranoid" 
          }
        ],
        isEndNode: false
      },
      "zombie_downstairs_cat": {
        id: "zombie_downstairs_cat",
        text: "You try to sneak downstairs with Whiskers, but the cat freaks out at the sight of a zombie and scratches you, making you yelp. The undead turn toward you. In a panic, you:",
        choices: [
          { 
            text: "Throw something to distract them and bolt for the door", 
            effects: { health: -15, morale: -10, supplies: -15, stealth: -20 },
            nextNodeId: "zombie_narrow_escape" 
          },
          { 
            text: "Fight your way through with a nearby baseball bat", 
            effects: { health: -40, morale: -15, supplies: -10, stealth: -25 },
            nextNodeId: "zombie_fight_bat" 
          },
          { 
            text: "Retreat back upstairs and find another way", 
            effects: { health: 10, morale: 15, supplies: 10, stealth: 20 },
            nextNodeId: "zombie_retreat_upstairs" 
          }
        ],
        isEndNode: false
      },
      // End nodes
      "zombie_survivor_group": {
        id: "zombie_survivor_group",
        text: "You make it to the survivor group with Whiskers. They welcome you and share supplies. Together, you establish a secure compound that lasts for months. Your cat becomes the group's mascot, boosting morale during dark times.",
        choices: [],
        isEndNode: true
      },
      "zombie_long_route": {
        id: "zombie_long_route",
        text: "You take the long way around with Whiskers. It's safer but costs precious time and resources. When you finally reach where the survivor group was, they've already moved on, leaving only a map to their new location. The journey continues.",
        choices: [],
        isEndNode: true
      },
      "zombie_abandon_cat": {
        id: "zombie_abandon_cat",
        text: "You abandon Whiskers to save yourself. The cat's distraction lets you escape easily, but the guilt haunts you. Nights are lonely and sleepless. When you finally reach safety, you find yourself unable to bond with other survivors. Some costs are too high.",
        choices: [],
        isEndNode: true
      },
      "zombie_signal": {
        id: "zombie_signal",
        text: "Your signals attract the helicopter! It drops a ladder for you. As you climb aboard with Whiskers, you see your city from above - mostly fallen, but with pockets of resistance. You're taken to a fortified camp where life begins anew.",
        choices: [],
        isEndNode: true
      },
      "zombie_careful_evac": {
        id: "zombie_careful_evac",
        text: "You carefully plan your route to the evacuation point. The journey is tense but you manage to avoid major confrontations. Upon arrival, military personnel welcome you and Whiskers to the safe zone. It's crowded and resources are scarce, but you're alive.",
        choices: [],
        isEndNode: true
      },
      "zombie_paranoid": {
        id: "zombie_paranoid",
        text: "You stay hidden, convinced it's a trap. Weeks pass as you and Whiskers survive on minimal rations. Eventually, the cat's hunting skills become your salvation, bringing back small prey. You develop a nearly feral existence in the ruins of civilization.",
        choices: [],
        isEndNode: true
      },
      "zombie_narrow_escape": {
        id: "zombie_narrow_escape",
        text: "Your distraction works! You dash out with Whiskers and slam the door behind you. The streets are dangerous, but you move carefully from building to building, eventually finding a small community of survivors who welcome your resourcefulness.",
        choices: [],
        isEndNode: true
      },
      "zombie_fight_bat": {
        id: "zombie_fight_bat",
        text: "You swing the bat with desperate strength, clearing a path. Though injured, you escape with Whiskers. Your ferocity catches the attention of a group of survivalists who value your courage. They take you in and teach you to be even stronger.",
        choices: [],
        isEndNode: true
      },
      "zombie_retreat_upstairs": {
        id: "zombie_retreat_upstairs",
        text: "You retreat upstairs with Whiskers, barricading yourself in. After days of hiding, you're forced to create a makeshift zipline to the building next door. Your engineering ingenuity serves you well as you navigate the ruins of the city from above.",
        choices: [],
        isEndNode: true
      },
      "zombie_wilderness": {
        id: "zombie_wilderness",
        text: "The wilderness provides safety from the zombie hordes. Your survival training pays off as you establish a hidden camp near a freshwater stream. Months pass as you perfect your self-sufficient lifestyle, occasionally helping lost survivors find their way.",
        choices: [],
        isEndNode: true
      },
      "zombie_evacuation": {
        id: "zombie_evacuation",
        text: "The evacuation point is chaotic but you make it through. Military transport takes you to a quarantine zone where society is being rebuilt. Your preparedness earns you a position of responsibility in the new community.",
        choices: [],
        isEndNode: true
      },
      "zombie_store": {
        id: "zombie_store",
        text: "The convenience store raid goes badly. While escaping with supplies, you're injured. A mysterious stranger helps you to safety - a doctor maintaining a secret clinic for survivors. You recover and join their humanitarian mission in the ruined city.",
        choices: [],
        isEndNode: true
      },
      "zombie_barricade": {
        id: "zombie_barricade",
        text: "Your apartment building becomes a fortress. The community grows as more survivors join. You organize supply runs, defenses, and even start rooftop gardening. Against all odds, your little society thrives in the middle of the apocalypse.",
        choices: [],
        isEndNode: true
      },
      "zombie_truck": {
        id: "zombie_truck",
        text: "Peterson's truck gets you all out of the city. On the highway, you join a caravan of survivors heading for a rumored safe haven in the mountains. The journey is long, but your group's diverse skills make you valuable additions to the new settlement.",
        choices: [],
        isEndNode: true
      },
      "zombie_betrayal": {
        id: "zombie_betrayal",
        text: "Your betrayal works - you escape while the others distract the zombies. Weeks later, you're captured by another group of survivors. Their leader? Mrs. Rodriguez, who survived your betrayal. Your fate in her hands now, you realize some debts must be paid.",
        choices: [],
        isEndNode: true
      }
    }
  },
  // Alien invasion scenario 
  {
    apocalypseType: apocalypseScenarios[1], // Alien invasion
    startNodeId: "alien_start",
    nodes: {
      "alien_start": {
        id: "alien_start",
        text: "A massive shadow falls over the city as the alien mothership blocks out the sun. Strange beams of light scan the streets below, and people captured by them vanish instantly. You're in your apartment when the power goes out. What do you do?",
        choices: [
          { 
            text: "Cover all windows and hide", 
            effects: { health: 20, morale: 10, supplies: 15, stealth: 30 },
            nextNodeId: "alien_hide" 
          },
          { 
            text: "Try to reach your family across town", 
            effects: { health: -20, morale: -15, supplies: -20, stealth: -25 },
            nextNodeId: "alien_family" 
          },
          { 
            text: "Join the growing resistance in the streets", 
            effects: { health: -25, morale: -5, supplies: -10, stealth: -30 },
            nextNodeId: "alien_resistance" 
          }
        ],
        isEndNode: false
      },
      "alien_hide": {
        id: "alien_hide",
        text: "You cover all windows with aluminum foil and create a safe room. Days pass as you hear strange noises outside. Then comes a knock at your door. It sounds... human. Do you:",
        choices: [
          { 
            text: "Answer cautiously - it could be other survivors", 
            effects: { health: -30, morale: -15, supplies: -10, stealth: -35 },
            nextNodeId: "alien_door_survivors" 
          },
          { 
            text: "Stay absolutely silent and hope they go away", 
            effects: { health: 25, morale: 15, supplies: 10, stealth: 30 },
            nextNodeId: "alien_silent" 
          },
          { 
            text: "Escape through the back window", 
            effects: { health: -15, morale: -5, supplies: -20, stealth: -10 },
            nextNodeId: "alien_escape_window" 
          }
        ],
        isEndNode: false
      },
      "alien_family": {
        id: "alien_family",
        text: "You navigate streets under alien surveillance. Halfway to your family's home, you witness a hovering craft beaming people up. Your path is blocked, but you're determined to reach your family. You can:",
        choices: [
          { 
            text: "Try to go around, even though it's much longer", 
            effects: { health: -15, morale: -10, supplies: -15, stealth: -10 },
            nextNodeId: "alien_long_route" 
          },
          { 
            text: "Hide and wait for the alien craft to move on", 
            effects: { health: 20, morale: 15, supplies: 10, stealth: 25 },
            nextNodeId: "alien_wait_craft" 
          },
          { 
            text: "Use a diversion to draw the craft away", 
            effects: { health: -25, morale: -20, supplies: -25, stealth: -30 },
            nextNodeId: "alien_diversion" 
          }
        ],
        isEndNode: false
      },
      "alien_resistance": {
        id: "alien_resistance",
        text: "You join a ragtag group of resistance fighters operating from the subway tunnels. They're planning to capture alien technology to understand their weaknesses. The leader asks for volunteers for a dangerous mission. Do you:",
        choices: [
          { 
            text: "Volunteer for the front-line assault team", 
            effects: { health: -35, morale: -10, supplies: -15, stealth: -25 },
            nextNodeId: "alien_assault" 
          },
          { 
            text: "Offer to be part of the tech analysis team instead", 
            effects: { health: -10, morale: -15, supplies: -5, stealth: -5 },
            nextNodeId: "alien_tech_team" 
          },
          { 
            text: "Suggest an alternative plan to infiltrate rather than attack", 
            effects: { health: 25, morale: 20, supplies: 15, stealth: 30 },
            nextNodeId: "alien_infiltration" 
          }
        ],
        isEndNode: false
      },
      // End nodes and other branching paths would be defined here...
      "alien_door_survivors": {
        id: "alien_door_survivors",
        text: "You open the door to find a family seeking shelter. Together, you create a community in your building, sharing resources and watching for alien patrols. Your collective vigilance helps you survive the initial invasion until humanity begins organizing a broader resistance.",
        choices: [],
        isEndNode: true
      },
      "alien_silent": {
        id: "alien_silent",
        text: "Your silence pays off. The knocking stops, but from your peephole, you're shocked to see aliens disguised as humans dragging away those who answered their doors. Your paranoia saved your life. You continue living undetected, documenting the invasion for future generations.",
        choices: [],
        isEndNode: true
      },
      "alien_escape_window": {
        id: "alien_escape_window",
        text: "You escape through the back window and make your way through back alleys. Eventually, you find a network of underground tunnels where survivors have established a hidden community, safe from the alien scanners above.",
        choices: [],
        isEndNode: true
      },
      "alien_long_route": {
        id: "alien_long_route",
        text: "The detour takes hours, but you finally reach your family's home. Tearfully reunited, you all escape the city together, joining a convoy of refugees heading to the mountains where the alien craft rarely venture.",
        choices: [],
        isEndNode: true
      },
      "alien_wait_craft": {
        id: "alien_wait_craft",
        text: "You wait patiently as the alien craft hovers nearby. Your stillness saves you, and when it finally moves on, you rush to your family's home. They're gone, but left a note with coordinates to a safe location. Your journey continues with renewed purpose.",
        choices: [],
        isEndNode: true
      },
      "alien_diversion": {
        id: "alien_diversion",
        text: "Your diversion works too well. As the alien craft investigates, military jets arrive and engage it in battle. The resulting chaos allows you to reach your family, and together you escape during the confusion of humanity's first significant counterattack.",
        choices: [],
        isEndNode: true
      },
      "alien_assault": {
        id: "alien_assault",
        text: "The assault is costly, but successful. Your team captures crucial alien technology. Your bravery inspires others, and though injured, you become a symbol of human resistance. Scientists use your captured tech to develop weapons that can harm the invaders.",
        choices: [],
        isEndNode: true
      },
      "alien_tech_team": {
        id: "alien_tech_team",
        text: "Your analytical skills prove invaluable. Working with the captured technology, you help discover that common water is toxic to the aliens. This knowledge becomes humanity's greatest weapon in the war that follows.",
        choices: [],
        isEndNode: true
      },
      "alien_infiltration": {
        id: "alien_infiltration",
        text: "Your infiltration plan succeeds beyond expectations. Not only do you capture the technology, but you also rescue humans being experimented on. Their testimonies provide crucial intelligence about alien biology and intentions, changing the course of the resistance.",
        choices: [],
        isEndNode: true
      }
    }
  }
];

// The initializeAdventureGame function is now defined earlier in the file
