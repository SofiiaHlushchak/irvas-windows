import checkNumInputs from "./checkNumInputs.js";

const forms = (state) => {
    const forms = document.querySelectorAll("form"),
        inputs = document.querySelectorAll("input");

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Loading...",
        success: "Thank you! We will contact you soon",
        failure: "Something went wrong...",
    };

    const postData = async (url, data) => {
        document.querySelector(".status").textContent = message.loading;
        let result = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach((input) => {
            input.value = "";
        });
    };

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            if (form.getAttribute("data-calc") === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData("assets/server.php", formData)
                .then((result) => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;
