import { defineStore } from 'pinia'
import type { Friend } from '../models/friends'
import { v4 } from 'uuid'

export interface State {
  friends: Map<string, Friend>
}

export const useState = defineStore('state', {
  state: (): State => ({ friends: new Map() }),
  getters: {
    getFriends: (state) => state.friends,
  },
  actions: {
    addFriend() {
      const id = v4()
      this.$state.friends.set(id, { id, name: 'New Friend' })
    },

    setFriendName(id: string, name: string) {
      this.$state.friends.get(id)!.name = name
    },

    setFriendAddress(id: string, location?: string) {
      this.$state.friends.get(id)!.location = location
    },
  },
})
