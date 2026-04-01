const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getCoach(payload) {
  try {
    const response = await fetch(`${API_URL}/api/coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Failed to get coaching response.");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unable to reach the coach service.");
  }
}

export default {
  getCoach,
};
