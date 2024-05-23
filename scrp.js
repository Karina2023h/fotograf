document.getElementById("submit-button").addEventListener("click", function () {
  const phoneNumber = document.getElementById("phone-number").value;

  if (phoneNumber) {
    const botToken = "7137681405:AAF351KCaa8dxo0TWB23M1aPk-0HT2bpMzo"; // Замените на ваш Bot API Token
    const chatId = "-1002144280183"; // Замените на ваш Chat ID
    const message = `Получен новый номер телефона: ${phoneNumber}`;

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
          messageDiv.textContent = `Номер ${phoneNumber} отправлен`;
          messageDiv.style.display = "block";
          messageDiv.classList.remove("error");

          // Очищаем поле ввода
          document.getElementById("phone-number").value = "";

          // Плавное исчезновение сообщения через 5 секунд
          setTimeout(() => {
            messageDiv.classList.add("hidden");
          }, 2000);
        } else {
          // Показываем сообщение об ошибке
          messageDiv.textContent = `Произошла ошибка при отправке номера. Пожалуйста, попробуйте еще раз.`;
          messageDiv.style.display = "block";
          messageDiv.classList.add("error");
        }
      })
      .catch((error) => {
        // Показываем сообщение об ошибке
        const messageDiv = document.getElementById("message");
        messageDiv.textContent = `Произошла ошибка при отправке номера. Пожалуйста, попробуйте еще раз.`;
        messageDiv.style.display = "block";
        messageDiv.classList.add("error");
      });
  } else {
    alert("Пожалуйста, введите номер телефона.");
  }
});
