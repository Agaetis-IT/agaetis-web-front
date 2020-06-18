interface MetaAPI {
  _aioseop_description: string
}

export default interface Meta {
  description: string
  featuredImage?: string
}

export function convertMetaAPItoMeta(contentAPI: MetaAPI, embeddedData?: any) {
  return {
    description: contentAPI._aioseop_description,
    featuredImage:
      embeddedData &&
      embeddedData['wp:featuredmedia'] &&
      embeddedData['wp:featuredmedia'][0] &&
      embeddedData['wp:featuredmedia'][0].media_details &&
      embeddedData['wp:featuredmedia'][0].media_details.sizes &&
      embeddedData['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url,
  }
}
