// --- Configurable Options ---
const USE_UNIFORM_WIDTH = true; // toggle for same-width boxes or not
const WRAP_WIDTH_PERCENT = 0.6; // percent of viewport width

const sections = [
    [
        "━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━┏┓┏━┓━━━━━━━━━━",
        "━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━┃┃┃┏┛━━━━━━━━━━",
        "━━┃┃┏━━┓┏━┓┏━━┓┏┓┏┓┏┓━┏┓━━━━┃┗┛┛━┏┓┏━┓━┏━━┓",
        "┏┓┃┃┃┏┓┃┃┏┛┃┏┓┃┃┗┛┃┃┃━┃┃━━━━┃┏┓┃━┣┫┃┏┓┓┃┏┓┃",
        "┃┗┛┃┃┃━┫┃┃━┃┃━┫┃┃┃┃┃┗━┛┃━━━━┃┃┃┗┓┃┃┃┃┃┃┃┗┛┃",
        "┗━━┛┗━━┛┗┛━┗━━┛┗┻┻┛┗━┓┏┛━━━━┗┛┗━┛┗┛┗┛┗┛┗━┓┃",
        "━━━━━━━━━━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━┏━┛┃",
        "━━━━━━━━━━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━┗━━┛",
    ],
    [
        "Welcome to jgking.dev!",
        "",
        "Hiyo! I'm Jeremy King. I'm a game developer and computer scientist with an immense passion for indie games.",
        "",
        "[1] About Me",
        "[2] Projects",
        "[3] Contact",
    ],
    [
        "This website is a minimal TUI-inspired space for showcasing my work in game development, system programming, and creative tools. I lean into retro aesthetics and full control over layout. You're looking at HTML and CSS doing ncurses cosplay.",
    ],
    [
        "System Status:",
        "All services operational.",
        "Last deployment: 2025-08-03",
        "[R] Reboot  [Q] Quit",
    ],
];

// --- Utility Functions ---
function wrapText(text, maxWidth) {
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

function makeAsciiBox(lines, widthOverride = null) {
    const contentWidth =
        widthOverride ?? Math.max(...lines.map((line) => line.length));
    const top = "╔" + "═".repeat(contentWidth + 2) + "╗";
    const bottom = "╚" + "═".repeat(contentWidth + 2) + "╝";

    const boxed = lines.map((line) => {
        const padded = line.padEnd(contentWidth, " ");
        return `║ ${padded} ║`;
    });

    return [top, ...boxed, bottom].join("\n");
}

// --- Main Render Logic ---
function renderAsciiBoxes(containerId, sections) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const wrapLimit = getWrapWidthInChars(WRAP_WIDTH_PERCENT);

    // preprocess sections: wrap any long strings into lines
    const wrappedSections = sections.map((section) =>
        section.flatMap((line) => wrapText(line, wrapLimit))
    );

    // determine max width if using uniform sizing
    const globalMaxWidth = USE_UNIFORM_WIDTH
        ? Math.max(...wrappedSections.flat().map((l) => l.length))
        : null;

    wrappedSections.forEach((lines) => {
        const pre = document.createElement("pre");
        pre.textContent = makeAsciiBox(lines, globalMaxWidth);
        container.appendChild(pre);
    });
}

// --- Init ---
window.addEventListener("load", () => {
    renderAsciiBoxes("ascii-container", sections);
});
