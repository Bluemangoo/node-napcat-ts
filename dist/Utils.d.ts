import type { Receive, SendMessageSegment, UnSafeStruct } from './Structs.js';
export declare const logger: {
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    dir: (json: any) => void;
};
export declare const SPLIT: RegExp;
export declare const CQ_TAG_REGEXP: RegExp;
/**
 * CQ码转JSON
 */
export declare function convertCQCodeToJSON(msg: string): Receive[keyof Receive][] | SendMessageSegment[];
/**
 * JSON转CQ码
 */
export declare function convertJSONToCQCode(json: UnSafeStruct | UnSafeStruct[]): string;
export declare function CQCodeDecode(str: string | any): string;
export declare function CQCodeEncode(str: string): string;
