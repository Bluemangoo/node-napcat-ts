import { NodeSegment, Receive, SendMessageSegment } from './Structs.js';
export interface NCWebsocketOptionsBaseUrl {
    baseUrl: string;
    accessToken?: string;
    reconnection?: {
        enable?: boolean;
        attempts?: number;
        delay?: number;
    };
    apiTimeout?: number;
}
export interface NCWebsocketOptionsHost {
    protocol: 'ws' | 'wss';
    host: string;
    port: number;
    accessToken?: string;
    reconnection?: {
        enable?: boolean;
        attempts?: number;
        delay?: number;
    };
    apiTimeout?: number;
}
export type NCWebsocketOptions = NCWebsocketOptionsBaseUrl | NCWebsocketOptionsHost;
export interface WSReconnection {
    enable: boolean;
    attempts: number;
    delay: number;
    nowAttempts: number;
}
export interface WSConnecting {
    reconnection: WSReconnection;
}
export interface WSOpenRes {
    reconnection: WSReconnection;
}
export interface WSCloseRes {
    code: number;
    reason: string;
    reconnection: WSReconnection;
}
export type WSErrorRes = {
    reconnection: WSReconnection;
} & ({
    error_type: 'response_error';
    info: {
        errno: number;
        message: string;
        url: string;
    };
} | {
    error_type: 'connect_error';
    errors: ({
        errno: number;
        code: string;
        syscall: string;
        address: string;
        port: number;
    } | null)[];
});
export interface SocketHandler {
    'socket.connecting': WSConnecting;
    'socket.open': WSOpenRes;
    'socket.close': WSCloseRes;
    'socket.error': WSErrorRes;
    socket: SocketHandler['socket.connecting'] | SocketHandler['socket.open'] | SocketHandler['socket.close'] | SocketHandler['socket.error'];
}
export interface APIRequest<T extends keyof WSSendParam> {
    action: T;
    params: WSSendParam[T];
    echo: string;
}
export interface APISuccessResponse<T extends keyof WSSendReturn> {
    status: 'ok';
    retcode: 0;
    data: WSSendReturn[T];
    message: string;
    wording: string;
    echo: string;
}
export interface APIErrorResponse {
    status: 'failed';
    retcode: 0;
    data: null;
    message: string;
    wording: string;
    echo: string;
}
export interface ResponseHandler {
    onSuccess: (response: APISuccessResponse<keyof WSSendReturn>) => void;
    onFailure: (reason: APIErrorResponse) => void;
    message: APIRequest<keyof WSSendParam>;
    timeoutTimer?: ReturnType<typeof setTimeout>;
}
export interface ApiHandler {
    'api.preSend': APIRequest<keyof WSSendParam>;
    'api.response': ApiHandler['api.response.success'] | ApiHandler['api.response.failure'];
    'api.response.success': APISuccessResponse<keyof WSSendReturn>;
    'api.response.failure': APIErrorResponse;
    api: ApiHandler['api.preSend'] | ApiHandler['api.response'];
}
export interface HeartBeat {
    time: number;
    self_id: number;
    post_type: 'meta_event';
    meta_event_type: 'heartbeat';
    status: {
        online: boolean | undefined;
        good: boolean;
    };
    interval: number;
}
export interface LifeCycleEnable {
    time: number;
    self_id: number;
    post_type: 'meta_event';
    meta_event_type: 'lifecycle';
    sub_type: 'enable';
}
export interface LifeCycleDisable {
    time: number;
    self_id: number;
    post_type: 'meta_event';
    meta_event_type: 'lifecycle';
    sub_type: 'disable';
}
export interface LifeCycleConnect {
    time: number;
    self_id: number;
    post_type: 'meta_event';
    meta_event_type: 'lifecycle';
    sub_type: 'connect';
}
export interface MetaEventHandler {
    'meta_event.lifecycle': MetaEventHandler['meta_event.lifecycle.enable'] | MetaEventHandler['meta_event.lifecycle.disable'] | MetaEventHandler['meta_event.lifecycle.connect'];
    'meta_event.lifecycle.enable': LifeCycleEnable;
    'meta_event.lifecycle.disable': LifeCycleDisable;
    'meta_event.lifecycle.connect': LifeCycleConnect;
    'meta_event.heartbeat': HeartBeat;
    meta_event: MetaEventHandler['meta_event.lifecycle'] | MetaEventHandler['meta_event.heartbeat'];
}
export type MessageType = {
    message_format: 'array';
    message: Receive[keyof Receive][];
};
export type PrivateFriendMessage = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'private';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
    };
    raw_message: string;
    font: number;
    sub_type: 'friend';
    post_type: 'message';
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
    quick_action: (reply: SendMessageSegment[]) => Promise<null>;
} & MessageType;
export type PrivateGroupMessage = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'private';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
    };
    raw_message: string;
    font: number;
    sub_type: 'group';
    post_type: 'message';
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
    quick_action: (reply: SendMessageSegment[], at_sender?: boolean) => Promise<null>;
} & MessageType;
export type GroupMessage = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'group';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
        role?: 'owner' | 'admin' | 'member';
    };
    raw_message: string;
    font: number;
    sub_type: 'normal';
    post_type: 'message';
    group_id: number;
    group_name?: string;
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
    quick_action: (reply: SendMessageSegment[], at_sender?: boolean) => Promise<null>;
} & MessageType;
export interface MessageHandler {
    'message.private': MessageHandler['message.private.friend'] | MessageHandler['message.private.group'];
    'message.private.friend': PrivateFriendMessage;
    'message.private.group': PrivateGroupMessage;
    'message.group': MessageHandler['message.group.normal'];
    'message.group.normal': GroupMessage;
    message: MessageHandler['message.private'] | MessageHandler['message.group'];
}
export type PrivateFriendMessageSelf = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'private';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
    };
    raw_message: string;
    font: number;
    sub_type: 'friend';
    post_type: 'message_sent';
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
} & MessageType;
export type PrivateGroupMessageSelf = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'private';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
    };
    raw_message: string;
    font: number;
    sub_type: 'group';
    post_type: 'message_sent';
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
} & MessageType;
export type GroupMessageSelf = {
    self_id: number;
    user_id: number;
    time: number;
    message_id: number;
    message_seq: number;
    real_id: number;
    real_seq?: string;
    message_type: 'group';
    sender: {
        user_id: number;
        nickname: string;
        card: string;
        role?: 'owner' | 'admin' | 'member';
    };
    raw_message: string;
    font: number;
    sub_type: 'normal';
    post_type: 'message_sent';
    group_id: number;
    group_name?: string;
    temp_source?: number;
    message_sent_type?: string;
    target_id?: number;
} & MessageType;
export interface MessageSentHandler {
    'message_sent.private': MessageSentHandler['message_sent.private.friend'] | MessageSentHandler['message_sent.private.group'];
    'message_sent.private.friend': PrivateFriendMessageSelf;
    'message_sent.private.group': PrivateGroupMessageSelf;
    'message_sent.group': MessageSentHandler['message_sent.group.normal'];
    'message_sent.group.normal': GroupMessageSelf;
    message_sent: MessageSentHandler['message_sent.private'] | MessageSentHandler['message_sent.group'];
}
export interface RequestFriend {
    time: number;
    self_id: number;
    post_type: 'request';
    request_type: 'friend';
    user_id: number;
    comment: string;
    flag: string;
    quick_action: (approve?: boolean) => Promise<null>;
}
export interface RequestGroupAdd {
    time: number;
    self_id: number;
    post_type: 'request';
    group_id: number;
    user_id: number;
    request_type: 'group';
    comment: string;
    flag: string;
    sub_type: 'add';
    quick_action: (approve?: boolean, reason?: string) => Promise<null>;
}
export interface RequestGroupInvite {
    time: number;
    self_id: number;
    post_type: 'request';
    group_id: number;
    user_id: number;
    request_type: 'group';
    comment: string;
    flag: string;
    sub_type: 'invite';
    quick_action: (approve?: boolean, reason?: string) => Promise<null>;
}
export interface RequestHandler {
    'request.friend': RequestFriend;
    'request.group': RequestHandler['request.group.invite'] | RequestHandler['request.group.add'];
    'request.group.invite': RequestGroupInvite;
    'request.group.add': RequestGroupAdd;
    request: RequestHandler['request.friend'] | RequestHandler['request.group'];
}
export interface BotOffline {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'bot_offline';
    user_id: number;
    tag: string;
    message: string;
}
export interface FriendAdd {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'friend_add';
    user_id: number;
}
export interface FriendRecall {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'friend_recall';
    user_id: number;
    message_id: number;
}
export interface GroupAdminSet {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_admin';
    sub_type: 'set';
}
export interface GroupAdminUnset {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_admin';
    sub_type: 'unset';
}
export interface GroupBanBan {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_ban';
    operator_id: number;
    duration: number;
    sub_type: 'ban';
}
export interface GroupBanLiftBan {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_ban';
    operator_id: number;
    duration: number;
    sub_type: 'lift_ban';
}
export interface GroupCard {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_card';
    card_new: string;
    card_old: string;
}
export interface GroupDecreaseLeave {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_decrease';
    sub_type: 'leave';
    operator_id: number;
}
export interface GroupDecreaseKick {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_decrease';
    sub_type: 'kick';
    operator_id: number;
}
export interface GroupDecreaseKickMe {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_decrease';
    sub_type: 'kick_me';
    operator_id: number;
}
export interface GroupDecreaseDisband {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_decrease';
    sub_type: 'disband';
    operator_id: number;
}
export interface GroupEssenceAdd {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'essence';
    message_id: number;
    sender_id: number;
    operator_id: number;
    sub_type: 'add';
}
export interface GroupEssenceDelete {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'essence';
    message_id: number;
    sender_id: number;
    operator_id: number;
    sub_type: 'delete';
}
export interface GroupIncreaseApprove {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'group_increase';
    sub_type: 'approve';
    group_id: number;
    operator_id: number;
    user_id: number;
}
export interface GroupIncreaseInvite {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'group_increase';
    sub_type: 'invite';
    group_id: number;
    operator_id: number;
    user_id: number;
}
export interface NotifyGroupName {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'notify';
    sub_type: 'group_name';
    name_new: string;
}
export interface GroupRecall {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_recall';
    operator_id: number;
    message_id: number;
}
export interface NotifyTitle {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'notify';
    sub_type: 'title';
    title: string;
}
export interface GroupUpload {
    time: number;
    self_id: number;
    post_type: 'notice';
    group_id: number;
    user_id: number;
    notice_type: 'group_upload';
    file: {
        id: string;
        name: string;
        size: number;
        busid: number;
        url?: string;
    };
}
export interface NotifyInputStatusGroup {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'input_status';
    status_text: string;
    event_type: number;
    user_id: number;
    group_id: number;
}
export interface NotifyInputStatusFriend {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'input_status';
    status_text: string;
    event_type: number;
    user_id: number;
    group_id: 0;
}
export interface GroupMsgEmojiLike {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'group_msg_emoji_like';
    group_id: number;
    user_id: number;
    message_id: number;
    likes: {
        emoji_id: string;
        count: number;
    }[];
    is_add: boolean;
    message_seq?: string;
}
export interface NotifyPokeFriend {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'poke';
    target_id: number;
    user_id: number;
    sender_id: number;
    raw_info: [
        {
            col: string;
            nm: string;
            type: 'qq';
            uid: string;
        },
        {
            col: string;
            nm: string;
            tp: string;
            type: 'qq';
            uid: string;
        }
    ];
}
export interface NotifyPokeGroup {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'poke';
    target_id: number;
    user_id: number;
    group_id: number;
    raw_info: [
        {
            col: string;
            nm: string;
            type: 'qq';
            uid: string;
        },
        {
            jp: string;
            src: string;
            type: 'img';
        },
        {
            txt: string;
            type: 'nor';
        },
        {
            col: string;
            nm: string;
            tp: string;
            type: 'qq';
            uid: string;
        },
        {
            txt: string;
            type: 'nor';
        }
    ];
}
export interface NotifyProfileLike {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'profile_like';
    operator_id: number;
    operator_nick: string;
    times: number;
}
export interface NotifyGrayTip {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'gray_tip';
    group_id: number;
    user_id: number;
    message_id: number;
    busi_id: string;
    content: string;
}
export interface OnlineFileReceive {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'online_file_receive';
    sub_type: 'cancel';
    peer_id: number;
}
export interface OnlineFileSend {
    time: number;
    self_id: number;
    post_type: 'notice';
    notice_type: 'online_file_send';
    sub_type: 'receive' | 'refuse';
    peer_id: number;
}
export interface NoticeHandler {
    'notice.bot_offline': BotOffline;
    'notice.friend_add': FriendAdd;
    'notice.friend_recall': FriendRecall;
    'notice.group_admin': NoticeHandler['notice.group_admin.set'] | NoticeHandler['notice.group_admin.unset'];
    'notice.group_admin.set': GroupAdminSet;
    'notice.group_admin.unset': GroupAdminUnset;
    'notice.group_ban': NoticeHandler['notice.group_ban.ban'] | NoticeHandler['notice.group_ban.lift_ban'];
    'notice.group_ban.ban': GroupBanBan;
    'notice.group_ban.lift_ban': GroupBanLiftBan;
    'notice.group_card': GroupCard;
    'notice.group_decrease': NoticeHandler['notice.group_decrease.leave'] | NoticeHandler['notice.group_decrease.kick'] | NoticeHandler['notice.group_decrease.kick_me'] | NoticeHandler['notice.group_decrease.disband'];
    'notice.group_decrease.leave': GroupDecreaseLeave;
    'notice.group_decrease.kick': GroupDecreaseKick;
    'notice.group_decrease.kick_me': GroupDecreaseKickMe;
    'notice.group_decrease.disband': GroupDecreaseDisband;
    'notice.essence': NoticeHandler['notice.essence.add'] | NoticeHandler['notice.essence.delete'];
    'notice.essence.add': GroupEssenceAdd;
    'notice.essence.delete': GroupEssenceDelete;
    'notice.group_increase': NoticeHandler['notice.group_increase.approve'] | NoticeHandler['notice.group_increase.invite'];
    'notice.group_increase.approve': GroupIncreaseApprove;
    'notice.group_increase.invite': GroupIncreaseInvite;
    'notice.notify': NoticeHandler['notice.notify.group_name'] | NoticeHandler['notice.notify.title'] | NoticeHandler['notice.notify.input_status.group'] | NoticeHandler['notice.notify.input_status.friend'] | NoticeHandler['notice.notify.poke.friend'] | NoticeHandler['notice.notify.poke.group'] | NoticeHandler['notice.notify.profile_like'] | NoticeHandler['notice.notify.gray_tip'];
    'notice.notify.group_name': NotifyGroupName;
    'notice.notify.title': NotifyTitle;
    'notice.notify.input_status': NoticeHandler['notice.notify.input_status.group'] | NoticeHandler['notice.notify.input_status.friend'];
    'notice.notify.input_status.group': NotifyInputStatusGroup;
    'notice.notify.input_status.friend': NotifyInputStatusFriend;
    'notice.notify.poke': NoticeHandler['notice.notify.poke.friend'] | NoticeHandler['notice.notify.poke.group'];
    'notice.notify.poke.friend': NotifyPokeFriend;
    'notice.notify.poke.group': NotifyPokeGroup;
    'notice.notify.profile_like': NotifyProfileLike;
    'notice.notify.gray_tip': NotifyGrayTip;
    'notice.group_recall': GroupRecall;
    'notice.group_upload': GroupUpload;
    'notice.group_msg_emoji_like': GroupMsgEmojiLike;
    'notice.online_file_receive': OnlineFileReceive;
    'notice.online_file_send': OnlineFileSend;
    notice: NoticeHandler['notice.bot_offline'] | NoticeHandler['notice.friend_add'] | NoticeHandler['notice.friend_recall'] | NoticeHandler['notice.group_admin'] | NoticeHandler['notice.group_ban'] | NoticeHandler['notice.group_card'] | NoticeHandler['notice.group_decrease'] | NoticeHandler['notice.essence'] | NoticeHandler['notice.group_increase'] | NoticeHandler['notice.notify'] | NoticeHandler['notice.group_recall'] | NoticeHandler['notice.group_upload'] | NoticeHandler['notice.group_msg_emoji_like'] | NoticeHandler['notice.online_file_receive'] | NoticeHandler['notice.online_file_send'];
}
export type AllHandlers = SocketHandler & ApiHandler & MessageHandler & MessageSentHandler & MetaEventHandler & RequestHandler & NoticeHandler;
export type WSReceiveHandler = MessageHandler & MessageSentHandler & MetaEventHandler & RequestHandler & NoticeHandler;
export type EventKey = keyof AllHandlers;
export type HandlerResMap = {
    [K in EventKey]: AllHandlers[K];
};
export type EventHandleMap = {
    [K in EventKey]: (context: HandlerResMap[K]) => void;
};
export type WSSendParam = {
    send_private_msg: {
        user_id: number | string;
        message: SendMessageSegment[];
        auto_escape?: boolean | string;
        timeout?: number;
    };
    send_group_msg: {
        group_id: number | string;
        message: SendMessageSegment[];
        auto_escape?: boolean | string;
        timeout?: number;
    };
    send_msg: ({
        user_id: number | string;
    } | {
        group_id: number | string;
    }) & {
        message: SendMessageSegment[];
        auto_escape?: boolean | string;
        timeout?: number;
        source?: string;
        news?: {
            text: string;
        }[];
        summary?: string;
        prompt?: string;
    };
    delete_msg: {
        message_id: number | string;
    };
    get_msg: {
        message_id: number | string;
    };
    get_forward_msg: {
        message_id?: string;
        id?: string;
    };
    send_like: {
        user_id: number | string;
        times?: number | string;
    };
    set_group_kick: {
        group_id: number | string;
        user_id: number | string;
        reject_add_request?: boolean | string;
    };
    set_group_ban: {
        group_id: number | string;
        user_id: number | string;
        duration?: number | string;
    };
    set_group_whole_ban: {
        group_id: number | string;
        enable?: boolean | string;
    };
    set_group_admin: {
        group_id: number | string;
        user_id: number | string;
        enable?: boolean | string;
    };
    set_group_card: {
        group_id: number | string;
        user_id: number | string;
        card?: string;
    };
    set_group_name: {
        group_id: number | string;
        group_name: string;
    };
    set_group_leave: {
        group_id: number | string;
        is_dismiss?: boolean | string;
    };
    set_group_special_title: {
        group_id: number | string;
        user_id: number | string;
        special_title?: string;
    };
    set_friend_add_request: {
        flag: string;
        approve?: boolean | string;
        remark?: string;
    };
    set_friend_remark: {
        user_id: number | string;
        remark: string;
    };
    set_group_add_request: {
        flag: string;
        approve?: boolean | string;
        reason?: string | null;
        count?: number;
    };
    get_login_info: {};
    get_stranger_info: {
        user_id: number | string;
        no_cache?: boolean | string;
    };
    get_friend_list: {
        no_cache?: boolean | string;
    };
    get_group_info: {
        group_id: number | string;
        no_cache?: boolean | string;
    };
    get_group_list: {
        no_cache?: boolean | string;
    };
    get_group_member_info: {
        group_id: number | string;
        user_id: number | string;
        no_cache?: boolean | string;
    };
    get_group_member_list: {
        group_id: number | string;
        no_cache?: boolean | string;
    };
    get_group_honor_info: {
        group_id: number | string;
        type?: 'all' | 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion';
    };
    get_cookies: {
        domain: string;
    };
    get_csrf_token: {};
    get_credentials: {
        domain?: string;
    };
    get_record: {
        file?: string;
        file_id?: string;
        out_format?: 'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac';
    };
    get_image: {
        file?: string;
        file_id?: string;
    };
    can_send_image: {};
    can_send_record: {};
    get_status: {};
    get_version_info: {};
    set_restart: {
        delay?: number;
    };
    clean_cache: {};
    bot_exit: {};
    set_qq_profile: {
        nickname: string;
        personal_note?: string;
        sex?: number | string;
    };
    _get_model_show: {
        model?: string;
    };
    get_unidirectional_friend_list: {};
    delete_friend: {
        user_id?: number | string;
        friend_id?: number | string;
        temp_block?: boolean;
        temp_both_del?: boolean;
    };
    mark_msg_as_read: {
        user_id?: number | string;
    } | {
        group_id?: number | string;
    } | {
        message_id?: number | string;
    };
    send_group_forward_msg: {
        group_id: number | string;
        message: NodeSegment[];
        messages?: SendMessageSegment[];
    };
    send_private_forward_msg: {
        user_id: number | string;
        message: NodeSegment[];
        messages?: SendMessageSegment[];
    };
    get_group_msg_history: {
        group_id: number | string;
        message_seq?: string | number;
        count?: number | string;
        reverseOrder?: boolean;
        reverse_order?: boolean;
        disable_get_url?: boolean;
        parse_mult_msg?: boolean;
        quick_reply?: boolean;
    };
    ocr_image: {
        image: string;
    };
    get_group_system_msg: {
        count?: number | string;
    };
    get_essence_msg_list: {
        group_id: number | string;
    };
    get_group_at_all_remain: {
        group_id: number | string;
    };
    set_group_portrait: {
        file: string;
        group_id: number | string;
    };
    set_essence_msg: {
        message_id: number | string;
    };
    delete_essence_msg: {
        message_id?: number | string;
        msg_seq?: string;
        msg_random?: string;
        group_id?: string;
    };
    _send_group_notice: {
        group_id: number | string;
        content: string;
        image?: string;
        pinned?: number | string;
        type?: number | string;
        confirm_required?: number | string;
        is_show_edit_card?: number | string;
        tip_window_type?: number | string;
    };
    _get_group_notice: {
        group_id: number | string;
    };
    upload_group_file: {
        group_id: number | string;
        file: string;
        name: string;
        folder?: string;
        folder_id?: string;
        upload_file?: boolean;
    };
    delete_group_file: {
        group_id: number | string;
        file_id: string;
    };
    create_group_file_folder: {
        group_id: number | string;
        folder_name?: string;
        name?: string;
    };
    delete_group_folder: {
        group_id: number | string;
        folder_id?: string;
        folder?: string;
    };
    get_group_file_system_info: {
        group_id: number | string;
    };
    get_group_root_files: {
        group_id: number | string;
        file_count?: number | string;
    };
    get_group_files_by_folder: {
        group_id: number | string;
        file_count?: number | string;
        folder_id?: string;
        folder?: string;
    };
    get_group_file_url: {
        group_id: number | string;
        file_id: string;
    };
    upload_private_file: {
        user_id: number | string;
        file: string;
        name: string;
        upload_file?: boolean;
    };
    download_file: ({
        base64: string;
    } | {
        url: string;
        headers?: string | string[];
    }) & {
        name?: string;
    };
    '.handle_quick_operation': {
        context: MessageHandler['message.private'];
        operation: {
            reply?: SendMessageSegment[];
            auto_escape?: boolean;
        };
    } | {
        context: MessageHandler['message.group'];
        operation: {
            reply?: SendMessageSegment[];
            auto_escape?: boolean;
            at_sender?: boolean;
            delete?: boolean;
            kick?: boolean;
            ban?: boolean;
            ban_duration?: number;
        };
    } | {
        context: RequestHandler['request.friend'];
        operation: {
            approve?: boolean;
            remark?: string;
        };
    } | {
        context: RequestHandler['request.group'];
        operation: {
            approve?: boolean;
            reason?: string;
        };
    };
    set_diy_online_status: {
        face_id: number | string;
        face_type?: number | string;
        wording?: string;
    };
    ArkSharePeer: {
        group_id: string;
    } | {
        user_id: string;
        phoneNumber?: string;
    };
    ArkShareGroup: {
        group_id: string;
    };
    get_robot_uin_range: {};
    set_online_status: {
        status: number | string;
        ext_status: number | string;
        battery_status: number | string;
    };
    get_friends_with_category: {};
    set_qq_avatar: {
        file: string;
    };
    get_file: {
        file?: string;
        file_id?: string;
    };
    forward_friend_single_msg: {
        message_id: number | string;
        user_id?: string;
    };
    forward_group_single_msg: {
        message_id: number | string;
        group_id?: string;
    };
    translate_en2zh: {
        words: string[];
    };
    set_msg_emoji_like: {
        message_id: number | string;
        emoji_id: number | string;
        set?: boolean | string;
    };
    send_forward_msg: ({
        user_id: number | string;
    } | {
        group_id: number | string;
    }) & {
        message: NodeSegment[];
        messages?: SendMessageSegment[];
    };
    mark_private_msg_as_read: {
        user_id: number | string;
    };
    mark_group_msg_as_read: {
        group_id: number | string;
    };
    get_friend_msg_history: {
        user_id: number | string;
        message_seq?: string | number;
        count?: number | string;
        reverseOrder?: boolean;
        reverse_order?: boolean;
        disable_get_url?: boolean;
        parse_mult_msg?: boolean;
        quick_reply?: boolean;
    };
    create_collection: {
        rawData: string;
        brief: string;
    };
    get_collection_list: {
        category: number | string;
        count?: number | string;
    };
    set_self_longnick: {
        longNick: string;
    };
    get_recent_contact: {
        count?: number | string;
    };
    _mark_all_as_read: {};
    get_profile_like: {
        user_id?: string;
        start?: number | string;
        count?: number | string;
    };
    fetch_custom_face: {
        count?: number | string;
    };
    fetch_emoji_like: {
        message_id: number | string;
        emojiId: number | string;
        emojiType: number | string;
        count?: number | string;
        cookie?: string;
    };
    set_input_status: {
        user_id: string;
        event_type: number;
    };
    get_group_info_ex: {
        group_id: number | string;
    };
    get_group_detail_info: {
        group_id: number | string;
    };
    get_group_ignore_add_request: {
        group_id: number | string;
    };
    _del_group_notice: {
        group_id: number | string;
        notice_id: string;
    };
    friend_poke: {
        user_id: number | string;
    };
    group_poke: {
        group_id: number | string;
        user_id: number | string;
    };
    nc_get_packet_status: {};
    nc_get_user_status: {
        user_id: number | string;
    };
    nc_get_rkey: {};
    get_group_shut_list: {
        group_id: number | string;
    };
    move_group_file: {
        group_id: number | string;
        file_id: string;
        current_parent_directory: string;
        target_parent_directory: string;
    };
    trans_group_file: {
        group_id: number | string;
        file_id: string;
    };
    rename_group_file: {
        group_id: number | string;
        file_id: string;
        current_parent_directory: string;
        new_name: string;
    };
    get_group_ignored_notifies: {};
    set_group_sign: {
        group_id: number | string;
    };
    send_packet: {
        cmd: string;
        data: string;
        rsp?: boolean | string;
    };
    get_mini_app_ark: {
        type: 'bili' | 'weibo';
        title: string;
        desc: string;
        picUrl: string;
        jumpUrl: string;
        webUrl?: string;
        rawArkData?: string;
    } | {
        title: string;
        desc: string;
        picUrl: string;
        jumpUrl: string;
        iconUrl: string;
        webUrl?: string;
        appId: string;
        scene: number;
        templateType: number;
        businessType: number;
        verType: number;
        shareType: number;
        versionId: string;
        sdkId: string;
        withShareTicket: number;
        rawArkData?: string;
    };
    get_ai_record: {
        character: string;
        group_id: number | string;
        text: string;
    };
    get_ai_characters: {
        group_id: number | string;
        char_type?: number | string;
    };
    send_group_ai_record: {
        character: string;
        group_id: number | string;
        text: string;
    };
    get_clientkey: {};
    send_poke: {
        group_id: number | string;
        user_id: number | string;
    } | {
        user_id: number | string;
    };
    set_group_kick_members: {
        group_id: number | string;
        user_id: number[];
        reject_add_request?: boolean | string;
    };
    set_group_robot_add_option: {
        group_id: number | string;
        robot_member_switch?: number;
        robot_member_examine?: number;
    };
    set_group_add_option: {
        group_id: number | string;
        add_type: number;
        group_question?: string;
        group_answer?: string;
    };
    set_group_search: {
        group_id: number | string;
        no_code_finger_open?: number;
        no_finger_open?: number;
    };
    get_doubt_friends_add_request: {
        count?: number;
    };
    set_doubt_friends_add_request: {
        flag: string;
        approve: boolean;
    };
    get_rkey: {};
    get_rkey_server: {};
    set_group_remark: {
        group_id: number | string;
        remark: string;
    };
    get_private_file_url: {
        file_id: string;
    };
    click_inline_keyboard_button: {
        group_id: number | string;
        bot_appid: string;
        button_id?: string;
        callback_data?: string;
        msg_seq?: string;
    };
    set_group_todo: {
        group_id: number | string;
    } & ({
        message_seq: string;
    } | {
        message_id: string;
    });
    get_qun_album_list: {
        group_id: number | string;
        attach_info?: string;
    };
    upload_image_to_qun_album: {
        group_id: number | string;
        album_id: string;
        album_name: string;
        file: string;
    };
    get_group_album_media_list: {
        group_id: number | string;
        album_id: string;
        attach_info?: string;
    };
    do_group_album_comment: {
        group_id: number | string;
        album_id: string;
        lloc: string;
        content: string;
    };
    set_group_album_media_like: {
        group_id: number | string;
        album_id: string;
        lloc: string;
        id: string;
        set?: boolean;
    };
    del_group_album_media: {
        group_id: number | string;
        album_id: string;
        lloc: string;
    };
    clean_stream_temp_file: {};
    upload_file_stream: {
        stream_id: string;
        chunk_data?: string;
        chunk_index?: number;
        total_chunks?: number;
        file?: string;
        file_id?: string;
        name?: string;
        chunk_size?: number;
    };
    download_file_stream: {
        file?: string;
        file_id?: string;
        chunk_size?: number;
    };
    download_file_record_stream: {
        file?: string;
        file_id?: string;
        chunk_size?: number;
        out_format?: string;
    };
    download_file_image_stream: {
        file?: string;
        file_id?: string;
        chunk_size?: number;
    };
    create_flash_task: {
        files: string | string[];
        name?: string;
        thumb_path?: string;
    };
    send_flash_msg: {
        fileset_id: string;
        user_id?: number | string;
        group_id?: number | string;
    };
    get_share_link: {
        fileset_id: string;
    };
    download_fileset: {
        fileset_id: string;
    };
    get_fileset_info: {
        fileset_id: string;
    };
    get_flash_file_list: {
        fileset_id: string;
    };
    get_flash_file_url: {
        fileset_id: string;
        file_name?: string;
        file_index?: number;
    };
    get_fileset_id: {
        share_code: string;
    };
    send_online_file: {
        user_id: number | string;
        file_path: string;
        file_name?: string;
    };
    send_online_folder: {
        user_id: number | string;
        folder_path: string;
        folder_name?: string;
    };
    get_online_file_msg: {
        user_id: string;
    };
    receive_online_file: {
        user_id: number | string;
        msg_id: string;
        element_id: string;
    };
    refuse_online_file: {
        user_id: number | string;
        msg_id: string;
        element_id: string;
    };
    cancel_online_file: {
        user_id: number | string;
        msg_id: string;
    };
    fetch_custom_face_detail: {
        count?: number | string;
    };
    add_custom_face: {
        file: string;
        emoji_id?: string | number;
        package_id?: string | number;
        file_name?: string;
        file_size?: string | number;
        md5?: string;
        is_mark_face?: boolean;
        is_origin?: boolean;
    };
    delete_custom_face: {
        res_id?: string | string[];
        id?: string | string[];
        ids?: string[];
        md5?: string | string[];
    };
    set_custom_face_desc: {
        emoji_id: number | string;
        res_id: string;
        md5: string;
        desc: string;
    };
    get_emoji_likes: {
        group_id?: number | string;
        message_id: number | string;
        emoji_id: string;
        emoji_type?: string;
        count?: number;
    };
    _set_model_show: {};
    get_online_clients: {};
    check_url_safely: {
        url: string;
    };
    '.get_word_slices': {
        content: string;
    };
    '.ocr_image': {
        image: string;
    };
    get_guild_list: {};
    get_guild_service_profile: {
        guild_id: number | string;
    };
    send_group_ark_share: {
        group_id: string;
    };
    send_ark_share: {
        user_id?: string;
        group_id?: string;
        phone_number?: string;
    };
    fetch_ptt_text: {
        message_id: number | string;
    };
    send_group_sign: {
        group_id: string;
    };
    complete_group_todo: {
        group_id: number | string;
    } & ({
        message_seq: string;
    } | {
        message_id: string;
    });
    cancel_group_todo: {
        group_id: number | string;
    } & ({
        message_seq: string;
    } | {
        message_id: string;
    });
    cancel_group_album_media_like: {
        group_id: string;
        album_id: string;
        batch_id: string;
        lloc?: string;
    };
    get_group_signed_list: {
        group_id: number | string;
    };
};
type Buffer<T = number> = {
    [key: string]: T;
};
export type WSSendReturn = {
    send_private_msg: WSSendReturn['send_msg'];
    send_group_msg: WSSendReturn['send_msg'];
    send_msg: {
        message_id: number;
    };
    delete_msg: null;
    get_msg: ({
        message_type: 'private';
        sender: {
            user_id: number;
            nickname: string;
            card: string;
        };
        sub_type: 'friend';
    } | {
        message_type: 'group';
        group_id: number;
        sender: {
            user_id: number;
            nickname: string;
            card: string;
            role: 'owner' | 'admin' | 'member';
        };
        sub_type: 'normal';
    }) & {
        self_id: number;
        user_id: number;
        time: number;
        message_id: number;
        message_seq: number;
        real_id: number;
        real_seq: string;
        raw_message: string;
        font: number;
        post_type: 'message' | 'message_sent';
        emoji_likes_list: {
            emoji_id: string;
            emoji_type: string;
            likes_cnt: string;
        }[];
    } & MessageType;
    get_forward_msg: {
        messages: WSSendReturn['get_msg'][];
    };
    send_like: null;
    set_group_kick: null;
    set_group_ban: null;
    set_group_whole_ban: null;
    set_group_admin: null;
    set_group_card: null;
    set_group_name: null;
    set_group_leave: null;
    set_group_special_title: null;
    set_friend_add_request: null;
    set_friend_remark: null;
    set_group_add_request: null;
    get_login_info: {
        user_id: number;
        nickname: string;
    };
    get_stranger_info: {
        user_id: number;
        uid: string;
        nickname: string;
        age: number;
        qid: string;
        qqLevel: number;
        sex: string;
        long_nick: string;
        reg_time: number;
        is_vip: boolean;
        is_years_vip: boolean;
        vip_level: number;
        remark: string;
        status: number;
        login_days: number;
        uin: string;
        nick?: string;
        constellation?: number;
        shengXiao?: number;
        kBloodType?: number;
        homeTown?: string;
        makeFriendCareer?: number;
        pos?: string;
        college?: string;
        country?: string;
        province?: string;
        city?: string;
        postCode?: string;
        address?: string;
        regTime?: number;
        interest?: string;
        labels?: string[];
        longNick?: string;
        birthday_year?: number;
        birthday_month?: number;
        birthday_day?: number;
        eMail?: string;
        phoneNum?: string;
        categoryId?: number;
        richTime?: number;
        richBuffer?: string;
        topTime?: string;
        isBlock?: boolean;
        isMsgDisturb?: boolean;
        isSpecialCareOpen?: boolean;
        isSpecialCareZone?: boolean;
        ringId?: string;
        isBlocked?: boolean;
        recommendImgFlag?: number;
        disableEmojiShortCuts?: number;
        qidianMasterFlag?: number;
        qidianCrewFlag?: number;
        qidianCrewFlag2?: number;
        isHideQQLevel?: number;
        isHidePrivilegeIcon?: number;
        extStatus?: number;
        batteryStatus?: number;
        termType?: number;
        netType?: number;
        iconType?: number;
        customStatus?: unknown;
        setTime?: string;
        specialFlag?: number;
        abiFlag?: number;
        eNetworkType?: number;
        showName?: string;
        termDesc?: string;
        musicInfo?: unknown;
        extOnlineBusinessInfo?: unknown;
        extBuffer?: unknown;
    };
    get_friend_list: {
        user_id: number;
        nickname: string;
        remark?: string;
        sex?: 'male' | 'female' | 'unknown';
        age?: number;
        level?: number;
        qid?: string;
        login_days?: number;
        category_id?: number;
        categoryName?: string;
        categoryId?: number;
    }[];
    get_group_info: {
        group_id: number;
        group_name: string;
        member_count?: number;
        max_member_count?: number;
        group_all_shut: number;
        group_remark: string;
    };
    get_group_list: WSSendReturn['get_group_info'][];
    get_group_member_info: {
        group_id: number;
        user_id: number;
        nickname: string;
        card?: string;
        sex?: 'male' | 'female' | 'unknown';
        age?: number;
        area?: string;
        level?: string;
        qq_level?: number;
        join_time?: number;
        last_sent_time?: number;
        title_expire_time?: number;
        unfriendly?: boolean;
        card_changeable?: boolean;
        is_robot?: boolean;
        shut_up_timestamp?: number;
        role?: 'owner' | 'admin' | 'member';
        title?: string;
    };
    get_group_member_list: WSSendReturn['get_group_member_info'][];
    get_group_honor_info: {
        group_id: string;
        current_talkative: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        };
        talkative_list: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }[];
        performer_list: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }[];
        legend_list: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }[];
        emotion_list: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }[];
        strong_newbie_list: {
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }[];
    };
    get_cookies: {
        cookies: string;
        bkn: string;
    };
    get_csrf_token: {
        token: number;
    };
    get_credentials: {
        cookies: string;
        token: number;
    };
    get_record: {
        file: string;
        url: string;
        file_size: string;
        file_name: string;
    };
    get_image: WSSendReturn['get_record'];
    can_send_image: {
        yes: true;
    };
    can_send_record: {
        yes: true;
    };
    get_status: {
        online: boolean;
        good: true;
        stat: {};
    };
    get_version_info: {
        app_name: 'NapCat.Onebot';
        protocol_version: 'v11';
        app_version: string;
    };
    set_restart: null;
    clean_cache: null;
    bot_exit: null;
    set_qq_profile: {
        result: 0;
        errMsg: string;
    };
    _get_model_show: {
        variants: {
            model_show: string;
            need_pay: boolean;
        };
    }[];
    get_unidirectional_friend_list: {
        uin: number;
        uid: string;
        nick_name: string;
        age: number;
        source: string;
    }[];
    delete_friend: {
        result: 0;
        errMsg: string;
    };
    mark_msg_as_read: null;
    send_group_forward_msg: WSSendReturn['send_msg'];
    send_private_forward_msg: WSSendReturn['send_msg'];
    get_group_msg_history: {
        messages: WSSendReturn['get_msg'][];
    };
    ocr_image: {
        text: string;
        pt1: {
            x: string;
            y: string;
        };
        pt2: {
            x: string;
            y: string;
        };
        pt3: {
            x: string;
            y: string;
        };
        pt4: {
            x: string;
            y: string;
        };
        charBox: {
            charText: string;
            charBox: {
                pt1: {
                    x: string;
                    y: string;
                };
                pt2: {
                    x: string;
                    y: string;
                };
                pt3: {
                    x: string;
                    y: string;
                };
                pt4: {
                    x: string;
                    y: string;
                };
            };
        }[];
        score: string;
    }[];
    get_group_system_msg: {
        invited_requests: {
            request_id: number;
            invitor_uin: number;
            invitor_nick?: string;
            group_id: number;
            group_name?: string;
            message?: string;
            checked: boolean;
            actor: number;
            requester_nick?: string;
        }[];
        InvitedRequest?: {
            request_id: number;
            invitor_uin: number;
            invitor_nick?: string;
            group_id: number;
            group_name?: string;
            message?: string;
            checked: boolean;
            actor: number;
            requester_nick?: string;
        }[];
        join_requests: {
            request_id: number;
            invitor_uin: number;
            invitor_nick?: string;
            group_id: number;
            group_name?: string;
            message?: string;
            checked: boolean;
            actor: number;
            requester_nick?: string;
        }[];
    };
    get_essence_msg_list: {
        msg_seq: number;
        msg_random: number;
        sender_id: number;
        sender_nick: string;
        operator_id: number;
        operator_nick: string;
        message_id: number;
        operator_time: number;
        content: Receive[keyof Receive][];
    }[];
    get_group_at_all_remain: {
        can_at_all: boolean;
        remain_at_all_count_for_group: number;
        remain_at_all_count_for_uin: number;
    };
    set_group_portrait: {
        result: 0;
        errMsg: string;
    };
    set_essence_msg: {
        errCode: 0;
        errMsg: string;
    };
    delete_essence_msg: {
        errCode: 0;
        errMsg: string;
    };
    _send_group_notice: null;
    _get_group_notice: {
        notice_id: string;
        sender_id: number;
        publish_time: number;
        message: {
            text: string;
            images: {
                id: string;
                height: string;
                width: string;
            }[];
        };
    }[];
    upload_group_file: null;
    delete_group_file: {
        result: 0;
        errMsg: string;
        transGroupFileResult: {
            result: {
                retCode: 0;
                retMsg: string;
                clientWording: string;
            };
            successFileIdList: string[];
            failFileIdList: string[];
        };
    };
    create_group_file_folder: {
        result: {
            retCode: 0;
            retMsg: string;
            clientWording: '';
        };
        groupItem: {
            peerId: string;
            type: number;
            folderInfo: {
                folderId: string;
                parentFolderId: string;
                folderName: string;
                createTime: number;
                modifyTime: number;
                createUin: string;
                creatorName: string;
                totalFileCount: number;
                modifyUin: string;
                modifyName: string;
                usedSpace: string;
            };
            fileInfo: null;
        };
    };
    delete_group_folder: {
        retCode: 0;
        retMsg: string;
        clientWording: '';
    };
    get_group_file_system_info: {
        file_count: number;
        limit_count: 10000;
        used_space: 0;
        total_space: 10737418240;
    };
    get_group_root_files: {
        files: {
            group_id: number;
            file_id: string;
            file_name: string;
            busid: number;
            size: number;
            file_size: number;
            upload_time: number;
            dead_time: number;
            modify_time: number;
            download_times: number;
            uploader: number;
            uploader_name: string;
        }[];
        folders: {
            group_id: number;
            folder_id: string;
            folder: string;
            folder_name: string;
            create_time: number;
            creator: number;
            creator_name: string;
            total_file_count: number;
        }[];
    };
    get_group_files_by_folder: WSSendReturn['get_group_root_files'];
    get_group_file_url: {
        url: string;
    };
    upload_private_file: null;
    download_file: {
        file: string;
    };
    '.handle_quick_operation': null;
    set_diy_online_status: string;
    ArkSharePeer: {
        errCode: 0;
        errMsg: string;
        arkJson: string;
    };
    ArkShareGroup: string;
    get_robot_uin_range: {
        minUin: string;
        maxUin: string;
    }[];
    set_online_status: null;
    get_friends_with_category: {
        categoryId: number;
        categorySortId: number;
        categoryName: string;
        categoryMbCount: number;
        onlineCount: number;
        buddyList: WSSendReturn['get_friend_list'];
    }[];
    set_qq_avatar: null;
    get_file: WSSendReturn['get_record'];
    forward_friend_single_msg: null;
    forward_group_single_msg: null;
    translate_en2zh: string[];
    set_msg_emoji_like: {
        result: 0;
        errMsg: string;
    };
    send_forward_msg: {
        message_id: number;
        res_id: string;
    };
    mark_private_msg_as_read: null;
    mark_group_msg_as_read: null;
    get_friend_msg_history: {
        messages: WSSendReturn['get_msg'][];
    };
    create_collection: {
        result: 0;
        errMsg: string;
    };
    get_collection_list: {
        result: 0;
        errMsg: string;
        collectionSearchList?: {
            collectionItemList: {
                cid: string;
                type: number;
                status: number;
                author: {
                    type: number;
                    numId: string;
                    strId: string;
                    groupId: string;
                    groupName: string;
                    uid: string;
                };
                bid: number;
                category: number;
                createTime: string;
                collectTime: string;
                modifyTime: string;
                sequence: string;
                shareUrl: string;
                customGroupId: number;
                securityBeat: boolean;
                summary: {
                    textSummary: unknown;
                    linkSummary: unknown;
                    gallerySummary: unknown;
                    audioSummary: unknown;
                    videoSummary: unknown;
                    fileSummary: unknown;
                    locationSummary: unknown;
                    richMediaSummary: unknown;
                };
            }[];
            hasMore: boolean;
            bottomTimeStamp: string;
        };
    };
    set_self_longnick: {
        result: 0;
        errMsg: string;
    };
    get_recent_contact: {
        lastestMsg?: WSSendReturn['get_msg'];
        peerUin: string;
        remark: string;
        msgTime: string | number;
        chatType: number;
        msgId: string;
        sendNickName: string;
        sendMemberName: string;
        peerName: string;
    }[];
    _mark_all_as_read: null;
    get_profile_like: {
        uid: string;
        time: number;
        favoriteInfo: {
            total_count: number;
            last_time: number;
            today_count: number;
            userInfos: {
                age: number;
                bAvailableCnt: number;
                bTodayVotedCnt: number;
                count: number;
                customId: number;
                gender: number;
                giftCount: number;
                isFriend: boolean;
                isSvip: boolean;
                isvip: boolean;
                lastCharged: number;
                latestTime: number;
                nick: string;
                src: number;
                uid: string;
                uin: number;
            }[];
        };
        voteInfo: {
            total_count: number;
            new_count: number;
            new_nearby_count: number;
            last_visit_time: number;
            userInfos: {
                age: number;
                bAvailableCnt: number;
                bTodayVotedCnt: number;
                count: number;
                customId: number;
                gender: number;
                giftCount: number;
                isFriend: boolean;
                isSvip: boolean;
                isvip: boolean;
                lastCharged: number;
                latestTime: number;
                nick: string;
                src: number;
                uid: string;
                uin: number;
            }[];
        };
    }[];
    fetch_custom_face: string[];
    fetch_emoji_like: {
        result: 0;
        errMsg: string;
        emojiLikesList: {
            tinyId: string;
            nickName: string;
            headUrl: string;
        }[];
        cookie: string;
        isLastPage: boolean;
        isFirstPage: boolean;
    };
    set_input_status: {
        result: 0;
        errMsg: string;
    };
    get_group_info_ex: {
        groupCode: string;
        resultCode: 0;
        extInfo: {
            groupInfoExtSeq: number;
            reserve: number;
            luckyWordId: string;
            lightCharNum: number;
            luckyWord: string;
            starId: number;
            essentialMsgSwitch: number;
            todoSeq: number;
            blacklistExpireTime: number;
            isLimitGroupRtc: number;
            companyId: number;
            hasGroupCustomPortrait: number;
            bindGuildId: string;
            groupOwnerId: {
                memberUin: string;
                memberUid: string;
                memberQid: string;
            };
            essentialMsgPrivilege: number;
            msgEventSeq: string;
            inviteRobotSwitch: number;
            gangUpId: string;
            qqMusicMedalSwitch: number;
            showPlayTogetherSwitch: number;
            groupFlagPro1: string;
            groupBindGuildIds: {
                guildIds: string[];
            };
            viewedMsgDisappearTime: string;
            groupExtFlameData: {
                switchState: number;
                state: number;
                dayNums: string[];
                version: number;
                updateTime: string;
                isDisplayDayNum: false;
            };
            groupBindGuildSwitch: number;
            groupAioBindGuildId: string;
            groupExcludeGuildIds: {
                guildIds: string[];
            };
            fullGroupExpansionSwitch: number;
            fullGroupExpansionSeq: string;
            inviteRobotMemberSwitch: number;
            inviteRobotMemberExamine: number;
            groupSquareSwitch: number;
        };
    };
    get_group_detail_info: {
        groupCode: string;
        groupUin: string;
        ownerUid: string;
        ownerUin: string;
        groupFlag: number;
        groupFlagExt: number;
        maxMemberNum: number;
        memberNum: number;
        groupOption: number;
        classExt: number;
        groupName: string;
        fingerMemo: string;
        groupQuestion: string;
        certType: number;
        richFingerMemo: string;
        tagRecord: {
            fromUid: string;
            groupCode: string;
            tagId: string;
            setTime: string;
            goodNum: number;
            badNum: number;
            tagLen: number;
            tagValue: string;
        }[];
        shutUpAllTimestamp: number;
        shutUpMeTimestamp: number;
        groupTypeFlag: number;
        privilegeFlag: number;
        groupSecLevel: number;
        groupFlagExt3: number;
        isConfGroup: number;
        isModifyConfGroupFace: number;
        isModifyConfGroupName: number;
        groupFlagExt4: number;
        groupMemo: string;
        cmdUinMsgSeq: number;
        cmdUinJoinTime: number;
        cmdUinUinFlag: number;
        cmdUinMsgMask: number;
        groupSecLevelInfo: number;
        cmdUinPrivilege: number;
        cmdUinFlagEx2: number;
        appealDeadline: number;
        remarkName: string;
        isTop: boolean;
        groupFace: number;
        groupGeoInfo: {
            ownerUid: string;
            SetTime: number;
            CityId: number;
            Longitude: string;
            Latitude: string;
            GeoContent: string;
            poiId: string;
        };
        certificationText: string;
        cmdUinRingtoneId: number;
        longGroupName: string;
        autoAgreeJoinGroupUserNumForConfGroup: number;
        autoAgreeJoinGroupUserNumForNormalGroup: number;
        cmdUinFlagExt3Grocery: number;
        groupCardPrefix: {
            introduction: string;
            rptPrefix: string[];
        };
        groupExt: {
            groupInfoExtSeq: number;
            reserve: number;
            luckyWordId: string;
            lightCharNum: number;
            luckyWord: string;
            starId: number;
            essentialMsgSwitch: number;
            todoSeq: number;
            blacklistExpireTime: number;
            isLimitGroupRtc: number;
            companyId: number;
            hasGroupCustomPortrait: number;
            bindGuildId: string;
            groupOwnerId: {
                memberUin: string;
                memberUid: string;
                memberQid: string;
            };
            essentialMsgPrivilege: number;
            msgEventSeq: string;
            inviteRobotSwitch: number;
            gangUpId: string;
            qqMusicMedalSwitch: number;
            showPlayTogetherSwitch: number;
            groupFlagPro1: string;
            groupBindGuildIds: {
                guildIds: string[];
            };
            viewedMsgDisappearTime: string;
            groupExtFlameData: {
                switchState: number;
                state: number;
                dayNums: string[];
                version: number;
                updateTime: string;
                isDisplayDayNum: false;
            };
            groupBindGuildSwitch: number;
            groupAioBindGuildId: string;
            groupExcludeGuildIds: {
                guildIds: string[];
            };
            fullGroupExpansionSwitch: number;
            fullGroupExpansionSeq: string;
            inviteRobotMemberSwitch: number;
            inviteRobotMemberExamine: number;
            groupSquareSwitch: number;
        };
        msgLimitFrequency: number;
        hlGuildAppid: number;
        hlGuildSubType: number;
        isAllowRecallMsg: number;
        confUin: string;
        confMaxMsgSeq: number;
        confToGroupTime: number;
        groupSchoolInfo: {
            location: string;
            grade: number;
            school: string;
        };
        activeMemberNum: number;
        groupGrade: number;
        groupCreateTime: number;
        subscriptionUin: string;
        subscriptionUid: string;
        noFingerOpenFlag: number;
        noCodeFingerOpenFlag: number;
        isGroupFreeze: number;
        allianceId: string;
        groupExtOnly: {
            tribeId: number;
            moneyForAddGroup: number;
        };
        isAllowConfGroupMemberModifyGroupName: number;
        isAllowConfGroupMemberNick: number;
        isAllowConfGroupMemberAtAll: number;
        groupClassText: string;
        groupFreezeReason: number;
        headPortraitSeq: number;
        groupHeadPortrait: {
            portraitCnt: number;
            portraitInfo: string[];
            defaultId: number;
            verifyingPortraitCnt: number;
            verifyingPortraitInfo: string[];
        };
        cmdUinJoinMsgSeq: number;
        cmdUinJoinRealMsgSeq: number;
        groupAnswer: string;
        groupAdminMaxNum: number;
        inviteNoAuthNumLimit: string;
        hlGuildOrgId: number;
        isAllowHlGuildBinary: number;
        localExitGroupReason: number;
        group_all_shut: number;
        group_remark: string;
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    };
    get_group_ignore_add_request: {
        request_id: number;
        invitor_uin: number;
        invitor_nick: string;
        group_id: number;
        message: string;
        group_name: string;
        checked: boolean;
        actor: number;
        requester_nick: string;
    }[];
    _del_group_notice: {
        result: 0;
        errMsg: string;
    };
    friend_poke: null;
    group_poke: null;
    nc_get_packet_status: undefined;
    nc_get_user_status: {
        status: number;
        ext_status: number;
    };
    nc_get_rkey: {
        rkey: string;
        ttl: string;
        time: number;
        type: number;
    }[];
    get_group_shut_list: {
        uid: string;
        qid: string;
        uin: string;
        nick: string;
        remark: string;
        cardType: number;
        cardName: string;
        role: number;
        avatarPath: string;
        shutUpTime: number;
        isDelete: boolean;
        isSpecialConcerned: boolean;
        isSpecialShield: boolean;
        isRobot: boolean;
        groupHonor: Buffer;
        memberRealLevel: number;
        memberLevel: number;
        globalGroupLevel: number;
        globalGroupPoint: number;
        memberTitleId: number;
        memberSpecialTitle: string;
        specialTitleExpireTime: string;
        userShowFlag: number;
        userShowFlagNew: number;
        richFlag: number;
        mssVipType: number;
        bigClubLevel: number;
        bigClubFlag: number;
        autoRemark: string;
        creditLevel: number;
        joinTime: number;
        lastSpeakTime: number;
        memberFlag: number;
        memberFlagExt: number;
        memberMobileFlag: number;
        memberFlagExt2: number;
        isSpecialShielded: boolean;
        cardNameId: number;
    }[];
    move_group_file: {
        ok: true;
    };
    trans_group_file: {
        ok: true;
    };
    rename_group_file: {
        ok: true;
    };
    get_group_ignored_notifies: WSSendReturn['get_group_system_msg'];
    set_group_sign: null;
    send_packet: string | undefined;
    get_mini_app_ark: {
        data: {
            ver: string;
            prompt: string;
            config: {
                type: string;
                width: number;
                height: number;
                forward: number;
                autoSize: number;
                ctime: number;
                token: string;
            };
            app: string;
            view: string;
            meta: {
                detail_1: {
                    appid: string;
                    appType: number;
                    title: string;
                    desc: string;
                    icon: string;
                    preview: string;
                    url: string;
                    scene: number;
                    host: {
                        uin: number;
                        nick: string;
                    };
                    shareTemplateId: string;
                    shareTemplateData: Buffer;
                    showLittleTail: string;
                    gamePoints: string;
                    gamePointsUrl: string;
                    shareOrigin: number;
                };
            };
            miniappShareOrigin: number;
            miniappOpenRefer: string;
        } | {
            appName: string;
            appView: string;
            ver: string;
            desc: string;
            prompt: string;
            metaData: {
                detail_1: {
                    appid: string;
                    appType: number;
                    title: string;
                    desc: string;
                    icon: string;
                    preview: string;
                    url: string;
                    scene: number;
                    host: {
                        uin: number;
                        nick: string;
                    };
                    shareTemplateId: string;
                    shareTemplateData: Buffer;
                    showLittleTail: string;
                    gamePoints: string;
                    gamePointsUrl: string;
                    shareOrigin: number;
                };
            };
            config: {
                type: string;
                width: number;
                height: number;
                forward: number;
                autoSize: number;
                ctime: number;
                token: string;
            };
        };
    };
    get_ai_record: string;
    get_ai_characters: {
        type: string;
        characters: {
            character_id: string;
            character_name: string;
            preview_url: string;
        }[];
    }[];
    send_group_ai_record: {
        message_id: number;
    };
    get_clientkey: {
        clientkey: string;
    };
    send_poke: null;
    set_group_kick_members: null;
    set_group_robot_add_option: null;
    set_group_add_option: null;
    set_group_search: null;
    get_doubt_friends_add_request: {
        flag: string;
        uin: string;
        nick: string;
        source: string;
        reason?: string;
        msg?: string;
        group_code?: string;
        time?: string;
        type?: string;
    }[];
    set_doubt_friends_add_request: null;
    get_rkey: {
        type: 'private' | 'group';
        rkey: string;
        created_at: number;
        ttl: string;
    }[];
    get_rkey_server: {
        private_rkey: string;
        group_rkey: string;
        expired_time: number;
        name: string;
    };
    set_group_remark: null;
    get_private_file_url: WSSendReturn['get_group_file_url'];
    click_inline_keyboard_button: {
        result: 0;
        errMsg: string;
        status: number;
        promptText: string;
        promptType: number;
        promptIcon: number;
    };
    set_group_todo: null;
    get_qun_album_list: {
        name: string;
        album_id: number;
    }[];
    upload_image_to_qun_album: null;
    get_group_album_media_list: {
        seq: number;
        result: number;
        errMs: string;
        trace_id: string;
        request_time_line: unknown;
    };
    do_group_album_comment: null;
    set_group_album_media_like: null;
    del_group_album_media: null;
    clean_stream_temp_file: null;
    upload_file_stream: {
        stream_id: string;
        result: string;
        total_chunks: number;
        file_id?: string;
        url?: string;
    };
    download_file_stream: {
        stream_id: string;
        chunk_data: string;
        chunk_index: number;
        total_chunks: number;
        file_id: string;
        file_name: string;
        file_size: number;
    };
    download_file_record_stream: WSSendReturn['download_file_stream'];
    download_file_image_stream: WSSendReturn['download_file_stream'];
    create_flash_task: {
        task_id: string;
        fileset_id: string;
    };
    send_flash_msg: {
        message_id: number;
    };
    get_share_link: {
        url: string;
    };
    download_fileset: {
        file: string;
    };
    get_fileset_info: {
        fileset_id: string;
        file_name: string;
        file_size: number;
        file_count: number;
    };
    get_flash_file_list: {
        files: {
            file_name: string;
            file_size: number;
            file_index: number;
        }[];
    };
    get_flash_file_url: {
        url: string;
    };
    get_fileset_id: {
        fileset_id: string;
    };
    send_online_file: null;
    send_online_folder: null;
    get_online_file_msg: {
        msg_id: string;
        element_id: string;
        file_name: string;
        file_size: string;
        is_dir: boolean;
        user_id: number;
    }[];
    receive_online_file: null;
    refuse_online_file: null;
    cancel_online_file: null;
    fetch_custom_face_detail: {
        emoji_id: string;
        res_id: string;
        md5: string;
        desc: string;
        url: string;
    }[];
    add_custom_face: {
        result: 0;
        errMsg: string;
    };
    delete_custom_face: {
        result: 0;
        errMsg: string;
    };
    set_custom_face_desc: {
        result: 0;
        errMsg: string;
    };
    get_emoji_likes: {
        emoji_like_list: {
            user_id: string;
            nick_name: string;
        }[];
        cookie?: string;
        is_last_page?: boolean;
    };
    _set_model_show: null;
    get_online_clients: {
        client_id: number;
        app_id: number;
        device_name: string;
        device_kind: string;
    }[];
    check_url_safely: {
        level: number;
    };
    '.get_word_slices': {
        slices: string[];
    };
    '.ocr_image': WSSendReturn['ocr_image'];
    get_guild_list: {
        guild_id: string;
        guild_name: string;
    }[];
    get_guild_service_profile: {
        guild_id: string;
        service_profile: string;
    };
    send_group_ark_share: string;
    send_ark_share: {
        arkJson: string;
    };
    fetch_ptt_text: {
        text: string;
    };
    send_group_sign: null;
    complete_group_todo: null;
    cancel_group_todo: null;
    cancel_group_album_media_like: null;
    get_group_signed_list: {
        user_id: number;
        nick: string;
        time: number;
        rank: number;
    }[];
};
export {};
