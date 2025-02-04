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

const handleColorChanged = (color: string) => {
  store.setFriendColor(friend.id, color)
}

const handleFriendRemoved = (id: string) => {
  store.removeFriend(id)
}
</script>

<template>
  <div class="FriendContainer">
    <div class="FriendCard">
      <div class="FriendField">
        <div>
          <color-picker
            class="FriendColorPicker"
            :pure-color="friend.color"
            format="hex"
            shape="circle"
            disable-history
            disable-alpha
            @update:pureColor="handleColorChanged"
          />
        </div>
        <div v-if="!isEditingName" class="FriendName">
          <label class="FriendNameLabel">{{ friend.name }}</label>
          <button class="FriendButton" @click="toggleEditingName">
            <Icon class="FriendIcon" icon="radix-icons:pencil-1" />
          </button>
        </div>
        <input
          v-else
          class="FriendNameInput"
          type="text"
          @change="handleNameChange"
          @keypress="handleNameKeyPress"
          @focusout="handleNameFocusOut"
          :value="friend.name"
        />

        <button
          @click="() => handleFriendRemoved(friend.id)"
          class="FriendButton FriendTrashButton"
        >
          <Icon class="FriendIcon" icon="radix-icons:trash" />
        </button>
      </div>
      <div class="FriendField">
        <Icon class="FriendIcon" icon="radix-icons:sewing-pin" />
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
  width: 100%;
  margin: 10px;
  align-items: center;
}

.FriendName {
  display: flex;
  align-items: center;
  background-color: inherit;
}

.FriendNameLabel {
  font-size: 20px;
  font-weight: bold;
  margin: 0px 10px;
}

.FriendButton {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 0px #bbbbbb;
  transition: box-shadow 200ms;
}

.FriendButton:hover {
  box-shadow: 0px 0px 5px 5px #bbbbbb;
  transition: box-shadow 200ms;
}

.FriendNameInput {
  border-radius: 4px;
  padding: 0px 10px;
  margin: 0px 10px;
  width: 100%;
  height: 35px;
  background-color: #ffffff;
}

.vc-color-wrap[data-v-354ca836] {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  border-color: #999999;
}

.vc-color-wrap.round[data-v-354ca836] {
  width: 15px;
  height: 15px;
  border-color: #bbbbbb;
}

.FriendNameSpace {
  width: 100%;
}

.FriendIcon {
  width: 15px;
  height: 15px;
}

.FriendLocationInput {
  width: 100%;
  margin: 0px 10px;
}

.FriendTrashButton {
  margin-left: auto;
}
</style>
