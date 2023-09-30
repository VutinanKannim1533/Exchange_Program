const currency_one = document.getElementById('currency-one');/* สร้างตัวแปร currency_one ให้เข้าถึง id currency-one(Dropdown) เพื่อเก็บค่าไว้ที่ currency_one */
const currency_two = document.getElementById('currency-two');/* สร้างตัวแปร currency_two ให้เข้าถึง id currency-two(Dropdown) เพื่อเก็บค่าไว้ที่ currency_two */

const amount_one = document.getElementById('amount-one');/* สร้างตัวแปร amount_one ให้เข้าถึง id amount-one(Input) เพื่อเก็บค่าไว้ที่ amount_one */
const amount_two = document.getElementById('amount-two');/* สร้างตัวแปร amount_two ให้เข้าถึง id amount-two(Input) เพื่อเก็บค่าไว้ที่ amount_two */

const rateText = document.getElementById('rate');/* สร้างตัวแปร rateText ให้เข้าถึง id rate เพื่อเก็บค่าไว้ที่ rateText */
const swap = document.getElementById('btn');/* สร้างตัวแปร swap ให้เข้าถึง id btn เพื่อเก็บค่าไว้ที่ swap */
/* 2 อันสุดท้ายใช้แสดงผล Block swap Container */
currency_one.addEventListener('change', calculateMoney);/* addEventListener ดักจับ event ที่ถูกส่งออกมาจากตัวแปร currency_one โดยใช้ change เนื่องจาก currency_one เป็น Dropdown*/
currency_two.addEventListener('change', calculateMoney);/* addEventListener ดักจับ event ที่ถูกส่งออกมาจากตัวแปร currency_two โดยใช้ change เนื่องจาก currency_two เป็น Dropdown*/
amount_one.addEventListener('input', calculateMoney)/* addEventListener ดักจับ event ที่ถูกส่งออกมาจากตัวแปร amount_one โดยใช้ change เนื่องจาก amount_one เป็น Button*/
amount_two.addEventListener('input', calculateMoney)/* addEventListener ดักจับ event ที่ถูกส่งออกมาจากตัวแปร amount_two โดยใช้ change เนื่องจาก amount_two เป็น Button*/
function calculateMoney() { /* calculateMoney คือ Function โดย Function calculateMoney จะรับค่าจาก currency_one และcurrency_two*/
    const one = currency_one.value; /* one คือตัวแปรที่เอาไว้รับค่าจาก currency_one (currency-one(Dropdown)) */
    const two = currency_two.value; /* one คือตัวแปรที่เอาไว้รับค่าจาก currency_one (currency-one(Dropdown)) */
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)/* Function Fetch จะ return ค่า Function promise มาใช้งาน โดย copy ชอง link API โดยต้องต่อด้วยการสกุลเงินต้นทาง คือ ตัวแปร one */
        .then(res => res.json()).then(data => { /* return ค่าจาก Function promise มาใช้งานต่อเนื่องให้ใช้ Function then โดยจะได้ข้อมูลตอบกลับเป็น json จากนั้นค่าจะถูกเก็บที่ data*/
            const rate = data.rates[two];/* data.rates จะตอบกลับเป็นค่าของสกุลเงินอื่นๆเอาไว้ ตย. 1 THB 0.31696 USD  */
            rateText.innerText = `1 ${one} = ${rate} ${two}`;/* เอาไว้แสดงค่าตอนคำนวนเสร็จแล้ว ${rate} = ค่าสกุลเงินปลายทาง */
            amount_two.value = (amount_one.value * rate).toFixed(2);/* นำค่า amount_one.value * rate และกำนดให้มีทศนิยม 2 ตำแหน่ง toFixed(2) */
        })
}
swap.addEventListener('click', () => { /* กำหนด Event ที่ปุ่มเพื่อทำการสลับค่า */
    // USD => THB || THB => USD 
    // TEMP => USD || THB = TEMP (USD)
    const temp = currency_one.value; // เก็บค่าสกุลเงินต้นทางที่ตัวแปร temp(ตัวแปรชั่วคราวเอาไว้เก็บค่า)
    currency_one.value = currency_two.value; /* เปลี่ยนค่า currency_one.value เป็น currency_two.value */
    currency_two.value = temp; /* เอาตัวแปร temp เก็บไว้ใน currency_two.value */
    calculateMoney();/* คำนวนฟังก์ชั่นใหม่อีกรอบ */
})

calculateMoney();/* ถ้าอยากให้ Function แสดงตั้งแต่เริ่มต้นให้ใส่ไว้แบบนี้ */



