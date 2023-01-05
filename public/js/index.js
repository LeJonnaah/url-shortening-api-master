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
    
    if (data.ok) {
        Swal.fire({
            icon: "success",
            title: "Your link has been shortened!",
            text: "Here is your shortened link:",
            footer: `
            <a class='copy-link__link' href='${data.result.full_short_link}'>${data.result.full_short_link}</a>
            <button class='copy-link__button'>Copy</button>
            `,
        });
        inputShortenLink.value = "";
        const copiedLinks = copiedLinksStorage();
        copiedLinks.push(link.textContent);
        localStorage.setItem("copiedLinks", JSON.stringify(copiedLinks));
    } else {
        Swal.fire("Something went wrong!");
    }
}

const copyContent = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        Swal.fire("Copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy!", err);
    }
};


const copiedLinksStorage = () => {
    const copiedLinks = [];
    const copiedLinksString = localStorage.getItem("copiedLinks");
    if (copiedLinksString) {
        return JSON.parse(copiedLinksString);
    } else {
        return copiedLinks;
    }
};

const displayCopiedLinks = () => {
    const copiedLinks = copiedLinksStorage();
    const copiedLinksContainer = document.querySelector(".copied-links__container");
    copiedLinksContainer.innerHTML = "";
    copiedLinks.forEach((link) => {
        copiedLinksContainer.innerHTML += `
        <div class="copied-links__group">
            <a class='copied-links__link' href="${link}">${link}</a>
            <button class="copy-link__button">Copy</button>
        </div>
        `;
    });
};

// 3. Events

buttonShortenLink.addEventListener("click", () => {
    if (inputShortenLink.value === "") {
        Swal.fire("Please enter a link!");
    } else {
        shortenLink();
    }
});

inputShortenLink.addEventListener("click", (e) => {
    displayCopiedLinks();
    
    // const copiedLinks = copiedLinksStorage();
    // if (copiedLinks.length > 0) {
    //     const copiedLinksContainer = document.querySelector(".copied-links__container");
    //     copiedLinksContainer.style.display = "flex";
    // }
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy-link__button")) {
        const link = e.target.previousElementSibling;
        copyContent(link.textContent);
    }
});
