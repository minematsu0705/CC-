export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DR46A27x.js",app:"_app/immutable/entry/app.Q1JlJgir.js",imports:["_app/immutable/entry/start.DR46A27x.js","_app/immutable/chunks/D4xDCS0s.js","_app/immutable/chunks/B38QsyHB.js","_app/immutable/chunks/B3qxv672.js","_app/immutable/entry/app.Q1JlJgir.js","_app/immutable/chunks/B38QsyHB.js","_app/immutable/chunks/7G569Jtb.js","_app/immutable/chunks/Cxq8HYa7.js","_app/immutable/chunks/B3qxv672.js","_app/immutable/chunks/C_QWeCts.js","_app/immutable/chunks/B2h9XsYF.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/recipe",
				pattern: /^\/api\/recipe\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/recipe/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
