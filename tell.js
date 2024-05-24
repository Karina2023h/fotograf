document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

  const form = document.getElementById("contact-form");
  const statusMessageDiv = document.getElementById("status-message");

  console.log(form); // Проверяем, найден ли элемент

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const shootingType = document.getElementById("shooting-type").value;

      if (name && email && phone && shootingType) {
        const botToken = "7137681405:AAF351KCaa8dxo0TWB23M1aPk-0HT2bpMzo"; // Замените на ваш Bot API Token
        const chatId = "-1002144280183"; // Замените на ваш Chat ID
        const message = `Нова заявка:\n\nІм'я: ${name}\nЕлектрона пошта: ${email}\nНомер телефону: ${phone}\nТип зйомки: ${shootingType}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const messageDiv = document.getElementById("message");
            if (data.ok) {
              // Показываем сообщение пользователю
              messageDiv.textContent = "Ваша заявка була успішно відправлена!";
              messageDiv.style.display = "block";
              messageDiv.classList.remove("error");
              messageDiv.classList.add("success");

              // Очищаем поля формы
              document.getElementById("contact-form").reset();

              // Плавное исчезновение сообщения через 5 секунд
              setTimeout(() => {
                messageDiv.classList.add("hidden");
              }, 5000);

              // Показать сообщение внизу формы
              statusMessageDiv.textContent = "Дані відправлені успішно!";
              statusMessageDiv.style.display = "block";
              statusMessageDiv.classList.remove("error");
              statusMessageDiv.classList.add("success");

              // Плавное исчезновение сообщения через 5 секунд
              setTimeout(() => {
                statusMessageDiv.classList.add("hidden");
              }, 2000);
            } else {
              // Показываем сообщение об ошибке
              messageDiv.textContent =
                "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.";
              messageDiv.style.display = "block";
              messageDiv.classList.add("error");

              // Показать сообщение об ошибке внизу формы
              statusMessageDiv.textContent =
                "Помилка при відправці даних. Будь ласка, спробуйте ще раз.";
              statusMessageDiv.style.display = "block";
              statusMessageDiv.classList.add("error");
            }
          })
          .catch((error) => {
            // Показываем сообщение об ошибке
            const messageDiv = document.getElementById("message");
            messageDiv.textContent =
              "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.";
            messageDiv.style.display = "block";
            messageDiv.classList.add("error");

            // Показать сообщение об ошибке внизу формы
            statusMessageDiv.textContent =
              "Помилка при відправці даних. Будь ласка, спробуйте ще раз.";
            statusMessageDiv.style.display = "block";
            statusMessageDiv.classList.add("error");
          });
      } else {
        alert("Пожалуйста, заполните все поля формы.");
      }
    });
  } else {
    console.error("Форма с id 'contact-form' не найдена.");
  }
});
