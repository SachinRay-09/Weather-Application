let DataArray=JSON.parse(localStorage.getItem('DATA')) || [];

function StoreData(dataObject){
    DataArray.push(dataObject);
    localStorage.setItem('DATA', JSON.stringify(DataArray));
};
