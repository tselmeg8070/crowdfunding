import axios from "axios";

class Server {
    authState() {
        const url = process.env.REACT_APP_API_URL+'/state';
        return axios.get(url, {headers: {"Authorization": JSON.parse(localStorage.getItem('authUser'))}})
        // return new Promise((resolve, reject)=> {
        //     resolve('J7dsahjkh868jncxz6');
        // })
    }
    authRegister(data) {
        const url = process.env.REACT_APP_API_URL+'/register';
        return axios.post(url, data);
    }
    authSignIn(data) {
        const url = process.env.REACT_APP_API_URL+'/login';
        return axios.post(url, data);
    }
    /**
     * Create house object in database
     * @param data - Object of house
     * @return Promise
     */
    doAddOrEditHousePlan(data, id, activity) {
        const url=process.env.REACT_APP_API_URL+'/houses';
        if(activity === undefined) {
            delete data.dummy;
            data.images = [];
            let check = 0;
            data.post.blocks = data.post.blocks.filter(block => {
                if (block.type === 'image' && check === 0) {
                    data.images.push(block.data.file.url);
                } else {
                    check = 1;
                }
                return check === 1 && block;
            });
            data.area = parseInt(data.area);
            data.floors = parseInt(data.floors);
            data.price = parseInt(data.price);
            data.rooms = parseInt(data.rooms);
            data.offers = {};
            data.activitiesTemp = data.activities;
            data.activities.map((activity) => {
                data.offers[activity.value] = {};
                data.activitiesTemp[activity.id] = activity.value;
                return activity
            });
            data.activities = data.activitiesTemp;
            delete data.activitiesTemp;

            data.materials.map(material => {
                delete data.materials[material.id].id;
                return material
            });
            data.blocks =  data.post.blocks;
            delete data.post;
            console.log(data);
            if (id !== undefined) {
                return axios.put(url+'/'+id, {data})
            }  else {
                return axios.post(url, {data})
            }
        } else {
            return axios.put(url+'/'+id, {data})
        }

    }



}
export default Server
