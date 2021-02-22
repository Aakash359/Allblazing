import RtmEngine from 'agora-react-native-rtm';
import { EventEmitter } from 'events';
import { Logger } from './utils';

const config = require('../../agora.config.json');

export default class RtmAdapter extends EventEmitter {
 
  constructor() {
    super();
    this.uid = null;
    this.client = new RtmEngine();
    const events = [
      'tokenExpired',
      'remoteInvitationRefused',
      'remoteInvitationFailure',
      'remoteInvitationCanceled',
      'remoteInvitationAccepted',
      'messageReceived',
      'localInvitationRefused',
      'localInvitationReceivedByPeer',
      'localInvitationFailure',
      'localInvitationCanceled',
      'localInvitationAccepted',
      'error',
      'connectionStateChanged',
      'channelMessageReceived',
      'channelMemberLeft',
      'channelMemberJoined',
      'remoteInvitationReceived',
    ];
    events.forEach((event) => {
      // @ts-ignore
      this.client.on(event, (evt) => {
        console.warn(event, evt);
        this.emit(event, evt);
      });
    });
  }

  async login(uid) {
     console.log("dtaaaa",{ uid: uid,
      token: config.token,})
    await this.client.createClient(config.appId);
    this.uid = uid;
    return this.client.login({
      uid: this.uid,
      token: config.token,
    });
    this.client.sendMessageToPeer()
  }

   async logout(){
    await this.client.logout();
    Logger.log('logout success');
  }

   async join(cid) {
    return this.client.joinChannel(cid);
  }

 async leave(cid) {
    return this.client.leaveChannel(cid);
  }

 async sendChannelMessage(param= {
    channel,
    message
  }) {
    return this.client.sendMessageByChannelId(param.channel, param.message);
  }

 async destroy() {
    await this.client.destroyClient();
    Logger.log('destroy');
  }
}
