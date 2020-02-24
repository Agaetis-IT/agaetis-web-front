interface MetaAPI {
  _aioseop_description: string
}

export default interface Meta {
  description: string
}

export function convertMetaAPItoMeta(contentAPI: MetaAPI) {
  return {
    description: contentAPI._aioseop_description,
  }
}
