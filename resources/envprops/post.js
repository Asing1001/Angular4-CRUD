var envprop=this; 
delete envprop.id;
var resultAr = []; 
dpd.envprops.get({date:envprop.date, env:envprop.env, key:envprop.key, projectName:envprop.projectName} ,function(result){
    if (result) {
        resultAr = result;
        if (resultAr.length === 0){
            emit ("success",envprop);
         }
        else {
            error("Duplicate", "same entry already exist");
        }
}});