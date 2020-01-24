import PS from 'pubsub-js';

export function psTransform(topicIn, topicOut) {
    ps.subscribe(topicIn, (msg, data) => ps.publish(topicOut, data));
}
export var ps = PS;
