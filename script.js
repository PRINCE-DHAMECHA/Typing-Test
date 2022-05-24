const paragraphs = [
    "One dad recommended,Study hard so you can find a good company to work for. The other recommended, Study hard so you can find a good company to buy.Rich dad explained this point of view over and over, which I call lesson number one: The poor and the middle class work for money. The rich have money work for them.",
    "Rich people acquire assets. The poor and middle class acquire liabilities that they think are assets, said rich dad.An asset is something that puts money in my pocket.A liability is something that takes money out of my pocket.This is really all you need to know.If you want to be rich, simply spend your life buying assets.",
    "The reason I started with the story of the richest men in America is to illustrate the flaw in believing that money will solve all problems. That is why I cringe whenever I hear people ask me how to get rich quicker, or where they should start. I often hear, I'm in debt, so I need to make more money.",
    "Mike's dad was not book-smart, but he was financially educated and successful as a result. He told us over and over again, An intelligent person hires people who are more intelligent than he is. So Mike and I had the benefit of spending hours listening to and learning from intelligent people.",
    "The real tragedy is that the lack of early financial education is what creates the risk faced by average middle-class people. The reason they have to play it safe is because their financial positions are tenuous at best. Their balance sheets are not balanced."
]


const typingText = document.querySelector(".typing-text p");

const inpField = document.querySelector(".wrapper .input-field");
let timeTag = document.querySelector(".time span strong");
let timer, maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

function randomParagraph() {
    typingText.innerHTML = "";
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll("span");
    let typeChar = inpField.value.split("")[charIndex];
    if (charIndex < char.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000)
            isTyping = true;
        }
        if (typeChar == null) {
            charIndex--;
            if (char[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            char[charIndex].classList.remove("correct", "incorrect");
        }
        else {
            if (char[charIndex].innerText === typeChar) {
                char[charIndex].classList.add("correct");
            }
            else {
                mistakes++;
                char[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        char.forEach(span => span.classList.remove("active"));
        char[charIndex].classList.add("active");
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    }
    else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else {
        clearInterval(timer);
    }
}

randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", () => {
    randomParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
})