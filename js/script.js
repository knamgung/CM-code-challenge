const accordion = document.querySelectorAll(".accordion__heading");
const expandCollapseAll = document.getElementById("expand-collapse-all");

// This mutation waits for any accordion class state change, then checks if all of them are open
// so we can collapse instead of expand

const callback = (mutationList) => {
  mutationList.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const opened = document.querySelectorAll(".open");
      if (opened.length === accordion.length) {
        expandCollapseAll.innerText = "Collapse All";
      } else {
        expandCollapseAll.innerText = "Expand All";
      }
    }
  });
};

const observer = new MutationObserver(callback);

// Attach event listener for each accordion
accordion.forEach((accord) => {
  accord.addEventListener("click", () => {
    expanded = accord.getAttribute("aria-expanded") === "true";
    accord.classList.toggle("open");
    accord.setAttribute("aria-expanded", !expanded);
  });
  observer.observe(accord, { attributes: true });
});

// Attach event listener for button to toggle all accordions
expandCollapseAll.addEventListener("click", (e) => {
  e.preventDefault();

  if (expandCollapseAll.innerText === "Expand All") {
    accordion.forEach((accord) => {
      expanded = accord.getAttribute("aria-expanded") === "true";

      accord.classList.add("open");
      accord.setAttribute("aria-expanded", !expanded);
    });
    expandCollapseAll.innerText = "Collapse All";
  } else {
    accordion.forEach((accord) => {
      expanded = accord.getAttribute("aria-expanded") === "true";

      accord.classList.remove("open");
      accord.setAttribute("aria-expanded", !expanded);
    });

    expandCollapseAll.innerText = "Expand All";
  }
});
