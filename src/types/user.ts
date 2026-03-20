declare global {
  namespace UserTypes {
    type ApiUser = {
      id: number
      name: string
      username: string
      email: string
      company: {
        name: string
      }
    }

    type UserRow = {
      id: number
      name: string
      username: string
      email: string
      company: string
    }
  }
}

export {}
