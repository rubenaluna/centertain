<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'radix-vue'
import Friend from './Friend.vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
</script>

<template>
  <AccordionRoot class="AccordionRoot" type="multiple" :collapsible="true">
    <AccordionItem class="AccordionItem" value="title">
      <AccordionHeader class="AccordionHeader">
        <div class="AccordionTitle">
          <span class="AccordionTitleText">Friends</span>
          <button class="AccordionAdd" @click="onAddFriend">
            <Icon icon="radix-icons:plus" />
          </button>
        </div>
      </AccordionHeader>
    </AccordionItem>

    <template v-for="friend in friends" :key="friend.id">
      <AccordionItem class="AccordionItem" :value="friend.id">
        <AccordionHeader class="AccordionHeader">
          <AccordionTrigger class="AccordionTrigger">
            <span>{{ friend.name }}</span>
            <Icon icon="radix-icons:chevron-down" class="AccordionChevron" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="AccordionContent">
          <Friend :friend="friend" />
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>

<script lang="ts">
const friends = ref([{ id: uuidv4(), name: 'New Friend', address: '' }])

const onAddFriend = () => {
  friends.value.push({ id: uuidv4(), name: 'New Friend', address: '' })
}
</script>

<style>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/grass.css';

/* reset */
button,
h3 {
  all: unset;
}

.AccordionRoot {
  position: absolute;
  z-index: 999;
  margin: 10px;
  border-radius: 10px;
  width: 300px;
  color: #333333;
  box-shadow: 0px 0px 5px 5px var(--black-a4);
  background-color: #eeeeee;
}

.AccordionTitle {
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 15px;
}

.AccordionTitleText {
  margin-left: auto;
}

.AccordionAdd {
  outline: none;
  display: flex;
  margin-left: auto;
}

.AccordionAdd:hover {
  transform: scale(120%);
}

.AccordionItem {
  overflow: hidden;
  margin-top: 1px;
}

.AccordionItem:first-child {
  margin-top: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.AccordionItem:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.AccordionItem:focus-within {
  position: relative;
  z-index: 1;
}

.AccordionHeader {
  display: flex;
  background-color: #cccccc;
}

.AccordionTrigger {
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.AccordionTrigger:hover {
  background-color: #dddddd;
}

.AccordionContent[data-state='open'] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.AccordionContent[data-state='closed'] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.AccordionContentText {
  padding: 15px 20px;
}

.AccordionChevron {
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.AccordionTrigger[data-state='open'] > .AccordionChevron {
  transform: rotate(180deg);
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
