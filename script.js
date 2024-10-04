document.getElementById("yesBtn").onclick = function() {
    document.getElementById("responseForm").style.display = "flex";
};

document.getElementById("noBtn").onclick = function() {
    document.getElementById("notComingForm").style.display = "flex";
};

document.getElementById("guestForm").onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const guests = document.getElementById("guests").value;
    const alcohol = document.getElementById("alcohol").value;

    saveResponse("yes", name, guests, alcohol);
    document.getElementById("message").innerText = "Спасибо за ответ!";
    closeForms();
};

document.getElementById("notComingGuestForm").onsubmit = function(event) {
    event.preventDefault();
    const notComingName = document.getElementById("notComingName").value;

    saveResponse("no", notComingName);
    document.getElementById("message").innerText = "Сожалеем, что вы не будете с нами";
    closeForms();
};

function closeForms() {
    document.getElementById("responseForm").style.display = "none";
    document.getElementById("notComingForm").style.display = "none";
}

function saveResponse(type, name, guests = null, alcohol = null) {
    const url = 'https://script.google.com/macros/s/AKfycbz0NOoV9YVxLw9wxpxkk1hn-fImdy_5GZga-dMo3gMGHnlW_aYPX6K2rasTSTBq-2Eu/exec';
    const data = { type, name, guests, alcohol };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // конечная дата, например 1 июля 2021
    const deadline = new Date(2025, 09, 29);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
      $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
      $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
  });