export interface UnSafeStruct {
    type: string;
    data: {
        [k: string]: any;
    };
}
export interface Receive {
    text: {
        type: 'text';
        data: {
            text: string;
        };
    };
    at: {
        type: 'at';
        data: {
            qq: string | 'all';
        };
    };
    image: {
        type: 'image';
        data: {
            summary: string;
            file: string;
            sub_type: number;
            url: string;
            file_size: string;
        } | {
            summary: string;
            file: string;
            sub_type: string;
            url: string;
            key: string;
            emoji_id: string;
            emoji_package_id: number;
        };
    };
    file: {
        type: 'file';
        data: {
            file: string;
            file_id: string;
            file_size: string;
        };
    };
    poke: {
        type: 'poke';
        data: {
            type: string;
            id: string;
        };
    };
    dice: {
        type: 'dice';
        data: {
            result: string;
        };
    };
    rps: {
        type: 'rps';
        data: {
            result: string;
        };
    };
    face: {
        type: 'face';
        data: {
            id: string;
            raw: {
                faceIndex?: number;
                faceText?: string;
                faceType?: number;
                packId?: string;
                stickerId?: string;
                sourceType?: number;
                stickerType?: number;
                resultId?: string;
                surpriseId?: string;
                randomType?: number;
                imageType?: number;
                pokeType?: number;
                spokeSummary?: string;
                doubleHit?: number;
                vaspokeId?: number;
                vaspokeName?: string;
                vaspokeMinver?: number;
                pokeStrength?: number;
                msgType?: number;
                faceBubbleCount?: number;
                oldVersionStr?: string;
                pokeFlag?: number;
                chainCount?: number;
            };
            resultId: string | null;
            chainCount: number | null;
        };
    };
    reply: {
        type: 'reply';
        data: {
            id: string;
        };
    };
    video: {
        type: 'video';
        data: {
            file: string;
            url: string;
            file_size: string;
        };
    };
    record: {
        type: 'record';
        data: {
            file: string;
            file_size: string;
        };
    };
    forward: {
        type: 'forward';
        data: {
            id: string;
            content?: Receive[keyof Receive][];
        };
    };
    json: {
        type: 'json';
        data: {
            data: string;
        };
    };
    markdown: {
        type: 'markdown';
        data: {
            content: string;
        };
    };
    xml: {
        type: 'xml';
        data: {
            data: string;
        };
    };
    location: {
        type: 'location';
        data: {
            lat: string | number;
            lon: string | number;
            title?: string;
            content?: string;
        };
    };
    miniapp: {
        type: 'miniapp';
        data: {
            data: string;
        };
    };
    onlinefile: {
        type: 'onlinefile';
        data: {
            msgId: string;
            elementId: string;
            fileName: string;
            fileSize: string;
            isDir: boolean;
        };
    };
    flashtransfer: {
        type: 'flashtransfer';
        data: {
            fileSetId: string;
        };
    };
}
interface BaseSegment<T extends string, D> {
    type: T;
    data: D;
}
export interface TextSegment extends BaseSegment<'text', {
    text: string;
}> {
}
export interface AtSegment extends BaseSegment<'at', {
    qq: string | 'all';
}> {
}
export interface ReplySegment extends BaseSegment<'reply', {
    id?: string;
    seq?: number;
}> {
}
export interface FaceSegment extends BaseSegment<'face', {
    id: string;
}> {
}
export interface MFaceSegment extends BaseSegment<'mface', {
    emoji_id: string;
    emoji_package_id: string;
    key: string;
    summary?: string;
}> {
}
export interface ImageSegment extends BaseSegment<'image', {
    file: string;
    summary?: string;
    sub_type?: string;
}> {
}
export interface FileSegment extends BaseSegment<'file', {
    file: string;
    name?: string;
}> {
}
export interface VideoSegment extends BaseSegment<'video', {
    file: string;
    name?: string;
    thumb?: string;
}> {
}
export interface RecordSegment extends BaseSegment<'record', {
    file: string;
    name?: string;
    thumb?: string;
}> {
}
export interface JsonSegment extends BaseSegment<'json', {
    data: string;
}> {
}
export interface DiceSegment extends BaseSegment<'dice', any> {
}
export interface RPSSegment extends BaseSegment<'rps', any> {
}
export interface MarkdownSegment extends BaseSegment<'markdown', {
    content: string;
}> {
}
export interface XmlSegment extends BaseSegment<'xml', {
    data: string;
}> {
}
export interface LocationSegment extends BaseSegment<'location', {
    lat: string | number;
    lon: string | number;
    title?: string;
    content?: string;
}> {
}
export interface MiniAppSegment extends BaseSegment<'miniapp', {
    data: string;
}> {
}
export interface CloudMusicSegment extends BaseSegment<'music', {
    type: 'qq' | '163' | 'kugou' | 'kuwo' | 'migu';
    id: string;
}> {
}
export interface MusicSegmentCustom extends BaseSegment<'music', {
    type: 'qq' | '163' | 'kugou' | 'kuwo' | 'migu' | 'custom';
    url: string;
    image: string;
    audio?: string;
    title?: string;
    singer?: string;
}> {
}
export type MusicSegment = CloudMusicSegment | MusicSegmentCustom;
export interface NodeSegment extends BaseSegment<'node', ({
    content: SendMessageSegment[];
} | {
    id: string;
}) & {
    user_id?: string;
    nickname?: string;
    source?: string;
    news?: {
        text: string;
    }[];
    summary?: string;
    prompt?: string;
    time?: string;
}> {
}
export interface ForwardSegment extends BaseSegment<'forward', {
    id: string;
}> {
}
export interface ContactSegment extends BaseSegment<'contact', {
    type: 'qq' | 'group';
    id: string;
}> {
}
export type SendMessageSegment = TextSegment | AtSegment | ReplySegment | FaceSegment | MFaceSegment | ImageSegment | FileSegment | VideoSegment | RecordSegment | JsonSegment | DiceSegment | RPSSegment | MarkdownSegment | XmlSegment | LocationSegment | MiniAppSegment | MusicSegment | NodeSegment | ForwardSegment | ContactSegment;
export declare const Structs: {
    /**
     * 发送文字消息
     * @param text 要发送的文字
     * @returns { type: 'text', data: { text } }
     */
    text: (text: string) => TextSegment;
    /**
     * @某人
     * @param qq at的QQ号
     * @returns { type: 'at', data: { qq } }
     */
    at: (qq: string | "all" | number) => AtSegment;
    /**
     * 回复消息
     * @param id 回复的消息id
     * @returns { type: 'reply', data: { id } }
     */
    reply: (id: string | number) => ReplySegment;
    /**
     * 发送QQ表情
     * @param id QQ 表情 ID
     * @returns { type: 'face', data: { id, resultId, chainCount } }
     */
    face: (id: string | number) => FaceSegment;
    /**
     * 发送QQ表情包
     * @param emoji_id 表情id
     * @param emoji_package_id 表情包id
     * @param key 未知(必要)
     * @param summary 表情简介,可选
     * @returns { type: 'mface', data: { summary, emoji_id, emoji_package_id, key } }
     */
    mface: (emoji_id: string | number, emoji_package_id: string | number, key: string, summary?: string) => MFaceSegment;
    /**
     * 发送图片
     * @param file 网络图片地址, 文件路径或者Buffer
     * @param name 图片名
     * @param summary 图片简介
     * @param sub_type 图片类型
     * @returns { type: 'image', data: { file, summary, sub_type } }
     */
    image: (file: string | Buffer, summary?: string, sub_type?: string | number) => ImageSegment;
    /**
     * 发文件
     * @param file 网络文件地址, 文件路径或者Buffer
     * @param name 文件名
     * @returns { type: 'file', data: { file, name } }
     */
    file: (file: string | Buffer, name?: string) => FileSegment;
    /**
     * 发视频
     * @param file 网络视频地址, 文件路径或者Buffer
     * @param name 视频名
     * @param thumb 预览图
     * @returns { type: 'video', data: { file, name, thumb } }
     */
    video: (file: string | Buffer, name?: string, thumb?: string) => VideoSegment;
    /**
     * 发语音
     * @param file 网络语音地址, 文件路径或者Buffer
     * @param name 语音备注
     * @returns { type: 'record', data: { file, name } }
     */
    record: (file: string | Buffer, name?: string, thumb?: string) => RecordSegment;
    /**
     * 发送json消息
     * @param data json信息(序列化后)
     * @returns { type: 'json', data: { data } }
     */
    json: (data: string) => JsonSegment;
    /**
     * 发送骰子魔法表情
     * @returns { type: 'dice', data: {} }
     */
    dice: () => DiceSegment;
    /**
     * 发送猜拳魔法
     * @returns { type: 'rps', data: {} }
     */
    rps: () => RPSSegment;
    /**
     * 发送markdown
     * @param data markdown内容
     * @returns { type: 'markdown', data: {} }
     */
    markdown: (content: string) => MarkdownSegment;
    /**
     * 发送XML消息
     * @param data XML数据
     * @returns { type: 'xml', data: { data } }
     */
    xml: (data: string) => XmlSegment;
    /**
     * 发送位置消息
     * @param lat 纬度
     * @param lon 经度
     * @param title 标题
     * @param content 内容
     * @returns { type: 'location', data: { lat, lon, title, content } }
     */
    location: (lat: string | number, lon: string | number, title?: string, content?: string) => LocationSegment;
    /**
     * 发送小程序消息
     * @param data 小程序数据
     * @returns { type: 'miniapp', data: { data } }
     */
    miniapp: (data: string) => MiniAppSegment;
    /**
     * 音乐分享
     * @param type QQ音乐或网易云音乐QQ音乐
     * @param id 音乐id
     * @returns { type: 'music', data: { type, id } }
     */
    music: (type: "qq" | "163" | "kugou" | "migu" | "kuwo", id: string | number) => CloudMusicSegment;
    /**
     * 分享非qq、网易云音乐 需要配置签名服务器
     * @param url 点击后跳转目标 URL
     * @param audio 音乐 URL
     * @param title 标题
     * @param image 发送时可选，内容描述
     * @param singer 发送时可选，图片 URL
     * @returns { type: 'music', data: { type: 'custom', url, audio, title, image, singer } }
     */
    customMusic: (type: "qq" | "163" | "kugou" | "migu" | "kuwo" | "custom", url: string, image: string, audio?: string, title?: string, singer?: string) => MusicSegmentCustom;
    /**
     * 转发消息节点
     * @param id 消息id
     * @param user_id 消息id
     * @param nickname 消息id
     * @param source 消息id
     * @param id 消息id
     * @param id 消息id
     * @returns { type: 'node', data: { id } }
     */
    node: (id: string | number, user_id?: number | string, nickname?: string, source?: string, news?: {
        text: string;
    }[], summary?: string, prompt?: string, time?: string | number) => NodeSegment;
    /**
     * 自定义转发消息节点
     * @param content 消息内容
     * @returns { type: 'node', data: { content } }
     */
    customNode: (content: SendMessageSegment[], user_id?: number | string, nickname?: string, source?: string, news?: {
        text: string;
    }[], summary?: string, prompt?: string, time?: string | number) => NodeSegment;
    /**
     * 转发消息
     * @param message_id 消息id
     * @return { type: 'forward', data: { id }}
     */
    forward: (message_id: number) => ForwardSegment;
    /**
     * 发送名片
     * @param type 名片类型
     * @param id 联系人QQ号
     * @returns { type: 'contact', data: { id } }
     */
    contact: (type: "qq" | "group", id: number | string) => ContactSegment;
};
export {};
