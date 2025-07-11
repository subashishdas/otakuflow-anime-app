// Base URL
const BASE_URL = "https://api.jikan.moe/v4";

export async function getSpecialForYou(limit) {
  try {
    const response = await fetch(
      `${BASE_URL}/anime?order_by=popularity&sort=desc&sfw=true&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the data array, or empty array if no data
    return data.data || [];
  } catch (error) {
    console.error("Error fetching special anime:", error);
    // Return empty array on error so your component doesn't break
    return [];
  }
}

export async function getTrendingAnime(limit) {
  try {
    const response = await fetch(
      `${BASE_URL}/anime?order_by=score&sort=desc&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the data array, or empty array if no data
    return data.data || [];
  } catch (error) {
    console.error("Error fetching special anime:", error);
    // Return empty array on error so your component doesn't break
    return [];
  }
}

export async function getPopularAnime(limit) {
  try {
    const response = await fetch(
      `${BASE_URL}/anime?order_by=popularity&sort=asc&sfw=true&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
}
