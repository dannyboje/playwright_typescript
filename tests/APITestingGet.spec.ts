import {request, test} from "@playwright/test";

test("API Testing Get practice 1", async ({request})=>{

    const resp1 = await request.get("https://restful-booker.herokuapp.com/booking");
    console.log(await resp1.json());
    
})

test("API Testing Get practice 2", async ()=>{
    const reqContext = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com"

    });
    const resp2 = await reqContext.get("/booking");
    console.log(await resp2.json());
    
})

