const API_URL = "http://localhost:5000/api/profile/";

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.errors ? data.errors.map(err => err.msg).join(", ") : data.message;
      throw new Error(errorMessage || "Something went wrong");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.log(error)
    return { error: error.message};
}
};

export const getProfile = async () => {
  try {
    const response = await fetch(`${API_URL}profiles`);
    console.log(response)
    return await handleResponse(response);
  } catch (error) {
    return { error: error.message };
  }
};

export const updateProfile = async (email, profileData) => {
  try {
    const response = await fetch(`${API_URL}${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    return await handleResponse(response);
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteProfile = async (email) => {
  try {
    const response = await fetch(`${API_URL}${email}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    return { error: error.message};
  }
};