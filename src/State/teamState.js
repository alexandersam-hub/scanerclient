import responseService from "../Services/responseService";
import config from "../confing";
import defaultData from "./defaultData";

class TeamState{

    async getData(){
        const res = await responseService.responseApiServer(config.URL_TICKETS_GET)
        if(res){
            if(!res.warning && res.tickets){
                localStorage.setItem('tickets',JSON.stringify(res.tickets))
                return res
            }
        }
        let localData = JSON.parse(localStorage.getItem('tickets'))
        if(!localData){
            localData = defaultData.tickets
        }
        return {warning:false, tickets:localData}

    }
    async getColors (){
        const res = await  responseService.responseApiServer(config.URL_COLOR_GET)
        if(res){
            if(!res.warning && res.colors){

                    localStorage.setItem('colors', JSON.stringify(res.colors))
                return res
            }
        }
        let localData = JSON.parse(localStorage.getItem('colors'))
        if(!localData){
            localData = defaultData.colors
        }
        return  {warning:false, colors:localData}
    }

}

export default new TeamState()