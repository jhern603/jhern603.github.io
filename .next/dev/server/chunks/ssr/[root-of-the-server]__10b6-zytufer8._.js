module.exports = [
(()=>{"use strict";return[
"[project]/lib/content.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProject",
    ()=>getProject,
    "pad",
    ()=>pad,
    "projects",
    ()=>projects,
    "site",
    ()=>site,
    "toLine",
    ()=>toLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$projects$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/projects.json.[json].cjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$site$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/site.json.[json].cjs [app-ssr] (ecmascript)");
;
;
const pad = (n)=>String(n).padStart(2, '0');
const toLine = (l)=>typeof l === 'string' ? {
        text: l
    } : l;
function validate(list) {
    const seen = new Set();
    return list.map((p, i)=>{
        const where = `content/projects.json → projects[${i}]${p?.title ? ` (${p.title})` : ''}`;
        for (const key of [
            'slug',
            'title',
            'tag',
            'year',
            'shipped',
            'role',
            'summary'
        ]){
            if (typeof p[key] !== 'string' || !p[key]) throw new Error(`${where}: "${key}" must be a non-empty string`);
        }
        if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`${where}: "slug" may only use lowercase letters, digits and dashes`);
        if (seen.has(p.slug)) throw new Error(`${where}: duplicate slug "${p.slug}"`);
        seen.add(p.slug);
        if (!Array.isArray(p.stack)) throw new Error(`${where}: "stack" must be an array of strings`);
        if (!Array.isArray(p.sections) || !p.sections.length) throw new Error(`${where}: "sections" needs at least one entry`);
        return {
            ...p,
            no: pad(i + 1)
        };
    });
}
const site = __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$site$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
const projects = validate(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$projects$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projects);
const getProject = (slug)=>projects.find((p)=>p.slug === slug);
}),
"[project]/terminal/TerminalProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TerminalProvider",
    ()=>TerminalProvider,
    "useTerminal",
    ()=>useTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const MAX_LINES = 80;
const PROMPT = 'jose@sys:~$ ';
const TerminalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useTerminal() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TerminalContext);
    if (!ctx) throw new Error('useTerminal must be used inside <TerminalProvider>');
    return ctx;
}
const lookup = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commands"].flatMap((c)=>[
        c.name,
        ...c.aliases ?? []
    ].map((n)=>[
            n,
            c
        ])));
const normalize = (out)=>out == null ? [] : (Array.isArray(out) ? out : [
        out
    ]).map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toLine"]);
