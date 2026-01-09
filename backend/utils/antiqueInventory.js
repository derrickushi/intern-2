const antiqueInventory = [
    // ==================== NEWSPAPERS ====================
    {
        title: "Apollo 11 Moon Landing",
        description: "An original print of The New York Times from July 21, 1969, covering the historic Apollo 11 moon landing. A true collector's piece.",
        price: 8500,
        images: ['/products/newspapers/apollo-11.png'],
        category: 'Newspapers',
        year: 1969,
        condition: 'Good',
        isFeatured: true,
        details: {
            "publication": "The New York Times",
            "date": "1969-07-21"
        },
        currentInventory: 3
    },
    {
        title: "V-E Day Celebration",
        description: "Vintage newspaper headline announcing the end of World War II in Europe. Historic moment captured in print.",
        price: 7500,
        images: ['/products/newspapers/ve-day.png'],
        category: 'Newspapers',
        year: 1945,
        condition: 'Fair',
        details: {
            "publication": "Daily Mirror",
            "date": "1945-05-08"
        },
        currentInventory: 2
    },
    {
        title: "Titanic Disaster Report",
        description: "Rare newspaper clipping detailing the sinking of the Titanic. One of the most tragic maritime disasters.",
        price: 10000,
        images: ['/products/newspapers/titanic.png'],
        category: 'Newspapers',
        year: 1912,
        condition: 'Fragile',
        details: {
            "publication": "The Times",
            "date": "1912-04-16"
        },
        currentInventory: 1
    },
    {
        title: "JFK Assassination Report",
        description: "Original newspaper from November 22, 1963, reporting the assassination of President John F. Kennedy.",
        price: 8000,
        images: ['/products/newspapers/jfk.png'],
        category: 'Newspapers',
        year: 1963,
        condition: 'Good',
        isFeatured: true,
        details: {
            "publication": "Dallas Morning News",
            "date": "1963-11-22"
        },
        currentInventory: 2
    },
    {
        title: "Pearl Harbor Attack",
        description: "December 8, 1941 newspaper announcing the Japanese attack on Pearl Harbor and America's entry into WWII.",
        price: 7500,
        images: ['/products/newspapers/pearl-harbor.png'],
        category: 'Newspapers',
        year: 1941,
        condition: 'Fair',
        details: {
            "publication": "Honolulu Star-Bulletin",
            "date": "1941-12-08"
        },
        currentInventory: 2
    },
    {
        title: "Wall Street Crash 1929",
        description: "Historic newspaper from Black Tuesday, October 29, 1929, documenting the stock market crash.",
        price: 8500,
        images: ['/products/newspapers/wall_street_crash_newspaper.png'],
        category: 'Newspapers',
        year: 1929,
        condition: 'Fair',
        details: {
            "publication": "Wall Street Journal",
            "date": "1929-10-29"
        },
        currentInventory: 1
    },
    {
        title: "WWI Armistice Declared",
        description: "November 11, 1918 newspaper announcing the end of World War I. The war to end all wars.",
        price: 7000,
        images: ['/products/newspapers/wwi_armistice_newspaper.png'],
        category: 'Newspapers',
        year: 1918,
        condition: 'Fragile',
        details: {
            "publication": "The Times",
            "date": "1918-11-11"
        },
        currentInventory: 1
    },
    {
        title: "Berlin Wall Falls",
        description: "November 10, 1989 newspaper celebrating the fall of the Berlin Wall and the end of the Cold War era.",
        price: 5500,
        images: ['/products/newspapers/berlin-wall.png'],
        category: 'Newspapers',
        year: 1989,
        condition: 'Excellent',
        details: {
            "publication": "Der Tagesspiegel",
            "date": "1989-11-10"
        },
        currentInventory: 4
    },
    {
        title: "Queen Victoria's Death",
        description: "January 23, 1901 newspaper announcing the death of Queen Victoria, ending the Victorian era.",
        price: 6500,
        images: ['/products/newspapers/queen-victoria.png'],
        category: 'Newspapers',
        year: 1901,
        condition: 'Fragile',
        details: {
            "publication": "The Times",
            "date": "1901-01-23"
        },
        currentInventory: 1
    },
    {
        title: "Wright Brothers First Flight",
        description: "Rare 1903 newspaper reporting the Wright Brothers' historic first powered flight at Kitty Hawk.",
        price: 9500,
        images: ['/products/newspapers/wright-brothers.png'],
        category: 'Newspapers',
        year: 1903,
        condition: 'Fair',
        details: {
            "publication": "Norfolk Virginian-Pilot",
            "date": "1903-12-18"
        },
        currentInventory: 1
    },
    {
        title: "Lincoln Assassination",
        description: "April 15, 1865 newspaper reporting the assassination of President Abraham Lincoln.",
        price: 10000,
        images: ['/products/newspapers/lincoln.png'],
        category: 'Newspapers',
        year: 1865,
        condition: 'Fragile',
        details: {
            "publication": "New York Herald",
            "date": "1865-04-15"
        },
        currentInventory: 1
    },
    {
        title: "D-Day Invasion",
        description: "June 6, 1944 newspaper announcing the Allied invasion of Normandy during World War II.",
        price: 7000,
        images: ['/products/newspapers/dday.png'],
        category: 'Newspapers',
        year: 1944,
        condition: 'Good',
        details: {
            "publication": "Stars and Stripes",
            "date": "1944-06-06"
        },
        currentInventory: 3
    },

    // ==================== COINS ====================
    {
        title: "Roman Denarius Silver Coin",
        description: "Authentic silver Denarius from the Roman Empire. Showing clear profile details of Emperor Augustus.",
        price: 12500,
        images: ['/products/coins/roman-denarius.png'],
        category: 'Coins',
        year: 200,
        condition: 'Good',
        isFeatured: true,
        details: {
            "origin": "Roman Empire",
            "metal": "Silver"
        },
        currentInventory: 8
    },
    {
        title: "1804 Silver Dollar Replica",
        description: "High quality replica of the famous 1804 Silver Dollar, one of the rarest American coins.",
        price: 3500,
        images: ['/products/coins/silver-dollar-1804.png'],
        category: 'Coins',
        year: 1804,
        condition: 'Mint',
        details: {
            "origin": "USA",
            "metal": "Silver Alloy"
        },
        currentInventory: 15
    },
    {
        title: "Greek Drachma",
        description: "Ancient Greek Drachma featuring the owl of Athena, symbol of wisdom and warfare.",
        price: 18500,
        images: ['/products/coins/greek-drachma.png'],
        category: 'Coins',
        year: -450,
        condition: 'Fair',
        details: {
            "origin": "Greece",
            "metal": "Silver"
        },
        currentInventory: 3
    },
    {
        title: "Victorian Penny",
        description: "A copper penny from the reign of Queen Victoria, featuring the young head portrait.",
        price: 850,
        images: ['/products/coins/victorian-penny.png'],
        category: 'Coins',
        year: 1890,
        condition: 'Good',
        details: {
            "origin": "UK",
            "metal": "Copper"
        },
        currentInventory: 25
    },
    {
        title: "Byzantine Gold Solidus",
        description: "Rare gold coin from the Byzantine Empire, featuring Emperor Justinian I.",
        price: 68500,
        images: ['/products/coins/byzantine_gold_solidus.png'],
        category: 'Coins',
        year: 540,
        condition: 'Good',
        details: {
            "origin": "Byzantine Empire",
            "metal": "Gold"
        },
        currentInventory: 2
    },
    {
        title: "Spanish Piece of Eight",
        description: "Authentic Spanish colonial silver coin, the legendary pirate treasure currency.",
        price: 15500,
        images: ['/products/coins/spanish-piece-eight.png'],
        category: 'Coins',
        year: 1780,
        condition: 'Fair',
        details: {
            "origin": "Spanish Empire",
            "metal": "Silver"
        },
        currentInventory: 6
    },
    {
        title: "Indian Head Penny",
        description: "Classic American Indian Head cent from the late 1800s, highly collectible.",
        price: 1200,
        images: ['/products/coins/indian-head-penny.png'],
        category: 'Coins',
        year: 1885,
        condition: 'Good',
        details: {
            "origin": "USA",
            "metal": "Copper-Nickel"
        },
        currentInventory: 18
    },
    {
        title: "Chinese Cash Coin",
        description: "Ancient Chinese bronze coin with square hole, used during the Qing Dynasty.",
        price: 950,
        images: ['/products/coins/chinese_cash_coin.webp'],
        category: 'Coins',
        year: 1850,
        condition: 'Fair',
        details: {
            "origin": "China",
            "metal": "Bronze"
        },
        currentInventory: 12
    },
    {
        title: "Morgan Silver Dollar",
        description: "Beautiful 1921 Morgan Silver Dollar, the last year of production for this iconic coin.",
        price: 8500,
        images: ['/products/coins/morgan_silver_dollar.png'],
        category: 'Coins',
        year: 1921,
        condition: 'Very Good',
        details: {
            "origin": "USA",
            "metal": "Silver"
        },
        currentInventory: 10
    },
    {
        title: "French Napoleon Gold Franc",
        description: "20 Franc gold coin featuring Napoleon Bonaparte, struck during the First Empire.",
        price: 78500,
        images: ['/products/coins/napoleon_gold_franc.png'],
        category: 'Coins',
        year: 1808,
        condition: 'Fine',
        details: {
            "origin": "France",
            "metal": "Gold"
        },
        currentInventory: 4
    },
    {
        title: "British Sovereign Gold Coin",
        description: "Victorian era gold sovereign featuring St. George slaying the dragon.",
        price: 99500,
        images: ['/products/coins/british_sovereign_gold.png'],
        category: 'Coins',
        year: 1887,
        condition: 'Very Fine',
        details: {
            "origin": "UK",
            "metal": "Gold"
        },
        currentInventory: 5
    },
    {
        title: "Mercury Dime",
        description: "1916 Mercury dime, first year of issue. Features Liberty with winged cap.",
        price: 2800,
        images: ['/products/coins/mercury_dime.png'],
        category: 'Coins',
        year: 1916,
        condition: 'Good',
        details: {
            "origin": "USA",
            "metal": "Silver"
        },
        currentInventory: 14
    },
    {
        title: "Japanese Samurai Era Coin",
        description: "Edo period Japanese coin from the Samurai era, rectangular gold piece.",
        price: 45500,
        images: ['/products/coins/japanese_samurai_coin.png'],
        category: 'Coins',
        year: 1750,
        condition: 'Fair',
        details: {
            "origin": "Japan",
            "metal": "Gold Alloy"
        },
        currentInventory: 3
    },

    // ==================== CURRENCY ====================
    {
        title: "1899 Silver Certificate",
        description: "Beautifully preserved 1899 US Silver Certificate with intricate border designs and blue seal.",
        price: 12500,
        images: ['/products/currency/1899_silver_certificate.png'],
        category: 'Currency',
        year: 1899,
        condition: 'Fine',
        isFeatured: true,
        details: {
            "country": "USA",
            "denomination": "1 Dollar"
        },
        currentInventory: 2
    },
    {
        title: "Confederate 10 Dollar Bill",
        description: "Civil War era Confederate currency, a piece of American history from the divided nation.",
        price: 11500,
        images: ['/products/currency/confederate_10_dollar.png'],
        category: 'Currency',
        year: 1864,
        condition: 'Fair',
        details: {
            "country": "CSA",
            "denomination": "10 Dollars"
        },
        currentInventory: 5
    },
    {
        title: "French Assignat",
        description: "Paper money from the French Revolution period, issued by the revolutionary government.",
        price: 13500,
        images: ['/products/currency/french_assignat_1790s.webp'],
        category: 'Currency',
        year: 1790,
        condition: 'Fragile',
        details: {
            "country": "France",
            "denomination": "500 Livres"
        },
        currentInventory: 4
    },
    {
        title: "German Hyperinflation Mark",
        description: "One billion Mark note from the Weimar Republic hyperinflation period. Economic history in your hands.",
        price: 7500,
        images: ['/products/currency/german_reichsmark_1920s.webp'],
        category: 'Currency',
        year: 1923,
        condition: 'Good',
        details: {
            "country": "Germany",
            "denomination": "1 Billion Marks"
        },
        currentInventory: 20
    },
    {
        title: "British Pound Note 1914",
        description: "WWI era British one pound note, signed by the Chief Cashier of the Bank of England.",
        price: 14500,
        images: ['/products/currency/british_pound_note_1914.webp'],
        category: 'Currency',
        year: 1914,
        condition: 'Good',
        details: {
            "country": "UK",
            "denomination": "1 Pound"
        },
        currentInventory: 6
    },
    {
        title: "Russian Imperial Ruble",
        description: "Pre-revolution Russian Empire 100 ruble note featuring Tsar Nicholas II.",
        price: 15000,
        images: ['/products/currency/russian_imperial_ruble_1900s.webp'],
        category: 'Currency',
        year: 1910,
        condition: 'Fair',
        details: {
            "country": "Russian Empire",
            "denomination": "100 Rubles"
        },
        currentInventory: 3
    },
    {
        title: "Japanese Military Yen",
        description: "WWII Japanese military currency used in occupied territories during the Pacific War.",
        price: 8500,
        images: ['/products/currency/japanese_military_yen_1940s.webp'],
        category: 'Currency',
        year: 1943,
        condition: 'Good',
        details: {
            "country": "Japan",
            "denomination": "10 Yen"
        },
        currentInventory: 8
    },
    {
        title: "Italian Lira 1000 Note",
        description: "Pre-Euro Italian 1000 Lira note featuring Giuseppe Verdi, the famous composer.",
        price: 5000,
        images: ['/products/currency/italian_lira_1000.webp'],
        category: 'Currency',
        year: 1982,
        condition: 'Very Fine',
        details: {
            "country": "Italy",
            "denomination": "1000 Lire"
        },
        currentInventory: 15
    },
    {
        title: "Chinese Republic Dollar",
        description: "Early Republic of China banknote from the transitional period after the fall of the Qing Dynasty.",
        price: 12000,
        images: ['/products/currency/chinese_republic_dollar.webp'],
        category: 'Currency',
        year: 1912,
        condition: 'Fair',
        details: {
            "country": "China",
            "denomination": "1 Dollar"
        },
        currentInventory: 7
    },
    {
        title: "Austrian Krone 1902",
        description: "Austro-Hungarian Empire banknote from the reign of Emperor Franz Joseph I.",
        price: 11000,
        images: ['/products/currency/austrian_krone_1902.webp'],
        category: 'Currency',
        year: 1902,
        condition: 'Good',
        details: {
            "country": "Austria-Hungary",
            "denomination": "100 Kronen"
        },
        currentInventory: 4
    },
    {
        title: "Indian Rupee 1943",
        description: "British India one rupee note from WWII era, featuring King George VI.",
        price: 9500,
        images: ['/products/currency/indian_rupee_1943.webp'],
        category: 'Currency',
        year: 1943,
        condition: 'Good',
        details: {
            "country": "British India",
            "denomination": "1 Rupee"
        },
        currentInventory: 12
    },
    {
        title: "Mexican Peso Revolutionary",
        description: "Currency from the Mexican Revolution period, issued by revolutionary forces.",
        price: 10500,
        images: ['/products/currency/mexican_peso_revolutionary.webp'],
        category: 'Currency',
        year: 1915,
        condition: 'Fair',
        details: {
            "country": "Mexico",
            "denomination": "5 Pesos"
        },
        currentInventory: 6
    },
    {
        title: "Dutch Guilder 1920",
        description: "Netherlands 25 Guilder note from the interwar period, beautifully engraved.",
        price: 9000,
        images: ['/products/currency/dutch_guilder_1920.webp'],
        category: 'Currency',
        year: 1920,
        condition: 'Very Good',
        details: {
            "country": "Netherlands",
            "denomination": "25 Guilders"
        },
        currentInventory: 5
    },
    {
        title: "Zimbabwe Trillion Dollar",
        description: "100 Trillion Zimbabwe Dollar note from the 2008 hyperinflation, a modern economic curiosity.",
        price: 6500,
        images: ['/products/currency/zimbabwe_trillion_dollar.webp'],
        category: 'Currency',
        year: 2008,
        condition: 'Uncirculated',
        details: {
            "country": "Zimbabwe",
            "denomination": "100 Trillion Dollars"
        },
        currentInventory: 30
    },

    // ==================== OTHER ====================
    {
        title: "Vintage Compass",
        description: "Brass pocket compass from the turn of the century. Perfect for collectors and adventurers.",
        price: 150,
        images: ['/products/other/vintage_compass.webp'],
        category: 'Other',
        year: 1910,
        condition: 'Good',
        details: {
            "material": "Brass",
            "origin": "UK"
        },
        currentInventory: 10
    },
    {
        title: "Antique Pocket Watch",
        description: "Gold-plated pocket watch with Roman numerals, still in working condition.",
        price: 320,
        images: ['/products/other/pocket_watch.webp'],
        category: 'Other',
        year: 1895,
        condition: 'Excellent',
        details: {
            "material": "Gold-plated",
            "origin": "Switzerland"
        },
        currentInventory: 4
    },
    {
        title: "Victorian Magnifying Glass",
        description: "Ornate brass magnifying glass with mother-of-pearl handle from the Victorian era.",
        price: 180,
        images: ['/products/other/magnifying_glass.webp'],
        category: 'Other',
        year: 1880,
        condition: 'Very Good',
        details: {
            "material": "Brass & Mother-of-Pearl",
            "origin": "UK"
        },
        currentInventory: 6
    },
    {
        title: "Antique Fountain Pen",
        description: "Elegant fountain pen with 14k gold nib, used by a prominent Victorian author.",
        price: 275,
        images: ['/products/other/fountain_pen.webp'],
        category: 'Other',
        year: 1905,
        condition: 'Good',
        details: {
            "material": "Ebonite & Gold",
            "origin": "USA"
        },
        currentInventory: 5
    },
    {
        title: "Antique Brass Telescope",
        description: "Victorian era brass telescope with leather grip, perfect for stargazing or maritime display.",
        price: 420,
        images: ['/products/other/antique_telescope.webp'],
        category: 'Other',
        year: 1885,
        condition: 'Very Good',
        details: {
            "material": "Brass & Leather",
            "origin": "UK"
        },
        currentInventory: 3
    },
    {
        title: "Vintage Typewriter",
        description: "Classic mechanical typewriter from the 1920s with original keys and working mechanism.",
        price: 550,
        images: ['/products/other/vintage_typewriter.webp'],
        category: 'Other',
        year: 1925,
        condition: 'Good',
        details: {
            "material": "Steel & Enamel",
            "origin": "USA"
        },
        currentInventory: 2
    },
    {
        title: "Antique Gramophone",
        description: "Early 1900s gramophone with brass horn and hand-crank mechanism, a true piece of musical history.",
        price: 890,
        images: ['/products/other/gramophone.webp'],
        category: 'Other',
        year: 1908,
        condition: 'Fair',
        details: {
            "material": "Wood & Brass",
            "origin": "UK"
        },
        currentInventory: 1
    }
];

export default antiqueInventory;

