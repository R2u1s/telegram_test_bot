export type TTrack = {
  url: string, 
  image: string,
  name: string,
  theme: string,
  length: string
}

export type TStore = {
  user: string,
  authRequest:boolean,
  authSuccess:boolean,
  authFailed:boolean,
  dataRequest:boolean,
  dataSuccess:boolean,
  dataFailed:boolean,
  tracks:TTrack[] | null
}


export type TResSuccess = {
  success: boolean
}

export type TRes = {
  quote: string
}

export type TProgress = {
  type: 'progress' | 'time' | 'done',
  progress?:string,
  time?:number
}

export type TCourse = {
  id:string,
  name: string,
  img: string,
  progress: string,
  done:boolean,
  description:string,
  duration:number,
  chapters:{
    id:string,
    name:string,
    image:string,
    duration:number,
    done:boolean,
    tracks:{
      id:string,
      name:string,
      duration:number,
      done:boolean
    }[]
  }[]
}

export type TUser = {
  accessToken:string,
  courses: TCourse[],
}

export const speedValues: string[] = [
  '0,5',
  '0,75',
  '1',
  '1,25',
  '1,5',
  '2'
]