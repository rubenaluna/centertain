<script setup lang="ts">
import { Label } from 'radix-vue'

const props = defineProps<{ friend: { name: string; address: string } }>()
</script>

<template>
  <div class="Friend">
    <div class="FriendGroup">
      <Label> Name </Label>
      <input class="Input" type="text" :value="props.friend.name" />
    </div>
    <div class="FriendGroup">
      <Label> Location </Label>
      <input class="Input" type="text" :value="props.friend.address" />
    </div>
  </div>
</template>

<style>
input {
  all: unset;
}

.Friend {
  margin: 10px;
  vertical-align: middle;
}

.FriendGroup {
  display: grid;
  margin: 10px;
}

.Input {
  border-radius: 4px;
  padding: 0 10px;
  height: 35px;
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #bbbbbb;
}
</style>
