import axios from 'axios'

export default async function postData(url: string, postId: number, name: string, mail: string, content: string) {
  await axios.post(url, {
    post: postId,
    author_name: name,
    author_email: mail,
    content,
  })
}
