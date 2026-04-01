export const STORAGE_KEY = "habitos_v1";

export const TABS = [
  { label: "DASHBOARD", path: "/" },
  { label: "TRACKER", path: "/tracker" },
  { label: "ANALYTICS", path: "/analytics" },
  { label: "CHECK-IN", path: "/check-in" },
];

export const DEFAULT_FORM = {
  gym: false,
  study_hours: 4,
  sleep_hours: 7,
  diet: false,
  phone_hrs: 3,
  emotional_trigger: false,
  thought_about_her: false,
  energy_3pm: 5,
  mood: 3,
  win: "",
};

export const DEFAULT_CHECKIN = {
  phone: 2,
  on_track: null,
  word: "",
};
