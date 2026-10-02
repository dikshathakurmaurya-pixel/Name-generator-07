const themeInputs = document.querySelectorAll('input[name="segmented-options"]');

function applyTheme(mode) {
    document.body.classList.toggle('dark-mode', mode === 'dark');
}

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.getElementById('option-2').checked = true;
    applyTheme('dark');
} else {
    document.getElementById('option-1').checked = true;
    applyTheme('light');
}

themeInputs.forEach((input) => {
    input.addEventListener('change', () => {
        const mode = input.value === '2' ? 'dark' : 'light';
        applyTheme(mode);
        localStorage.setItem('theme', mode);
    });
});

const fonts = [
    { name: 'Normal', transform: t => t },
    { name: 'Fullwidth', transform: t => fullwidth(t) },
    { name: 'Small Caps', transform: t => smallCaps(t) },
    { name: 'Circled', transform: t => circled(t) },
    { name: 'Squared', transform: t => squared(t) },
    { name: 'Parenthesized', transform: t => parenthesized(t) },
    { name: 'Math Bold', transform: t => mathBold(t) },
    { name: 'Math Italic', transform: t => mathItalic(t) },
    { name: 'Bold Italic', transform: t => mathBoldItalic(t) },
    { name: 'Monospace', transform: t => mono(t) },
    { name: 'Underline', transform: t => underline(t) },
    { name: 'Strike', transform: t => strike(t) },
    { name: 'Double', transform: t => double(t) },
    { name: 'Bubble', transform: t => bubble(t) },
    { name: 'Tiny', transform: t => tiny(t) },
    { name: 'Wide', transform: t => t.split('').join(' ') },
    { name: 'Reverse', transform: t => t.split('').reverse().join('') },
    { name: 'UPPERCASE', transform: t => t.toUpperCase() },
    { name: 'lowercase', transform: t => t.toLowerCase() },
    { name: 'Spaced', transform: t => t.split('').join('  ') }
];

function mapChars(text, start) {
    return [...text].map((c) => {
        const code = c.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(start + (code - 65));
        }

        if (code >= 97 && code <= 122) {
            return String.fromCodePoint(start + 26 + (code - 97));
        }

        return c;
    }).join('');
}

function fullwidth(t) {
    return [...t].map((c) => {
        const code = c.charCodeAt(0);

        if (code >= 33 && code <= 126) {
            return String.fromCharCode(code + 65248);
        }

        if (c === ' ') {
            return '　';
        }

        return c;
    }).join('');
}

function smallCaps(t) {
    const m = {
        a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ',
        e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ',
        i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ',
        m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ',
        q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ',
        u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
        y: 'ʏ', z: 'ᴢ'
    };

    return [...t]
        .map(c => m[c.toLowerCase()] || c)
        .join('');
}

function circled(t) {
    const upper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
    const lower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';

    return [...t].map((c) => {
        if (c >= 'A' && c <= 'Z') {
            return upper[c.charCodeAt(0) - 65];
        }

        if (c >= 'a' && c <= 'z') {
            return lower[c.charCodeAt(0) - 97];
        }

        return c;
    }).join('');
}

function squared(t) {
    const chars = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉';

    return [...t].map((c) => {
        if (c >= 'A' && c <= 'Z') {
            return chars[c.charCodeAt(0) - 65];
        }

        return c;
    }).join('');
}

function parenthesized(t) {
    const chars = '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵';

    return [...t].map((c) => {
        if (c >= 'a' && c <= 'z') {
            return chars[c.charCodeAt(0) - 97];
        }

        return c;
    }).join('');
}

function mathBold(t) {
    return mapChars(t, 0x1D400);
}

function mathItalic(t) {
    return mapChars(t, 0x1D434);
}

function mathBoldItalic(t) {
    return mapChars(t, 0x1D468);
}

function mono(t) {
    return mapChars(t, 0x1D670);
}

function underline(t) {
    return [...t].map(c => (c === ' ' ? ' ' : c + '̲')).join('');
}

function strike(t) {
    return [...t].map(c => (c === ' ' ? ' ' : c + '̶')).join('');
}

function double(t) {
    return mapChars(t, 0x1D538);
}

function bubble(t) {
    return circled(t);
}

function tiny(t) {
    const m = {
        a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ',
        e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ',
        i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ',
        m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ',
        q: 'q', r: 'ʳ', s: 'ˢ', t: 'ᵗ',
        u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ',
        y: 'ʸ', z: 'ᶻ'
    };

    return [...t].map(c => m[c.toLowerCase()] || c).join('');
}

const input = document.getElementById('textInput');
const search = document.getElementById('searchInput');
const list = document.getElementById('fontList');

function render() {
    const text = input.value || 'Your Text';
    const query = search.value.toLowerCase();
    list.innerHTML = '';

    fonts
        .filter(font => font.name.toLowerCase().includes(query))
        .forEach((font) => {
            const box = document.createElement('div');
            box.className = 'font-box';

            const preview = document.createElement('div');
            preview.className = 'preview';
            preview.textContent = font.transform(text);

            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.textContent = 'COPY';

            button.onclick = () => {
                const result = font.transform(text);
                navigator.clipboard.writeText(result);
                button.textContent = 'COPIED ✓';

                setTimeout(() => {
                    button.textContent = 'COPY';
                }, 1200);
            };

            box.appendChild(preview);
            box.appendChild(button);
            list.appendChild(box);
        });

    if (!list.children.length) {
        list.innerHTML = '<div class="empty">No fonts found.</div>';
    }
}

input.addEventListener('input', render);
search.addEventListener('input', render);
render();