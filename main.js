const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});

const navbar = document.querySelector("nav");
window.onscroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

const navLinks = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const API_URL = "https://api.lynqyo.com/api/v1";

$.ajax({
  url: `${API_URL}/projects/current`,
  success: function (data) {
    let values = JSON.parse(data);

    $(".js-telegram").attr("href", values.social_media.telegram);
    $(".js-twitter").attr("href", values.social_media.twitter);
  },
});

$.ajax({
  url: `${API_URL}/stages`,
  success: function (data) {
    let stages = JSON.parse(data);
    let start_date = new Date(stages.data[0].start_date).getTime();
    let text = "";
    let today = new Date();

    $(".js-p1-start-end").text(
      moment(stages.data[0].start_date).format("DD/MM/YYYY") +
        " - " +
        moment(stages.data[0].end_date).format("DD/MM/YYYY")
    );
    $(".js-p1-amount").text(stages.data[0].total_tokens);
    $(".js-p1-bonus").text(stages.data[0].bonuses.base_percentage + "%");

    $(".js-p2-start-end").text(
      moment(stages.data[1].start_date).format("DD/MM/YYYY") +
        " - " +
        moment(stages.data[1].end_date).format("DD/MM/YYYY")
    );
    $(".js-p2-amount").text(stages.data[1].total_tokens);
    $(".js-p2-bonus").text(stages.data[1].bonuses.base_percentage + "%");

    $(".js-p3-start-end").text(
      moment(stages.data[2].start_date).format("DD/MM/YYYY") +
        " - " +
        moment(stages.data[2].end_date).format("DD/MM/YYYY")
    );
    $(".js-p3-amount").text(stages.data[2].total_tokens);
    $(".js-p3-bonus").text(stages.data[2].bonuses.base_percentage + "%");

    if (today < new Date(stages.data[0].start_date)) {
      start_date = new Date(stages.data[0].start_date);
      text = "PRESALE WILL START IN";
    }
    if (
      today > new Date(stages.data[0].start_date) &&
      today < new Date(stages.data[0].end_date)
    ) {
      start_date = new Date(stages.data[0].end_date);
      text = "PRESALE STAGE 1 WILL END IN";
    }

    if (
      today > new Date(stages.data[1].start_date) &&
      today < new Date(stages.data[1].end_date)
    ) {
      start_date = new Date(stages.data[1].end_date);
      text = "PRESALE STAGE 2 WILL END IN";
    }

    if (
      today > new Date(stages.data[2].start_date) &&
      today < new Date(stages.data[2].end_date)
    ) {
      start_date = new Date(stages.data[2].end_date);
      text = "PRESALE STAGE 3 WILL END IN";
    }

    if ($("#token-start-date")) {
      $("#token-start-date").text(
        moment(stages.data[0].start_date).format("DD/MM/YYYY")
      );
    }
    if ($("#token-end-date")) {
      $("#token-end-date").text(
        moment(stages.data[2].end_date).format("DD/MM/YYYY")
      );
    }

    $(".countdown h1").text(text);

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const countDown = new Date(start_date).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        document.querySelector(".countdown .days").innerText = Math.floor(
          distance / day
        );
        (document.querySelector(".countdown .hours").innerText = Math.floor(
          (distance % day) / hour
        )),
          (document.querySelector(".countdown .minutes").innerText = Math.floor(
            (distance % hour) / minute
          )),
          (document.querySelector(".countdown .secs").innerText = Math.floor(
            (distance % minute) / second
          ));
      }, 0);
  },
});
