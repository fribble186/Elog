import axios from "axios";

export default function (url) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/configs/${url}`,
    }).then((response) => {
      console.log(`${url} online data loaded`)
      resolve(response.data)
    }).catch(()=>{  // 降级用本地
      import(`./${url}`)
      .then((json)=>{
        console.log(`downgrade!!! ${url} local data loaded`)
        resolve(json)
      })
      .catch(e => reject(e))
    });
  })
}