function TerminalProvider({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        list: [],
        cursor: 0
    });
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])('Last login: on ttys001'),
        "Welcome. Type 'help' or pick a command."
    ].map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toLine"]));
    const [lastViewed, setLastViewed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Date is filled in after mount so server and client HTML match.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLines((ls)=>ls.map((l, i)=>i === 0 && l.text === 'Last login: on ttys001' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])(`Last login: ${new Date().toDateString().slice(0, 10)} on ttys001`) : l));
    }, []);
    const append = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((more)=>setLines((ls)=>[
                ...ls,
                ...more
            ].slice(-MAX_LINES)), []);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (raw)=>{
        const input = raw.trim();
        const h = history.current;
        if (input) {
            h.list.push(input);
            h.cursor = h.list.length;
        }
        append([
            {
                text: PROMPT + input,
                tone: 'accent'
            }
        ]);
        if (!input) return;
        const [name, ...args] = input.split(/\s+/);
        const command = lookup.get(name.toLowerCase());
        if (!command) return append([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["error"])(`command not found: ${name}. Type 'help'.`)
        ]);
        try {
            const out = await command.run({
                args,
                rest: input.slice(name.length).replace(/^\s/, ''),
                site: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"],
                projects: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projects"],
                commands: __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commands"],
                navigate: (href)=>router.push(href),
                clear: ()=>setLines([])
            });
            append(normalize(out));
        } catch (e) {
            append([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["error"])(`${name}: ${e instanceof Error ? e.message : String(e)}`)
            ]);
        }
    }, [
        append,
        router
    ]);
    const recall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((step)=>{
        const h = history.current;
        h.cursor = Math.max(0, Math.min(h.list.length, h.cursor + step));
        return h.list[h.cursor] ?? '';
    }, []);
    // ⌘K / Ctrl+K jumps to the terminal from anywhere.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKey = (e)=>{
            if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return;
            e.preventDefault();
            if (pathname !== '/') {
                router.push('/#terminal');
                return;
            }
            const input = inputRef.current;
            input?.closest('section')?.scrollIntoView({
                block: 'center'
            });
            input?.focus({
                preventScroll: true
            });
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    }, [
        pathname,
        router
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            lines,
            run,
            recall,
            inputRef,
            lastViewed,
            setLastViewed
        }), [
        lines,
        run,
        recall,
        lastViewed
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TerminalContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/terminal/TerminalProvider.tsx",
        lineNumber: 99,
        columnNumber: 10
    }, this);
}
}),
"[project]/terminal/commands/about.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'about',
    usage: 'about [n]',
    description: 'short bio, or a project summary',
    run: (ctx)=>{
        if (!ctx.args.length) return ctx.site.bio;
        const { project: p, index, usage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectFromArgs"])(ctx, 'about');
        if (!p) return usage;
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accent"])(`[${p.no}] ${p.title}  ·  ${p.tag}  ·  ${p.year}`),
            p.summary,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])('stack: ' + p.stack.join(', ')),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])(`Type 'open ${index}' for the full project page.`)
        ];
    }
});
}),
"[project]/terminal/commands/clear.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'clear',
    description: 'clear the screen',
    aliases: [
        'cls'
    ],
    run: ({ clear })=>clear()
});
}),
"[project]/terminal/commands/contact.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
;
const display = (href, fallback)=>href && href !== '#' ? href.replace(/^https?:\/\/(www\.)?/, '') : fallback;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'contact',
    description: 'ways to reach me',
    run: ({ site })=>[
            'email     ' + site.email,
            ...Object.entries(site.links).map(([k, v])=>k === 'resume' ? k.padEnd(10) + display(`${site.domain}${v}`, '(coming soon)') : k.padEnd(10) + display(v, '(coming soon)'))
        ]
});
}),
"[project]/terminal/commands/help.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'help',
    description: 'list commands',
    aliases: [
        '?'
    ],
    run: ({ commands })=>{
        const visible = commands.filter((c)=>!c.hidden);
        const width = Math.max(...visible.map((c)=>(c.usage ?? c.name).length)) + 2;
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])('Available commands:'),
            ...visible.map((c)=>'  ' + (c.usage ?? c.name).padEnd(width) + c.description + (c.aliases?.length ? ` (aliases: ${c.aliases.join(', ')})` : ''))
        ];
    }
});
}),
"[project]/terminal/commands/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commands",
    ()=>commands
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$help$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/help.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$whoami$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/whoami.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/about.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/projects.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$open$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/open.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$stack$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/stack.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/contact.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$clear$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/clear.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$sudo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/sudo.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const commands = [
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$help$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$whoami$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$open$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$stack$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$clear$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$sudo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
];
}),
"[project]/terminal/commands/open.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'open',
    usage: 'open <n>',
    description: 'open the project page',
    aliases: [
        'cd'
    ],
    run: (ctx)=>{
        const { project, usage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectFromArgs"])(ctx, 'open');
        if (!project) return usage;
        // Short pause so the "opening" line is visible before the page changes.
        setTimeout(()=>ctx.navigate(`/work/${project.slug}`), 350);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accent"])(`→ opening ${project.slug} …`);
    }
});
}),
"[project]/terminal/commands/projects.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'projects',
    description: 'list selected work',
    aliases: [
        'ls',
        'work'
    ],
    run: ({ projects })=>[
            ...projects.map((p, i)=>`  [${i + 1}] ${p.title.padEnd(16)}${p.tag}`),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dim"])("Type 'about 1' for a summary or 'open 1' for the full page.")
        ]
});
}),
"[project]/terminal/commands/stack.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'stack',
    description: 'tools & tech',
    run: ({ site })=>site.stack.map((g)=>`${g.name.toLowerCase()}:\n  ${g.items.join(', ')}`)
});
}),
"[project]/terminal/commands/sudo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'sudo',
    description: 'run as root',
    hidden: true,
    run: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["error"])('Nice try. This incident will be reported.')
});
}),
"[project]/terminal/commands/whoami.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'whoami',
    description: 'who is this',
    run: ({ site })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accent"])(`${site.name} — ${site.role}`)
});
}),
"[project]/terminal/lines.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accent",
    ()=>accent,
    "dim",
    ()=>dim,
    "error",
    ()=>error,
    "projectFromArgs",
    ()=>projectFromArgs
]);
const accent = (text)=>({
        text,
        tone: 'accent'
    });
