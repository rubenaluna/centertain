import type { Point } from '@/models/geo'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'
import type { Friend } from '../models/friends'

export interface State {
  friends: Map<string, Friend>
  center: Point
}

export const useStore = defineStore('store', {
  state: (): State => ({ friends: new Map(), center: { latitude: 0, longitude: 0 } }),
  getters: {
    getFriends: (state) => state.friends,
    getCenter: (state) => state.center,
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
      this._setCenter()
    },

    removeFriend(id: string) {
      this.$state.friends.delete(id)
      this._setCenter()
    },

    _setCenter() {
      if (this.$state.friends.size < 2) {
        this.$state.center == null
        return
      }

      let latSum = 0
      let lonSum = 0

      let count = 0
      this.$state.friends.forEach((friend) => {
        if (friend.position) {
          latSum += friend.position.latitude
          lonSum += friend.position.longitude
          count++
        }
      })

      if (count > 1) {
        this.$state.center = { latitude: latSum / count, longitude: lonSum / count }
      } else {
        this.$state.center = { latitude: 0, longitude: 0 }
      }
    },
  },
})

const getRandomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
}
