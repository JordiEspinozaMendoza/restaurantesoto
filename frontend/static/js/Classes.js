class CreateFood {
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
    let statusUpload = await response.status;
    if(statusUpload == 500){  
      //Si el backend nos regresa un error
      let responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = `<span class = "message message-400">No se ha subido el alimento</span>`
    }else{
      //En caso de que SI se suba la comida correctamente
      window.location.href = mainUrl+"foodList/"
      return resData;
    }
  }
}
//Class para eliminar alguna comida
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
//Class para subir una imagen
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
//Class para actualizar una comida
class EditFood {
  async put(url, data) {
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
    let statusUpload = await response.status;
    console.log(statusUpload);
    if(statusUpload == 500){  
      //Si ocurre algun error en el backend
      let responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = `<span class = "message message-400">No se ha subido el alimento</span>`
    }else{
      //Si no nos redirigimos a la pagina de comidas
      window.location.href = mainUrl+"foodList/"
      return resData;
    }
  }
}
//Actualizar imagen
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
//Class para obtener token de acceso que sera usado en los otros EP
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
    const status = await response.status;
    
    //En caso de que el usuario o la password sean incorrectos
    if(status == 401){  
      let responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = `<span class = "message message-400">Estas claves no pertenecen a ningún usuario</span>`
    }else{
      //Guardamos el token en el LS
      localStorage.setItem("access", resData.access);
      const userData = new Login();
      //Hacemos la llamada para acceder a los datos del usuario
      userData
        .get(mainUrl+"api/users/profile/", resData.access)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

        window.location.href = mainUrl;
    }

    return resData;
  }
}
//Class para obtener los datos del usuario administrador
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
