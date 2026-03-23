declare global {
  namespace HomeTypes {
    type ApiPhoto = {
      albumId: number
      id: number
      title: string
      url: string
      thumbnailUrl: string
    }

    type PhotoCard = ApiPhoto & {
      rowSpan: number
    }
  }
}

export {}
