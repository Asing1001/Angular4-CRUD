var envprop=this; 
delete envprop.id;
var resultAr = []; 
dpd.envprops.get(envprop ,function(result){
    if (result) {
        resultAr = result;
        if (resultAr.length === 0){
            emit ("success",envprop);
         }
        else {
            error("Duplicate", "same entry already exist");
        }
}});