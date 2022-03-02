import { Configuration } from 'webpack';
import { paths } from './paths';
import * as child_process from 'child_process';

export function git(command: string) {
    return child_process
        .execSync(`git ${command}`, { encoding: 'utf8' })
        .trim();
}

export const resolve = {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
        '@app': paths.appSrc,
    },
};

export function genDevtool(mode: Configuration['mode']) {
    if (mode === 'development') {
        return 'eval-source-map';
    }
    return false;
}
