import type { Point } from '@/models/geo'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'
import type { Friend } from '../models/friends'

export interface State {
  friends: Map<string, Friend>
}

export const useStore = defineStore('store', {
  state: (): State => ({ friends: new Map() }),
  getters: {
    getFriends: (state) => state.friends,
  },
  actions: {
    addFriend() {
      const id = v4()
      this.$state.friends.set(id, {
        id,
        name: 'Friend',
        color: getRandomColor(),
      })
    },

    setFriendName(id: string, name: string) {
      this.$state.friends.get(id)!.name = name
    },

    setFriendColor(id: string, color: string) {
      this.$state.friends.get(id)!.color = color
    },

    async setFriendPosition(id: string, position?: Point) {
      this.$state.friends.get(id)!.position = position
    },

    removeFriend(id: string) {
      this.$state.friends.delete(id)
    },
  },
})

const getRandomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
}
