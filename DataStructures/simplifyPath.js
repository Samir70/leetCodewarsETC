const simplifyPath = path => {
    let folders = path.split('/');
    let stack = [];
    for (let f of folders) {
        if (f === '' || f === '.') { continue }
        if (f === '..') {
            stack.pop()
        } else {
            stack.push(f)
        }
    }
    return '/'+stack.join('/')
}

const tests = [
    { path: "/home/", out: "/home" },
    { path: "/../", out: "/" },
    { path: "/../c", out: "/c" },
    { path: "/home//foo/", out: "/home/foo" },
    { path: "/a/./b/../../c/", out: "/c" }
]

tests.forEach((t, i) => console.log(
    'test', i, simplifyPath(t.path) === t.out || simplifyPath(t.path)
))