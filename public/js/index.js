"use strict";

// 1. Variables

const buttonShortenLink = document.querySelector(".shorten-link__button");
const inputShortenLink = document.querySelector(".shorten-link__input");

// 2. Functions

async function shortenLink() {
    const link = inputShortenLink.value;
    const url = `https://api.shrtco.de/v2/shorten?url=${link}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    Swal.fire({
        icon: "success",
        title: "Your link has been shortened!",
        text: "Here is your shortened link:",
        footer: `
        <a href='${data.result.full_short_link}'>${data.result.full_short_link}</a>
        <button class='copy-link'>Copy</button>
        `,
    });
}

const copyContent = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        Swal.fire("Copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy!", err);
    }
};


// 3. Events

buttonShortenLink.addEventListener("click", () => {
    if (inputShortenLink.value === "") {
        Swal.fire("Any fool can use a computer");
    } else {
        shortenLink();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy-link")) {
        const text = e.target.previousElementSibling.textContent;
        copyContent(text);
    }
});