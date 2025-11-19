async function fetchdata(place){
    const URL = `https://api.weatherapi.com/v1/current.json?key=349d8763b3b64ec697564307251611&q=${place}`;
    try{
        const info = await fetch(URL);
        const data = await info.json();
        let dataCollectorObject={
            ID:Date.now(),
            location:data.location.name, 
            region:data.location.region, 
            country:data.location.country, 
            temp_c:data.current.temp_c, 
            temp_f:data.current.temp_f, 
            humidity:data.current.humidity, 
            wind:data.current.wind_kph, 
            uv:data.current.uv, 
            localtime:data.location.localtime
        }
        return dataCollectorObject;
    } catch(error){
        console.log(error, "API fetch was unsuccessful");
    }
};

async function ReFetchData(OnePlace){
    const url = `https://api.weatherapi.com/v1/current.json?key=349d8763b3b64ec697564307251611&q=${OnePlace.location}`;
    try{
        const Info=await fetch(url);
        const Data=await Info.json();
        OnePlace.temp_c=Data.current.temp_c;
        OnePlace.temp_f=Data.current.temp_f;
        OnePlace.humidity=Data.current.humidity;
        OnePlace.wind=Data.current.wind_kph;
        OnePlace.uv=Data.current.uv;
        OnePlace.localtime=Data.location.localtime;
        console.log("Refresh successful!!")
        return true;
    } catch(error){
        alert("Couldn't refresh for ", OnePlace.location);
        console.log(error )
        return false;
    }
}

const input=document.querySelector(".City-Name");

input.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){
        CheckForPlace();
    }
})

const CheckButton = document.querySelector('.check-button');

CheckButton.addEventListener('click', ()=>{
    CheckForPlace();
});

async function CheckForPlace(){
    try{
        let PlaceName= document.querySelector(".City-Name").value.trim();
        if(!/^[A-Za-z\s]+$/.test(PlaceName)){
            alert('Enter letters only');
            return (console.error('Enter letters only'));
        }
        PlaceName=PlaceName.charAt(0).toUpperCase() + PlaceName.toLowerCase().slice(1);
        console.log(PlaceName);
        const Duplicate=DataArray.find(object=>object.location===PlaceName);
        if(Duplicate){
            alert("Don't enter same place again, Instead try refresh");
            return false;
        }
        const PlaceData=await fetchdata(PlaceName);
        StoreData(PlaceData);
        render();
        console.log("Data fetched successfully!!")
        document.querySelector(".City-Name").value="";
    } catch(error){
        console.log('Failed to get the data');
    }
}


function render(){
    const ResultContainer=document.querySelector('.Result-Grid');
    if(DataArray.length>0){
        ResultContainer.innerHTML="";
        DataArray.forEach((SingleData)=>{
            const SingleContainer = CreateRenderElement(SingleData);
            ResultContainer.appendChild(SingleContainer);  
        })
    } else{
        ResultContainer.innerHTML="";
    }
};

render();

function CreateRenderElement(OnePlaceData){
    const Container=document.createElement('div');
    Container.className="SinglePlaceData";

    const LocationElement=document.createElement('h1');
    LocationElement.textContent=`City : ${OnePlaceData.location}`;

    const RegionElement=document.createElement('h2');
    RegionElement.textContent=`State : ${OnePlaceData.region}`;

    const CountryElement=document.createElement('h2');
    CountryElement.textContent=`Country : ${OnePlaceData.country}`;

    const TempcElement=document.createElement('p');
    TempcElement.textContent="Temperature in Celsius : ";

    const bold=document.createElement('b');
    bold.textContent=OnePlaceData.temp_c;
    TempcElement.appendChild(bold);

    const TempfElement=document.createElement('p');
    TempfElement.textContent=`Temperature in Fahrenheit: ${OnePlaceData.temp_f}`;

    const HumidityElement=document.createElement('p');
    HumidityElement.textContent=`Humidity : ${OnePlaceData.humidity}`;

    const WindElement=document.createElement('p');
    WindElement.textContent=`Wind Speed in kph ${OnePlaceData.wind}`;

    const UvElement=document.createElement('p');
    UvElement.textContent=`Uv : ${OnePlaceData.uv}`;

    const LocalTimeElement=document.createElement('p');
    LocalTimeElement.textContent=`Location Time : ${OnePlaceData.localtime}`;

    const ButtonsElement=document.createElement('div');
    ButtonsElement.className="ContainerButtons";

    const RefreshElement=document.createElement('button');
    RefreshElement.textContent="Refresh";
    RefreshElement.className="Refresh-Button";
    RefreshElement.setAttribute("data-id",OnePlaceData.ID );
    ButtonsElement.appendChild(RefreshElement);

    const DeleteElement=document.createElement('button');
    DeleteElement.textContent="Delete";
    DeleteElement.className="Delete-Button";
    DeleteElement.setAttribute("data-id",OnePlaceData.ID );
    ButtonsElement.appendChild(DeleteElement);

    //append all of the <p> to div
    Container.appendChild(LocationElement);
    Container.appendChild(RegionElement);
    Container.appendChild(CountryElement);
    Container.appendChild(TempcElement);
    Container.appendChild(TempfElement);
    Container.appendChild(HumidityElement);
    Container.appendChild(WindElement);
    Container.appendChild(UvElement);
    Container.appendChild(LocalTimeElement);
    Container.appendChild(ButtonsElement);

    return Container;
};


document.querySelector('.Result-Grid').addEventListener('click',async (e)=>{
    const btn=e.target;
    if(btn.matches('.Refresh-Button')){
        const RefreshId = Number(btn.getAttribute('data-id'));
        const SpecificContainer=DataArray.find(object => object.ID===RefreshId);
        console.log(SpecificContainer);
        if(SpecificContainer){
            await ReFetchData(SpecificContainer);
            localStorage.setItem('DATA', JSON.stringify(DataArray));
            render();
        }
    }
    if(btn.matches('.Delete-Button')){
        const DeleteId = Number(btn.getAttribute('data-id'));
        console.log(DeleteId);
        DataArray = DataArray.filter(object=> object.ID!==DeleteId );
        localStorage.setItem('DATA', JSON.stringify(DataArray));
        render();
    }
});