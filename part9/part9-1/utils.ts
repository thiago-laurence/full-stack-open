export const parseArguments = <T>(args: string[], validateArgs: (args: string[]) => T, minArgs?: number, maxArgs?: number): T => {
    if (minArgs !== undefined && args.length < minArgs) throw new Error('Not enough arguments');
    if (maxArgs !== undefined && args.length > maxArgs) throw new Error('Too many arguments');

    return validateArgs(args);
}