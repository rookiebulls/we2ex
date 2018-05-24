import http from './http'
import { obj2Uri } from './index'

export const getHotTopics = () => http.get('topics/hot.json')

export const getTopicContent = (id) => http.get(`topics/show.json?id=${id}`)

export const getReplies = (query) => http.get(`replies/show.json?${obj2Uri(query)}`)

export const getLatestTopics = () => http.get('topics/latest.json')

export const getAllNodes = () => http.get('nodes/all.json')
