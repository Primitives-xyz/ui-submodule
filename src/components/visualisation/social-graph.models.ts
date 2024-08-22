export interface INode {
  id: string
  caption: string
  color?: string
}

export interface IRelationship {
  id: string
  from: string
  to: string
  type?: string
  color?: string
}
