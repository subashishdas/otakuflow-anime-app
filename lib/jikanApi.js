// Base URL
const BASE_URL = "https://api.jikan.moe/v4";

// Helper function to add delay between API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Debounce function to prevent excessive API calls
let debounceTimer;
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

// Enhanced error handling
const handleApiError = (error, endpoint) => {
  console.error(`Error in ${endpoint}:`, error);

  if (error.status === 429) {
    return new Error("Rate limit exceeded. Please try again in a moment.");
  }

  if (error.status >= 500) {
    return new Error("Server error. Please try again later.");
  }

  if (error.status >= 400) {
    return new Error("Invalid request. Please check your parameters.");
  }

  return new Error("Network error. Please check your connection.");
};

// Retry mechanism with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      const delayMs = Math.pow(2, i) * 1000; // Exponential backoff
      console.log(`Retry ${i + 1}/${maxRetries} in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }
};

export async function getSpecialForYou(limit = 10) {
  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/anime?order_by=popularity&sort=desc&sfw=true&limit=${limit}`
      );

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      throw handleApiError(error, "getSpecialForYou");
    }
  });
}

export async function getTrendingAnime(limit = 10) {
  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/anime?order_by=score&sort=desc&sfw=true&limit=${limit}`
      );

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      throw handleApiError(error, "getTrendingAnime");
    }
  });
}

export async function getPopularAnime(limit = 10) {
  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/anime?order_by=popularity&sort=asc&sfw=true&limit=${limit}`
      );

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      throw handleApiError(error, "getPopularAnime");
    }
  });
}

export async function getAnimeList(params = {}) {
  return retryWithBackoff(async () => {
    try {
      // Clean up params to remove undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );

      const query = new URLSearchParams({
        limit: 20,
        sfw: true,
        ...cleanParams,
      });

      const response = await fetch(`${BASE_URL}/anime?${query}`);

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();

      // Return both the anime data and pagination info
      return {
        data: data.data || [],
        pagination: data.pagination || {},
        // For backward compatibility, also return just the data array
        ...data,
      };
    } catch (error) {
      throw handleApiError(error, "getAnimeList");
    }
  });
}

// Debounced version for search
export const debouncedGetAnimeList = debounce(getAnimeList, 300);
