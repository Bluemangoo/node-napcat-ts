import { logger } from './Utils.js';
export class NCEventBus {
    #events = new Map();
    #ws;
    constructor(ws) {
        this.#ws = ws;
    }
    on(event, handler) {
        const handlers = this.#events.get(event) ?? [];
        // @ts-ignore 表达式过于复杂无法表示
        if (handlers.indexOf(handler) >= 0)
            return this;
        handlers.push(handler);
        this.#events.set(event, handlers);
        return this;
    }
    off(event, handler) {
        const handlers = this.#events.get(event) ?? [];
        const index = handlers.indexOf(handler);
        if (index >= 0) {
            handlers.splice(index, 1);
            this.#events.set(event, handlers);
        }
        return this;
    }
    /**
     * @deprecated 因为once方法会创建一个函数包裹，无法正确的off，所以不推荐使用once方法，建议使用subscribeOnce方法替代
     */
    once(event, handler) {
        const onceHandler = (context) => {
            handler(context);
            this.off(event, onceHandler);
        };
        this.on(event, onceHandler);
        return this;
    }
    subscribe(event, handler) {
        this.on(event, handler);
        return () => {
            this.off(event, handler);
        };
    }
    subscribeOnce(event, handler) {
        const onceHandler = (context) => {
            handler(context);
            this.off(event, onceHandler);
        };
        this.on(event, onceHandler);
        return () => {
            this.off(event, onceHandler);
        };
    }
    emit(event, context) {
        const handlers = this.#events.get(event) ?? [];
        for (const handler of handlers)
            handler(context);
        // 触发总类
        const indexOf = event.lastIndexOf('.');
        if (indexOf > 0)
            return this.emit(event.slice(0, indexOf), context);
        return true;
    }
    parseMessage(json) {
        const post_type = json['post_type'];
        switch (post_type) {
            case 'meta_event':
                this.meta_event(json);
                break;
            case 'message':
                this.message(json);
                break;
            case 'message_sent':
                this.message_sent(json);
                break;
            case 'request':
                this.request(json);
                break;
            case 'notice':
                this.notice(json);
                break;
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown post_type: ${post_type}`);
                return false;
        }
        return true;
    }
    meta_event(json) {
        const meta_event_type = json['meta_event_type'];
        switch (meta_event_type) {
            case 'lifecycle':
                return this.life_cycle(json);
            case 'heartbeat':
                return this.emit('meta_event.heartbeat', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown meta_event_type: ${meta_event_type}`);
                return false;
        }
    }
    life_cycle(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'connect':
                return this.emit('meta_event.lifecycle.connect', json);
            case 'enable':
                return this.emit('meta_event.lifecycle.enable', json);
            case 'disable':
                return this.emit('meta_event.lifecycle.disable', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown meta_event.lifecycle_type: ${subType}`);
                return false;
        }
    }
    message(json) {
        const messageType = json['message_type'];
        switch (messageType) {
            case 'private':
                return this.message_private(json);
            case 'group':
                return this.message_group(json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_type: ${messageType}`);
                return false;
        }
    }
    message_private(json) {
        json.quick_action = (reply) => this.#ws.send('.handle_quick_operation', { context: json, operation: { reply } });
        const subType = json['sub_type'];
        switch (subType) {
            case 'group':
                return this.emit('message.private.group', json);
            case 'friend':
                return this.emit('message.private.friend', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_private_type: ${subType}`);
                return false;
        }
    }
    message_group(json) {
        json.quick_action = (reply, at_sender) => this.#ws.send('.handle_quick_operation', { context: json, operation: { reply, at_sender } });
        const subType = json['sub_type'];
        switch (subType) {
            case 'normal':
                return this.emit('message.group.normal', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_group_type: ${subType}`);
                return false;
        }
    }
    message_sent(json) {
        const messageType = json['message_type'];
        switch (messageType) {
            case 'private':
                return this.message_sent_private(json);
            case 'group':
                return this.message_sent_group(json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_sent_type: ${messageType}`);
                return false;
        }
    }
    message_sent_private(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'group':
                return this.emit('message_sent.private.group', json);
            case 'friend':
                return this.emit('message_sent.private.friend', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_sent_private_type: ${subType}`);
                return false;
        }
    }
    message_sent_group(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'normal':
                return this.emit('message_sent.group.normal', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_sent_group_type: ${subType}`);
                return false;
        }
    }
    request(json) {
        const request_type = json['request_type'];
        switch (request_type) {
            case 'friend':
                json.quick_action = (approve) => this.#ws.send('.handle_quick_operation', { context: json, operation: { approve } });
                return this.emit('request.friend', json);
            case 'group':
                return this.request_group(json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown request_type: ${request_type}`);
                return false;
        }
    }
    request_group(json) {
        json.quick_action = (approve, reason) => this.#ws.send('.handle_quick_operation', { context: json, operation: { approve, reason } });
        const subType = json['sub_type'];
        switch (subType) {
            case 'add':
                return this.emit('request.group.add', json);
            case 'invite':
                return this.emit('request.group.invite', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown request_group_type: ${subType}`);
                return false;
        }
    }
    notice(json) {
        const notice_type = json['notice_type'];
        switch (notice_type) {
            case 'bot_offline':
                return this.emit('notice.bot_offline', json);
            case 'friend_add':
                return this.emit('notice.friend_add', json);
            case 'friend_recall':
                return this.emit('notice.friend_recall', json);
            case 'group_admin':
                return this.notice_group_admin(json);
            case 'group_ban':
                return this.notice_group_ban(json);
            case 'group_card':
                return this.emit('notice.group_card', json);
            case 'group_decrease':
                return this.notice_group_decrease(json);
            case 'essence':
                return this.notice_essence(json);
            case 'group_increase':
                return this.notice_group_increase(json);
            case 'notify':
                return this.notice_notify(json);
            case 'group_recall':
                return this.emit('notice.group_recall', json);
            case 'group_upload':
                return this.emit('notice.group_upload', json);
            case 'group_msg_emoji_like':
                return this.emit('notice.group_msg_emoji_like', json);
            case 'online_file_receive':
                return this.emit('notice.online_file_receive', json);
            case 'online_file_send':
                return this.emit('notice.online_file_send', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_type: ${notice_type}`);
                return false;
        }
    }
    notice_group_admin(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'set':
                return this.emit('notice.group_admin.set', json);
            case 'unset':
                return this.emit('notice.group_admin.unset', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_group_admin_type: ${subType}`);
                return false;
        }
    }
    notice_group_ban(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'ban':
                return this.emit('notice.group_ban.ban', json);
            case 'lift_ban':
                return this.emit('notice.group_ban.lift_ban', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_group_ban_type: ${subType}`);
                return false;
        }
    }
    notice_group_decrease(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'leave':
                return this.emit('notice.group_decrease.leave', json);
            case 'kick':
                return this.emit('notice.group_decrease.kick', json);
            case 'kick_me':
                return this.emit('notice.group_decrease.kick_me', json);
            case 'disband':
                return this.emit('notice.group_decrease.disband', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_group_decrease_type: ${subType}`);
                return false;
        }
    }
    notice_group_increase(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'approve':
                return this.emit('notice.group_increase.approve', json);
            case 'invite':
                return this.emit('notice.group_increase.invite', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_group_increase_type: ${subType}`);
                return false;
        }
    }
    notice_essence(json) {
        const subType = json['sub_type'];
        switch (subType) {
            case 'add':
                return this.emit('notice.essence.add', json);
            case 'delete':
                return this.emit('notice.essence.delete', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_essence_type: ${subType}`);
                return false;
        }
    }
    notice_notify(json) {
        const sub_type = json['sub_type'];
        switch (sub_type) {
            case 'group_name':
                return this.emit('notice.notify.group_name', json);
            case 'title':
                return this.emit('notice.notify.title', json);
            case 'input_status':
                return this.notice_notify_input_status(json);
            case 'poke':
                return this.notice_notify_poke(json);
            case 'profile_like':
                return this.emit('notice.notify.profile_like', json);
            case 'gray_tip':
                return this.emit('notice.notify.gray_tip', json);
            default:
                logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_notify_type: ${sub_type}`);
                return false;
        }
    }
    notice_notify_input_status(json) {
        if (json.group_id !== 0) {
            return this.emit('notice.notify.input_status.group', json);
        }
        else {
            return this.emit('notice.notify.input_status.friend', json);
        }
    }
    notice_notify_poke(json) {
        if ('group_id' in json) {
            return this.emit('notice.notify.poke.group', json);
        }
        else {
            return this.emit('notice.notify.poke.friend', json);
        }
    }
}
