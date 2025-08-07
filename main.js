// Configuration
const USE_UNIFORM_WIDTH = true; // toggle for same-width ascii boxes or not
const SHOW_LINE_NUMBERS = true; // toggle for text-editor inspired line gutter on left of content
const WRAP_WIDTH_PERCENT = 0.6; // percent of viewport width

// stylized ASCII/ANSI art ascii-box to choose from
const headers = {
    eightysix: [
        "░░░░░██╗███████╗██████╗░███████╗███╗░░░███╗██╗░░░██╗░░░░██╗░░██╗██╗███╗░░░██╗░██████╗░",
        "░░░░░██║██╔════╝██╔══██╗██╔════╝████╗░████║╚██╗░██╔╝░░░░██║░██╔╝██║████╗░░██║██╔════╝░",
        "░░░░░██║█████╗░░██████╔╝█████╗░░██╔████╔██║░╚████╔╝░░░░░█████╔╝░██║██╔██╗░██║██║░░███╗",
        "██░░░██║██╔══╝░░██╔══██╗██╔══╝░░██║╚██╔╝██║░░╚██╔╝░░░░░░██╔═██╗░██║██║╚██╗██║██║░░░██║",
        "╚█████╔╝███████╗██║░░██║███████╗██║░╚═╝░██║░░░██║░░░░░░░██║░░██╗██║██║░╚████║╚██████╔╝",
        "░╚════╝░╚══════╝╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝░░░╚═╝░░░░░░░╚═╝░░╚═╝╚═╝╚═╝░░╚═══╝░╚═════╝░",
    ],
    fortythree: [
        "━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━┏┓┏━┓━━━━━━━━━━",
        "━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━┃┃┃┏┛━━━━━━━━━━",
        "━━┃┃┏━━┓┏━┓┏━━┓┏┓┏┓┏┓━┏┓━━━━┃┗┛┛━┏┓┏━┓━┏━━┓",
        "┏┓┃┃┃┏┓┃┃┏┛┃┏┓┃┃┗┛┃┃┃━┃┃━━━━┃┏┓┃━┣┫┃┏┓┓┃┏┓┃",
        "┃┗┛┃┃┃━┫┃┃━┃┃━┫┃┃┃┃┃┗━┛┃━━━━┃┃┃┗┓┃┃┃┃┃┃┃┗┛┃",
        "┗━━┛┗━━┛┗┛━┗━━┛┗┻┻┛┗━┓┏┛━━━━┗┛┗━┛┗┛┗┛┗┛┗━┓┃",
        "━━━━━━━━━━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━┏━┛┃",
        "━━━━━━━━━━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━┗━━┛",
    ],
    fortytwo: [
        "░▀▀█░█▀▀░█▀▄░█▀▀░█▄█░█░█░░░█░█░▀█▀░█▀█░█▀▀",
        "░░░█░█▀▀░█▀▄░█▀▀░█░█░░█░░░░█▀▄░░█░░█░█░█░█",
        "░▀▀░░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░░░▀░▀░▀▀▀░▀░▀░▀▀▀",
    ],
    twentytwo: [
        "░▖░░░░░░░░░░░░░▖▖▘░░░░",
        "░▌█▌▛▘█▌▛▛▌▌▌░░▙▘▌▛▌▛▌",
        "▙▌▙▖▌░▙▖▌▌▌▙▌░░▌▌▌▌▌▙▌",
        "░░░░░░░░░░░▄▌░░░░░░░▄▌",
    ],
    base: ["jgking.dev"],
};

const sections = [
    // site intro/overview ascii-box
    {
        lines: [
            "Welcome to jgking.dev!",
            "",
            "Hiyo! My name is Jeremy King. I'm a game developer and computer scientist with an immense passion for indie games. I'm still in the process of improving and adding content to this site, so check back often!",
            "",
            "[1] About Me",
            "[2] Projects",
            "[3] Contact",
        ],
        centerText: false,
    },
    // site description ascii-box
    {
        lines: [
            "This website is a minimal TUI-inspired space for showcasing my work in game development, system programming, and creative tools. I lean into retro aesthetics and full control over layout. You're looking at HTML and CSS doing ncurses cosplay.",
        ],
        centerText: true,
    },
    // aesthetic/flavor system status ascii-box
    {
        lines: [
            "System Status:",
            "All services operational.",
            "Last deployment: 2025-08-03",
            "[R] Reboot  [Q] Quit",
        ],
        centerText: true,
    },
];

// if you're reading this, welcome to my page's code! it may seem like i am skilled in javascript, but i'm actually in the process of learning!
// this code was generated with the help of ChatGPT (ew, i know, i'm sorry). without it, however, i would never known how to accomplish this in code.
// for me it is helpful to have a comparison point to learn from and develop off of. in the future i hope i will need ChatGPT less and less to make the creative projects i see in my minds eye.
// thank you for stopping by! i wish you luck in whatever your pursuits and i hope you will support me in mine :>

// Utility Functions

