import type { Point } from './geo'

export interface Friend {
  id: string
  name: string
  position?: Point
  color: string
}
