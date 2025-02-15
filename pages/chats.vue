<script>
export default {
  name: "App",
  data() {
    return {
      chats: [
        { id: 1, name: "Ivan", messages: [] },
        { id: 2, name: "Anton", messages: [] },
      ],
      messages: [],
      selectedChat: null,
      username: '',
      connect: false
    };
  },
  methods: {
    setSelectedChat(chat) {
      this.selectedChat = chat;
      this.loadMessages()
    },
    async loadMessages(){
        let {data} = await useFetch(`/api/messages/${this.username}?sender=${this.selectedChat}`)
    },
    handleConnect(){
        if(this.username.length > 0){
            this.connect = true
            this.socket = io('ws://localhost:3000');
            this.socket.emit('logged_in', {username: this.username})
            this.socket.on('chat message', (data)=>{
                this.chats.find(chat => chat.name === data.sender).messages.push({text: data.text, sender: data.username, reciever: data.reciever})
            })
        }
    },
    sendMessage(data){
        this.socket.emit('chat message',{sender:this.username, text: data.text, reciever: this.reciever})
    }
  },
};
</script>
<template>
  <div class="app">
    <div class="row">
        <div class='col-4 form-container' v-if="!connect"></div>
        <form @submit.prevent="handleConnect">
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model="user" placeholder="Имя пользователя">
                    </div>
                    <button class="btn btn-primary">Войти в чат</button>
                </div>
            </div>
        </form>
    </div>
    <Sidebar v-if="connect"/>
    <div class="content" v-if="connect">
      <ChatList :chats="chats" @chat-selected="setSelectedChat"/>
      <ChatWindow v-if="selectedChat" :chat="selectedChat"/>
    </div>
  </div>
</template>



<style>
.app {
  display: flex;
}
.content {
  flex: 1;
  display: flex;
}
</style>