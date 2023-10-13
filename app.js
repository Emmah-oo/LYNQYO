const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

const navbar = document.querySelector("nav");
window.onscroll = () => {
  if (window.scrollY > 3) {
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


(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "09/20/",
    launchDay = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  if (today > launchDay) {
    launchDay = dayMonth + nextYear;
  }
  //end

  const countDown = new Date(launchDay).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      document.querySelector(".countdown .days").innerText = Math.floor(distance / day);
      (document.querySelector(".countdown .hours").innerText = Math.floor(
        ((distance % day) / hour)
      )),
        (document.querySelector(".countdown .minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.querySelector(".countdown .secs").innerText = Math.floor(
          (distance % minute) / second
        ));
    }, 0);
})();