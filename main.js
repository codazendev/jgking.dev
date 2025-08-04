// --- Configurable Options ---
const USE_UNIFORM_WIDTH = true; // toggle for same-width boxes or not
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
    {
        lines: [
            "Welcome to jgking.dev!",
            "",
            "Hiyo! My name is Jeremy King. I'm a game developer and computer scientist with an immense passion for indie games.",
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

function makeAsciiBox(lines, widthOverride = null, centerText = false) {
    const contentWidth =
        widthOverride ?? Math.max(...lines.map((line) => line.length));
    const top = "╔" + "═".repeat(contentWidth + 2) + "╗";
    const bottom = "╚" + "═".repeat(contentWidth + 2) + "╝";

    const boxed = lines.map((line) => {
        if (centerText) {
            const padTotal = contentWidth - line.length;
            const padLeft = Math.floor(padTotal / 2);
            const padRight = padTotal - padLeft;
            return `║ ${" ".repeat(padLeft)}${line}${" ".repeat(padRight)} ║`;
        } else {
            const padded = line.padEnd(contentWidth, " ");
            return `║ ${padded} ║`;
        }
    });

    return [top, ...boxed, bottom].join("\n");
}

// --- Main Render Logic ---
function renderAsciiBoxes(containerId, sections, uniform = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const wrapLimit = getWrapWidthInChars(WRAP_WIDTH_PERCENT);

    // Wrap all sections and track center settings
    const wrappedSections = sections.map((section) => {
        const lines = section.lines.flatMap((line) =>
            wrapText(line, wrapLimit)
        );
        return { lines, centerText: section.centerText };
    });

    // Always calculate the global max width
    const maxWidth = Math.max(
        ...wrappedSections.flatMap((s) => s.lines.map((l) => l.length))
    );

    wrappedSections.forEach(({ lines, centerText }) => {
        const pre = document.createElement("pre");
        pre.textContent = makeAsciiBox(lines, maxWidth, centerText);
        container.appendChild(pre);
    });
}

// --- Init ---
window.addEventListener("load", () => {
    renderAsciiBoxes("ascii-container", sections);
});
