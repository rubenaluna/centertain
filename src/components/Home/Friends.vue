<script setup lang="ts">
import { useStore } from '@/state/store.ts'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Friend from './Friend.vue'

const { friends, addFriend } = useStore()
</script>

<template>
  <div class="FriendsContainer">
    <div class="FriendsHeader">
      <div class="FriendsAdd"></div>
      <label class="FriendsTitle">Friends</label>
      <button class="FriendsAdd" @click="addFriend">
        <Icon icon="radix-icons:plus" />
      </button>
    </div>
    <div class="FriendsContent">
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
  width: 500px;
  height: 100%;
  color: #333333;
  justify-content: center;
  background-color: #cccccc;
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
  height: 20px;
  width: 25px;
  border: none;
  background-color: #cccccc;
}

.FriendsContent {
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
