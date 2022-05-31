import config from "../confing";
// import Cookies from 'js-cookie';

class ResponseService{
   async responseApiServer(to, data={}){
        try{
            const response = await fetch(config.URL_API+to,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            return result
        }catch (e) {
            return null
        }

   }
}

export default new ResponseService()