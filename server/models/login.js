UserModel.find ({
    email:email 
}, (err, oldAccounts)=> {
    if (err) {
        res.end ("Error: Server Error");


    } else if (oldAccounts.length>0) {
        res.end('Error: Account already Exist');
    }
}
})