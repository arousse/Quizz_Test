export const jsQuizz = {
  questions: [
    // {
    //     "question": "Which of the following trees is known for its distinctive peeling bark?",
    //     "optionA": "birch",
    //     "optionB": "willow",
    //     "optionC": "oak",
    //     "optionD": "Eucalyptus",
    //     "answer": "Eucalyptus"
    // }
    {
      question: '________ is the process by which plants convert sunlight into energy?',
      type: 'FIB',
      correctAnswer: 'Photosynthesis',
      category: 'AllgemeinwissenZurNatur'
    },
    {
      question: 'Categorize the following plants into Poisonous and Not Poisonous',
      type: 'CAT',
      choices: [
        {
          poisonous: {
            name: 'poisonous',
            items: ['Plant 1', 'Plant 2']
          }
        },
        {
          not_poisonous: {
            name: 'not poisonous',
            items: ['Plant 3', 'Plant 4']
          }
        }
      ],

      category: 'KrankheitenundSchädlinge'
    },

    {
      question: 'What is the process by which plants convert sunlight into energy?',
      choices: ['Photoindex', 'Transpiration', 'Suffocation', 'Photosynthesis'],
      type: 'MCQs',
      correctAnswer: 'Photosynthesis',
      category: 'ErnteundSaatzeit'
    },

    {
      question:
        'Which part of the plant is responsible for absorbing water and nutrients from the soil?',
      choices: ['Leaves', 'Stems', 'Roots', 'Flowers'],
      type: 'MCQs',
      correctAnswer: 'Roots',
      category: 'Pflanzenidentifikation'
    },

    {
      question: 'Which of the following is not a type of plant tissue?',
      choices: ['Epidermis', 'Xylem', 'Phloem', 'Mitochondria'],
      type: 'MCQs',
      correctAnswer: 'Mitochondria',
      category: 'Kartoffel'
    },

    {
      question: 'What is the primary function of flowers in a plant?',
      choices: ['Attracting pollinators', 'Producing seeds', 'Photosynthesis', 'Absorbing water'],
      type: 'MCQs',
      correctAnswer: 'Attracting pollinators',
      category: 'ErnteundSaatzeit'
    }

    // {
    //     "question": "What is the male reproductive part of a flower called?",
    //     "optionA": "Stigma",
    //     "optionB": "Sepal",
    //     "optionC": "Petal",
    //     "optionD": "Stamen",
    //     "answer": "Stamen"
    // },

    // {
    //     "question": "Which of the following is a type of deciduous tree?",
    //     "optionA": "Oak",
    //     "optionB": "Palm",
    //     "optionC": "Spruce",
    //     "optionD": "Bamboo",
    //     "answer": "Oak"
    // },

    // {
    //     "question": "Which plant hormone is responsible for promoting cell elongation and growth?",
    //     "optionA": "Auxin",
    //     "optionB": "Gibberellin",
    //     "optionC": "Cytokinin",
    //     "optionD": "Ethylene",
    //     "answer": "Auxin"
    // },

    // {
    //     "question": "What is the process by which water is lost from the surface of a plant, primarily through the leaves?",
    //     "optionA": "Transpiration",
    //     "optionB": "Evaporation",
    //     "optionC": "Condensation",
    //     "optionD": "Precipitation",
    //     "answer": "Transpiration"
    // },

    // {
    //     "question": "Which of the following is not a type of succulent plant?",
    //     "optionA": "Aloe vera",
    //     "optionB": "Cactus",
    //     "optionC": "Jade plant",
    //     "optionD": "Fern",
    //     "answer": "Fern"
    // },

    // {
    //     "question": "What is the largest type of plant on Earth?",
    //     "optionA": "Tree",
    //     "optionB": "Shrub",
    //     "optionC": "Herb",
    //     "optionD": "Moss",
    //     "answer": "Tree"
    // },

    // {
    //     "question": "Which tree species is known for its vibrant autumn foliage, displaying colors such as red, orange, and yellow?",
    //     "optionA": "Pine",
    //     "optionB": "Fir",
    //     "optionC": "Redwood",
    //     "optionD": "Maple",
    //     "answer": "Maple"
    // },

    // {
    //     "question": "Which type of tree retains its leaves throughout the year?",
    //     "optionA": "Deciduous",
    //     "optionB": "Coniferous",
    //     "optionC": "Evergreen",
    //     "optionD": "Broadleaf",
    //     "answer": "Evergreen"
    // },

    // {
    //     "question": "Which tree species is commonly associated with producing rubber?",
    //     "optionA": "Rubber tree",
    //     "optionB": "Oak tree",
    //     "optionC": "Palm tree",
    //     "optionD": "Pine tree",
    //     "answer": "Rubber tree"
    // },

    // {
    //     "question": "Which part of a tree is responsible for producing new cells for growth?",
    //     "optionA": "Leaves",
    //     "optionB": "Roots",
    //     "optionC": "Bark",
    //     "optionD": "Cambium",
    //     "answer": "Cambium"
    // },
  ]
};

export const resultInitialState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0
};
