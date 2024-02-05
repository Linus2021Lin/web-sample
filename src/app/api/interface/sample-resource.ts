export interface SampleDataListResponse {
  sampleDataList: SampleDataResponse[];
}

export interface SampleDataResponse {
  id: number,
  name: string,
  ip: string,
  status: string,
  description: string
  createTime: number // timestamp
}

export interface SampleDataPostSchema {
  name: string,
  ip: string,
  description?: string
}

export interface SampleDataPostResponse {
  id: number,
  name: string,
  ip: string,
  description?: string
}

export interface SampleDataPutSchema {
  name: string,
  description: string
}

export interface SampleDataPutResponse extends SampleDataResponse {}

export interface SampleDataDeleteSchema {
  sampleDataIdList: string[]
}
