export const postRequest = async (url, body) => {
  console.log(url, body);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("failed posting data");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
