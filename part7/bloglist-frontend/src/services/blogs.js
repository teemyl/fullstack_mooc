import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${ newToken }`
}

const getConfigs = () => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const response = await axios.post(
    baseUrl,
    blog,
    getConfigs()
  )
  return response.data
}

const update = async blog => {
  const response = await axios.put(
    `${ baseUrl }/${ blog.id }`,
    blog,
    getConfigs()
  )
  return response.data
}

const remove = async blog => {
  return await axios.delete(
    `${ baseUrl }/${ blog.id }`,
    getConfigs()
  )
}

const createComment = async (blog, comment) => {
  const response = await axios.post(
    `${ baseUrl }/${ blog.id }/comments`,
    comment,
    getConfigs()
  )
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  createComment
}