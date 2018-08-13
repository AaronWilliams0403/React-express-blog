import Express from 'express';
import {MD5_SUFFIX, responseClient, md5} from '../util';
import User from '../../models/user';
const router = Express.Router();

router.post('/login',(req,res)=>{
    let {username,password} = req.body;
    if(!username){
        responseClient(res,400,2,'username is needed');
        return;
    }
    if(!password){
        responseClient(res,400,2,'password is needed');
        return;
    }
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if(userInfo){
            //login success
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            //set session
            req.session.userInfo = data;

            responseClient(res,200,0, 'login success', data);
            return;
        }
        responseClient(res,400,1,'wrong username or password');
    }).catch(err => {
        responseClient(res);
    })
});

module.exports = router;