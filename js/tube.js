const clickHandler = async () => {
    const response = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const allData = data.data;
    clickFunction(allData);
}

const clickFunction = (allCategory) => {
    const clickContainer = document.getElementById('click-container');
    allCategory.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="getDetails('${category.category_id}')" class="tab m-1 md:m-2 bg-[#25252533] active:bg-[#FF1F3D] text-white rounded font-medium">${category.category}</a>
        `
        clickContainer.appendChild(div);
    })
}

let searchId = 1000;
const getDetails = async (categories, isTrue) => {
    const resp = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categories}`);
    const data = await resp.json();
    const wholeData = data.data;
    console.log(wholeData)
    searchId = categories;
    console.log(categories, isTrue);
        if(isTrue){
            wholeData.sort(function(a,b){
                let x = a.others.views;
                let y = b.others.views;
                let c = x.split('K');
                let d = y.split('K');
                let e = parseFloat(c[0]);
                let f = parseFloat(d[0]);
                console.log(e,f)
                return f-e;
            })
        }
    const dataContainer = document.getElementById('data-container');
    const nullContainer = document.getElementById('null-container');
    nullContainer.textContent = '';
    dataContainer.textContent = '';
    if(wholeData.length === 0){
        const nullContainer = document.getElementById('null-container');
        nullContainer.textContent = '';
        const div = document.createElement('div');
        div.classList = "w-1/2 mx-auto my-10 md:my-20 lg:my-40"
        div.innerHTML = `
        <div class="text-center space-y-3"> 
        <img class="flex mx-auto" src="./images/Icon.png" >
        <h1 class="text-xl md:text-2xl lg:text-4xl text-[#171717] font-bold"> Oops!! Sorry, There is no <br> content here </h1>
        </div>
        `
        nullContainer.appendChild(div)
    }
    wholeData.forEach((data) => {
        // console.log(data);
        const getTime = () => {
            const getSeconds = data.others.posted_date;
            const hours = parseInt(getSeconds / 3600);
            const remainingSeconds = getSeconds % 3600;
            const minutes = parseInt(remainingSeconds / 60);
            return `${hours}hrs ${minutes}min ago`
        }
        const div = document.createElement('div');
       div.innerHTML = ` 
      <img class="w-full md:h-[200px] lg:h-[250px] rounded-lg relative" src="${data?.thumbnail}" alt="Shoes" />
      
      
       <div class="flex gap-2 items-center mt-5">
       <img class="w-[40px] rounded-full" src="${data?.authors[0]?.profile_picture}" />
        <p class="font-bold text-[#171717]"> ${data?.title} </p>
        <p class="bg-[#171717] text-white rounded-lg absolute ml-32 mb-32 lg:ml-56 lg:mb-40">
        ${data?.others?.posted_date? getTime() : ""}
        </p>
       </div>
       <div class="flex my-3 gap-2"
       <h3 class="text-[#171717B3] text-sm"> ${data?.authors[0]?.profile_name} </h3>
       <p> ${data?.authors[0]?.verified? data.authors[0].verified.innerHTML=`<img src="./images/fi_10629607.svg">` : '' } </p>
       </div>
       <p class="text-[#171717B3] text-sm"> ${data?.others?.views || 'No Views'} Views</p>
       `
       dataContainer.appendChild(div);
    })
}
const sortByView = () => {
    getDetails(searchId,true);
}
clickHandler();
getDetails('1000');