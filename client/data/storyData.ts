// src/data/storyData.ts
import { StoryStep } from '../types/types'
import { skillMapping } from './skillMapping'

export const storySteps: StoryStep[] = [
  {
    description:
      "You wake to sunlight creeping around the edge of your curtains, and a heavy sense of relief settles around you. You don't have work today. And the day, you can tell by the brightness of the light, is going to be beautiful. You get up, make coffee, and think about what you'll do first:",
    choices: [
      {
        id: 'check_news',
        text: "Check the local news, to see what's happening in your neighbourhood.",
        effects: {
          skills: [{ id: 'awareness', level: 1 }],
        },
      },
      {
        id: 'work_out',
        text: 'Head outside and get some exercise.',
        effects: {
          skills: [{ id: 'fitness', level: 1 }],
        },
      },
      {
        id: 'organize_supplies',
        text: "Organize your closet. It's something you've been avoiding for months, but it's going to feel so good to get this job done.",
        effects: {
          resources: [
            { id: 'firstAidKit', quantity: 1 },
            { id: 'rubberBands', quantity: 5 },
            { id: 'sleepingBag', quantity: 1 },
          ],
        },
      },
      {
        id: 'call_family',
        text: 'Call your family to check in, and see if anyone is free to hang out later.',
        effects: {
          skills: [{ id: 'communication', level: 1 }],
        },
      },
    ],
  },
  {
    description: 'You have some free time. What would you like to do?',
    choices: [
      {
        id: 'study_weather',
        text: 'Lie on your porch and stare at the clouds.',
        effects: {
          skills: [{ id: skillMapping.weatherPrediction, level: 1 }],
        },
      },
      {
        id: 'practice_storytelling',
        text: 'Call a friend and rant about your anxieties, but subtly.',
        effects: {
          skills: [{ id: skillMapping.storytelling, level: 1 }],
        },
      },
      {
        id: 'learn_knots',
        text: 'Untangle all your wire hangers in the closet.',
        effects: {
          skills: [{ id: skillMapping.knotTying, level: 1 }],
        },
      },
    ],
  },
  {
    description:
      "As you go about your day, you start to feel a bit uneasy. The weather report mentions a storm system approaching. What's your next move?",
    choices: [
      {
        id: 'stock_up',
        text: 'Go to the store to stock up on supplies',
        effects: {
          resources: [
            { id: 'water', quantity: 5 },
            { id: 'food', quantity: 3 },
          ],
        },
      },
      {
        id: 'secure_home',
        text: 'Secure your home against potential high winds',
        effects: {
          skills: [{ id: 'handyman', level: 1 }],
          resources: [{ id: 'tarp', quantity: 1 }],
        },
      },
      {
        id: 'inform_neighbors',
        text: 'Inform your neighbors about the incoming storm',
        effects: {
          skills: [{ id: 'leadership', level: 1 }],
        },
      },
    ],
  },
  {
    description:
      'The storm is getting closer, and local authorities have issued a severe weather warning. You have a little time left before it hits. What do you prioritize?',
    choices: [
      {
        id: 'emergency_kit',
        text: 'Prepare an emergency kit',
        effects: {
          resources: [
            { id: 'flashlight', quantity: 1 },
            { id: 'batteries', quantity: 4 },
            { id: 'radio', quantity: 1 },
          ],
        },
      },
      {
        id: 'evacuation_plan',
        text: 'Plan potential evacuation routes',
        effects: {
          skills: [{ id: 'navigation', level: 1 }],
          resources: [{ id: 'map', quantity: 1 }],
        },
      },
      {
        id: 'reinforce_shelter',
        text: 'Reinforce your shelter',
        effects: {
          skills: [{ id: 'construction', level: 1 }],
          resources: [{ id: 'woodPlanks', quantity: 5 }],
        },
      },
    ],
  },
  {
    description:
      'The storm has hit with full force. You hear a loud crash outside. What do you do?',
    choices: [
      {
        id: 'investigate',
        text: 'Cautiously investigate the noise',
        effects: {
          skills: [{ id: 'bravery', level: 1 }],
        },
      },
      {
        id: 'stay_safe',
        text: "Stay inside where it's safe",
        effects: {
          skills: [{ id: 'patience', level: 1 }],
        },
      },
      {
        id: 'call_help',
        text: 'Try to call for help',
        effects: {
          skills: [{ id: 'communication', level: 1 }],
        },
      },
    ],
  },
  {
    description: 'A storm is approaching. How do you prepare?',
    choices: [
      {
        id: 'weather_forecast',
        text: "Use your weather prediction skills to forecast the storm's severity",
        effects: {
          skills: [{ id: skillMapping.weatherPrediction, level: 1 }],
          resources: [{ id: 'preparedness', quantity: 5 }],
        },
      },
      {
        id: 'secure_shelter',
        text: 'Secure your shelter using your knot-tying skills',
        effects: {
          skills: [{ id: skillMapping.knotTying, level: 1 }],
          resources: [{ id: 'shelter', quantity: 1 }],
        },
      },
      {
        id: 'forage_supplies',
        text: 'Quickly forage for extra supplies before the storm hits',
        effects: {
          skills: [{ id: skillMapping.foraging, level: 1 }],
          resources: [{ id: 'food', quantity: 3 }],
        },
      },
    ],
  },
  {
    description:
      'The storm has passed, but your community is shaken. What do you do?',
    choices: [
      {
        id: 'storytelling_morale',
        text: 'Use your storytelling skills to boost morale',
        effects: {
          skills: [{ id: skillMapping.storytelling, level: 1 }],
          resources: [{ id: 'communityTrust', quantity: 2 }],
        },
      },
      {
        id: 'first_aid',
        text: 'Provide first aid to those who need it',
        effects: {
          skills: [{ id: skillMapping.firstAid, level: 1 }],
          resources: [{ id: 'medicalSupplies', quantity: -1 }],
        },
      },
      {
        id: 'improvise_repairs',
        text: 'Improvise repairs to damaged structures',
        effects: {
          skills: [
            { id: skillMapping.improvisation, level: 1 },
            { id: skillMapping.knotTying, level: 1 },
          ],
          resources: [{ id: 'shelter', quantity: 2 }],
        },
      },
    ],
  },
  // More steps can be added to extend the story
]
