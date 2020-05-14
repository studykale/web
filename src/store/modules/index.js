import camelCase from "lodash/camelCase";

const requireModule = require.context(".", false, /\.js$/); //extract js files inside
const modulesCache = {};

requireModule.keys().forEach(filename => {
    if(filename === "./index.js") return;

    const moduleName = camelCase(filename.replace(/(\.\/|\.js)/g, ""))

    modulesCache[moduleName] = requireModule(filename).default
});

export default modulesCache;