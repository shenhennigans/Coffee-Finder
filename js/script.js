
function time(){
    var now= moment().format("dddd");
    if(now == "Sunday"){
        var weekday = 0
    } else if (now =="Monday"){
        var weekday = 1
    } else if (now == "Tuesday"){
        var weekday = 2
    } else if (now=="Wednesday"){
        var weekday = 3
    } else if (now =="Thursday"){
        var weekday = 4
    } else if (now == "Friday"){
        var weekday = 5
    } else if (now == "Saturday"){
        var weekday = 6
    } else {
        console.log("oops, something went wrong converting weekdays")
    }
    coffeecall(weekday);
}

function coffeecall(weekday){
    delete_table();
    var open_list = [];
    var request_list = [];
    var map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: 51.903614, lng: -8.468399},
        zoom: 15
    }); 
    var place_list = ["ChIJ71NSoA-QREgRSi5-5BHm3rY","ChIJZQx2URiQREgR-IrnCqqKRQA","ChIJtQP4UhCQREgRMsUvHPZO6fI","ChIJCVc1oBCQREgR5fMws2OyUC8","ChIJh5de6RqQREgR2jn1JXzZMvs","ChIJk9vL0xaQREgRvI49nyqC_7o","ChIJK4qBWw6QREgRtMorlPJ5kKo","ChIJZxVqggWQREgRz_v7tdgcWKE","ChIJIT9A9Q-QREgRefkAx34T_Yo","ChIJtYH14A-QREgRxyB6M683veM","ChIJp6lWZRGQREgRMmC6w1hWLDc","ChIJG9LbsBaQREgR9BBXD1EtS8o","ChIJf9xyhBmQREgRuxYbOT8ZGAc","ChIJ6Z8_ANGRREgRCUDOKP4Bppg","ChIJacu1wA-QREgRfB5BS0A-LXw","ChIJq4ERkxeQREgRdtS2u-zpZsU","ChIJD2uNdReQREgRbZ4vfjxOQG8"];
    var place_length = place_list.length;

    for (i = 0; i < place_length; i++){
        var request = {
            placeId : place_list[i],
            fields: ['name', 'rating', 'vicinity', 'opening_hours']
        };
        request_list.push(request);

        (function (i) {
            // console.log(request_list[i]);
            setTimeout(function (){
                service = new google.maps.places.PlacesService(map);
                service.getDetails(request_list[i], callback);
                
            }, 300 * i);
        })(i);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var is_open = place.opening_hours.open_now;
                if(is_open == true){
                    list_setup(place, weekday, open_list);
                } else {
                    console.log(place.name + " not open")
                }
            }
        } 
    }
    
}

function list_setup(place,weekday, open_list){
    var name = place.name;
    var rating = place.rating;
            
    if(rating < 0.5){
        star_rating = "<span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 0.5 && rating < 1){
        star_rating = "<span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 1 && rating < 1.5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 1.5 && rating < 2){
        star_rating = "<span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 2 && rating < 2.5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 2.5 && rating < 3){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 3 && rating < 3.5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    } else if(rating >= 3.5 && rating < 4){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span>";
    } else if(rating >= 4 && rating < 4.5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='far fa-star'></span>";
    } else if(rating >= 4.5 && rating < 5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span>";
    } else if(rating = 5){
        star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>";
    } else {
        console.log("oops, something went wrong with the rating");
    }

    if(name=="Portafilter"){
        var address = "88 North Main Street";
    } else if(name =="pop* coffee"){
        var address = "11 Saint Patrick's Quay";
    }else {
        var address_raw = place.vicinity;
        var address = address_raw.slice(0,-6);
    }
            
    if(name=="Café Eco"){
        var close ="open 24hrs";
    } else {
        var close_raw = place.opening_hours.periods[weekday].close.time;
        var close = close_raw.slice(0, 2) + ":" + close_raw.slice(2);
    }
    var open_entry = name+address+rating
    open_list.push(open_entry);
    create_table(name, star_rating,address,close, open_entry,open_list);
}

function create_table(name,star_rating,address,close, open_entry,open_list){
    var tr = document.createElement("tr");
    document.getElementById("coffee-table").appendChild(tr);

    var td_name = document.createElement("td");
    var node_name = document.createTextNode(name);
    tr.appendChild(td_name);
    td_name.appendChild(node_name);

    var td_address = document.createElement("td");
    var node_address = document.createTextNode(address);
    tr.appendChild(td_address);
    td_address.appendChild(node_address);

    var td_close = document.createElement("td");
    var node_close = document.createTextNode(close);
    tr.appendChild(td_close);
    td_close.appendChild(node_close);

    var index = open_list.indexOf(open_entry);

    var td_rating = document.createElement("td");
    td_rating.id= "td_rating-"+index;
    tr.appendChild(td_rating);
    document.getElementById("td_rating-"+index).innerHTML= star_rating;
}

function delete_table(){
var clear = document.getElementById("coffee-table");
clear.innerHTML = '';
}
