interface MetaAPI {
  _aioseop_description: string
}

export default interface Meta {
  description: string
  featuredImage?: string
}

export function convertMetaAPItoMeta(contentAPI: MetaAPI, embeddedData?: any) {
  const featuredImage =
    embeddedData &&
    embeddedData['wp:featuredmedia'] &&
    embeddedData['wp:featuredmedia'][0] &&
    embeddedData['wp:featuredmedia'][0].source_url

  return {
    description: contentAPI._aioseop_description ? contentAPI._aioseop_description : null,
    featuredImage: featuredImage ? featuredImage : null,
  }
}
