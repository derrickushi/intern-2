const antiqueInventory = [
    // Newspapers
    {
        title: "Apollo 11 Moon Landing",
        description: "An original print of The New York Times from July 21, 1969, covering the historic Apollo 11 moon landing. A true collector's piece.",
        price: 250,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1969,
        condition: 'Good',
        isFeatured: true,
        details: {
            "publication": "The New York Times",
            "date": "1969-07-21"
        },
        currentInventory: 1
    },
    {
        title: "V-E Day Celebration",
        description: "Vintage newspaper headline announcing the end of World War II in Europe.",
        price: 180,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1945,
        condition: 'Fair',
        details: {
            "publication": "Daily Mirror",
            "date": "1945-05-08"
        },
        currentInventory: 1
    },
    {
        title: "Titanic Disaster Report",
        description: "Rare newspaper clipping detailing the sinking of the Titanic.",
        price: 1200,
        images: ['/products/newspaper-moon.png'],
        category: 'Newspapers',
        year: 1912,
        condition: 'Fragile',
        details: {
            "publication": "The Times",
            "date": "1912-04-16"
        },
        currentInventory: 1
    },
    // Coins
    {
        title: "Roman Denarius Silver Coin",
        description: "Authentic silver Denarius from the Roman Empire. Showing clear profile details.",
        price: 85,
        images: ['/products/coin-roman.png'],
        category: 'Coins',
        year: 200,
        condition: 'Good',
        isFeatured: true,
        details: {
            "origin": "Roman Empire",
            "metal": "Silver"
        },
        currentInventory: 5
    },
    {
        title: "1804 Silver Dollar Replica",
        description: "High quality replica of the famous 1804 Silver Dollar.",
        price: 45,
        images: ['/products/coin-roman.png'],
        category: 'Coins',
        year: 1804,
        condition: 'Mint',
        details: {
            "origin": "USA",
            "metal": "Silver Alloy"
        },
        currentInventory: 10
    },
    {
        title: "Greek Drachma",
        description: "Ancient Greek Drachma featuring the owl of Athena.",
        price: 350,
        images: ['/products/coin-roman.png'],
        category: 'Coins',
        year: -450,
        condition: 'Fair',
        details: {
            "origin": "Greece",
            "metal": "Silver"
        },
        currentInventory: 2
    },
    {
        title: "Victorian Penny",
        description: "A copper penny from the reign of Queen Victoria.",
        price: 25,
        images: ['/products/coin-roman.png'],
        category: 'Coins',
        year: 1890,
        condition: 'Good',
        details: {
            "origin": "UK",
            "metal": "Copper"
        },
        currentInventory: 20
    },
    // Currency
    {
        title: "1899 Silver Certificate",
        description: "Beautifully preserved 1899 US Silver Certificate with intricate border designs.",
        price: 450,
        images: ['/products/currency-silver.png'],
        category: 'Currency',
        year: 1899,
        condition: 'Fine',
        isFeatured: true,
        details: {
            "country": "USA",
            "denomination": "1 Dollar"
        },
        currentInventory: 1
    },
    {
        title: "Confederate 10 Dollar Bill",
        description: "Civil War era Confederate currency.",
        price: 120,
        images: ['/products/currency-silver.png'],
        category: 'Currency',
        year: 1864,
        condition: 'Fair',
        details: {
            "country": "CSA",
            "denomination": "10 Dollars"
        },
        currentInventory: 3
    },
    {
        title: "French Assignat",
        description: "Paper money from the French Revolution period.",
        price: 90,
        images: ['/products/currency-silver.png'],
        category: 'Currency',
        year: 1790,
        condition: 'Fragile',
        details: {
            "country": "France",
            "denomination": "500 Livres"
        },
        currentInventory: 2
    },
    {
        title: "German Hyperinflation Mark",
        description: "One billion Mark note from the Weimar Republic hyperinflation period.",
        price: 30,
        images: ['/products/currency-silver.png'],
        category: 'Currency',
        year: 1923,
        condition: 'Good',
        details: {
            "country": "Germany",
            "denomination": "1 Billion Marks"
        },
        currentInventory: 15
    },
    // Other
    {
        title: "Vintage Compass",
        description: "Brass pocket compass from the turn of the century.",
        price: 150,
        images: ['/products/coin-roman.png'], // Using coin placeholder for now
        category: 'Other',
        year: 1910,
        condition: 'Good',
        details: {
            "material": "Brass",
            "origin": "UK"
        },
        currentInventory: 1
    }
];

export default antiqueInventory;
