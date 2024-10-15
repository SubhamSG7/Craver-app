

export function checkDefault(assigned,options,type){
    let check=options.filter((val)=>val.name===assigned)
    
    if(type==='name') return check[0].name
    if(type==='_id') return check[0]._id
    
}