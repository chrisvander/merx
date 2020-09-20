export const sections = {
    pf: "Personal Finance",
    sb: "Stocks & Bonds",
    re: "Real Estate"
};

export const tracks = {
    1: "literacy",
    2: "stability",
    3: "retirement",
    4: "wealth"
}

export const catalog = [
    {
        key: 1,
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Open",
        category: "pf",
        difficulty: "easy",
        track: ["literacy", "wealth"]
    },
    {
        key: 2,
        title: "Introduction to Saving",
        description: "An introduction to why saving money and starting early is important.",
        category: "pf",
        status: "Open",
        difficulty: "easy",
        track: ["literacy", "retirement", "wealth"]
    },
    {
        key: 3,
        title: "Diversification",
        description: "What is diversification and how can I use it?",
        status: "Open",
        category: "sb",
        difficulty: "medium",
        track: ["stability", "wealth"]
    },
    {
        key: 4,
        title: "What's Interest?",
        description: "An introduction to the fundamentals of making money work for you.",
        status: "Coming Soon",
        category: "sb",
        difficulty: "easy",
        track: ["literacy", "retirement"]
    },
    {
        key: 5,
        title: "Intro to Mortgages",
        description: "How to use mortgages to your advantage.",
        status: "Coming Soon",
        category: "re",
        difficulty: "medium",
        track: ["literacy", "stability"]
    },
    {
        key: 6,
        title: "Correlation",
        description: "How can you measure the relationships in price movements?",
        status: "Open",
        category: "sb",
        difficulty: "medium",
        track: ["literacy"]
    },
    {
        key: 8,
        title: "Making Debt Pay You",
        description: "Introduction to the math behind leverage and how rich people stay rich.",
        status: "Coming Soon",
        category: "re",
        difficulty: "medium",
        track: ["wealth"]
    }
];
