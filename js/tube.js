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
            <a onclick="getDetails('${category.category_id}')" class="tab m-2 bg-[#25252533] active:bg-[#FF1F3D] text-white ac rounded font-medium">${category.category}</a>
        `
        clickContainer.appendChild(div)
    })
}

const getDetails = async (categories) => {
    const resp = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categories}`);
    const data = await resp.json();
    const wholeData = data.data;
    console.log(wholeData)
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
        const getSeconds = data.others.posted_date;
        const hours = parseInt(getSeconds / 3600);
        const remainingSeconds = getSeconds % 3600;
        const minutes = parseInt(remainingSeconds / 60);
        if(hours === 0 && minutes === 0){
            
        }
        console.log(hours, minutes)
        const div = document.createElement('div');
       div.innerHTML = ` 
      <img class="w-full md:h-[200px] lg:h-[250px] rounded-lg relative" src="${data?.thumbnail}" alt="Shoes" />
       <div class="flex gap-2 items-center mt-5">
       <img class="w-[40px] rounded-full" src="${data?.authors[0]?.profile_picture}" />
         <p class="font-bold text-[#171717]"> ${data?.title} </p>
         <p class="absolute ml-32 mb-32 lg:ml-56 lg:mb-40 bg-[#171717] text-white rounded-lg px-0 py-0 md:px-2 md:py-1"> ${hours? hours : ""}hrs ${minutes? minutes : ""}min ago</p>
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

clickHandler();
getDetails('1000');