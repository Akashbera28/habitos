import env from "../config/env.js";

function buildFallbackText(payload) {
  const studyHours = Number(payload?.log?.study_hours ?? 0);
  const phoneHours = Number(payload?.log?.phone_hrs ?? 0);
  const score = Number(payload?.score ?? 0);

  if (score >= 80) {
    return "You executed. Protect the standard tomorrow. Keep the phone low and the work high.";
  }

  if (phoneHours > studyHours) {
    return "Your phone got more of you than your goals did. Cut the screen time tomorrow and earn your momentum back.";
  }

  return "You are not far off, but close is still weak. Do the hard work earlier, keep distractions lower, and finish stronger tomorrow.";
}

function buildFallbackResponse(payload, reason) {
  return {
    text: buildFallbackText(payload),
    source: "fallback",
    fallback: true,
    reason,
  };
}

export async function requestCoachMessage(payload) {
  if (!env.anthropicKey || env.anthropicKey === "YOUR_API_KEY") {
    return buildFallbackResponse(payload, "missing_api_key");
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          'You are a brutally honest, no-excuses discipline coach. Military tone. Short sentences. Maximum 5 lines. No emojis. Raw truth only. Address the user directly as "you".',
        messages: [
          {
            role: "user",
            content: `Today: Gym=${payload.log.gym}, Study=${payload.log.study_hours}hrs, Sleep=${payload.log.sleep_hours}hrs, Diet=${payload.log.diet}, Phone=${payload.log.phone_hrs}hrs, Emotional=${payload.log.emotional_trigger}, Thought about ex=${payload.log.thought_about_her}, Energy=${payload.log.energy_3pm}/10, Mood=${payload.log.mood}/5. Last 7 days avg phone=${payload.avgPhone}hrs, gym days=${payload.gymDays}/7. Score=${payload.score}/100. Give me: 1 thing I failed, 1 thing to fix tomorrow, 1 brutal truth.`,
          },
        ],
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return buildFallbackResponse(payload, data.error?.message || "coach_api_error");
    }

    return {
      text: data.content?.[0]?.text || buildFallbackText(payload),
      source: "anthropic",
      fallback: false,
      reason: null,
    };
  } catch (error) {
    return buildFallbackResponse(payload, error.message || "network_error");
  }
}

export default {
  requestCoachMessage,
};