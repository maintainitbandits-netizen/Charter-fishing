export const posts = [
  {
    slug: 'welcome-aboard-knotty-sea',
    title: 'Welcome aboard: stories from the Knotty Sea',
    date: '2026-09-21',
    dateLabel: 'September 21, 2026',
    excerpt:
      'This is where the crew will share trip notes, seasonal updates, and the little things that make a day offshore worth remembering.',
    paragraphs: [
      'Hello from the dock! We’re glad you found Knotty Sea Fishing Charters. This blog is our way of staying in touch between trips — a place for trip notes, seasonal updates, and the small details that make a full day on the Atlantic worth remembering.',
      'Here’s what you can expect to read here: what to bring on your first offshore charter, how we pick destinations based on conditions, honest notes about seasons and what the water is doing, and stories from the boat — always with the captain’s okay before anything gets published.',
      'Everything you need to plan a trip is already on this site: our charter packages and rates, what’s included, FAQs, and how to reach us. When you’re ready, call (904) 537-4000 or send a trip request — Captain Mike will confirm availability, rates, and departure details personally.',
      'Tight lines — see you on the water.'
    ]
  },
  {
    slug: 'what-to-bring-on-your-offshore-charter',
    title: 'What to bring on your offshore fishing charter',
    date: '2026-09-02',
    dateLabel: 'September 2, 2026',
    excerpt:
      'Sunscreen, sunglasses, non-slip shoes — and a short list of things we’ve already got covered. Here’s the packing list before you meet us at the dock.',
    paragraphs: [
      'Planning your first private charter with us? The packing list is short. Bring sunscreen, sunglasses, a hat, non-slip shoes, and any food and drinks your crew enjoys on the water.',
      'You can leave a few things at home. Rods, tackle, bait, and fishing licenses are included on every trip, and we provide bottled water plus iced cooler space. After the catch, the crew cleans, bags, and ices your fish so it’s ready for the dock-to-dish treatment.',
      'A quick note on footwear: the deck gets slick, so non-slip shoes are the way to go. And if anyone in your crew has allergies, mobility needs, or special requirements, mention it when you send a trip request so the captain can plan with you.',
      'That’s it — pack light, show up ready for saltwater, and we’ll handle the rest. Preferred date in mind? Send a trip request or call (904) 537-4000 and we’ll talk through the details.'
    ]
  },
  {
    slug: 'private-charters-explained',
    title: 'Private charters, explained: what “whole boat” really means',
    date: '2026-08-19',
    dateLabel: 'August 19, 2026',
    excerpt:
      'One boat, your crew, up to six guests — and no per-person surprises. Here’s how private charters work with Knotty Sea.',
    paragraphs: [
      'When we say private charter, we mean the whole boat is yours. The listed price is for the boat — not per person — for a crew of up to six guests. Bring your family or your friends and enjoy the Atlantic to yourselves.',
      'Because the trip is private, the day works around your crew. First-timers and kids are welcome, the captain tailors fishing techniques to your group and the conditions, and there’s no rush to rotate strangers on and off the boat.',
      'The rate covers the essentials: equipment, bait, licenses, and fish cleaning are included, so there are no per-person surprises. Rates run from $1,300 for the half-day adventure to $2,500 for the ultimate offshore trip, and every rate is confirmed by the captain before you book.',
      'Ready to claim the boat? Send a trip request with your preferred date, or call (904) 537-4000 — Captain Mike will confirm availability and the details.'
    ]
  }
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
