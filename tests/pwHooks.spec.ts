import {test, expect } from "@playwright/test";

test.beforeEach('Before each',async()=>{
    console.log("This is Before each...");

})


test.afterEach('After each',async()=>{
    console.log("This is After each...");

})
test.beforeAll('Before All',async()=>{
    console.log("This is Before All...");

})

test.afterAll('After All',async()=>{
    console.log("This is After All...");

})


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
    console.log("This is Test 2.....");

});