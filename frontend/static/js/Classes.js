class CreateFood {
  // Make an HTTP PUT Request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${data}`,

      },
    });
    const resData = await response.json();

    return resData;
  }
}
class UploadFood {
  async post(url, data) {
    console.log(data.token);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }
}

class DeleteFood {
  async delete(url, data) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }
}
class UploadImage {
  async post(url, formData, token) {
    console.log(token);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    const resData = await response.json();
    return resData;
  }
}

class EditFood {
  async put(url, data) {
    console.log(data)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }
}
class UpdateImage {
  async put(url, formData, token) {
    console.log(formData);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRFToken": csrftoken,
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    const resData = await response.json();
    return resData;
  }
}

class AccessToken {
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    localStorage.setItem("access", resData.access);
    const userData = new Login();
    userData
      .get("http://127.0.0.1:8000/api/users/profile/", resData.access)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    return resData;
  }
}
class Login {
  async get(url, data) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    });
    const resData = await response.json();
    localStorage.setItem("userInfo", JSON.stringify(resData));

    return resData;
  }
}
