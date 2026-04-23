import {test} from "@playwright/test";

test.describe.configure({mode:'serial'})
test.describe('Group1', async()=>{
    test ('Test 1', async ({page})=> {
        console.log("This is Test 1.....");
    
    });
    
    test ('Test 2', async ({page})=> {
        console.log("This is Test 2.....");
    
    });
    test ('Test 3', async ({page})=> {
        console.log("This is Test 1.....");
    
    });
    test ('Test 4', async ({page})=> {
        console.log("This is Test 1.....");
    
    });
    test ('Test 5', async ({page})=> {
        console.log("This is Test 1.....");
    
    });

})