


function checkAuthorisedRoute(path,role){
    let usernotauthorised=['/assignrole','/addrestaurant','/addcategory','/editcuisine','/trackorders'];
    let staffnotauthorised=['/assignrole','/addrestaurant'];
    if(role==='user'){
        if(usernotauthorised.includes(path)) return false;
    }
    if(role==="staff"){
        if(staffnotauthorised.includes(path)) return false;
    }
    return true;
}

module.exports=checkAuthorisedRoute;