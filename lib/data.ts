export type Cat = "Beach" | "Culture" | "Adventure";
export type Pkg = { id: number; n: string; c: Cat; d: number; p: number; h: [string, string]; i: string[] };

export const DEST = {
  Maldives: { t: "Maldives", x: "Overwater villas, private sandbanks and water the colour of glass.", f: ["8 nights", "From $3,200"], a: ["#0b1f2a", "#1f9aa8"], sun: "#f2c36b", sy: 330, far: "M0 600 Q300 580 600 600 T1200 590 V800 H0Z" },
  Santorini: { t: "Santorini", x: "Whitewashed cliffs, caldera sunsets and long dinners above the sea.", f: ["6 nights", "From $2,400"], a: ["#2a1b3d", "#e08a5b"], sun: "#ffd58a", sy: 420, far: "M0 560 L300 500 L520 540 L780 470 L1200 540 V800 H0Z" },
  Kyoto: { t: "Kyoto", x: "Tea houses, lantern-lit lanes and temples to yourself before the crowds.", f: ["9 nights", "From $3,900"], a: ["#1c2433", "#b8505e"], sun: "#f7b0a0", sy: 300, far: "M0 580 L180 470 L330 560 L520 430 L720 560 L1000 460 L1200 570 V800 H0Z" },
  Alps: { t: "Swiss Alps", x: "Glacier trains, alpine chalets and peaks that fill the whole window.", f: ["7 nights", "From $4,300"], a: ["#0e1b2e", "#6a8fb8"], sun: "#e9eef5", sy: 260, far: "M0 640 L220 330 L380 520 L560 250 L780 540 L980 340 L1200 600 V800 H0Z" },
} as const;
export type DestKey = keyof typeof DEST;
export const DEST_KEYS = Object.keys(DEST) as DestKey[];

export const PACKAGES: Pkg[] = [
  { id: 1, n: "Maldives Overwater Escape", c: "Beach", d: 8, p: 3200, h: ["#0b4f6c", "#2bb5b0"], i: ["Private seaplane transfer to your overwater villa", "Sunset dolphin cruise and snorkel with a marine guide", "Spa ritual for two and a candlelit sandbank dinner"] },
  { id: 2, n: "Santorini Caldera Retreat", c: "Beach", d: 6, p: 2400, h: ["#3b2a5a", "#e8895a"], i: ["Cliffside suite with caldera views", "Private catamaran sail and winery tasting", "Sunset dinner in Oia with a local host"] },
  { id: 3, n: "Kyoto & Hidden Japan", c: "Culture", d: 9, p: 3900, h: ["#2b2f45", "#c05a68"], i: ["Private tea ceremony and geisha district walk", "Early-morning Fushimi Inari with a guide", "Bullet train to Kanazawa and a ryokan night"] },
  { id: 4, n: "Swiss Alps by Glacier Express", c: "Adventure", d: 7, p: 4300, h: ["#16294a", "#7fa6d0"], i: ["Scenic Glacier Express in panoramic class", "Guided hike above Zermatt with Matterhorn views", "Chalet stay with fondue evening"] },
  { id: 5, n: "Morocco: Medinas & Sahara", c: "Culture", d: 8, p: 2100, h: ["#5a2b1b", "#e3a45a"], i: ["Riad stays in Marrakech and Fes", "Camel trek and luxury desert camp in Merzouga", "Private cooking class with a local family"] },
  { id: 6, n: "Patagonia Trails", c: "Adventure", d: 10, p: 5600, h: ["#12332f", "#8bb08a"], i: ["Guided Torres del Paine day treks", "Lodge stays with full board", "Glacier boat trip and Condor viewpoint"] },
  { id: 7, n: "Bali Wellness Journey", c: "Beach", d: 7, p: 1900, h: ["#1d4a3a", "#e6c36a"], i: ["Jungle villa with private pool", "Daily yoga and a traditional healing session", "Rice terrace cycling and temple visit"] },
];

export const CATS: Record<string, { name: Cat; title: string; text: string }> = {
  beach: { name: "Beach", title: "Beach holidays", text: "Private villas, island hops and sunset dinners. Pick your shoreline and we arrange the rest." },
  culture: { name: "Culture", title: "Culture trips", text: "Old cities, local kitchens and tea houses, with guides who know the quiet hours." },
  adventure: { name: "Adventure", title: "Adventure journeys", text: "Glacier trains, long treks and wild lodges, planned by people who have walked them." },
};

export const fmt = (n: number) => "$" + n.toLocaleString("en-US");
