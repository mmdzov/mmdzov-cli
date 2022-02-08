// export const tagPattern = /(\/\/.*#.*[\s\S]?\n([\s\S]*?(?=\n.*?=|\}\)).*))/g;
export const tagPattern = /(\/\/.*#.*[\s\S]?([\s\S]*?(?=\n.?=|\/\/#).*))/g;
export const routePattern = /(router:[\s]?\[([\s\S]*?(?=\n.*?=|\]).*))/g;
export const importsPattern = /(import.*[\s\S]?\n([\s\S]*?(?=\n.*?=|;).*))/g;
