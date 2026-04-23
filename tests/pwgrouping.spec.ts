import {test, expect, Locator} from "@playwright/test";


test.describe('Group1', async()=>{
    test ('Test 1', async ({page})=> {
        console.log("This is Test 1.....");
    
    });
    
    test ('Test 2', async ({page})=> {
        console.log("This is Test 2.....");
    
    });

})

test.describe('Group2', async()=>{

    test ('Test 3', async ({page})=> {
        console.log("This is Test 3.....");
    
    });
    
    test ('Test 4', async ({page})=> {
        console.log("This is Test 4.....");
    
    });
})
