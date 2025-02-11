const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

// Logs in a user with name and email, returns true if successful
export const loginUser = async (name, email) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
    });
    return response.ok;
};

// Logs out the current user, returns true if successful
export const logoutUser = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response.ok;
};

// Fetches dog IDs based on filters like pagination, sorting, and breed selection
export const fetchDogIds = async (size = 5, from = 0, sortField = "breed", sortOrder = "asc", breeds = []) => {
    const url = new URL(`${API_BASE_URL}/dogs/search`);
    const params = new URLSearchParams({
        sort: `${sortField}:${sortOrder}`,
        size: size.toString(),
        from: from.toString(),
    });

    if (breeds.length > 0) {
        breeds.forEach((breed) => params.append("breeds", breed));
    }

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch dog IDs");

    return response.json();
};

// Fetches details for a list of dog IDs
export const fetchDogs = async (dogIds) => {
    const response = await fetch(`${API_BASE_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogIds),
    });

    if (!response.ok) throw new Error("Failed to fetch dogs");

    return response.json();
};

// Fetches the list of available dog breeds
export const fetchBreeds = async () => {
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch breeds");

    return response.json();
};

// Finds a match for the selected dog IDs
export const fetchMatch = async (selectedDogIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dogs/match`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedDogIds),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch match: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching match:", error);
        return null;
    }
};
