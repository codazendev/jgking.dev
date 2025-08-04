// --- Configurable Options ---
const USE_UNIFORM_WIDTH = true; // toggle for same-width boxes or not
const SHOW_LINE_NUMBERS = true;
const WRAP_WIDTH_PERCENT = 0.6; // percent of viewport width

const sections = [
    {
        lines: [
            "━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━┏┓┏━┓━━━━━━━━━━",
            "━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━┃┃┃┏┛━━━━━━━━━━",
            "━━┃┃┏━━┓┏━┓┏━━┓┏┓┏┓┏┓━┏┓━━━━┃┗┛┛━┏┓┏━┓━┏━━┓",
            "┏┓┃┃┃┏┓┃┃┏┛┃┏┓┃┃┗┛┃┃┃━┃┃━━━━┃┏┓┃━┣┫┃┏┓┓┃┏┓┃",
            "┃┗┛┃┃┃━┫┃┃━┃┃━┫┃┃┃┃┃┗━┛┃━━━━┃┃┃┗┓┃┃┃┃┃┃┃┗┛┃",
            "┗━━┛┗━━┛┗┛━┗━━┛┗┻┻┛┗━┓┏┛━━━━┗┛┗━┛┗┛┗┛┗┛┗━┓┃",
            "━━━━━━━━━━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━┏━┛┃",
            "━━━━━━━━━━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━┗━━┛",
        ],
        centerText: true,
    },
    // {
    //     lines: [
    //         "░░░░░██╗███████╗██████╗░███████╗███╗░░░███╗██╗░░░██╗░░░░██╗░░██╗██╗███╗░░░██╗░██████╗░",
    //         "░░░░░██║██╔════╝██╔══██╗██╔════╝████╗░████║╚██╗░██╔╝░░░░██║░██╔╝██║████╗░░██║██╔════╝░",
    //         "░░░░░██║█████╗░░██████╔╝█████╗░░██╔████╔██║░╚████╔╝░░░░░█████╔╝░██║██╔██╗░██║██║░░███╗",
    //         "██░░░██║██╔══╝░░██╔══██╗██╔══╝░░██║╚██╔╝██║░░╚██╔╝░░░░░░██╔═██╗░██║██║╚██╗██║██║░░░██║",
    //         "╚█████╔╝███████╗██║░░██║███████╗██║░╚═╝░██║░░░██║░░░░░░░██║░░██╗██║██║░╚████║╚██████╔╝",
    //         "░╚════╝░╚══════╝╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝░░░╚═╝░░░░░░░╚═╝░░╚═╝╚═╝╚═╝░░╚═══╝░╚═════╝░",
    //     ],
    //     centerText: true,
    // },
    // {
    //     lines: [
    //         "░▀▀█░█▀▀░█▀▄░█▀▀░█▄█░█░█░░░█░█░▀█▀░█▀█░█▀▀",
    //         "░░░█░█▀▀░█▀▄░█▀▀░█░█░░█░░░░█▀▄░░█░░█░█░█░█",
    //         "░▀▀░░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░░░▀░▀░▀▀▀░▀░▀░▀▀▀",
    //     ],
    //     centerText: true,
    // },
    // {
    //     lines: [
    //         "░▖░░░░░░░░░░░░░▖▖▘░░░░",
    //         "░▌█▌▛▘█▌▛▛▌▌▌░░▙▘▌▛▌▛▌",
    //         "▙▌▙▖▌░▙▖▌▌▌▙▌░░▌▌▌▌▌▙▌",
    //         "░░░░░░░░░░░▄▌░░░░░░░▄▌",
    //     ],
    //     centerText: true,
    // },
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
    {
        lines: [
            "This website is a minimal TUI-inspired space for showcasing my work in game development, system programming, and creative tools. I lean into retro aesthetics and full control over layout. You're looking at HTML and CSS doing ncurses cosplay.",
        ],
        centerText: true,
    },
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

// --- Utility Functions ---
function getCharWidth() {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.fontFamily = "monospace";
    span.textContent = "M";
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return width;
}

function getWrapWidthInChars(percent = 0.6) {
    const viewportWidth = window.innerWidth * percent;
    const charWidth = getCharWidth();
    return Math.floor(viewportWidth / charWidth);
}

function wrapText(text, maxWidth) {
    if (text.trim() === "") return [""]; // Preserve empty lines

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (let word of words) {
        if ((currentLine + word).length + 1 <= maxWidth) {
            currentLine += (currentLine ? " " : "") + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

function makeAsciiBoxWithLineNumbers(
    lines,
    widthOverride = null,
    centerText = false,
    startLineNumber = 1
) {
    const contentWidth =
        widthOverride ?? Math.max(...lines.map((line) => line.length));
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

function renderAsciiBoxes(containerId, sections, uniform = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const wrapWidth = getWrapWidthInChars(0.6);
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

// --- Init ---
window.addEventListener("load", () => {
    renderAsciiBoxes("ascii-container", sections);
});
