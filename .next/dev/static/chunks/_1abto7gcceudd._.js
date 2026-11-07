(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
(()=>{"use strict";return[
"[project]/lib/content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$projects$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/projects.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$site$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/site.json.[json].cjs [app-client] (ecmascript)");
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
const site = __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$site$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const projects = validate(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$projects$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projects);
const getProject = (slug)=>projects.find((p)=>p.slug === slug);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useRouterBFCache", {
    enumerable: true,
    get: function() {
        return useRouterBFCache;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// When the flag is disabled, only track the currently active tree
const MAX_BF_CACHE_ENTRIES = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1;
function useRouterBFCache(activeTree, activeRenderTree, activeStateKey) {
    // The currently active entry. The entries form a linked list, sorted in
    // order of most recently active. This allows us to reuse parts of the list
    // without cloning, unless there's a reordering or removal.
    // TODO: Once we start tracking back/forward history at each route level,
    // we should use the history order instead. In other words, when traversing
    // to an existing entry as a result of a popstate event, we should maintain
    // the existing order instead of moving it to the front of the list. I think
    // an initial implementation of this could be to pass an incrementing id
    // to history.pushState/replaceState, then use that here for ordering.
    const [prevActiveEntry, setPrevActiveEntry] = (0, _react.useState)(()=>{
        const initialEntry = {
            tree: activeTree,
            renderTree: activeRenderTree,
            stateKey: activeStateKey,
            next: null
        };
        return initialEntry;
    });
    if (prevActiveEntry.tree === activeTree) {
        // Fast path. The active tree hasn't changed, so we can reuse the
        // existing state.
        return prevActiveEntry;
    }
    // The route tree changed. Note that this doesn't mean that the tree changed
    // *at this level* — the change may be due to a child route. Either way, we
    // need to either add or update the router tree in the bfcache.
    //
    // The rest of the code looks more complicated than it actually is because we
    // can't mutate the state in place; we have to copy-on-write.
    // Create a new entry for the active cache key. This is the head of the new
    // linked list.
    const newActiveEntry = {
        tree: activeTree,
        renderTree: activeRenderTree,
        stateKey: activeStateKey,
        next: null
    };
    // We need to append the old list onto the new list. If the head of the new
    // list was already present in the cache, then we'll need to clone everything
    // that came before it. Then we can reuse the rest.
    let n = 1;
    let oldEntry = prevActiveEntry;
    let clonedEntry = newActiveEntry;
    while(oldEntry !== null && n < MAX_BF_CACHE_ENTRIES){
        if (oldEntry.stateKey === activeStateKey) {
            // Fast path. This entry in the old list that corresponds to the key that
            // is now active. We've already placed a clone of this entry at the front
            // of the new list. We can reuse the rest of the old list without cloning.
            // NOTE: We don't need to worry about eviction in this case because we
            // haven't increased the size of the cache, and we assume the max size
            // is constant across renders. If we were to change it to a dynamic limit,
            // then the implementation would need to account for that.
            clonedEntry.next = oldEntry.next;
            break;
        } else {
            // Clone the entry and append it to the list.
            n++;
            const entry = {
                tree: oldEntry.tree,
                renderTree: oldEntry.renderTree,
                stateKey: oldEntry.stateKey,
                next: null
            };
            clonedEntry.next = entry;
            clonedEntry = entry;
        }
        oldEntry = oldEntry.next;
    }
    setPrevActiveEntry(newActiveEntry);
    return newActiveEntry;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Browser variant of `./client-boundary-params`. In the browser the params and
// searchParams are created at render time rather than dynamically tracked.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createClientParams: null,
    createClientSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createClientParams: function() {
        return _paramsbrowser.createRenderParamsFromClient;
    },
    createClientSearchParams: function() {
        return _searchparamsbrowser.createRenderSearchParamsFromClient;
    }
});
const _paramsbrowser = __turbopack_context__.r("[project]/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)");
const _searchparamsbrowser = __turbopack_context__.r("[project]/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientPageRoot", {
    enumerable: true,
    get: function() {
        return ClientPageRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientPageRoot({ Component, serverProvidedParams }) {
    let searchParams;
    let params;
    if (serverProvidedParams !== null) {
        searchParams = serverProvidedParams.searchParams;
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params as
        // props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
        // This is an intentional behavior change: when Cache Components is enabled,
        // client segments receive the "canonical" search params, not the
        // rewritten ones. Users should either call useSearchParams directly or pass
        // the rewritten ones in from a Server Component.
        // TODO: Log a deprecation error when this object is accessed
        searchParams = (0, _routeparams.urlSearchParamsToParsedUrlQuery)((0, _react.use)(_hooksclientcontextsharedruntime.SearchParamsContext));
    }
    const clientSearchParams = (0, _clientboundaryparams.createClientSearchParams)(searchParams);
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        params: clientParams,
        searchParams: clientSearchParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientSegmentRoot", {
    enumerable: true,
    get: function() {
        return ClientSegmentRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientSegmentRoot({ Component, slots, serverProvidedParams }) {
    let params;
    if (serverProvidedParams !== null) {
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params
        // as props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
    }
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        ...slots,
        params: clientParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return _impl.InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return _impl.PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return _impl.RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return _impl.SlotMarker;
    }
});
const _impl = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return SlotMarker;
    }
});
const InstantValidationBoundaryContext = null;
const PlaceValidationBoundaryBelowThisLevel = null;
const RenderValidationBoundaryAtThisLevel = null;
const SlotMarker = null;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    LoadingBoundaryProvider: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LoadingBoundaryProvider: function() {
        return LoadingBoundaryProvider;
    },
    /**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */ default: function() {
        return OuterLayoutRouter;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _unresolvedthenable = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)");
const _errorboundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)");
const _disablesmoothscroll = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)");
const _redirectboundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)");
const _errorboundary1 = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)");
const _boundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)");
const _createsegmentkey = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/router-reducer/create-segment-key.browser.js [app-client] (ecmascript)");
const _bfcachestatemanager = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _rendertree = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/render-tree.js [app-client] (ecmascript)");
/**
 * Resolve the root scroll padding used by the viewport check.
 *
 * Computed lengths serialize as pixels, but percentages remain relative to
 * the scrollport. Preserve the existing behavior for values that still
 * contain unresolved CSS math.
 */ function getScrollPaddingTopInPixels(htmlElement, viewportHeight) {
    const scrollPaddingTop = getComputedStyle(htmlElement).scrollPaddingTop;
    const value = Number.parseFloat(scrollPaddingTop);
    if (!Number.isFinite(value) || value < 0) {
        return 0;
    }
    if (scrollPaddingTop.endsWith('px')) {
        return value;
    }
    if (scrollPaddingTop.endsWith('%')) {
        return value / 100 * viewportHeight;
    }
    return 0;
}
/**
 * Check where the top corner of the HTMLElement is relative to the usable
 * viewport.
 *
 * Scroll padding is resolved lazily so an empty Fragment does not trigger a
 * computed style read. The caller caches the value for the second check.
 */ function getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) {
    const rects = instance.getClientRects();
    if (rects.length === 0) {
        return 0;
    }
    let elementTop = Number.POSITIVE_INFINITY;
    for(let i = 0; i < rects.length; i++){
        const rect = rects[i];
        if (rect.top < elementTop) {
            elementTop = rect.top;
        }
    }
    return elementTop >= getScrollPaddingTop() && elementTop <= viewportHeight ? 1 : 2;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === 'top') {
        return document.body;
    }
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return document.getElementById(hashFragment) ?? // If the hash fragment is a name, the page has to scroll to the first element with that name.
    document.getElementsByName(hashFragment)[0] ?? null;
}
/**
 * Uses Fragment refs for scrolling.
 * Does not focus the first host descendant.
 */ function InnerScrollHandler(props) {
    const childrenRef = _react.default.useRef(null);
    (0, _react.useLayoutEffect)(()=>{
        const { scrollRef: scrollHandlerRef, renderTree } = props;
        const scrollRef = scrollHandlerRef.forceScroll ? scrollHandlerRef.scrollRef : renderTree.data.scrollRef;
        if (scrollRef === null || !scrollRef.current) return;
        let instance = null;
        const hashFragment = scrollHandlerRef.hashFragment;
        if (hashFragment) {
            instance = getHashFragmentDomNode(hashFragment);
            if (instance === null) {
                // A missing hash target is still a handled scroll intent. Do not
                // fall back to the route Fragment or leave the intent pending.
                scrollRef.current = false;
                scrollHandlerRef.onlyHashChange = false;
                scrollHandlerRef.hashFragment = null;
                return;
            }
        } else {
            instance = childrenRef.current;
        }
        // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
        if (instance === null) {
            return;
        }
        let didHandleScroll = false;
        (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
            const htmlElement = document.documentElement;
            let viewportHeight = null;
            let initialTargetState = null;
            let scrollPaddingTop = null;
            const getScrollPaddingTop = ()=>{
                if (scrollPaddingTop === null) {
                    // Reuse the style and layout update from the geometry read.
                    scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                }
                return scrollPaddingTop;
            };
            if (!hashFragment) {
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                viewportHeight = htmlElement.clientHeight;
                initialTargetState = getScrollTargetState(instance, viewportHeight, getScrollPaddingTop);
                // An empty Fragment is not a scroll target. In particular, avoid
                // React's sibling fallback and leave the scroll signal available
                // for another changed segment.
                if (initialTargetState === 0) {
                    return;
                }
            }
            didHandleScroll = true;
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            // This handler intentionally leaves focus untouched; resetting focus on
            // navigation is deferred.
            // In case of hash scroll, we only need to scroll the element into view
            if (hashFragment) {
                instance.scrollIntoView();
                return;
            }
            // If the element's top edge is already in the viewport, exit early.
            if (initialTargetState === 1) {
                return;
            }
            // Otherwise, try scrolling go the top of the document to be backward compatible with pages
            // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
            // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
            // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
            htmlElement.scrollTop = 0;
            // Scroll to domNode if domNode is not in viewport when scrolled to top of document
            if (getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) === 2) {
                // Scroll into view doesn't scroll horizontally by default when not needed
                instance.scrollIntoView();
            }
        }, {
            // We will force layout by querying domNode position
            dontForceLayout: true,
            onlyHashChange: scrollHandlerRef.onlyHashChange
        });
        if (!didHandleScroll) {
            return;
        }
        // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
        scrollHandlerRef.onlyHashChange = false;
        scrollHandlerRef.hashFragment = null;
    }, // but be prepared for lots of manual testing.
    undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
        ref: childrenRef,
        children: props.children
    });
}
function ScrollHandler({ children, renderTree }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error('invariant global layout router not mounted');
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerScrollHandler, {
        scrollRef: context.scrollRef,
        renderTree: renderTree,
        children: children
    });
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter({ tree, segmentPath, debugNameContext, renderTree, params, url, isActive }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    const parentNavPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    if (!context) {
        throw new Error('invariant global layout router not mounted');
    }
    // `rsc` represents the renderable node for this segment.
    // If this segment has a `prefetchRsc`, it's the statically prefetched data.
    // We should use that on initial render instead of `rsc`. Then we'll switch
    // to `rsc` when the dynamic response streams in.
    //
    // If no prefetch data is available, then we go straight to rendering `rsc`.
    const resolvedPrefetchRsc = renderTree.data.prefetchRsc !== null ? renderTree.data.prefetchRsc : renderTree.data.rsc;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    const rsc = (0, _react.useDeferredValue)(renderTree.data.rsc, resolvedPrefetchRsc);
    // `rsc` is either a React node or a promise for a React node, except we
    // special case `null` to represent that this segment's data is missing. If
    // it's a promise, we need to unwrap it so we can determine whether or not the
    // data is missing.
    let resolvedRsc;
    if ((0, _rendertree.isDeferredRsc)(rsc)) {
        const unwrappedRsc = (0, _react.use)(rsc);
        if (unwrappedRsc === null) {
            // If the promise was resolved to `null`, it means the data for this
            // segment was not returned by the server. Suspend indefinitely. When this
            // happens, the router is responsible for triggering a new state update to
            // un-suspend this segment.
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = unwrappedRsc;
    } else {
        // This is not a deferred RSC promise. Don't need to unwrap it.
        if (rsc === null) {
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = rsc;
    }
    // In dev, we create a NavigationPromisesContext containing the instrumented promises that provide
    // `useSelectedLayoutSegment` and `useSelectedLayoutSegments`.
    // Promises are cached outside of render to survive suspense retries.
    let navigationPromises = null;
    if ("TURBOPACK compile-time truthy", 1) {
        const { createNestedLayoutNavigationPromises } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)");
        navigationPromises = createNestedLayoutNavigationPromises(tree, parentNavPromises);
    }
    let children = resolvedRsc;
    if (navigationPromises) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.NavigationPromisesContext.Provider, {
            value: navigationPromises,
            children: resolvedRsc
        });
    }
    children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: tree,
            parentRenderTree: renderTree,
            parentSegmentPath: segmentPath,
            parentParams: params,
            // This is always set to null as we enter a child segment. It's
            // populated by LoadingBoundaryProvider the next time we reach a
            // loading boundary.
            parentLoadingData: null,
            debugNameContext: debugNameContext,
            // TODO-APP: overriding of url for parallel routes
            url: url,
            isActive: isActive
        },
        children: children
    });
    return children;
}
function LoadingBoundaryProvider({ loading, children }) {
    // Provides the data needed to render a loading.tsx boundary, via context.
    //
    // loading.tsx creates a Suspense boundary around each of a layout's child
    // slots. (Might be bit confusing to think about the data flow, but: if
    // loading.tsx and layout.tsx are in the same directory, they are assigned
    // to the same render tree.)
    //
    // This provider component does not render the Suspense boundary directly;
    // that's handled by LoadingBoundary.
    //
    // TODO: For simplicity, we should combine this provider with LoadingBoundary
    // and render the Suspense boundary directly. The only real benefit of doing
    // it separately is so that when there are multiple parallel routes, we only
    // send the boundary data once, rather than once per child. But that's a
    // negligible benefit and can be achieved via caching instead.
    const parentContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
    if (parentContext === null) {
        return children;
    }
    // All values except for parentLoadingData are the same as the parent context.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: parentContext.parentTree,
            parentRenderTree: parentContext.parentRenderTree,
            parentSegmentPath: parentContext.parentSegmentPath,
            parentParams: parentContext.parentParams,
            parentLoadingData: loading,
            debugNameContext: parentContext.debugNameContext,
            url: parentContext.url,
            isActive: parentContext.isActive
        },
        children: children
    });
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary({ name, loading, children }) {
    // TODO: For LoadingBoundary, and the other built-in boundary types, don't
    // wrap in an extra function component if no user-defined boundary is
    // provided. In other words, inline this conditional wrapping logic into
    // the parent component. More efficient and keeps unnecessary junk out of
    // the component stack.
    if (loading !== null) {
        const loadingRsc = loading[0];
        const loadingStyles = loading[1];
        const loadingScripts = loading[2];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
            name: name,
            fallback: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    loadingStyles,
                    loadingScripts,
                    loadingRsc
                ]
            }),
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
function OuterLayoutRouter({ parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized, segmentViewBoundaries }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw new Error('invariant expected layout router to be mounted');
    }
    const { parentTree, parentRenderTree, parentSegmentPath, parentParams, parentLoadingData, url, isActive, debugNameContext } = context;
    // Get the render tree for this segment by reading it from the parent segment's
    // child map.
    const parentTreeSegment = parentTree[0];
    const segmentPath = parentSegmentPath === null ? // the code. We should clean this up.
    [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        parentTreeSegment,
        parallelRouterKey
    ]);
    // The "state" key of a segment is the one passed to React. In the browser it
    // represents the identity of the UI tree. Whenever the state key changes,
    // the tree is recreated and the state is reset. In the App Router model,
    // search params do not cause state to be lost, so two segments with the same
    // segment path but different search params should have the same state key.
    // On the server, the key describes the segment's structure instead, so it
    // stays the same when unknown params become known during HTML resume.
    //
    // Whether the data can be reused is tracked separately, by the segment
    // cache's vary paths.
    const activeTree = parentTree[1][parallelRouterKey];
    const activeRenderTree = parentRenderTree.slots?.get(parallelRouterKey);
    if (activeTree === undefined || activeRenderTree === undefined) {
        // Could not find a matching segment. The client tree is inconsistent with
        // the server tree. Suspend indefinitely; the router will have already
        // detected the inconsistency when handling the server response, and
        // triggered a refresh of the page to recover.
        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    }
    let maybeValidationBoundaryId = null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const activeSegment = activeTree[0];
    const activeStateKey = (0, _createsegmentkey.createSegmentKey)(activeSegment);
    // At each level of the route tree, not only do we render the currently
    // active segment — we also render the last N segments that were active at
    // this level inside a hidden <Activity> boundary, to preserve their state
    // if or when the user navigates to them again.
    //
    // bfcacheEntry is a linked list of FlightRouterStates.
    let bfcacheEntry = (0, _bfcachestatemanager.useRouterBFCache)(activeTree, activeRenderTree, activeStateKey);
    let children = [];
    do {
        const tree = bfcacheEntry.tree;
        const renderTree = bfcacheEntry.renderTree;
        const stateKey = bfcacheEntry.stateKey;
        const segment = tree[0];
        /*
    - Error boundary
      - Only renders error boundary if error component is provided.
      - Rendered for each segment to ensure they have their own error state.
      - When gracefully degrade for bots, skip rendering error boundary.
    - Loading boundary
      - Only renders suspense boundary if loading components is provided.
      - Rendered for each segment to ensure they have their own loading state.
      - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
  */ let segmentBoundaryTriggerNode = null;
        let segmentViewStateNode = null;
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentBoundaryTriggerNode, SegmentViewStateNode } = __turbopack_context__.r("[project]/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            const pagePrefix = (0, _apppaths.normalizeAppPath)(url);
            segmentViewStateNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentViewStateNode, {
                page: pagePrefix
            }, pagePrefix);
            segmentBoundaryTriggerNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentBoundaryTriggerNode, {})
            });
        }
        let params = parentParams;
        if (Array.isArray(segment)) {
            // This segment contains a route param. Accumulate these as we traverse
            // down the router tree. The result represents the set of params that
            // the layout/page components are permitted to access below this point.
            const paramName = segment[0];
            const paramCacheKey = segment[1];
            const paramType = segment[2];
            const paramValue = (0, _routeparams.getParamValueFromCacheKey)(paramCacheKey, paramType);
            if (paramValue !== null) {
                params = {
                    ...parentParams,
                    [paramName]: paramValue
                };
            }
        }
        const debugName = getBoundaryDebugNameFromSegment(segment);
        // `debugNameContext` represents the nearest non-"virtual" parent segment.
        // `getBoundaryDebugNameFromSegment` returns undefined for virtual segments.
        // So if `debugName` is undefined, the context is passed through unchanged.
        const childDebugNameContext = debugName ?? debugNameContext;
        // In practical terms, clicking this name in the Suspense DevTools
        // should select the child slots of that layout.
        //
        // So the name we apply to the Activity boundary is actually based on
        // the nearest parent segments.
        //
        // We skip over "virtual" parents, i.e. ones inserted by Next.js that
        // don't correspond to application-defined code.
        const isVirtual = debugName === undefined;
        const debugNameToDisplay = isVirtual ? undefined : debugNameContext;
        let templateValue = /*#__PURE__*/ (0, _jsxruntime.jsxs)(ScrollHandler, {
            renderTree: renderTree,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                    errorComponent: error,
                    errorStyles: errorStyles,
                    errorScripts: errorScripts,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(LoadingBoundary, {
                        name: debugNameToDisplay,
                        // TODO: The loading module data for a segment is stored on the
                        // parent, then applied to each of that parent segment's
                        // parallel route slots. In the simple case where there's only
                        // one parallel route (the `children` slot), this is no
                        // different from if the loading module data were stored on the
                        // child directly. But I'm not sure this actually makes sense
                        // when there are multiple parallel routes. It's not a huge
                        // issue because you always have the option to define a narrower
                        // loading boundary for a particular slot. But this sort of
                        // smells like an implementation accident to me.
                        loading: parentLoadingData,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary1.HTTPAccessFallbackBoundary, {
                            notFound: notFound,
                            forbidden: forbidden,
                            unauthorized: unauthorized,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_redirectboundary.RedirectBoundary, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                        url: url,
                                        tree: tree,
                                        params: params,
                                        renderTree: renderTree,
                                        segmentPath: segmentPath,
                                        debugNameContext: childDebugNameContext,
                                        isActive: isActive && stateKey === activeStateKey
                                    }),
                                    segmentBoundaryTriggerNode
                                ]
                            })
                        })
                    })
                }),
                segmentViewStateNode
            ]
        });
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        let child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_approutercontextsharedruntime.TemplateContext.Provider, {
            value: templateValue,
            children: [
                templateStyles,
                templateScripts,
                template
            ]
        }, stateKey);
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentStateProvider } = __turbopack_context__.r("[project]/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(SegmentStateProvider, {
                children: [
                    child,
                    segmentViewBoundaries
                ]
            }, stateKey);
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        children.push(child);
        bfcacheEntry = bfcacheEntry.next;
    }while (bfcacheEntry !== null)
    return children;
}
function getBoundaryDebugNameFromSegment(segment) {
    if (segment === '/') {
        // Reached the root
        return '/';
    }
    if (typeof segment === 'string') {
        if (isVirtualLayout(segment)) {
            return undefined;
        } else {
            return segment + '/';
        }
    }
    const paramCacheKey = segment[1];
    return paramCacheKey + '/';
}
function isVirtualLayout(segment) {
    return(// (like __PAGE__ and __DEFAULT__) to avoid collisions with
    // user-defined route groups.
    segment === '(__SLOT__)');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontextsharedruntime.TemplateContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedParams = new WeakMap();
function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = Promise.resolve(underlyingParams);
    const proxiedProperties = new Set();
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            warnForEnumeration();
            return Reflect.ownKeys(target);
        }
    });
    proxiedPromise.status = 'fulfilled';
    proxiedPromise.value = underlyingParams;
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A param property was accessed directly with ${expression}. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForEnumeration() {
    console.error(`params are being enumerated. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderParamsFromClient(clientParams) {
    return makeDynamicallyTrackedParamsWithDevWarnings(clientParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const createRenderParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)").createRenderParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedSearchParams = new WeakMap();
function makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const proxiedProperties = new Set();
    const promise = Promise.resolve(underlyingSearchParams);
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            warnForSyncSpread();
            return Reflect.ownKeys(target);
        }
    });
    proxiedPromise.status = 'fulfilled';
    proxiedPromise.value = underlyingSearchParams;
    CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A searchParam property was accessed directly with ${expression}. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForSyncSpread() {
    console.error(`The keys of \`searchParams\` were accessed directly. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderSearchParamsFromClient(underlyingSearchParams) {
    return makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const createRenderSearchParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)").createRenderSearchParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconMark", {
    enumerable: true,
    get: function() {
        return IconMark;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const IconMark = ()=>{
    if (typeof window !== 'undefined') {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
        name: "\xabnxt-icon\xbb"
    });
};
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Run function with `scroll-behavior: auto` applied to `<html/>`.
 * This css change will be reverted after the function finishes.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", {
    enumerable: true,
    get: function() {
        return disableSmoothScrollDuringRouteTransition;
    }
});
function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
    // if only the hash is changed, we don't need to disable smooth scrolling
    // we only care to prevent smooth scrolling when navigating to a new page to avoid jarring UX
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const hasDataAttribute = htmlElement.dataset.scrollBehavior === 'smooth';
    if (!hasDataAttribute) {
        // Warn if smooth scrolling is detected but no data attribute is present
        if (("TURBOPACK compile-time value", "development") === 'development' && getComputedStyle(htmlElement).scrollBehavior === 'smooth') {
            const { warnOnce } = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
            warnOnce('Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, ' + 'add `data-scroll-behavior="smooth"` to your <html> element. ' + 'Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior');
        }
        // No smooth scrolling configured, run directly without style manipulation
        fn();
        return;
    }
    // Proceed with temporarily disabling smooth scrolling
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
}
}),
"[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    describeHasCheckingStringProperty: null,
    describeStringPropertyAccess: null,
    wellKnownProperties: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    describeHasCheckingStringProperty: function() {
        return describeHasCheckingStringProperty;
    },
    describeStringPropertyAccess: function() {
        return describeStringPropertyAccess;
    },
    wellKnownProperties: function() {
        return wellKnownProperties;
    }
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return `\`${target}.${prop}\``;
    }
    return `\`${target}[${JSON.stringify(prop)}]\``;
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return `\`Reflect.has(${target}, ${stringifiedProp})\`, \`${stringifiedProp} in ${target}\`, or similar`;
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    'then',
    'catch',
    'finally',
    // React Promise extension
    'status',
    // 'value',
    // 'error',
    // React introspection
    'displayName',
    '_debugInfo',
    // Common tested properties
    'toJSON',
    '$$typeof',
    '__esModule',
    // Tested by flight when checking for iterables
    '@@iterator'
]);
}),
"[project]/terminal/TerminalProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TerminalProvider",
    ()=>TerminalProvider,
    "useTerminal",
    ()=>useTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const MAX_LINES = 80;
