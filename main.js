const sections = [
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
        "System Status:",
        "All services operational.",
        "Last deployment: 2025-08-03",
        "[R] Reboot  [Q] Quit",
    ],
];

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

function makeAsciiBox(lines) {
    const contentWidth = Math.max(...lines.map((line) => line.length));
    const top = "╔" + "═".repeat(contentWidth + 2) + "╗";
    const bottom = "╚" + "═".repeat(contentWidth + 2) + "╝";

    const boxed = lines.map((line) => {
        const padded = line.padEnd(contentWidth, " ");
        return `║ ${padded} ║`;
    });

    return [top, ...boxed, bottom].join("\n");
}

function renderAsciiBoxes(containerId, sections) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // clear previous content

    sections.forEach((lines) => {
        const pre = document.createElement("pre");
        pre.textContent = makeAsciiBox(lines);
        container.appendChild(pre);
    });
}

renderAsciiBoxes("ascii-container", sections);
