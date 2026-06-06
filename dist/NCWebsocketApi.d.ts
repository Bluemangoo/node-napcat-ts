import type { WSSendParam } from './Interfaces.js';
import { NCWebsocketBase } from './NCWebsocketBase.js';
export declare class NCWebsocket extends NCWebsocketBase {
    /**
     * @onebot11
     * 发送私聊消息
     */
    send_private_msg(params: WSSendParam['send_private_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @onebot11
     * 发送群聊信息
     */
    send_group_msg(params: WSSendParam['send_group_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @onebot11
     * 发送信息
     */
    send_msg(params: WSSendParam['send_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @onebot11
     * 撤回信息
     */
    delete_msg(params: WSSendParam['delete_msg']): Promise<null>;
    /**
     * @onebot11
     * 获取信息
     */
    get_msg(params: WSSendParam['get_msg']): Promise<({
        message_type: "private";
        sender: {
            user_id: number;
            nickname: string;
            card: string;
        };
        sub_type: "friend";
    } | {
        message_type: "group";
        group_id: number;
        sender: {
            user_id: number;
            nickname: string;
            card: string;
            role: "owner" | "admin" | "member";
        };
        sub_type: "normal";
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
        post_type: "message" | "message_sent";
        emoji_likes_list: {
            emoji_id: string;
            emoji_type: string;
            likes_cnt: string;
        }[];
    } & import("./Interfaces.js").MessageType>;
    /**
     * @onebot11
     * 获取合并转发信息
     */
    get_forward_msg(params: WSSendParam['get_forward_msg']): Promise<{
        messages: import("./Interfaces.js").WSSendReturn["get_msg"][];
    }>;
    /**
     * @onebot11
     * 点赞
     */
    send_like(params: WSSendParam['send_like']): Promise<null>;
    /**
     * @onebot11
     * 群组踢人
     */
    set_group_kick(params: WSSendParam['set_group_kick']): Promise<null>;
    /**
     * @onebot11
     * 群组禁言
     */
    set_group_ban(params: WSSendParam['set_group_ban']): Promise<null>;
    /**
     * @onebot11
     * 群组匿名用户禁言
     */
    /**
     * @onebot11
     * 群组全员禁言
     */
    set_group_whole_ban(params: WSSendParam['set_group_whole_ban']): Promise<null>;
    /**
     * @onebot11
     * 群组设置管理员
     */
    set_group_admin(params: WSSendParam['set_group_admin']): Promise<null>;
    /**
     * @onebot11
     * 群组匿名
     */
    /**
     * @onebot11
     * 设置群名片
     */
    set_group_card(params: WSSendParam['set_group_card']): Promise<null>;
    /**
     * @onebot11
     * 设置群名
     */
    set_group_name(params: WSSendParam['set_group_name']): Promise<null>;
    /**
     * @onebot11
     * 退出群组
     */
    set_group_leave(params: WSSendParam['set_group_leave']): Promise<null>;
    /**
     * @onebot11
     * 设置群聊特殊头衔
     */
    set_group_special_title(params: WSSendParam['set_group_special_title']): Promise<null>;
    /**
     * @onebot11
     * 设置好友添加请求
     */
    set_friend_add_request(params: WSSendParam['set_friend_add_request']): Promise<null>;
    /**
     * @onebot11
     * 设置好友备注
     */
    set_friend_remark(params: WSSendParam['set_friend_remark']): Promise<null>;
    /**
     * @onebot11
     * 设置群组添加请求
     */
    set_group_add_request(params: WSSendParam['set_group_add_request']): Promise<null>;
    /**
     * @onebot11
     * 获取登录号信息
     */
    get_login_info(): Promise<{
        user_id: number;
        nickname: string;
    }>;
    /**
     * @onebot11
     * 获取非好友信息
     */
    get_stranger_info(params: WSSendParam['get_stranger_info']): Promise<{
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
    }>;
    /**
     * @onebot11
     * 获取好友列表
     */
    get_friend_list(): Promise<{
        user_id: number;
        nickname: string;
        remark?: string;
        sex?: "male" | "female" | "unknown";
        age?: number;
        level?: number;
        qid?: string;
        login_days?: number;
        category_id?: number;
        categoryName?: string;
        categoryId?: number;
    }[]>;
    /**
     * @onebot11
     * 获取群信息
     */
    get_group_info(params: WSSendParam['get_group_info']): Promise<{
        group_id: number;
        group_name: string;
        member_count?: number;
        max_member_count?: number;
        group_all_shut: number;
        group_remark: string;
    }>;
    /**
     * @onebot11
     * 获取群列表
     */
    get_group_list(params?: WSSendParam['get_group_list']): Promise<{
        group_id: number;
        group_name: string;
        member_count?: number;
        max_member_count?: number;
        group_all_shut: number;
        group_remark: string;
    }[]>;
    /**
     * @onebot11
     * 获取群成员信息
     */
    get_group_member_info(params: WSSendParam['get_group_member_info']): Promise<{
        group_id: number;
        user_id: number;
        nickname: string;
        card?: string;
        sex?: "male" | "female" | "unknown";
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
        role?: "owner" | "admin" | "member";
        title?: string;
    }>;
    /**
     * @onebot11
     * 获取群成员列表
     */
    get_group_member_list(params: WSSendParam['get_group_member_list']): Promise<{
        group_id: number;
        user_id: number;
        nickname: string;
        card?: string;
        sex?: "male" | "female" | "unknown";
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
        role?: "owner" | "admin" | "member";
        title?: string;
    }[]>;
    /**
     * @onebot11
     * 获取群荣誉信息
     */
    get_group_honor_info(params: WSSendParam['get_group_honor_info']): Promise<{
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
    }>;
    /**
     * @onebot11
     * 获取Cookies
     */
    get_cookies(params: WSSendParam['get_cookies']): Promise<{
        cookies: string;
        bkn: string;
    }>;
    /**
     * @onebot11
     * 获取CsrfToken
     */
    get_csrf_token(): Promise<{
        token: number;
    }>;
    /**
     * @onebot11
     * 获取Credentials
     */
    get_credentials(): Promise<{
        cookies: string;
        token: number;
    }>;
    /**
     * @onebot11
     * 获取语音
     */
    get_record(params: WSSendParam['get_record']): Promise<{
        file: string;
        url: string;
        file_size: string;
        file_name: string;
    }>;
    /**
     * @onebot11
     * 获取图片
     */
    get_image(params: WSSendParam['get_image']): Promise<{
        file: string;
        url: string;
        file_size: string;
        file_name: string;
    }>;
    /**
     * @onebot11
     * 能否发送图片
     */
    can_send_image(): Promise<{
        yes: true;
    }>;
    /**
     * @onebot11
     * 能否发送语音
     */
    can_send_record(): Promise<{
        yes: true;
    }>;
    /**
     * @onebot11
     * 获取运行状态
     */
    get_status(): Promise<{
        online: boolean;
        good: true;
        stat: {};
    }>;
    /**
     * @onebot11
     * 获取版本信息
     */
    get_version_info(): Promise<{
        app_name: "NapCat.Onebot";
        protocol_version: "v11";
        app_version: string;
    }>;
    /**
     * @onebot11
     * 重启
     */
    set_restart(params?: WSSendParam['set_restart']): Promise<null>;
    /**
     * @onebot11
     * 清理缓存
     */
    clean_cache(): Promise<null>;
    /**
     * @onebot11
     * 退出机器人
     */
    bot_exit(): Promise<null>;
    /**
     * @gocqhttp
     * 设置QQ资料
     */
    set_qq_profile(params: WSSendParam['set_qq_profile']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @gocqhttp
     * 获取企点QQ资料
     */
    /**
     * @gocqhttp
     * 获取型号列表
     */
    _get_model_show(params: WSSendParam['_get_model_show']): Promise<{
        variants: {
            model_show: string;
            need_pay: boolean;
        };
    }[]>;
    /**
     * @gocqhttp
     * 设置型号
     */
    /**
     * @gocqhttp
     * 获取登陆的客户端
     */
    /**
     * @gocqhttp
     * 获取单向好友列表
     */
    get_unidirectional_friend_list(): Promise<{
        uin: number;
        uid: string;
        nick_name: string;
        age: number;
        source: string;
    }[]>;
    /**
     * @gocqhttp
     * 删除好友
     */
    delete_friend(params: WSSendParam['delete_friend']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @gocqhttp
     * 删除单向好友
     */
    /**
     * @gocqhttp
     * 标记消息已读
     */
    mark_msg_as_read(params: WSSendParam['mark_msg_as_read']): Promise<null>;
    /**
     * @gocqhttp
     * 发送群合并转发
     */
    send_group_forward_msg(params: WSSendParam['send_group_forward_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @gocqhttp
     * 发送私聊合并转发
     */
    send_private_forward_msg(params: WSSendParam['send_private_forward_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @gocqhttp
     * 获取群聊历史消息
     */
    get_group_msg_history(params: WSSendParam['get_group_msg_history']): Promise<{
        messages: import("./Interfaces.js").WSSendReturn["get_msg"][];
    }>;
    /**
     * @gocqhttp
     * OCR图片
     */
    ocr_image(params: WSSendParam['ocr_image']): Promise<{
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
    }[]>;
    /**
     * @gocqhttp
     * 获取群系统消息
     */
    get_group_system_msg(params?: WSSendParam['get_group_system_msg']): Promise<{
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
    }>;
    /**
     * @gocqhttp
     * 获取群精华列表
     */
    get_essence_msg_list(params: WSSendParam['get_essence_msg_list']): Promise<{
        msg_seq: number;
        msg_random: number;
        sender_id: number;
        sender_nick: string;
        operator_id: number;
        operator_nick: string;
        message_id: number;
        operator_time: number;
        content: import("./Structs.js").Receive[keyof import("./Structs.js").Receive][];
    }[]>;
    /**
     * @gocqhttp
     * 获取@全体成员剩余次数
     */
    get_group_at_all_remain(params: WSSendParam['get_group_at_all_remain']): Promise<{
        can_at_all: boolean;
        remain_at_all_count_for_group: number;
        remain_at_all_count_for_uin: number;
    }>;
    /**
     * @gocqhttp
     * 设置群头像
     */
    set_group_portrait(params: WSSendParam['set_group_portrait']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @gocqhttp
     * 设置精华消息
     */
    set_essence_msg(params: WSSendParam['set_essence_msg']): Promise<{
        errCode: 0;
        errMsg: string;
    }>;
    /**
     * @gocqhttp
     * 删除精华消息
     */
    delete_essence_msg(params: WSSendParam['delete_essence_msg']): Promise<{
        errCode: 0;
        errMsg: string;
    }>;
    /**
     * @gocqhttp
     * 设置群公告
     */
    _send_group_notice(params: WSSendParam['_send_group_notice']): Promise<null>;
    /**
     * @gocqhttp
     * 获取群公告
     */
    _get_group_notice(params: WSSendParam['_get_group_notice']): Promise<{
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
    }[]>;
    /**
     * @gocqhttp
     * 上传群文件
     */
    upload_group_file(params: WSSendParam['upload_group_file']): Promise<null>;
    /**
     * @gocqhttp
     * 删除群文件
     */
    delete_group_file(params: WSSendParam['delete_group_file']): Promise<{
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
    }>;
    /**
     * @gocqhttp
     * 创建群文件文件夹
     */
    create_group_file_folder(params: WSSendParam['create_group_file_folder']): Promise<{
        result: {
            retCode: 0;
            retMsg: string;
            clientWording: "";
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
    }>;
    /**
     * @gocqhttp
     * 删除群文件文件夹
     */
    delete_group_folder(params: WSSendParam['delete_group_folder']): Promise<{
        retCode: 0;
        retMsg: string;
        clientWording: "";
    }>;
    /**
     * @gocqhttp
     * 获取群文件系统信息
     */
    get_group_file_system_info(params: WSSendParam['get_group_file_system_info']): Promise<{
        file_count: number;
        limit_count: 10000;
        used_space: 0;
        total_space: 10737418240;
    }>;
    /**
     * @gocqhttp
     * 获取群文件树
     */
    get_group_root_files(params: WSSendParam['get_group_root_files']): Promise<{
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
    }>;
    /**
     * @gocqhttp
     * 根据文件夹获取群文件
     */
    get_group_files_by_folder(params: WSSendParam['get_group_files_by_folder']): Promise<{
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
    }>;
    /**
     * @gocqhttp
     * 获取群文件链接
     */
    get_group_file_url(params: WSSendParam['get_group_file_url']): Promise<{
        url: string;
    }>;
    /**
     * @gocqhttp
     * 发送私聊文件
     */
    upload_private_file(params: WSSendParam['upload_private_file']): Promise<null>;
    /**
     * @gocqhttp
     * 重置事件过滤器
     */
    /**
     * @gocqhttp
     * 下载文件
     */
    download_file(params: WSSendParam['download_file']): Promise<{
        file: string;
    }>;
    /**
     * @gocqhttp
     * 检查链接安全性
     */
    /**
     * @gocqhttp
     * 获取中文分词
     */
    /**
     * @gocqhttp
     * 快捷操作
     */
    '.handle_quick_operation': (params: WSSendParam[".handle_quick_operation"]) => Promise<null>;
    /**
     * @napcat
     * 留空占位符
     */
    /**
     * @napcat
     * 设置自定义在线状态
     */
    set_diy_online_status(params: WSSendParam['set_diy_online_status']): Promise<string>;
    /**
     * @napcat
     * 获取分享卡片JSON
     */
    ArkSharePeer(params: WSSendParam['ArkSharePeer']): Promise<{
        errCode: 0;
        errMsg: string;
        arkJson: string;
    }>;
    /**
     * @napcat
     * 获取分享卡片JSON
     */
    ArkShareGroup(params: WSSendParam['ArkShareGroup']): Promise<string>;
    /**
     * @napcat
     * 正常重启
     */
    /**
     * @napcat
     * 获取机器人ID范围
     */
    get_robot_uin_range(): Promise<{
        minUin: string;
        maxUin: string;
    }[]>;
    /**
     * @napcat
     * 设置在线状态
     */
    set_online_status(params: WSSendParam['set_online_status']): Promise<null>;
    /**
     * @napcat
     * 获取分类好友列表
     */
    get_friends_with_category(): Promise<{
        categoryId: number;
        categorySortId: number;
        categoryName: string;
        categoryMbCount: number;
        onlineCount: number;
        buddyList: import("./Interfaces.js").WSSendReturn["get_friend_list"];
    }[]>;
    /**
     * @napcat
     * 设置QQ头像
     */
    set_qq_avatar(params: WSSendParam['set_qq_avatar']): Promise<null>;
    /**
     * @napcat
     * 获取文件
     */
    get_file(params: WSSendParam['get_file']): Promise<{
        file: string;
        url: string;
        file_size: string;
        file_name: string;
    }>;
    /**
     * @napcat
     * 转发消息给好友
     */
    forward_friend_single_msg(params: WSSendParam['forward_friend_single_msg']): Promise<null>;
    /**
     * @napcat
     * 转发消息给群
     */
    forward_group_single_msg(params: WSSendParam['forward_group_single_msg']): Promise<null>;
    /**
     * @napcat
     * 中英文翻译
     */
    translate_en2zh(params: WSSendParam['translate_en2zh']): Promise<string[]>;
    /**
     * @napcat
     * 设置表情回复
     */
    set_msg_emoji_like(params: WSSendParam['set_msg_emoji_like']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 发送合并转发
     */
    send_forward_msg(params: WSSendParam['send_forward_msg']): Promise<{
        message_id: number;
        res_id: string;
    }>;
    /**
     * @napcat
     * 标记私聊已读
     */
    mark_private_msg_as_read(params: WSSendParam['mark_private_msg_as_read']): Promise<null>;
    /**
     * @napcat
     * 标记群聊已读
     */
    mark_group_msg_as_read(params: WSSendParam['mark_group_msg_as_read']): Promise<null>;
    /**
     * @napcat
     * 获取私聊历史记录
     */
    get_friend_msg_history(params: WSSendParam['get_friend_msg_history']): Promise<{
        messages: import("./Interfaces.js").WSSendReturn["get_msg"][];
    }>;
    /**
     * @napcat
     * 创建收藏
     */
    create_collection(params: WSSendParam['create_collection']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 获取收藏
     */
    get_collection_list(params: WSSendParam['get_collection_list']): Promise<{
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
    }>;
    /**
     * @napcat
     * 设置签名
     */
    set_self_longnick(params: WSSendParam['set_self_longnick']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 获取最近联系
     */
    get_recent_contact(params?: WSSendParam['get_recent_contact']): Promise<{
        lastestMsg?: import("./Interfaces.js").WSSendReturn["get_msg"];
        peerUin: string;
        remark: string;
        msgTime: string | number;
        chatType: number;
        msgId: string;
        sendNickName: string;
        sendMemberName: string;
        peerName: string;
    }[]>;
    /**
     * @napcat
     * 标记所有为已读
     */
    _mark_all_as_read(): Promise<null>;
    /**
     * @napcat
     * 获取个人资料
     */
    get_profile_like(): Promise<{
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
    }[]>;
    /**
     * @napcat
     * 获取收藏表情
     */
    fetch_custom_face(params?: WSSendParam['fetch_custom_face']): Promise<string[]>;
    /**
     * @napcat
     * 获取表情回复
     */
    fetch_emoji_like(params: WSSendParam['fetch_emoji_like']): Promise<{
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
    }>;
    /**
     * @napcat
     * 设置输入状态
     */
    set_input_status(params: WSSendParam['set_input_status']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 获取群信息扩展
     */
    get_group_info_ex(params: WSSendParam['get_group_info_ex']): Promise<{
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
    }>;
    /**
     * @napcat
     * 获取群详细信息
     */
    get_group_detail_info(params: WSSendParam['get_group_detail_info']): Promise<{
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
    }>;
    /**
     * @napcat
     * 获取群忽略添加请求
     */
    get_group_ignore_add_request(params: WSSendParam['get_group_ignore_add_request']): Promise<{
        request_id: number;
        invitor_uin: number;
        invitor_nick: string;
        group_id: number;
        message: string;
        group_name: string;
        checked: boolean;
        actor: number;
        requester_nick: string;
    }[]>;
    /**
     * @napcat
     * 删除群公告
     */
    _del_group_notice(params: WSSendParam['_del_group_notice']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 发送好友戳一戳
     */
    friend_poke(params: WSSendParam['friend_poke']): Promise<null>;
    /**
     * @napcat
     * 发送群戳一戳
     */
    group_poke(params: WSSendParam['group_poke']): Promise<null>;
    /**
     * @napcat
     * 获取数据包状态
     */
    nc_get_packet_status(): Promise<undefined>;
    /**
     * @napcat
     * 获取用户状态
     */
    nc_get_user_status(params: WSSendParam['nc_get_user_status']): Promise<{
        status: number;
        ext_status: number;
    }>;
    /**
     * @napcat
     * 获取 rkey
     */
    nc_get_rkey(): Promise<{
        rkey: string;
        ttl: string;
        time: number;
        type: number;
    }[]>;
    /**
     * @napcat
     * 获取群禁言列表
     */
    get_group_shut_list(params: WSSendParam['get_group_shut_list']): Promise<{
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
        groupHonor: {
            [key: string]: number;
        };
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
    }[]>;
    /**
     * @napcat
     * 移动群文件
     */
    move_group_file(params: WSSendParam['move_group_file']): Promise<{
        ok: true;
    }>;
    /**
     * @napcat
     * 转移群文件
     */
    trans_group_file(params: WSSendParam['trans_group_file']): Promise<{
        ok: true;
    }>;
    /**
     * @napcat
     * 重命名群文件
     */
    rename_group_file(params: WSSendParam['rename_group_file']): Promise<{
        ok: true;
    }>;
    /**
     * @napcat
     * 获取频道列表
     */
    /**
     * @napcat
     * 获取频道服务简介
     */
    /**
     * @napcat
     * 获取群忽略通知
     */
    get_group_ignored_notifies(params: WSSendParam['get_group_ignored_notifies']): Promise<{
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
    }>;
    /**
     * @napcat
     * 发送群签到
     */
    set_group_sign(params: WSSendParam['set_group_sign']): Promise<null>;
    /**
     * @napcat
     * 发送数据包
     */
    send_packet(params: WSSendParam['send_packet']): Promise<string | undefined>;
    /**
     * @napcat
     * 获取小程序卡片
     */
    get_mini_app_ark(params: WSSendParam['get_mini_app_ark']): Promise<{
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
                    shareTemplateData: {
                        [key: string]: number;
                    };
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
                    shareTemplateData: {
                        [key: string]: number;
                    };
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
    }>;
    /**
     * @napcat
     * 获取 AI 语音
     */
    get_ai_record(params: WSSendParam['get_ai_record']): Promise<string>;
    /**
     * @napcat
     * 获取 AI 角色列表
     */
    get_ai_characters(params: WSSendParam['get_ai_characters']): Promise<{
        type: string;
        characters: {
            character_id: string;
            character_name: string;
            preview_url: string;
        }[];
    }[]>;
    /**
     * @napcat
     * 发送群 AI 记录
     */
    send_group_ai_record(params: WSSendParam['send_group_ai_record']): Promise<{
        message_id: number;
    }>;
    /**
     * @napcat
     * 获取客户端密钥
     */
    get_clientkey(): Promise<{
        clientkey: string;
    }>;
    /**
     * @napcat
     * 发送戳一戳
     */
    send_poke(params: WSSendParam['send_poke']): Promise<null>;
    /**
     * @napcat
     * 设置群踢人
     */
    set_group_kick_members(params: WSSendParam['set_group_kick_members']): Promise<null>;
    /**
     * @napcat
     * 设置群机器人添加选项
     */
    set_group_robot_add_option(params: WSSendParam['set_group_robot_add_option']): Promise<null>;
    /**
     * @napcat
     * 设置群添加选项
     */
    set_group_add_option(params: WSSendParam['set_group_add_option']): Promise<null>;
    /**
     * @napcat
     * 设置群搜索选项
     */
    set_group_search(params: WSSendParam['set_group_search']): Promise<null>;
    /**
     * @napcat
     * 获取可疑好友添加请求
     */
    get_doubt_friends_add_request(params?: WSSendParam['get_doubt_friends_add_request']): Promise<{
        flag: string;
        uin: string;
        nick: string;
        source: string;
        reason?: string;
        msg?: string;
        group_code?: string;
        time?: string;
        type?: string;
    }[]>;
    /**
     * @napcat
     * 设置可疑好友添加请求
     */
    set_doubt_friends_add_request(params: WSSendParam['set_doubt_friends_add_request']): Promise<null>;
    /**
     * @napcat
     * 获取 RKey
     */
    get_rkey(): Promise<{
        type: "private" | "group";
        rkey: string;
        created_at: number;
        ttl: string;
    }[]>;
    /**
     * @napcat
     * 获取 RKey 服务器
     */
    get_rkey_server(): Promise<{
        private_rkey: string;
        group_rkey: string;
        expired_time: number;
        name: string;
    }>;
    /**
     * @napcat
     * 设置群备注
     */
    set_group_remark(params: WSSendParam['set_group_remark']): Promise<null>;
    /**
     * @napcat
     * 获取私聊文件链接
     */
    get_private_file_url(params: WSSendParam['get_private_file_url']): Promise<{
        url: string;
    }>;
    /**
     * @napcat
     * 点击消息中的按钮
     */
    click_inline_keyboard_button(params: WSSendParam['click_inline_keyboard_button']): Promise<{
        result: 0;
        errMsg: string;
        status: number;
        promptText: string;
        promptType: number;
        promptIcon: number;
    }>;
    /**
     * @napcat
     * 设置群待办
     */
    set_group_todo(params: WSSendParam['set_group_todo']): Promise<null>;
    /**
     * @napcat
     * 获取群相册列表
     */
    get_qun_album_list(params: WSSendParam['get_qun_album_list']): Promise<{
        name: string;
        album_id: number;
    }[]>;
    /**
     * @napcat
     * 上传图片到群相册
     */
    upload_image_to_qun_album(params: WSSendParam['upload_image_to_qun_album']): Promise<null>;
    /**
     * @napcat
     * 获取群相册媒体列表
     */
    get_group_album_media_list(params: WSSendParam['get_group_album_media_list']): Promise<{
        seq: number;
        result: number;
        errMs: string;
        trace_id: string;
        request_time_line: unknown;
    }>;
    /**
     * @napcat
     * 评论群相册
     */
    do_group_album_comment(params: WSSendParam['do_group_album_comment']): Promise<null>;
    /**
     * @napcat
     * 点赞群相册媒体
     */
    set_group_album_media_like(params: WSSendParam['set_group_album_media_like']): Promise<null>;
    /**
     * @napcat
     * 删除群相册媒体
     */
    del_group_album_media(params: WSSendParam['del_group_album_media']): Promise<null>;
    /**
     * @napcat
     * 清理流临时文件
     */
    clean_stream_temp_file(): Promise<null>;
    /**
     * @napcat
     * 上传文件流
     */
    upload_file_stream(params: WSSendParam['upload_file_stream']): Promise<{
        stream_id: string;
        result: string;
        total_chunks: number;
        file_id?: string;
        url?: string;
    }>;
    /**
     * @napcat
     * 下载文件流
     */
    download_file_stream(params: WSSendParam['download_file_stream']): Promise<{
        stream_id: string;
        chunk_data: string;
        chunk_index: number;
        total_chunks: number;
        file_id: string;
        file_name: string;
        file_size: number;
    }>;
    /**
     * @napcat
     * 下载语音流
     */
    download_file_record_stream(params: WSSendParam['download_file_record_stream']): Promise<{
        stream_id: string;
        chunk_data: string;
        chunk_index: number;
        total_chunks: number;
        file_id: string;
        file_name: string;
        file_size: number;
    }>;
    /**
     * @napcat
     * 下载图片流
     */
    download_file_image_stream(params: WSSendParam['download_file_image_stream']): Promise<{
        stream_id: string;
        chunk_data: string;
        chunk_index: number;
        total_chunks: number;
        file_id: string;
        file_name: string;
        file_size: number;
    }>;
    /**
     * @napcat
     * 创建闪传任务
     */
    create_flash_task(params: WSSendParam['create_flash_task']): Promise<{
        task_id: string;
        fileset_id: string;
    }>;
    /**
     * @napcat
     * 发送闪传消息
     */
    send_flash_msg(params: WSSendParam['send_flash_msg']): Promise<{
        message_id: number;
    }>;
    /**
     * @napcat
     * 获取分享链接
     */
    get_share_link(params: WSSendParam['get_share_link']): Promise<{
        url: string;
    }>;
    /**
     * @napcat
     * 下载文件集
     */
    download_fileset(params: WSSendParam['download_fileset']): Promise<{
        file: string;
    }>;
    /**
     * @napcat
     * 获取文件集信息
     */
    get_fileset_info(params: WSSendParam['get_fileset_info']): Promise<{
        fileset_id: string;
        file_name: string;
        file_size: number;
        file_count: number;
    }>;
    /**
     * @napcat
     * 获取闪传文件列表
     */
    get_flash_file_list(params: WSSendParam['get_flash_file_list']): Promise<{
        files: {
            file_name: string;
            file_size: number;
            file_index: number;
        }[];
    }>;
    /**
     * @napcat
     * 获取闪传文件URL
     */
    get_flash_file_url(params: WSSendParam['get_flash_file_url']): Promise<{
        url: string;
    }>;
    /**
     * @napcat
     * 获取文件集ID
     */
    get_fileset_id(params: WSSendParam['get_fileset_id']): Promise<{
        fileset_id: string;
    }>;
    /**
     * @napcat
     * 发送在线文件
     */
    send_online_file(params: WSSendParam['send_online_file']): Promise<null>;
    /**
     * @napcat
     * 发送在线文件夹
     */
    send_online_folder(params: WSSendParam['send_online_folder']): Promise<null>;
    /**
     * @napcat
     * 获取在线文件消息
     */
    get_online_file_msg(params: WSSendParam['get_online_file_msg']): Promise<{
        msg_id: string;
        element_id: string;
        file_name: string;
        file_size: string;
        is_dir: boolean;
        user_id: number;
    }[]>;
    /**
     * @napcat
     * 接收在线文件
     */
    receive_online_file(params: WSSendParam['receive_online_file']): Promise<null>;
    /**
     * @napcat
     * 拒绝在线文件
     */
    refuse_online_file(params: WSSendParam['refuse_online_file']): Promise<null>;
    /**
     * @napcat
     * 取消在线文件
     */
    cancel_online_file(params: WSSendParam['cancel_online_file']): Promise<null>;
    /**
     * @napcat
     * 获取自定义表情详情
     */
    fetch_custom_face_detail(params?: WSSendParam['fetch_custom_face_detail']): Promise<{
        emoji_id: string;
        res_id: string;
        md5: string;
        desc: string;
        url: string;
    }[]>;
    /**
     * @napcat
     * 添加自定义表情
     */
    add_custom_face(params: WSSendParam['add_custom_face']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 删除自定义表情
     */
    delete_custom_face(params: WSSendParam['delete_custom_face']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 设置自定义表情描述
     */
    set_custom_face_desc(params: WSSendParam['set_custom_face_desc']): Promise<{
        result: 0;
        errMsg: string;
    }>;
    /**
     * @napcat
     * 获取表情点赞列表
     */
    get_emoji_likes(params: WSSendParam['get_emoji_likes']): Promise<{
        emoji_like_list: {
            user_id: string;
            nick_name: string;
        }[];
        cookie?: string;
        is_last_page?: boolean;
    }>;
    /**
     * @gocqhttp
     * 设置型号展示
     */
    _set_model_show(params: WSSendParam['_set_model_show']): Promise<null>;
    /**
     * @gocqhttp
     * 获取在线客户端
     */
    get_online_clients(): Promise<{
        client_id: number;
        app_id: number;
        device_name: string;
        device_kind: string;
    }[]>;
    /**
     * @gocqhttp
     * 检查链接安全性
     */
    check_url_safely(params: WSSendParam['check_url_safely']): Promise<{
        level: number;
    }>;
    /**
     * @gocqhttp
     * 获取中文分词
     */
    '.get_word_slices'(params: WSSendParam['.get_word_slices']): Promise<{
        slices: string[];
    }>;
    /**
     * @gocqhttp
     * OCR图片
     */
    '.ocr_image'(params: WSSendParam['.ocr_image']): Promise<{
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
    }[]>;
    /**
     * @napcat
     * 获取频道列表
     */
    get_guild_list(): Promise<{
        guild_id: string;
        guild_name: string;
    }[]>;
    /**
     * @napcat
     * 获取频道服务简介
     */
    get_guild_service_profile(params: WSSendParam['get_guild_service_profile']): Promise<{
        guild_id: string;
        service_profile: string;
    }>;
    /**
     * @napcat
     * 发送群ARK分享
     */
    send_group_ark_share(params: WSSendParam['send_group_ark_share']): Promise<string>;
    /**
     * @napcat
     * 发送ARK分享
     */
    send_ark_share(params: WSSendParam['send_ark_share']): Promise<{
        arkJson: string;
    }>;
    /**
     * @napcat
     * 获取语音转文字
     */
    fetch_ptt_text(params: WSSendParam['fetch_ptt_text']): Promise<{
        text: string;
    }>;
    /**
     * @napcat
     * 群签到(别名)
     */
    send_group_sign(params: WSSendParam['send_group_sign']): Promise<null>;
    /**
     * @napcat
     * 完成群待办
     */
    complete_group_todo(params: WSSendParam['complete_group_todo']): Promise<null>;
    /**
     * @napcat
     * 取消群待办
     */
    cancel_group_todo(params: WSSendParam['cancel_group_todo']): Promise<null>;
    /**
     * @napcat
     * 取消群相册媒体点赞
     */
    cancel_group_album_media_like(params: WSSendParam['cancel_group_album_media_like']): Promise<null>;
    /**
     * @napcat
     * 获取群签到列表
     */
    get_group_signed_list(params: WSSendParam['get_group_signed_list']): Promise<{
        user_id: number;
        nick: string;
        time: number;
        rank: number;
    }[]>;
}