const dim = (text)=>({
        text,
        tone: 'dim'
    });
const error = (text)=>({
        text,
        tone: 'error'
    });
function projectFromArgs(ctx, verb) {
    const arg = ctx.args[0] ?? '';
    const n = Number.parseInt(arg, 10);
    const project = /^\d+$/.test(arg) ? ctx.projects[n - 1] : ctx.projects.find((p)=>p.slug === arg.toLowerCase());
    return project ? {
        project,
        index: ctx.projects.indexOf(project) + 1
    } : {
        usage: dim(`usage: ${verb} <1-${ctx.projects.length}>`)
    };
}
}),
"[project]/terminal/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineCommand",
    ()=>defineCommand
]);
const defineCommand = (command)=>command;
}),
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/content/projects.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"$schema\":\"./projects.schema.json\",\"projects\":[{\"slug\":\"agentic-marketplace\",\"title\":\"Agent Marketplace\",\"tag\":\"Agentic AI\",\"year\":\"2026\",\"shipped\":\"Not Shipped\",\"role\":\"Architect\",\"summary\":\"Lets users pick skills and MCP servers once and use them in any AI client through a single parent MCP server.\",\"stack\":[\"Python\",\"FastMCP\",\"React / Next.js\",\"MCP OAuth\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Agent Marketplace\",\"tone\":\"accent\"},\"Pick skills and MCP servers once, then use them in any AI client through a single parent MCP server.\",\"\",{\"text\":\"# working proof of concept\",\"tone\":\"dim\"}],\"prose\":\"Every AI client keeps its own list of skills and MCP servers. Setting them up one client at a time is tedious, the lists drift out of sync, and a setup built for one provider doesn't carry over to another. An organization also has no single place to approve, grant, or revoke what its agents can use.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] catalog skills and mcp servers\",\"[2] users toggle items in a web ui\",\"[3] client connects to one parent\",\"[4] parent signs user in via oauth\",\"[5] expose only that user's picks\"],\"prose\":\"The AI client is configured with exactly one MCP server: the parent. Users choose skills and MCP servers in a web catalog. When their client connects, the parent signs them in through MCP's OAuth flow and exposes only what they enabled. With 3 skills and 5 MCP servers in the catalog, a user who enables 2 skills and 1 server sees exactly those 3, and the client treats them as if they were set up locally.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\"ai client  (claude, chatgpt)\",{\"text\":\" |  one mcp server configured\",\"tone\":\"dim\"},\" v\",\"parent mcp server  (fastmcp)\",{\"text\":\" |  mcp oauth -> user\",\"tone\":\"dim\"},{\"text\":\" |  picks from web catalog\",\"tone\":\"dim\"},{\"text\":\" |  toggles push live to client\",\"tone\":\"dim\"},\" |\",\" +-> skill a            as tool\",\" +-> skill b            as tool\",\" +-> remote mcp server  proxied\",{\"text\":\"# catalog: 3 skills, 5 servers\",\"tone\":\"dim\"},{\"text\":\"# enabled: 2 skills, 1 server\",\"tone\":\"dim\"},{\"text\":\"# client sees 3, as if local\",\"tone\":\"dim\"}],\"prose\":\"The parent is a Python server built on FastMCP. Each enabled skill is wrapped as an MCP tool, and each enabled MCP server is a remote server that the parent brings in through FastMCP's mount and proxy features, so its tools show up as the parent's own. When the client connects, MCP's OAuth flow identifies the user, and the parent applies that user's selections and credentials from the React / Next.js catalog.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ one server in each client's config\",\"tone\":\"accent\"},{\"text\":\"✓ works in claude and chatgpt / codex\",\"tone\":\"accent\"},{\"text\":\"✓ per-user picks via mcp oauth\",\"tone\":\"accent\"},{\"text\":\"✓ remote servers appear as local\",\"tone\":\"accent\"},{\"text\":\"✓ toggles reach the client live\",\"tone\":\"accent\"},{\"text\":\"# proof of concept, not shipped\",\"tone\":\"dim\"}],\"prose\":\"The proof of concept worked end to end. A user enabled a skill or server in the catalog, and it showed up live in Claude (Desktop and Code) and ChatGPT / Codex, with no restart, as if it were set up locally. Turning it off removed it the same way.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Python\",\"+ FastMCP\",\"+ React / Next.js\",\"+ MCP OAuth\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"FastMCP handled the MCP protocol, wrapping skills as tools, and composing remote servers into the parent, which kept the parent a small Python service. MCP's built-in OAuth flow tied each connection to a user, and the catalog is a React / Next.js app.\"}]},{\"slug\":\"agentic-security-harness\",\"title\":\"Agentic Security Harness\",\"tag\":\"Security\",\"year\":\"2025\",\"shipped\":\"11.2025\",\"role\":\"Tech Lead\",\"summary\":\"Runs each AI coding agent session in its own short-lived VM, walled off from the host's kernel, files, and credentials.\",\"stack\":[\"KVM / QEMU\",\"Apple VZ / Lima\",\"Packer\",\"Egress firewall\"],\"links\":[{\"label\":\"Write-up\",\"href\":\"https://blog.josehernandez.dev/posts/ai-coding-agents-enterprise-isolation/\"}],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Agentic Security Harness\",\"tone\":\"accent\"},\"Runs each AI coding agent session in its own short-lived VM, walled off from the host's kernel, files, and credentials.\"],\"prose\":\"AI coding agents read, write, and run code on their own. On a developer workstation or in shared CI, they get the same access as a privileged user: credentials, secrets, and an open network path for data to leave. A container narrows that access, but it still shares the host kernel.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] build one standard image with packer\",\"[2] start a fresh vm for each session\",\"[3] snapshot the vm before the agent runs\",\"[4] send all egress through a firewall\",\"[5] forward logs, destroy the vm at end\"],\"prose\":\"Of three isolation strategies (a container, a full VM, and nested containers), this one uses the VM because it draws the strongest boundary. The guest has its own kernel, filesystem, and network stack, and it sees no host credentials or secrets unless they are shared on purpose. The cost is a 15–60 second cold boot, dedicated RAM and CPU for every VM, and slower syncing between the host editor and the VM workspace.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\" host --> hypervisor <-- packer image\",{\"text\":\"          |  kvm / qemu / vz\",\"tone\":\"dim\"},{\"text\":\"          |  snapshot pre-session\",\"tone\":\"dim\"},\"          v\",\" +- guest vm (1 per session) -----+\",\" |  agent process                 |\",\" |  own kernel, fs, network       |\",\" |  no host creds or secrets      |\",\" +-------------+---------------+--+\",\"               |               |\",\"               v               v\",\"        egress firewall  log platform\",\"               |\",\"               v\",\"        allowlisted hosts\",{\"text\":\"# private subnet, no internet gateway\",\"tone\":\"dim\"},{\"text\":\"# vm destroyed when the session ends\",\"tone\":\"dim\"}],\"prose\":\"The hypervisor gives each session a guest VM built from a standard Packer image, with the agent toolchain and a log forwarder already installed. The VM sits in a private subnet with no direct internet gateway, so every outbound request passes through a managed firewall. A snapshot taken before each session gives a clean rollback point, and system and agent logs go to a central log platform.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ kernel sharing     none\",\"tone\":\"accent\"},{\"text\":\"✓ filesystem         isolated\",\"tone\":\"accent\"},{\"text\":\"✓ network            isolated\",\"tone\":\"accent\"},{\"text\":\"✓ host credentials   not shared\",\"tone\":\"accent\"},{\"text\":\"✓ host secrets       hidden\",\"tone\":\"accent\"},{\"text\":\"✓ rollback           vm snapshot\",\"tone\":\"accent\"},{\"text\":\"# cost: 15-60s cold boot per session\",\"tone\":\"dim\"}],\"prose\":\"A VM is the strongest boundary of the three strategies. Escaping one is much harder than escaping a container, and the agent can't reach host kernel vulnerabilities. That makes it the right fit for high-sensitivity code in finance, healthcare, or government. For everyday work a hardened container costs less, so isolation should match the risk of the workload, with human approval at the steps that matter most.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ KVM / QEMU\",\"+ Apple VZ / Lima\",\"+ Packer\",\"+ Egress firewall\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"KVM and QEMU provide the hypervisor on Linux, and Apple's Virtualization framework through Lima covers macOS. Packer builds one standard image, so every session starts from the same known state. A managed egress firewall decides what the VM can reach, since its subnet has no internet gateway of its own.\"}]},{\"slug\":\"dlp\",\"title\":\"Data Loss Prevention\",\"tag\":\"DLP\",\"year\":\"2025\",\"shipped\":\"09.2025\",\"role\":\"Lead Engineer\",\"summary\":\"Scans Confluence pages and attachments every 10 minutes for exposed login details, personal data, and classified content.\",\"stack\":[\"Oracle APEX\",\"PL/SQL\",\"Oracle Text\",\"ORDS\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Data Loss Prevention\",\"tone\":\"accent\"},\"Finds exposed login details, personal data, and classified content in Confluence pages and attachments, then gets it fixed.\",\"\",{\"text\":\"# all content stays in-house\",\"tone\":\"dim\"}],\"prose\":\"Confluence is a shared workspace where teams write pages and upload files. Those pages and files can hold login details, personal data, or content marked confidential, and nothing was checking them. The content also had to stay in-house, so sending it to an outside scanning service wasn't an option.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] read pages and files in confluence\",\"[2] scan new edits every 10 minutes\",\"[3] look for sensitive data and keywords\",\"[4] double-check matches to cut noise\",\"[5] auto-restrict the clear-cut cases\",\"[6] email authors, escalate if ignored\"],\"prose\":\"The company ran its own copy of Confluence, so the scanner could read pages and attachments directly. Every 10 minutes it checks only what was created or changed since the last run. When a match is almost certainly real, the system restricts access to the content and emails the author right away. Everything else waits for a person to review and confirm it.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\"confluence\",{\"text\":\" |  pages + attachments\",\"tone\":\"dim\"},\" v\",\"scan new edits  (every 10 min)\",{\"text\":\" |  read text inside attachments\",\"tone\":\"dim\"},{\"text\":\" |  look for sensitive data, keywords\",\"tone\":\"dim\"},{\"text\":\" |  double-check each match\",\"tone\":\"dim\"},\" v\",\"match --> logged as an issue\",\" |\",\" +-> high confidence\",\" |    +-> restrict access\",\" |    +-> email author now\",\" |\",\" +-> everything else\",\" |    +-> human review queue\",\" |    +-> email author if confirmed\",\" v\",\"author fixes via self-service link\",{\"text\":\"# no fix: reminders, then manager\",\"tone\":\"dim\"}],\"prose\":\"The scanner first pulls the text out of attachments, so a file can be checked the same way as a page. It then looks for known patterns and keywords, and follow-up checks weed out false alarms. The same app lets the team manage the rules and follow results on dashboards. Authors get a self-service page, linked from the email, where they confirm their fix.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ thousands of issues caught in a year\",\"tone\":\"accent\"},{\"text\":\"✓ hundreds of thousands of pages covered\",\"tone\":\"accent\"},{\"text\":\"✓ ~15% false alarms\",\"tone\":\"accent\"},{\"text\":\"✓ new content scanned every 10 min\",\"tone\":\"accent\"},{\"text\":\"# unfixed issues escalate to managers\",\"tone\":\"dim\"}],\"prose\":\"Over a year it caught thousands of issues across tens of thousands of Confluence spaces and hundreds of thousands of pages, and roughly 15% of its flags were false alarms. Authors who didn't fix flagged content got reminders, and issues that stayed unresolved went to their managers.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Oracle APEX\",\"+ PL/SQL\",\"+ Oracle Text\",\"+ ORDS\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"Oracle APEX is a platform for building apps inside an Oracle database, so the scanner and the data it handled stayed in one place. The Oracle tools listed here covered the rest: reading attachments, searching text, connecting to Confluence, sending emails, and running scans on a schedule.\"}]},{\"slug\":\"homelab\",\"title\":\"Homelab\",\"tag\":\"Infrastructure\",\"year\":\"2025\",\"shipped\":\"04.2025\",\"role\":\"Sole Maintainer\",\"summary\":\"Self-hosted infrastructure for open source software, networking experiments, and NAS solution.\",\"stack\":[\"Docker\",\"NGINX\",\"Fedora Linux\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Homelab Ops\",\"tone\":\"accent\"},\"Self-hosted Linux server that server a photo gallery, PiHole, DNS services, document management services, and other services all on a LAN.\"],\"prose\":\"I needed a place to conduct system-level experiments and rely less on third-party, remotely hosted solutions.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[{\"text\":\"lan client\",\"tone\":\"accent\"},\" |\",\" +-> :443  nginx (self-signed tls)\",\" |          |\",{\"text\":\"-+- docker -+--------------------------\",\"tone\":\"dim\"},\" |          +-> auth     authentik --+\",\" |          +-> home     homarr      |\",\" |          +-> pihole   pihole      |\",\" |          +-> photos   immich -----+\",{\"text\":\" |          |            +- ml       |\",\"tone\":\"dim\"},{\"text\":\" |          |            +- redis    |\",\"tone\":\"dim\"},\" |          +-> docs     paperless --+\",\" |          +-> grafana  grafana     |\",{\"text\":\" |                       +- influxdb |\",\"tone\":\"dim\"},\" |                       postgres <--+\",\" +-> :53   pihole -> upstream dns\",{\"text\":\"---------------------------------------\",\"tone\":\"dim\"},{\"text\":\"# nginx forward-auth via authentik\",\"tone\":\"dim\"},{\"text\":\"# lan only · no ports forwarded\",\"tone\":\"dim\"}],\"prose\":\"Everything stays on the LAN. Pi-hole answers DNS for every device and filters queries before sending them upstream. NGINX terminates TLS with self-signed certs, checks sign-in with Authentik, and routes each .lan hostname to its container. Authentik, Immich, and Paperless-ngx share one Postgres instance, and Grafana charts metrics stored in InfluxDB.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Docker\",\"+ NGINX\",\"+ Fedora Linux\",{\"text\":\"3 dependencies\",\"tone\":\"dim\"}],\"prose\":\"So as to not overcomplicate the system, these are the 3 core services that I use to host services, manage routing and DNS, and the core OS.\"}]}]}");
}),
"[project]/content/site.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "name": "Jose Hernandez",
    "role": "Software Engineer",
    "bio": "AI enablement, security practitioner, and software engineer by day — gamer, photographer and regular human also by day... and night.",
    "domain": "josehernandez.dev",
    "email": "jhern603@gmail.com",
    "links": {
        "linkedin": "https://www.linkedin.com/in/jhern603/",
        "photos": "https://photos.josehernandez.dev",
        "blog": "https://blog.josehernandez.dev",
        "resume": "/Jose_Hernandez_Resume.pdf"
    },
    "portrait": "/portrait.jpg",
    "photos": [
        {
            "id": "dsc00184",
            "title": "College of Business"
        },
        {
            "id": "dsc01164",
            "title": "Campus After Dark"
        },
        {
            "id": "dsc06287",
            "title": "Atlas 747 on Final"
        },
        {
            "id": "dsc05187",
            "title": "Cardboard Regatta"
        }
    ],
    "stack": [
        {
            "name": "AI",
            "items": [
                "Agentic AI",
                "MCP",
                "AI Harness Development"
            ]
        },
        {
            "name": "Security",
            "items": [
                "Security automation",
                "Data Loss Prevention",
                "SSO / OIDC",
                "Secure system design"
            ]
        },
        {
            "name": "Infrastructure",
            "items": [
                "Self-hosted infrastructure",
                "Kubernetes",
                "Docker",
                "Oracle Cloud",
                "AWS"
            ]
        },
        {
            "name": "Languages",
            "items": [
                "Python",
                "Go",
                "Java",
                "JavaScript"
            ]
        }
    ],
    "experience": [
        {
            "company": "Deloitte",
            "role": "Software Engineer II",
            "dates": "Oct 2026 - Current",
            "location": "Austin, TX",
            "points": [
                "Delivered a Salesforce-style outreach platform for medical plan eligibility in GPS, meeting core requirements for multichannel communication across email, SMS, and phone.",
                "Reviewed AI-generated code, tests and documentation for accuracy and completeness against requirements before merge, keeping quality high.",
                "Built and deployed AWS infrastructure with Terraform, supporting repeatable, reliable releases across Agile sprints with engineering, QA and product teams."
            ]
        },
        {
            "company": "Oracle",
            "role": "Software Engineer",
            "dates": "Jul 2024 - Mar 2026",
            "location": "Austin, TX",
            "points": [
                "Designed and shipped production Model Context Protocol (MCP) service enforcing permission-based LLM access across multiple enterprise knowledge sources, with data-boundary enforcement and access controls that prevented unauthorized data exposure through AI interfaces.",
                "Served as technical lead on a corporate-wide AI Adoption program; partnered with security architects to define security standards and guardrails for agentic tooling, embedding safe-use controls into internal developer workflows.",
                "Rearchitected monolithic PL/SQL Data Loss Prevention (DLP) platform into a modular, policy-based, fully automated system which simplifies policy management and enabling faster, safer iteration on data-protection rules.",
                "Designed a Unified MCP Gateway centralizing governed access to enterprise knowledge behind a single policy-enforced interface, reducing access-control complexity and configuration risk for product teams."
            ]
        },
        {
            "company": "Oracle",
            "role": "Software Engineer Intern",
            "dates": "May 2023 - Aug 2023",
            "location": "Austin, TX",
            "points": [
                "Reduced CI/CD build times from several hours to under 10 minutes by parallelizing test execution and optimizing dependency resolution, accelerating production release cycles.",
                "Built mock OCI service integrations to simulate real user requests against OCI Kubernetes Engine (OKE) operations, enabling full prerelease validation without live infrastructure changes."
            ]
        },
        {
            "company": "Florida International University",
            "role": "Junior Webmaster",
            "dates": "Feb 2024 - Jun 2024",
            "location": "Miami, FL",
            "points": [
                "Deployed an LLM-powered support ticket summarization tool using prompt engineering and generative AI APIs, reducing manual ticket review time for the IT team and improving triage throughput.",
                "Maintained and extended the CS department website using PHP and WordPress."
            ]
        },
        {
            "company": "US Army",
            "role": "Biomedical Equipment Technician",
            "dates": "May 2017 - May 2023",
            "location": "Miami, FL",
            "points": [
                "Managed accountability and audit of over $2M in medical and non-medical equipment across multiple operational contexts.",
                "Trained 100+ personnel at an overseas combat support hospital in equipment operation, care, and maintenance protocols under operational conditions."
            ]
        }
    ],
    "quickCommands": [
        {
            "label": "Projects",
            "command": "projects"
        },
        {
            "label": "Stack",
            "command": "stack"
        },
        {
            "label": "Contact",
            "command": "contact"
        },
        {
            "label": "Help",
            "command": "help"
        }
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10b6-zytufer8._.js.map