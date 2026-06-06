import type { EventHandleMap, EventKey, HandlerResMap, NCWebsocketOptions, WSSendParam, WSSendReturn } from './Interfaces.js';
export declare class NCWebsocketBase {
    #private;
    constructor(NCWebsocketOptions: NCWebsocketOptions, debug?: boolean);
    /**
     * await connect() 等待 ws 连接
     */
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    reconnect(): Promise<void>;
    /**
     * 发送API请求
     * @param method API 端点
     * @param params 请求参数
     */
    send<T extends keyof WSSendParam>(method: T, params: WSSendParam[T]): Promise<WSSendReturn[T]>;
    /**
     * 注册监听方法
     * @param event
     * @param handle
     * @returns 返回自身引用
     */
    on<T extends EventKey>(event: T, handle: EventHandleMap[T]): this;
    /**
     * 注册一次性监听方法，触发一次后自动解除监听
     * @deprecated 因为once方法会创建一个函数包裹，无法正确的off，所以不推荐使用once方法，建议使用subscribeOnce方法替代
     * @param event
     * @param handle
     * @returns 返回自身引用
     */
    once<T extends EventKey>(event: T, handle: EventHandleMap[T]): this;
    /**
     * 解除监听方法
     * @param event
     * @param handle
     * @returns 返回自身引用
     */
    off<T extends EventKey>(event: T, handle: EventHandleMap[T]): this;
    /**
     * effect风格的订阅 效果同on
     * @param event
     * @param handle
     * @returns 返回用于取消订阅的函数
     */
    subscribe<T extends EventKey>(event: T, handle: EventHandleMap[T]): () => void;
    /**
     * effect风格的订阅 效果同once
     * @param event
     * @param handle
     * @returns 返回用于取消订阅的函数
     */
    subscribeOnce<T extends EventKey>(event: T, handle: EventHandleMap[T]): () => void;
    /**
     * 手动模拟触发某个事件
     * @param type
     * @param context
     */
    emit<T extends EventKey>(type: T, context: HandlerResMap[T]): this;
}
