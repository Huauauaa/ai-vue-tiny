declare namespace UserTypes {
  export type ApiUser = {
    id: number
    name: string
    username: string
    email: string
    company: {
      name: string
    }
  }

  export type UserRow = {
    id: number
    name: string
    username: string
    email: string
    company: string
  }
}
