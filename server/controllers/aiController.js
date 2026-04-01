import { requestCoachMessage } from "../services/aiService.js";

const BOOLEAN_FIELDS = ["gym", "diet", "emotional_trigger", "thought_about_her"];
const NUMBER_FIELDS = ["study_hours", "sleep_hours", "phone_hrs", "energy_3pm", "mood"];

function isNonNegativeNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function validateCoachPayload(body = {}) {
  const issues = [];

  if (!body.log || typeof body.log !== "object" || Array.isArray(body.log)) {
    issues.push("A valid log payload is required.");
    return issues;
  }

  for (const field of BOOLEAN_FIELDS) {
    if (typeof body.log[field] !== "boolean") {
      issues.push(`${field} must be a boolean.`);
    }
  }

  for (const field of NUMBER_FIELDS) {
    if (!isNonNegativeNumber(body.log[field])) {
      issues.push(`${field} must be a number greater than or equal to 0.`);
    }
  }

  if (typeof body.avgPhone !== "string" && !isNonNegativeNumber(body.avgPhone)) {
    issues.push("avgPhone must be a string or non-negative number.");
  }

  if (!isNonNegativeNumber(body.gymDays)) {
    issues.push("gymDays must be a number greater than or equal to 0.");
  }

  if (!isNonNegativeNumber(body.score)) {
    issues.push("score must be a number greater than or equal to 0.");
  }

  return issues;
}

export async function postCoach(req, res, next) {
  const validationErrors = validateCoachPayload(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Invalid coach payload.",
      details: validationErrors,
    });
  }

  try {
    const result = await requestCoachMessage(req.body);
    return res.status(200).json(result);
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
}

export default {
  postCoach,
};