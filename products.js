const categories = ["Nintendo", "Sega", "Atari", "Sony"];

const products = {
  // --- Nintendo ---
  "1": {
    category: "Nintendo",
    name: "Nintendo Entertainment System",
    price: "89.99",
    img: [
      "./Images/Products/nes1.png",
      "./Images/Products/nes2.png"
    ],
    rating: 9,
    tag: ["retro", "8-bit", "console", "NES"],
    description: "Die klassische 8-Bit-Konsole, die Videospiele populär machte.",
  },
  "2": {
    category: "Nintendo",
    name: "Game Boy",
    price: "59.99",
    img: [
      "./Images/Products/gb1.png",
      "./Images/Products/gb2.png"
    ],
    rating: 10,
    tag: ["handheld", "8-bit", "gameboy"],
    description: "Der legendäre Handheld von Nintendo, bekannt für Tetris und Pokémon.",
  },
  "3": {
    category: "Nintendo",
    name: "Super Nintendo Entertainment System",
    price: "99.99",
    img: [
      "./Images/Products/snes1.png",
      "./Images/Products/snes2.png"
    ],
    rating: 10,
    tag: ["16-bit", "classic", "console", "SNES"],
    description: "Legendäre 16-Bit-Konsole mit vielen beliebten Spielen.",
  },
  "4": {
    category: "Nintendo",
    name: "Nintendo 64",
    price: "109.99",
    img: [
      "./Images/Products/n641.png",
      "./Images/Products/n642.png"
    ],
    rating: 8,
    tag: ["n64", "64-bit", "console"],
    description: "Die erste 64-Bit-Konsole von Nintendo mit 3D-Grafik.",
  },
  "5": {
    category: "Nintendo",
    name: "Nintendo GameCube",
    price: "99.99",
    img: [
      "./Images/Products/gc1.png",
      "./Images/Products/gc2.png"
    ],
    rating: 8,
    tag: ["gamecube", "console", "nintendo"],
    description: "Kompakte Konsole mit einzigartigen Controllern und Spielen.",
  },

  // --- Sega ---
  "6": {
    category: "Sega",
    name: "Sega Mega Drive",
    price: "79.99",
    img: [
      "./Images/Products/smd1.png",
      "./Images/Products/smd2.png"
    ],
    rating: 8,
    tag: ["16-bit", "sega", "console", "SMD"],
    description: "SEGAs Antwort auf das SNES, bekannt für Sonic the Hedgehog.",
  },
  "7": {
    category: "Sega",
    name: "Sega Saturn",
    price: "129.99",
    img: [
      "./Images/Products/ss1.png",
      "./Images/Products/ss2.png"
    ],
    rating: 6,
    tag: ["32-bit", "cd", "console"],
    description: "32-Bit-Konsole mit CD-Unterstützung und Arcade-Ports.",
  },
  "8": {
    category: "Sega",
    name: "Sega Dreamcast",
    price: "139.99",
    img: [
      "./Images/Products/sd1.png",
      "./Images/Products/sd2.png",
      "./Images/Products/sd3.png"
    ],
    rating: 7,
    tag: ["sega", "128-bit", "console", "dreamcast"],
    description: "SEGAs letzte Konsole mit innovativen Features und Online-Gaming.",
  },
  "9": {
    category: "Sega",
    name: "Sega Game Gear",
    price: "69.99",
    img: [
      "./Images/Products/sgg1.png",
      "./Images/Products/sgg2.png"
    ],
    rating: 6,
    tag: ["handheld", "sega", "color"],
    description: "SEGAs farbiger Handheld als Konkurrenz zum Game Boy.",
  },

  // --- Atari ---
  "10": {
    category: "Atari",
    name: "Atari 2600",
    price: "69.99",
    img: [
      "./Images/Products/26001.png",
      "./Images/Products/26002.png",
      "./Images/Products/26003.png"
    ],
    rating: 7,
    tag: ["retro", "atari", "console"],
    description: "Eine der ersten Heimkonsolen, die Videospiele populär machte.",
  },
  "11": {
    category: "Atari",
    name: "Atari 5200",
    price: "79.99",
    img: [
      "./Images/Products/52001.png",
      "./Images/Products/52002.png"
    ],
    rating: 5,
    tag: ["retro", "atari", "console"],
    description: "Nachfolger des Atari 2600 mit verbesserter Grafik.",
  },
  "12": {
    category: "Atari",
    name: "Atari Lynx",
    price: "89.99",
    img: [
      "./Images/Products/alh1.png",
      "./Images/Products/alh2.png"
    ],
    rating: 6,
    tag: ["handheld", "atari", "color"],
    description: "Der erste farbige Handheld von Atari mit einzigartigem Design.",
  },
  "13": {
    category: "Atari",
    name: "Atari Jaguar",
    price: "149.99",
    img: [
      "./Images/Products/jb1.png",
      "./Images/Products/jb2.png"
    ],
    rating: 4,
    tag: ["64-bit", "atari", "console"],
    description: "Ataris Versuch einer 64-Bit-Konsole mit einzigartigen Spielen.",
  },

  // --- Sony ---
  "14": {
    category: "Sony",
    name: "Sony PlayStation",
    price: "89.99",
    img: [
      "./Images/Products/ps11.png",
      "./Images/Products/ps12.png"
    ],
    rating: 9,
    tag: ["playstation", "cd", "console", "PS1"],
    description: "Sonys erste Konsole, die das Gaming revolutionierte.",
  },
  "15": {
    category: "Sony",
    name: "Sony PlayStation 2",
    price: "109.99",
    img: [
      "./Images/Products/ps21.png",
      "./Images/Products/ps22.png"
    ],
    rating: 10,
    tag: ["playstation", "dvd", "console", "PS2"],
    description: "Die meistverkaufte Konsole aller Zeiten mit DVD-Unterstützung.",
  },
  "16": {
    category: "Sony",
    name: "Sony PlayStation 3",
    price: "129.99",
    img: [
      "./Images/Products/ps31.png",
      "./Images/Products/ps32.png"
    ],
    rating: 8,
    tag: ["playstation", "blu-ray", "console", "PS3"],
    description: "Sonys Konsole mit Blu-ray-Unterstützung und HD-Grafik.",
  },
  "17": {
    category: "Sony",
    name: "Sony PlayStation Portable",
    price: "79.99",
    img: [
      "./Images/Products/psp1.png",
      "./Images/Products/psp2.png"
    ],
    rating: 7,
    tag: ["portable", "psp", "handheld", "PSP"],
    description: "Sonys Handheld-Konsole für Spiele unterwegs.",
  },
  "18": {
    category: "Sony",
    name: "Sony PlayStation Vita",
    price: "99.99",
    img: [
      "./Images/Products/psv1.png",
      "./Images/Products/psv2.png"
    ],
    rating: 7,
    tag: ["handheld", "playstation", "vita"],
    description: "Sonys moderner Handheld mit Touchscreen und großem Spieleangebot.",
  },
};
