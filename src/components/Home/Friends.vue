<script setup lang="ts">
import { useStore } from '@/state/store.ts'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Friend from './Friend.vue'

const { friends, addFriend } = useStore()
</script>

<template>
  <div class="FriendsContainer">
    <div class="FriendsContent">
      <div class="FriendsHeader">
        <div class="FriendsAdd"></div>
        <label class="FriendsTitle">Friends</label>
        <button class="FriendsAdd" @click="addFriend">
          <Icon icon="radix-icons:plus" />
        </button>
      </div>
      <div class="FriendsBody">
        <template v-if="!friends.size">
          <span class="FriendsEmptyMessage">Add friends by pressing the + button</span>
        </template>
        <div v-if="friends.size" class="FriendsList">
          <template v-for="friend in friends.values()" :key="friend.id">
            <Friend :friend="friend" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/grass.css';

hr {
  display: block;
}
.FriendsContainer {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  color: #333333;
  justify-content: center;
  background-color: rgba(200, 200, 200, 0.8);
  backdrop-filter: blur(5px);
  border-right: 1px solid #aaaaaa;
  z-index: 2;
}

.FriendsContent {
  width: 100%;
  height: 100%;
  opacity: 1;
}

.FriendsHeader {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}

.FriendsTitle {
  background-color: inherit;
  font-size: 20px;
  font-weight: bold;
}

.FriendsAdd {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 0px #bbbbbb;
  margin: 5px;
  transition: box-shadow 200ms;
}

.FriendsAdd:hover {
  box-shadow: 0px 0px 5px 5px #bbbbbb;
  transition: box-shadow 200ms;
}

.FriendsBody {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.FriendsList {
  width: 100%;
  height: 100%;
}

.FriendsEmptyMessage {
  display: flex;
  justify-content: center;
}
</style>
