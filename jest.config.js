const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")
const { paths } = compilerOptions

const moduleNameMapper = pathsToModuleNameMapper(paths, { prefix: "<rootDir>" })
moduleNameMapper["\\.css$"] = "identity-obj-proxy"

const swcConfig = {
  jsc: {
      parser: {
          syntax: "typescript",
          jsx: true,
      },
  },
}

module.exports = {
  preset: 'ts-jest',
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": ["@swc/jest", swcConfig],
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    'jest-transform-stub',
    "^.+\\.(css|less|sass|scss)$": "jest-css-modules-transform",
    "^.+\\.js$": "ts-jest",
    "^.+\\.png$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  moduleNameMapper,
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js", "jest-extended/all"],
};