// get the width of a single monospace character on the client's screen
function getCharWidth() {
    // create invisible span containing an "M" and add to page
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.fontFamily = "monospace";
    span.textContent = "M";
    document.body.appendChild(span);

    // use span to assess the width of the character "M" on the client's screen
    const width = span.getBoundingClientRect().width;

    // remove invisible span from the page
    document.body.removeChild(span);
    return width;
}

// get the max number of monospace characters that will fit on the page based on the client's screen and the desired content width
function getWrapWidthInChars(percent = 0.6) {
    // calculate the width available to the webpage content based on desired content width
    const viewportWidth = window.innerWidth * percent;

    // get width of single character
    const charWidth = getCharWidth();

    // use width of single character to calculate the max number of monospace characters that can be allotted on any given line
    return Math.floor(viewportWidth / charWidth);
}

// use the max number of monospace characters that will fit on the page to rewrap the lines in each of the ascii-box sections to fit in the desired/allotted space
function wrapText(text, maxWidth) {
    // Preserve empty lines in ascii-box sections
    if (text.trim() === "") return [""];

    // split line of text into composite words for easier rewrapping
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    // for each word in current section line
    for (let word of words) {
        // if adding the current word would not extend the line past the desired content width
        if ((currentLine + word).length + 1 <= maxWidth) {
            // add the word to the current line
            currentLine += (currentLine ? " " : "") + word;
        } else {
            // otherwise it would extend past, so push the completed line to the set of lines
            // and start a new line with the current word as the first in the line
            lines.push(currentLine);
            currentLine = word;
        }
    }

    // make sure we push any leftovers so they do not get lost
    if (currentLine) lines.push(currentLine);
    return lines;
}

// get a header with the desired width based on content width
function getResponsiveHeader(maxWidth) {
    if (maxWidth > 86) return headers.eightysix;
    if (maxWidth > 43) return headers.fortythree;
    if (maxWidth > 22) return headers.twentytwo;
    return headers.base;
}

// take a set of lines and construct a set of spans to represent them with a line gutter and an ASCII border
function makeAsciiBoxWithLineNumbers(
    lines, // the content to make an ascii-box for
    widthOverride = null,
    centerText = false, // whether the content should be centered within the ascii-box (manually manufacture equal number of spaces on left and right)
    startLineNumber = 1
) {
    let contentWidth =
        widthOverride ?? Math.max(...lines.map((line) => line.length));
    if (contentWidth % 2 !== 0) contentWidth += 1;
    const gutterWidth = SHOW_LINE_NUMBERS
        ? String(startLineNumber + lines.length + 1).length
        : 0;

    const padLineNum = (n) => String(n).padStart(gutterWidth, " ");
    const gutter = (n) =>
        SHOW_LINE_NUMBERS
            ? `<span class=\"line-number\">${padLineNum(n)}</span> `
            : "";

    const top = `${gutter(startLineNumber - 1)}╔${"═".repeat(
        contentWidth + 2
    )}╗`;
    const bottom = `${gutter(startLineNumber + lines.length)}╚${"═".repeat(
        contentWidth + 2
    )}╝`;

    const boxed = lines.map((line, i) => {
        const padded = centerText
            ? " ".repeat(Math.floor((contentWidth - line.length) / 2)) +
              line +
              " ".repeat(Math.ceil((contentWidth - line.length) / 2))
            : line.padEnd(contentWidth, " ");
        return `${gutter(startLineNumber + i)}║ ${padded} ║`;
    });

    return [top, ...boxed, bottom].join("\n");
}

// add a set of constructed ascii-boxes to a document for rendering and viewing by the user
function renderAsciiBoxes(containerId, sections, uniform = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const wrapWidth = getWrapWidthInChars(0.6);
    const headerLines = getResponsiveHeader(wrapWidth);

    // remove old header if there is one
    if (sections.length > 0 && sections[0].isHeader) {
        sections.shift();
    }

    // add new header
    sections.unshift({ lines: headerLines, centerText: true, isHeader: true });
    let currentLineNumber = 1;

    const wrappedSections = sections.map((section) => {
        const lines = section.lines.flatMap((line) =>
            wrapText(line, wrapWidth)
        );
        return { lines, centerText: section.centerText };
    });

    const maxWidth = Math.max(
        ...wrappedSections.flatMap((s) => s.lines.map((l) => l.length))
    );

    wrappedSections.forEach(({ lines, centerText }) => {
        const pre = document.createElement("pre");
        pre.innerHTML = makeAsciiBoxWithLineNumbers(
            lines,
            USE_UNIFORM_WIDTH ? maxWidth : null,
            centerText,
            currentLineNumber
        );
        container.appendChild(pre);
        currentLineNumber += lines.length + 2;
    });
}

// Initialization function
// when page loads, use the content defined in the sections constant to generate ascii-boxes inside the page's main ascii-container
window.addEventListener("load", () => {
    renderAsciiBoxes("ascii-container", sections);
});

// do the same if the pag eresizes
window.addEventListener("resize", () => {
    document.getElementById("ascii-container").innerHTML = "";
    renderAsciiBoxes("ascii-container", sections, USE_UNIFORM_WIDTH);
});
