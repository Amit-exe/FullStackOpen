import axios from "axios";

let restaurantList
axios.get("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1760819&lng=73.02288949999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",{
            headers: {
                // Mimics a real browser to bypass bot detection
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://www.swiggy.com'
            }
        }).then((res)=>{
    restaurantList = res.data.cards[4];
    console.log(restaurantList);
    
});

export default restaurantList;
