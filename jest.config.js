import {createDefaultPreset} from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        ...tsJestTransformCfg,
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
};