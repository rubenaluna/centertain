<script setup lang="ts">
import type { Friend } from '@/models/friends'
import type { Point } from '@/models/geo'
import { useStore } from '@/state/store'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'
import GeocodedInput from '../Base/GeocodedInput.vue'

interface FriendProps {
  friend: Friend
}

const { friend } = defineProps<FriendProps>()

const store = useStore()

const isEditingName = ref(false)

const toggleEditingName = () => {
  isEditingName.value = !isEditingName.value
}

const handleNameChange = (event: Event) => {
  const { value } = <HTMLInputElement>event.target
  store.setFriendName(friend.id, value)
}

const handleNameKeyPress = (event: KeyboardEvent) => {
  if (event.key == 'Enter') {
    isEditingName.value = false
  }
}

const handleNameFocusOut = () => {
  isEditingName.value = false
}

const handleLocationChanged = (position?: Point) => {
  store.setFriendPosition(friend.id, position)
}
</script>

<template>
  <div class="FriendContainer">
    <div class="FriendCard">
      <div class="FriendField">
        <div v-if="!isEditingName">
          <label class="FriendName">{{ friend.name }}</label>
          <button class="FriendEditNameButton" @click="toggleEditingName">
            <Icon icon="radix-icons:pencil-1" />
          </button>
        </div>
        <div v-else>
          <input
            class="FriendNameInput"
            type="text"
            @change="handleNameChange"
            @keypress="handleNameKeyPress"
            @focusout="handleNameFocusOut"
            :value="friend.name"
          />
        </div>
      </div>
      <div class="FriendField">
        <Icon class="FriendLocationIcon" icon="radix-icons:sewing-pin" />
        <GeocodedInput @change="handleLocationChanged" class="FriendLocationInput" />
      </div>
    </div>
  </div>
</template>

<style>
input {
  all: unset;
}

.FriendContainer {
  padding: 10px;
  vertical-align: middle;
}

.FriendCard {
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 0px 0px #bbbbbb;
  transition: box-shadow 200ms;
}

.FriendCard:hover {
  box-shadow: 0px 0px 5px 5px #bbbbbb;
  transition: box-shadow 200ms;
}

.FriendField {
  display: flex;
  margin: 10px;
  align-items: center;
}

.FriendName {
  font-size: 25px;
  font-weight: bold;
}

.FriendEditNameButton {
  height: 20px;
  width: 25px;
  border: none;
  background-color: #cccccc;
}

.FriendNameInput {
  font-weight: bold;
  border-radius: 4px;
  padding: 0 10px;
  height: 35px;
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #bbbbbb;
}

.FriendLocationInput {
  width: 100%;
  margin: 0px 10px;
}
</style>
