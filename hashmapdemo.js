
 var map = new Map();//Empty 
 var cars1 = [0,0,0,0,0];
 var cars2 = [0,0,0,0,0];
 var map = new Map([[1, cars1], [2, cars2]]); // 1-> Sam, 2->John 
function updateTrip (id,distance) {
   
console.log(map);
map.get(id).sort();
map.get(id).push(distance);
map.get(id).sort();
map.get(id).splice(0,1);
console.log(map);
}


updateTrip(2,3)