const PROMPT = 'jose@sys:~$ ';
const TerminalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useTerminal() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TerminalContext);
    if (!ctx) throw new Error('useTerminal must be used inside <TerminalProvider>');
    return ctx;
}
_s(useTerminal, "/dMy7t63NXD4eYACoT93CePwGrg=");
const lookup = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commands"].flatMap((c)=>[
        c.name,
        ...c.aliases ?? []
    ].map((n)=>[
            n,
            c
        ])));
const normalize = (out)=>out == null ? [] : (Array.isArray(out) ? out : [
        out
    ]).map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLine"]);
function TerminalProvider({ children }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        list: [],
        cursor: 0
    });
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])('Last login: on ttys001'),
        "Welcome. Type 'help' or pick a command."
    ].map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLine"]));
    const [lastViewed, setLastViewed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Date is filled in after mount so server and client HTML match.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalProvider.useEffect": ()=>{
            setLines({
                "TerminalProvider.useEffect": (ls)=>ls.map({
                        "TerminalProvider.useEffect": (l, i)=>i === 0 && l.text === 'Last login: on ttys001' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])(`Last login: ${new Date().toDateString().slice(0, 10)} on ttys001`) : l
                    }["TerminalProvider.useEffect"])
            }["TerminalProvider.useEffect"]);
        }
    }["TerminalProvider.useEffect"], []);
    const append = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TerminalProvider.useCallback[append]": (more)=>setLines({
                "TerminalProvider.useCallback[append]": (ls)=>[
                        ...ls,
                        ...more
                    ].slice(-MAX_LINES)
            }["TerminalProvider.useCallback[append]"])
    }["TerminalProvider.useCallback[append]"], []);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TerminalProvider.useCallback[run]": async (raw)=>{
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
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`command not found: ${name}. Type 'help'.`)
            ]);
            try {
                const out = await command.run({
                    args,
                    rest: input.slice(name.length).replace(/^\s/, ''),
                    site: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"],
                    projects: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"],
                    commands: __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commands"],
                    navigate: {
                        "TerminalProvider.useCallback[run]": (href)=>router.push(href)
                    }["TerminalProvider.useCallback[run]"],
                    clear: {
                        "TerminalProvider.useCallback[run]": ()=>setLines([])
                    }["TerminalProvider.useCallback[run]"]
                });
                append(normalize(out));
            } catch (e) {
                append([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${name}: ${e instanceof Error ? e.message : String(e)}`)
                ]);
            }
        }
    }["TerminalProvider.useCallback[run]"], [
        append,
        router
    ]);
    const recall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TerminalProvider.useCallback[recall]": (step)=>{
            const h = history.current;
            h.cursor = Math.max(0, Math.min(h.list.length, h.cursor + step));
            return h.list[h.cursor] ?? '';
        }
    }["TerminalProvider.useCallback[recall]"], []);
    // ⌘K / Ctrl+K jumps to the terminal from anywhere.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalProvider.useEffect": ()=>{
            const onKey = {
                "TerminalProvider.useEffect.onKey": (e)=>{
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
                }
            }["TerminalProvider.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "TerminalProvider.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["TerminalProvider.useEffect"];
        }
    }["TerminalProvider.useEffect"], [
        pathname,
        router
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TerminalProvider.useMemo[value]": ()=>({
                lines,
                run,
                recall,
                inputRef,
                lastViewed,
                setLastViewed
            })
    }["TerminalProvider.useMemo[value]"], [
        lines,
        run,
        recall,
        lastViewed
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TerminalContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/terminal/TerminalProvider.tsx",
        lineNumber: 99,
        columnNumber: 10
    }, this);
}
_s1(TerminalProvider, "btP3DhFdLH0nmNnIEWjpbp0xNP4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = TerminalProvider;
var _c;
__turbopack_context__.k.register(_c, "TerminalProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/about.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'about',
    usage: 'about [n]',
    description: 'short bio, or a project summary',
    run: (ctx)=>{
        if (!ctx.args.length) return ctx.site.bio;
        const { project: p, index, usage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectFromArgs"])(ctx, 'about');
        if (!p) return usage;
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accent"])(`[${p.no}] ${p.title}  ·  ${p.tag}  ·  ${p.year}`),
            p.summary,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])('stack: ' + p.stack.join(', ')),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])(`Type 'open ${index}' for the full project page.`)
        ];
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/clear.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'clear',
    description: 'clear the screen',
    aliases: [
        'cls'
    ],
    run: ({ clear })=>clear()
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/contact.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
;
const display = (href, fallback)=>href && href !== '#' ? href.replace(/^https?:\/\/(www\.)?/, '') : fallback;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'contact',
    description: 'ways to reach me',
    run: ({ site })=>[
            'email     ' + site.email,
            ...Object.entries(site.links).map(([k, v])=>k === 'resume' ? k.padEnd(10) + display(`${site.domain}${v}`, '(coming soon)') : k.padEnd(10) + display(v, '(coming soon)'))
        ]
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/help.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'help',
    description: 'list commands',
    aliases: [
        '?'
    ],
    run: ({ commands })=>{
        const visible = commands.filter((c)=>!c.hidden);
        const width = Math.max(...visible.map((c)=>(c.usage ?? c.name).length)) + 2;
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])('Available commands:'),
            ...visible.map((c)=>'  ' + (c.usage ?? c.name).padEnd(width) + c.description + (c.aliases?.length ? ` (aliases: ${c.aliases.join(', ')})` : ''))
        ];
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commands",
    ()=>commands
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$help$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/help.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$whoami$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/whoami.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/about.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/projects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$open$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/open.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/stack.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/contact.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$clear$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/clear.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$sudo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/commands/sudo.ts [app-client] (ecmascript)");
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
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$help$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$whoami$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$about$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$open$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$clear$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$commands$2f$sudo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/open.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'open',
    usage: 'open <n>',
    description: 'open the project page',
    aliases: [
        'cd'
    ],
    run: (ctx)=>{
        const { project, usage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectFromArgs"])(ctx, 'open');
        if (!project) return usage;
        // Short pause so the "opening" line is visible before the page changes.
        setTimeout(()=>ctx.navigate(`/work/${project.slug}`), 350);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accent"])(`→ opening ${project.slug} …`);
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'projects',
    description: 'list selected work',
    aliases: [
        'ls',
        'work'
    ],
    run: ({ projects })=>[
            ...projects.map((p, i)=>`  [${i + 1}] ${p.title.padEnd(16)}${p.tag}`),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dim"])("Type 'about 1' for a summary or 'open 1' for the full page.")
        ]
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/stack.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'stack',
    description: 'tools & tech',
    run: ({ site })=>site.stack.map((g)=>`${g.name.toLowerCase()}:\n  ${g.items.join(', ')}`)
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/sudo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'sudo',
    description: 'run as root',
    hidden: true,
    run: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('Nice try. This incident will be reported.')
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/commands/whoami.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/terminal/lines.ts [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineCommand"])({
    name: 'whoami',
    description: 'who is this',
    run: ({ site })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$terminal$2f$lines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accent"])(`${site.name} — ${site.role}`)
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/lines.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/terminal/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineCommand",
    ()=>defineCommand
]);
const defineCommand = (command)=>command;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]})(),
"[project]/content/projects.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"$schema\":\"./projects.schema.json\",\"projects\":[{\"slug\":\"agentic-marketplace\",\"title\":\"Agent Marketplace\",\"tag\":\"Agentic AI\",\"year\":\"2026\",\"shipped\":\"Not Shipped\",\"role\":\"Architect\",\"summary\":\"Lets users pick skills and MCP servers once and use them in any AI client through a single parent MCP server.\",\"stack\":[\"Python\",\"FastMCP\",\"React / Next.js\",\"MCP OAuth\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Agent Marketplace\",\"tone\":\"accent\"},\"Pick skills and MCP servers once, then use them in any AI client through a single parent MCP server.\",\"\",{\"text\":\"# working proof of concept\",\"tone\":\"dim\"}],\"prose\":\"Every AI client keeps its own list of skills and MCP servers. Setting them up one client at a time is tedious, the lists drift out of sync, and a setup built for one provider doesn't carry over to another. An organization also has no single place to approve, grant, or revoke what its agents can use.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] catalog skills and mcp servers\",\"[2] users toggle items in a web ui\",\"[3] client connects to one parent\",\"[4] parent signs user in via oauth\",\"[5] expose only that user's picks\"],\"prose\":\"The AI client is configured with exactly one MCP server: the parent. Users choose skills and MCP servers in a web catalog. When their client connects, the parent signs them in through MCP's OAuth flow and exposes only what they enabled. With 3 skills and 5 MCP servers in the catalog, a user who enables 2 skills and 1 server sees exactly those 3, and the client treats them as if they were set up locally.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\"ai client  (claude, chatgpt)\",{\"text\":\" |  one mcp server configured\",\"tone\":\"dim\"},\" v\",\"parent mcp server  (fastmcp)\",{\"text\":\" |  mcp oauth -> user\",\"tone\":\"dim\"},{\"text\":\" |  picks from web catalog\",\"tone\":\"dim\"},{\"text\":\" |  toggles push live to client\",\"tone\":\"dim\"},\" |\",\" +-> skill a            as tool\",\" +-> skill b            as tool\",\" +-> remote mcp server  proxied\",{\"text\":\"# catalog: 3 skills, 5 servers\",\"tone\":\"dim\"},{\"text\":\"# enabled: 2 skills, 1 server\",\"tone\":\"dim\"},{\"text\":\"# client sees 3, as if local\",\"tone\":\"dim\"}],\"prose\":\"The parent is a Python server built on FastMCP. Each enabled skill is wrapped as an MCP tool, and each enabled MCP server is a remote server that the parent brings in through FastMCP's mount and proxy features, so its tools show up as the parent's own. When the client connects, MCP's OAuth flow identifies the user, and the parent applies that user's selections and credentials from the React / Next.js catalog.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ one server in each client's config\",\"tone\":\"accent\"},{\"text\":\"✓ works in claude and chatgpt / codex\",\"tone\":\"accent\"},{\"text\":\"✓ per-user picks via mcp oauth\",\"tone\":\"accent\"},{\"text\":\"✓ remote servers appear as local\",\"tone\":\"accent\"},{\"text\":\"✓ toggles reach the client live\",\"tone\":\"accent\"},{\"text\":\"# proof of concept, not shipped\",\"tone\":\"dim\"}],\"prose\":\"The proof of concept worked end to end. A user enabled a skill or server in the catalog, and it showed up live in Claude (Desktop and Code) and ChatGPT / Codex, with no restart, as if it were set up locally. Turning it off removed it the same way.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Python\",\"+ FastMCP\",\"+ React / Next.js\",\"+ MCP OAuth\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"FastMCP handled the MCP protocol, wrapping skills as tools, and composing remote servers into the parent, which kept the parent a small Python service. MCP's built-in OAuth flow tied each connection to a user, and the catalog is a React / Next.js app.\"}]},{\"slug\":\"agentic-security-harness\",\"title\":\"Agentic Security Harness\",\"tag\":\"Security\",\"year\":\"2025\",\"shipped\":\"11.2025\",\"role\":\"Tech Lead\",\"summary\":\"Runs each AI coding agent session in its own short-lived VM, walled off from the host's kernel, files, and credentials.\",\"stack\":[\"KVM / QEMU\",\"Apple VZ / Lima\",\"Packer\",\"Egress firewall\"],\"links\":[{\"label\":\"Write-up\",\"href\":\"https://blog.josehernandez.dev/posts/ai-coding-agents-enterprise-isolation/\"}],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Agentic Security Harness\",\"tone\":\"accent\"},\"Runs each AI coding agent session in its own short-lived VM, walled off from the host's kernel, files, and credentials.\"],\"prose\":\"AI coding agents read, write, and run code on their own. On a developer workstation or in shared CI, they get the same access as a privileged user: credentials, secrets, and an open network path for data to leave. A container narrows that access, but it still shares the host kernel.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] build one standard image with packer\",\"[2] start a fresh vm for each session\",\"[3] snapshot the vm before the agent runs\",\"[4] send all egress through a firewall\",\"[5] forward logs, destroy the vm at end\"],\"prose\":\"Of three isolation strategies (a container, a full VM, and nested containers), this one uses the VM because it draws the strongest boundary. The guest has its own kernel, filesystem, and network stack, and it sees no host credentials or secrets unless they are shared on purpose. The cost is a 15–60 second cold boot, dedicated RAM and CPU for every VM, and slower syncing between the host editor and the VM workspace.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\" host --> hypervisor <-- packer image\",{\"text\":\"          |  kvm / qemu / vz\",\"tone\":\"dim\"},{\"text\":\"          |  snapshot pre-session\",\"tone\":\"dim\"},\"          v\",\" +- guest vm (1 per session) -----+\",\" |  agent process                 |\",\" |  own kernel, fs, network       |\",\" |  no host creds or secrets      |\",\" +-------------+---------------+--+\",\"               |               |\",\"               v               v\",\"        egress firewall  log platform\",\"               |\",\"               v\",\"        allowlisted hosts\",{\"text\":\"# private subnet, no internet gateway\",\"tone\":\"dim\"},{\"text\":\"# vm destroyed when the session ends\",\"tone\":\"dim\"}],\"prose\":\"The hypervisor gives each session a guest VM built from a standard Packer image, with the agent toolchain and a log forwarder already installed. The VM sits in a private subnet with no direct internet gateway, so every outbound request passes through a managed firewall. A snapshot taken before each session gives a clean rollback point, and system and agent logs go to a central log platform.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ kernel sharing     none\",\"tone\":\"accent\"},{\"text\":\"✓ filesystem         isolated\",\"tone\":\"accent\"},{\"text\":\"✓ network            isolated\",\"tone\":\"accent\"},{\"text\":\"✓ host credentials   not shared\",\"tone\":\"accent\"},{\"text\":\"✓ host secrets       hidden\",\"tone\":\"accent\"},{\"text\":\"✓ rollback           vm snapshot\",\"tone\":\"accent\"},{\"text\":\"# cost: 15-60s cold boot per session\",\"tone\":\"dim\"}],\"prose\":\"A VM is the strongest boundary of the three strategies. Escaping one is much harder than escaping a container, and the agent can't reach host kernel vulnerabilities. That makes it the right fit for high-sensitivity code in finance, healthcare, or government. For everyday work a hardened container costs less, so isolation should match the risk of the workload, with human approval at the steps that matter most.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ KVM / QEMU\",\"+ Apple VZ / Lima\",\"+ Packer\",\"+ Egress firewall\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"KVM and QEMU provide the hypervisor on Linux, and Apple's Virtualization framework through Lima covers macOS. Packer builds one standard image, so every session starts from the same known state. A managed egress firewall decides what the VM can reach, since its subnet has no internet gateway of its own.\"}]},{\"slug\":\"dlp\",\"title\":\"Data Loss Prevention\",\"tag\":\"DLP\",\"year\":\"2025\",\"shipped\":\"09.2025\",\"role\":\"Lead Engineer\",\"summary\":\"Scans Confluence pages and attachments every 10 minutes for exposed login details, personal data, and classified content.\",\"stack\":[\"Oracle APEX\",\"PL/SQL\",\"Oracle Text\",\"ORDS\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Data Loss Prevention\",\"tone\":\"accent\"},\"Finds exposed login details, personal data, and classified content in Confluence pages and attachments, then gets it fixed.\",\"\",{\"text\":\"# all content stays in-house\",\"tone\":\"dim\"}],\"prose\":\"Confluence is a shared workspace where teams write pages and upload files. Those pages and files can hold login details, personal data, or content marked confidential, and nothing was checking them. The content also had to stay in-house, so sending it to an outside scanning service wasn't an option.\"},{\"label\":\"Approach\",\"file\":\"plan.txt\",\"command\":\"cat plan.txt\",\"output\":[\"[1] read pages and files in confluence\",\"[2] scan new edits every 10 minutes\",\"[3] look for sensitive data and keywords\",\"[4] double-check matches to cut noise\",\"[5] auto-restrict the clear-cut cases\",\"[6] email authors, escalate if ignored\"],\"prose\":\"The company ran its own copy of Confluence, so the scanner could read pages and attachments directly. Every 10 minutes it checks only what was created or changed since the last run. When a match is almost certainly real, the system restricts access to the content and emails the author right away. Everything else waits for a person to review and confirm it.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[\"confluence\",{\"text\":\" |  pages + attachments\",\"tone\":\"dim\"},\" v\",\"scan new edits  (every 10 min)\",{\"text\":\" |  read text inside attachments\",\"tone\":\"dim\"},{\"text\":\" |  look for sensitive data, keywords\",\"tone\":\"dim\"},{\"text\":\" |  double-check each match\",\"tone\":\"dim\"},\" v\",\"match --> logged as an issue\",\" |\",\" +-> high confidence\",\" |    +-> restrict access\",\" |    +-> email author now\",\" |\",\" +-> everything else\",\" |    +-> human review queue\",\" |    +-> email author if confirmed\",\" v\",\"author fixes via self-service link\",{\"text\":\"# no fix: reminders, then manager\",\"tone\":\"dim\"}],\"prose\":\"The scanner first pulls the text out of attachments, so a file can be checked the same way as a page. It then looks for known patterns and keywords, and follow-up checks weed out false alarms. The same app lets the team manage the rules and follow results on dashboards. Authors get a self-service page, linked from the email, where they confirm their fix.\"},{\"label\":\"Outcome\",\"file\":\"results.log\",\"command\":\"tail results.log\",\"output\":[{\"text\":\"✓ thousands of issues caught in a year\",\"tone\":\"accent\"},{\"text\":\"✓ hundreds of thousands of pages covered\",\"tone\":\"accent\"},{\"text\":\"✓ ~15% false alarms\",\"tone\":\"accent\"},{\"text\":\"✓ new content scanned every 10 min\",\"tone\":\"accent\"},{\"text\":\"# unfixed issues escalate to managers\",\"tone\":\"dim\"}],\"prose\":\"Over a year it caught thousands of issues across tens of thousands of Confluence spaces and hundreds of thousands of pages, and roughly 15% of its flags were false alarms. Authors who didn't fix flagged content got reminders, and issues that stayed unresolved went to their managers.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Oracle APEX\",\"+ PL/SQL\",\"+ Oracle Text\",\"+ ORDS\",{\"text\":\"4 dependencies\",\"tone\":\"dim\"}],\"prose\":\"Oracle APEX is a platform for building apps inside an Oracle database, so the scanner and the data it handled stayed in one place. The Oracle tools listed here covered the rest: reading attachments, searching text, connecting to Confluence, sending emails, and running scans on a schedule.\"}]},{\"slug\":\"homelab\",\"title\":\"Homelab\",\"tag\":\"Infrastructure\",\"year\":\"2025\",\"shipped\":\"04.2025\",\"role\":\"Sole Maintainer\",\"summary\":\"Self-hosted infrastructure for open source software, networking experiments, and NAS solution.\",\"stack\":[\"Docker\",\"NGINX\",\"Fedora Linux\"],\"links\":[],\"sections\":[{\"label\":\"Overview\",\"file\":\"README.md\",\"command\":\"cat README.md\",\"output\":[{\"text\":\"# Homelab Ops\",\"tone\":\"accent\"},\"Self-hosted Linux server that server a photo gallery, PiHole, DNS services, document management services, and other services all on a LAN.\"],\"prose\":\"I needed a place to conduct system-level experiments and rely less on third-party, remotely hosted solutions.\"},{\"label\":\"Architecture\",\"file\":\"arch.txt\",\"command\":\"cat arch.txt\",\"output\":[{\"text\":\"lan client\",\"tone\":\"accent\"},\" |\",\" +-> :443  nginx (self-signed tls)\",\" |          |\",{\"text\":\"-+- docker -+--------------------------\",\"tone\":\"dim\"},\" |          +-> auth     authentik --+\",\" |          +-> home     homarr      |\",\" |          +-> pihole   pihole      |\",\" |          +-> photos   immich -----+\",{\"text\":\" |          |            +- ml       |\",\"tone\":\"dim\"},{\"text\":\" |          |            +- redis    |\",\"tone\":\"dim\"},\" |          +-> docs     paperless --+\",\" |          +-> grafana  grafana     |\",{\"text\":\" |                       +- influxdb |\",\"tone\":\"dim\"},\" |                       postgres <--+\",\" +-> :53   pihole -> upstream dns\",{\"text\":\"---------------------------------------\",\"tone\":\"dim\"},{\"text\":\"# nginx forward-auth via authentik\",\"tone\":\"dim\"},{\"text\":\"# lan only · no ports forwarded\",\"tone\":\"dim\"}],\"prose\":\"Everything stays on the LAN. Pi-hole answers DNS for every device and filters queries before sending them upstream. NGINX terminates TLS with self-signed certs, checks sign-in with Authentik, and routes each .lan hostname to its container. Authentik, Immich, and Paperless-ngx share one Postgres instance, and Grafana charts metrics stored in InfluxDB.\"},{\"label\":\"Stack\",\"file\":\"deps\",\"command\":\"cat deps\",\"output\":[\"+ Docker\",\"+ NGINX\",\"+ Fedora Linux\",{\"text\":\"3 dependencies\",\"tone\":\"dim\"}],\"prose\":\"So as to not overcomplicate the system, these are the 3 core services that I use to host services, manage routing and DNS, and the core OS.\"}]}]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/content/site.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_1abto7gcceudd._.js.map