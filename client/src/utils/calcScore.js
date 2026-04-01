export function calcScore(log = {}) {
  const {
    gym = false,
    study_hours = 0,
    sleep_hours = 7,
    diet = false,
    phone_hrs = 3,
    emotional_trigger = false,
    thought_about_her = false,
    energy_3pm = 5,
    mood = 3,
  } = log;

  const sleepPoints = sleep_hours >= 7 && sleep_hours <= 8.5 ? 15 : 7;
  const phonePenalty = phone_hrs > 1 ? (phone_hrs - 1) * 30 : 0;
  const rawScore =
    (gym ? 15 : 0) +
    Math.min(30, study_hours * 6) +
    sleepPoints +
    (diet ? 10 : 0) -
    phonePenalty -
    (emotional_trigger ? 10 : 0) -
    (thought_about_her ? 5 : 0) +
    energy_3pm * 1.5 +
    mood * 2;

  return Math.min(100, Math.max(0, Math.round(rawScore)));
}

export default calcScore;
