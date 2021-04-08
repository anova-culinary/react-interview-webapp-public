module.exports = {
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
}
