const Blogs = [
  {
    id: 111111111,
    slug: "hashnode",
    alias: "hashnode",
    description: "Everything you need to start blogging as a developer!",
    social: {
      twitter: "hashnode",
      github: "hashnode",
      website: "https://hashnode.com",
    },
    identity: "https://cdn.svgporn.com/logos/hashnode.svg",
    category: "blog",
    tweets: [
      { user: "tapasadhikary", status: "1409390953819885568" },
      { user: "dannysteenman", status: "1393863858012438529" },
      { user: "codingyuri", status: "1420192820573339649" },
    ],
  },
  {
    id: 222222222,
    slug: "medium",
    alias: "medium",
    description: "Welcome to Medium, where words matter.",
    social: {
      twitter: "Medium",
      github: "medium",
      website: "https://medium.com",
    },
    identity: "https://cdn.svgporn.com/logos/medium.svg",
    category: "blog",
    tweets: [
      { user: "ameliawb", status: "1529969835563704344" },
      { user: "agzmn", status: "1494779827311636483" },
      { user: "kishlycan", status: "1493623386626351105" },
    ],
  },
  {
    id: 333333333,
    slug: "ghost",
    alias: "ghost",
    description:
      "Turn your audience into a business. Publishing, newsletters, memberships and subscriptions — all in one place.",
    social: {
      twitter: "Ghost",
      github: "TryGhost",
      website: "https://ghost.org",
    },
    identity: "https://cdn.svgporn.com/logos/ghost.svg",
    category: "blog",
    tweets: [],
  },
];

const Baas = [
  {
    id: 444444444,
    slug: "firebase",
    alias: "firebase",
    description: "Make your app the best it can be",
    social: {
      twitter: "Firebase",
      github: "firebase",
      website: "https://firebase.google.com",
    },
    identity: "https://cdn.svgporn.com/logos/firebase.svg",
    category: "baas",
    tweets: [
      { user: "DThompsonDev", status: "1549917987662139393" },
      { user: "thevanshu_yadav", status: "1549728764472332288" },
      { user: "Firebase", status: "1552761388312866818" },
    ],
  },
  {
    id: 555555555,
    slug: "supabase",
    alias: "supabase",
    description: "The open source Firebase alternative.",
    social: {
      twitter: "supabase",
      github: "supabase",
      website: "https://supabase.com",
    },
    identity: "https://cdn.svgporn.com/logos/supabase-icon.svg",
    category: "baas",
    tweets: [
      { user: "AlexandroMtzG", status: "1549907610186534914" },
      { user: "lennardeth", status: "1551884371015213057" },
      { user: "rbkayz", status: "1549405926494543872" },
    ],
  },
  {
    id: 666666666,
    slug: "appwrite",
    alias: "appwrite",
    description:
      "End to end backend server for frontend and mobile developers.",
    social: {
      twitter: "appwrite",
      github: "appwrite",
      website: "https://appwrite.io",
    },
    identity: "https://cdn.svgporn.com/logos/appwrite-icon.svg",
    category: "baas",
    tweets: [
      { user: "youngbloodcyb", status: "1550159056341307393" },
      { user: "helal_muneer1", status: "1549759197046243328" },
      { user: "Paza_Xs", status: "1551638963542265857" },
    ],
  },
];

const Analytics = [
  {
    id: 777777777,
    slug: "googleanalytics",
    alias: "googleanalytics",
    description: "",
    social: {
      twitter: "googleanalytics",
      github: "googleanalytics",
      website: "https://developers.google.com/analytics",
    },
    identity: "https://cdn.svgporn.com/logos/google-analytics.svg",
    category: "analytics",
    tweets: [
      { user: "CommerceGuruu", status: "1553092105152516096" },
      { user: "AnalyticsExp", status: "1551403846118907905" },
      { user: "The_Web_Guys", status: "1552065139976830976" },
    ],
  },
  {
    id: 888888888,
    slug: "matomo",
    alias: "matomo",
    description:
      "Our mission is « To create, as a community, the leading open digital analytics platform, that gives every user full control of their data. »",
    social: {
      twitter: "matomo_org",
      github: "matomo-org",
      website: "https://matomo.org",
    },
    identity: "https://cdn.svgporn.com/logos/matomo-icon.svg",
    category: "analytics",
    tweets: [
      { user: "Fernandezchapt", status: "1552690967655882753" },
      { user: "MobeenAnwar", status: "1549180285081772032" },
      { user: "verysocialsousa", status: "1550527606671511553" },
    ],
  },
  {
    id: 999999999,
    slug: "splitbee",
    alias: "splitbee",
    description: "Your friendly analytics & conversion platform.",
    social: {
      twitter: "splitbee",
      github: "splitbee",
      website: "https://splitbee.io",
    },
    identity: "",
    category: "analytics",
    tweets: [
      { user: "rauchg", status: "1331018147256705025" },
      { user: "twonarly", status: "1546495909701324804" },
      { user: "ahmedxfn", status: "1551248495021068291" },
    ],
  },
];

module.exports = { data: [...Analytics, ...Baas, ...Blogs] };
