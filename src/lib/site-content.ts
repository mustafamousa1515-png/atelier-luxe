export const site = {
  email: "info@hurriamo.com",
  director: { name: "Mustafa Mousa", title: "Creative Director" },
  services: [
    { title: "Bespoke Eveningwear", text: "One-of-one silhouettes developed through private consultation, toile and considered fittings." },
    { title: "Ceremonial Dressing", text: "Composed pieces for significant occasions, shaped around presence, movement and personal ritual." },
    { title: "Private Wardrobe", text: "A discreet edit of made-to-measure pieces created as a coherent, enduring wardrobe." },
    { title: "Collection Viewing", text: "A private presentation of selected house pieces, available by prior appointment." },
  ],
  appointments: ["Private consultation", "Fitting appointment", "Virtual consultation", "Collection viewing"] as const,
  booking: { durationMinutes: 60, timezone: "Asia/Amman", noticeHours: 48, days: [1, 2, 3, 4, 6], startHour: 10, endHour: 18 },
};
