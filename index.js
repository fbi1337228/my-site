const translit = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "`",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "Kh",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Shch",
  Ъ: "",
  Ы: "Y",
  Ь: "`",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

function transliting(str) {
  return str
    .split("")
    .map((el) => translit[el] || el)
    .join("");
}

const input = document.querySelector(".main-enter-text__input");
const table = document.querySelector(".main-results-of-enter");
const mainBtn = document.querySelector(".main-enter-text__btn");

function translitWords() {
  if (input.value.trim().length < 1) {
    alert("Введите текст \nEnter text");
  } else {
    const newLine = document.createElement("div");
    newLine.className = "main-results-of-enter__text";
    newLine.style.borderTop = "1px solid black";

    const left = document.createElement("div");
    left.className = "main-results-of-enter__text-left";

    const right = document.createElement("div");
    right.className = "main-results-of-enter__text-right";

    const newSpanNumber = document.createElement("span");
    newSpanNumber.className = "main-results-of-enter__text-number";

    const newSpanInput = document.createElement("span");
    newSpanInput.className = "main-results-of-enter__text-text";

    const newSpanTranslit = document.createElement("span");
    newSpanTranslit.className = "main-results-of-enter__text-text";

    const newClearStrBtn = document.createElement("button");
    newClearStrBtn.className = "main-results-of-enter__clear-tr-btn";
    newClearStrBtn.innerHTML = `<svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="9" cy="9" r="9" fill="#747474" />
                    <path
                      d="M5.75829 13C5.9763 13 6.16588 12.9147 6.30806 12.763L8.99052 10.0616L11.6919 12.763C11.8341 12.9052 12.0142 13 12.2322 13C12.6493 13 12.9905 12.6493 12.9905 12.2322C12.9905 12.0142 12.9147 11.8341 12.763 11.6919L10.0711 9L12.7725 6.2891C12.9336 6.12796 13 5.96682 13 5.75829C13 5.33175 12.6588 5 12.2417 5C12.0427 5 11.8815 5.06635 11.7204 5.22749L8.99052 7.93839L6.2891 5.23697C6.14692 5.08531 5.9763 5.01896 5.75829 5.01896C5.34123 5.01896 5 5.34123 5 5.76777C5 5.9763 5.08531 6.1564 5.22749 6.29858L7.91943 9L5.22749 11.7014C5.08531 11.8341 5 12.0237 5 12.2322C5 12.6493 5.34123 13 5.75829 13Z"
                      fill="white"
                    />
                  </svg>`;

    left.append(newSpanNumber, newSpanInput);
    const index = document.querySelectorAll(
      ".main-results-of-enter__text-number"
    );
    newSpanNumber.textContent = index.length + 1;

    if (input.value.split(' ').filter(Boolean).join(' ').length > 7) {
      newSpanInput.textContent = input.value.slice(0, 7) + "...";
      newSpanTranslit.textContent =
        transliting(input.value).slice(0, 7) + "...";

      const tooltip = document.createElement("div");
      const tooltipTranlit = document.createElement("div");

      tooltip.className = "tooltip";
      tooltipTranlit.className = "tooltip";

      tooltip.innerText = input.value;
      tooltipTranlit.innerText = transliting(input.value);

      newSpanInput.append(tooltip);
      newSpanTranslit.append(tooltipTranlit);

      newSpanInput.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
      });
      newSpanInput.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      newSpanTranslit.addEventListener("mouseenter", () => {
        tooltipTranlit.style.display = "block";
      });

      newSpanTranslit.addEventListener("mouseleave", () => {
        tooltipTranlit.style.display = "none";
      });
    } else {
      newSpanInput.innerText = input.value;
      newSpanTranslit.innerText = transliting(input.value);
    }

    right.append(newSpanTranslit, newClearStrBtn);
    newLine.append(left, right);

    table.append(newLine);

    newClearStrBtn.addEventListener("click", () => {
      newLine.remove();
      const indexAfter = document.querySelectorAll(
        ".main-results-of-enter__text-number"
      );
      indexAfter.forEach((el, i) => (el.innerText = i + 1));
    });
  }
  input.value = "";
}

mainBtn.addEventListener("click", () => {
  translitWords();
});

input.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    translitWords();
  }
});

const btnClearAll = document.querySelector(".main-clear-all_content");
btnClearAll.addEventListener("click", () => {
  const lines = table.querySelectorAll(".main-results-of-enter__text");
  for (let i = 1; i < lines.length; i += 1) {
    lines[i].remove();
  }
});

const firstClearStrBtn = document.querySelector(
  ".main-results-of-enter__clear-tr-btn"
);
firstClearStrBtn.addEventListener("click", () => {
  alert(
    "Извините, Вы не можете удалить первую строку \nSorry, You can`t delete first line"
  );
});
