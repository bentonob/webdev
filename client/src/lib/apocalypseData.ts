import { ApocalypseScenario, Question, GameState, Effects } from "@shared/schema";
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

// Initial game state
export const initialGameState: GameState = {
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

// Helper function to initialize game
export function initializeGame(): GameState {
  // Select random apocalypse
  const randomApocalypseIndex = Math.floor(Math.random() * apocalypseScenarios.length);
  const apocalypseType = apocalypseScenarios[randomApocalypseIndex];
  
  // Select 5 random questions
  const shuffledQuestions = [...questionTemplates].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffledQuestions.slice(0, 5);
  
  return {
    stats: {
      health: 100,
      morale: 100,
      supplies: 100,
      stealth: 100
    },
    apocalypseType,
    questions: selectedQuestions,
    currentQuestion: 0
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
