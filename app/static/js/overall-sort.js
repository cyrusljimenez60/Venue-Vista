let eventPlaceRecords = []; // Declare eventPlaceRecords globally
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/city/data/');
        const venues = await response.json();

        if (response.ok) {
            // Define Record constructor function
            function Record(eventtypes, features, venueid, packages, address, capacity, description, location, price, priceCategory, setting, title) {
                this.eventtypes = eventtypes;
                this.features = features;
                this.venueid = venueid;
                this.packages = packages;
                this.address = address;
                this.capacity = capacity;
                this.description = description;
                this.location = location;
                this.price = price;
                this.priceCategory = priceCategory;
                this.setting = setting;
                this.title = title;
            }

            // Map venues to Record objects and populate eventPlaceRecords
            eventPlaceRecords = venues.map(venue => new Record(
                (venue.event_types || '').split(',').map(s => s.trim()), // Split and trim event_types string into array, handle null/undefined
                (venue.features || '').split(',').map(s => s.trim()), // Split and trim features string into array, handle null/undefined
                venue.intVenueID,
                (venue.packages || '').split(',').map(s => s.trim()), // Split and trim packages string into array, handle null/undefined
                venue.strAddress,
                venue.strCapacityText,
                venue.strDescription,
                venue.strLocationText,
                venue.strPriceRangeText,
                venue.strPriceCategory,
                venue.strSetting,
                venue.strVenueName
            ));

            console.log(eventPlaceRecords); // For debugging purposes
            console.log(eventPlaceRecords[0]);
            

            // Further operations with eventPlaceRecords can be performed here
        } else {
            console.error('Error fetching venue data:', venues.error);
        }
    } catch (error) {
        console.error('Error fetching venue data:', error);
    }



    
    const bannerTitle = document.getElementsByClassName('city-title')[0];
    const previewTitle = document.getElementsByClassName('preview-records-title-title')[0];


    bannerTitle.textContent = 'VenueVista';
    bannerTitle.classList.add('animate-Up-Back');
    previewTitle.textContent = 'Explore Events Places around Metro Manila';



    const parameter1 = localStorage.getItem('parameter1');
    const parameter2 = localStorage.getItem('parameter2');
    const parameter3 = localStorage.getItem('parameter3');
    const parameter4 = localStorage.getItem('parameter4');
    const parameter5 = localStorage.getItem('parameter5');

    console.log(parameter1);

    
    if (parameter1 !== null) {
        switch (parameter1) {
            case 'p1':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P1,000 - P5,000');
                break;
            case 'p2':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P5,000 - P10,000');
                break;
            case 'p3':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P10,000 - P20,000');
                break;
            case 'p4':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P20,000 - P50,000');
                break;
            case 'p5':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P50,000 - P100,000');
                break;
            case 'p6':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P100,000 - P200,000');
                break;
            case 'p7':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.price === 'P200,000 - Above');
                break;
            default:
                // Handle unexpected cases or do nothing if not needed
                break;
        }
    }

    if (parameter2 !== null) {
        switch (parameter2) {
            case 'c1':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '1 - 10');
                break;
            case 'c2':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '10 - 20');
                break;
            case 'c3':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '20 - 50');
                break;
            case 'c4':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '50 - 100');
                break;
            case 'c5':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '100 - 300');
                break;
            case 'c6':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '300 - 500');
                break;
            case 'c7':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.capacity === '500 - Above');
                break;
            default:
                // Handle unexpected cases or do nothing if not needed
                break;
        }
    }

    if (parameter3 !== null) {
        switch (parameter3) {
            case 's1':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.setting === 'Indoor');
                break;
            case 's2':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.setting === 'Outdoor');
                break;
            default:
                // Handle unexpected cases or do nothing if not needed
                break;
        }
    }

    if (parameter4 !== null) {
        switch (parameter4) {
            case 'e1':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Birthdays'));
                break;
            case 'e2':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Concerts'));
                break;
            case 'e3':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Conference'));
                break;
            case 'e4':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Corporate Event'));
                break;
            case 'e5':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Entertainment'));
                break;
            case 'e6':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Festivals'));
                break;
            case 'e7':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Graduation'));
                break;
            case 'e8':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Outdoor Activities'));
                break;
            case 'e9':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Sports Events'));
                break;
            case 'e10':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.eventtypes.includes('Weddings'));
                break;
            default:
                // Handle unexpected cases or do nothing if not needed
                break;
        }
    }

    if (parameter5 !== null) {
        switch (parameter5) {
            case 'l1':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Caloocan');
                break;
            case 'l2':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Las Piñas');
                break;
            case 'l3':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Makati');
                break;
            case 'l4':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Malabon');
                break;
            case 'l5':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Mandaluyong');
                break;
            case 'l6':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Manila');
                break;
            case 'l7':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Marikina');
                break;
            case 'l8':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Muntinlupa');
                break;
            case 'l9':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Navotas');
                break;
            case 'l10':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Parañaque');
                break;
            case 'l11':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Pasay');
                break;
            case 'l12':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Pasig');
                break;
            case 'l13':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Quezon City');
                break;
            case 'l14':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'San Juan');
                break;
            case 'l15':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Taguig');
                break;
            case 'l16':
                eventPlaceRecords = eventPlaceRecords.filter(record => record.location === 'Valenzuela');
                break;
            default:
                // Handle unexpected cases or do nothing if not needed
                break;
        }
    }











    
    // Optionally, log the filtered records
    console.log(eventPlaceRecords);










function shakerSortNameAsc(array) {
    let swapFlag = true;
    let startIndex = 0;
    let endIndex = array.length;

    while (swapFlag) {

        // Left to Right Pass
        swapFlag = false; 

        
        for (let i = startIndex; i < endIndex - 1; i++) {
            if (array[i].title > array[i + 1].title) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }

        // If no Swaps, the Array is Sorted
        if (swapFlag == false) {
            break;
        }

        endIndex--;


        // Right to Left Pass
        swapFlag = false; 

        
        for (let i = endIndex - 1; i >= startIndex; i--) {
            if (array[i].title > array[i + 1].title) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }

        startIndex++;
    }
}





function shakerSortNameDesc(array) {
    let swapFlag = true;
    let startIndex = 0;
    let endIndex = array.length;

    while (swapFlag) {

        // Left to Right Pass
        swapFlag = false; 

        
        for (let i = startIndex; i < endIndex - 1; i++) {
            if (array[i].title < array[i + 1].title) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }

        // If no Swaps, the Array is Sorted
        if (swapFlag == false) {
            break;
        }

        endIndex--;


        // Right to Left Pass
        swapFlag = false; 

        
        for (let i = endIndex - 1; i >= startIndex; i--) {
            if (array[i].title < array[i + 1].title) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }
        
        startIndex++;
    }
}






function shakerSortPriceAsc(array) {
    let swapFlag = true;
    let startIndex = 0;
    let endIndex = array.length;

    while (swapFlag) {

        // Left to Right Pass
        swapFlag = false; 

        
        // If Same Price, Sort Alphabetically
        for (let i = startIndex; i < endIndex - 1; i++) {
            if (array[i].priceCategory > array[i + 1].priceCategory ||
                (array[i].priceCategory === array[i + 1].priceCategory) && (array[i].title > array[i + 1].title))
                     
            {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }

        // If no Swaps, the Array is Sorted
        if (swapFlag == false) {
            break;
        }

        endIndex--;


        // Right to Left Pass
        swapFlag = false; 

        
        for (let i = endIndex - 1; i >= startIndex; i--) {
            if (array[i].priceCategory > array[i + 1].priceCategory) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }
        
        startIndex++;
    }
}




function shakerSortPriceDesc(array) {
    let swapFlag = true;
    let startIndex = 0;
    let endIndex = array.length;

    while (swapFlag) {

        // Left to Right Pass
        swapFlag = false; 

        
        // If Same Price, Sort Alphabetically
        for (let i = startIndex; i < endIndex - 1; i++) {
            if (array[i].priceCategory < array[i + 1].priceCategory ||
                (array[i].priceCategory === array[i + 1].priceCategory) && (array[i].title < array[i + 1].title))
            
            {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }

        // If no Swaps, the Array is Sorted
        if (swapFlag == false) {
            break;
        }

        endIndex--;


        // Right to Left Pass
        swapFlag = false; 

        
        for (let i = endIndex - 1; i >= startIndex; i--) {
            if (array[i].priceCategory < array[i + 1].priceCategory) {
                
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapFlag = true; 
            }
        }
        
        startIndex++;
    }
}
























// Trigger Shaker Sort

function triggerShakerSort() {
    if (sortByChoice === "Name" && orderByChoice === "Asc") {
        shakerSortNameAsc(eventPlaceRecords);
        console.log(eventPlaceRecords);
        displayrecords();

    } else if (sortByChoice === "Price" && orderByChoice === "Asc") {
        shakerSortPriceAsc(eventPlaceRecords);
        console.log(eventPlaceRecords);
        displayrecords();

    } else if (sortByChoice === "Name" && orderByChoice === "Desc") {
        shakerSortNameDesc(eventPlaceRecords);
        console.log(eventPlaceRecords);
        displayrecords();

    } else if (sortByChoice === "Price" && orderByChoice === "Desc") {
        shakerSortPriceDesc(eventPlaceRecords);
        console.log(eventPlaceRecords);
        displayrecords();
    } 

    
}







// Sort Button Logic


    const sortButton = document.getElementById('sortButton');
    const sortContainer = document.getElementById('sortContainer');
    const sortByName = document.getElementById('sortByName');
    const sortByPrice = document.getElementById('sortByPrice');
    const orderByAsc = document.getElementById('orderByAsc');
    const orderByDesc = document.getElementById('orderByDesc');


    const previewRecords = document.getElementsByClassName('preview-records-photos')[0];
    

    let sortByChoice = "Name";
    let orderByChoice = "Asc";
    triggerShakerSort();


    sortButton.addEventListener('click', function(){

        if(sortButton.classList.contains('active')){
            sortButton.classList.remove('active');
            previewRecords.classList.remove('no-pointer');
        }

        else{
            sortButton.classList.add('active');
            previewRecords.classList.add('no-pointer');
        }



        if (sortContainer.classList.contains('animate-Down')){
            sortContainer.classList.remove('animate-Down');
            sortContainer.classList.remove('active');
            sortContainer.classList.add('animate-Up');
            
        }

        else if (sortContainer.classList.contains('animate-Up')){
            sortContainer.classList.remove('animate-Up');
            sortContainer.classList.add('active');
            sortContainer.classList.add('animate-Down');
        }

        else{
            sortContainer.classList.add('animate-Down');
            sortContainer.classList.add('active');
        }
        
    });



    

    sortByName.addEventListener('click', function(){

        if (sortByPrice.classList.contains('active')){
            sortByPrice.classList.remove('active')
        }
        sortByChoice = "Name";
        sortByName.classList.add('active');

        console.log(sortByChoice);
        triggerShakerSort();

    });

    sortByPrice.addEventListener('click', function(){

        if (sortByName.classList.contains('active')){
            sortByName.classList.remove('active')
        }
        sortByChoice = "Price";
        sortByPrice.classList.add('active');

        console.log(sortByChoice);
        triggerShakerSort();
        
    });


    orderByAsc.addEventListener('click', function(){

        if (orderByDesc.classList.contains('active')){
            orderByDesc.classList.remove('active')
        }
        orderByChoice = "Asc";
        orderByAsc.classList.add('active');

        console.log(orderByChoice);
        triggerShakerSort();

    });

    orderByDesc.addEventListener('click', function(){
        
        if (orderByAsc.classList.contains('active')){
            orderByAsc.classList.remove('active')
        }
        orderByChoice = "Desc";
        orderByDesc.classList.add('active');

        console.log(orderByChoice);
        triggerShakerSort();

    });






// Display Sorted Records

function displayrecords(){

    const previewRecordPhotos = document.getElementsByClassName('preview-records-photos')[0];
    previewRecordPhotos.innerHTML = '';

    for(var i=0; i<eventPlaceRecords.length; i++){

        var encodedCity = encodeURIComponent(eventPlaceRecords[i].city);
        var encodedtitle = encodeURIComponent(eventPlaceRecords[i].title);
        var encodedId = encodeURIComponent(eventPlaceRecords[i].venueid);


        /*
        var a = document.createElement('a');
        a.href = "{{ url_for('web.display_record', venue_id='') }}" + encodeURIComponent(eventPlaceRecords[i].venueid);
        a.dataset.record = eventPlaceRecords[i].title;
        */


        var a = document.createElement('a');
        var baseUrl = document.getElementById('baseUrl').value;
        baseUrl = baseUrl.replace(/0$/, '');  // Remove the dummy value
        a.href = baseUrl + encodeURIComponent(eventPlaceRecords[i].venueid);
        a.dataset.record = eventPlaceRecords[i].title;



        
        var recordCell = document.createElement('div');
        recordCell.className = 'record-cell';

        a.appendChild(recordCell);

        var recordPhoto = document.createElement('div');
        recordPhoto.className = 'record-photo';

        recordCell.appendChild(recordPhoto);

            var recordPhotoContainer = document.createElement('div');
            recordPhotoContainer.className = 'record-photo-container';
            //recordPhotoContainer.style.backgroundImage = `url(../images/Cities/cityscape-frankfurt-covered-modern-buildings-sunset-germany.jpg)`;
            recordPhotoContainer.style.backgroundImage = `url('../static/images/venues/${encodedId}/image1.jpg')`;

        recordPhoto.appendChild(recordPhotoContainer);

            var recordTags = document.createElement('div');
            recordTags.className = 'record-tags';

                var recordCapacity = document.createElement('div');
                recordCapacity.className = 'record-capacity';
        
                    var capacityIcon = document.createElement('div');
                    capacityIcon.className = 'capacity-icon';

                        var iconC = document.createElement('i');
                        iconC.className = 'ph ph-users';

                    capacityIcon.appendChild(iconC);
        
                    var capacityData = document.createElement('div');
                    capacityData.className = 'capacity-data';

                recordCapacity.appendChild(capacityIcon);
                recordCapacity.appendChild(capacityData);

            recordTags.appendChild(recordCapacity);

                var recordLocation = document.createElement('div');
                recordLocation.className = 'record-location';
        
                    var locationIcon = document.createElement('div');
                    locationIcon.className = 'location-icon';

                        var iconL = document.createElement('i');
                        iconL.className = 'ph ph-map-pin';

                    locationIcon.appendChild(iconL);
        
                var locationData = document.createElement('div');
                locationData.className = 'location-data';

                recordLocation.append(locationIcon);
                recordLocation.appendChild(locationData);

            recordTags.appendChild(recordLocation);

        recordPhoto.appendChild(recordTags);


        var recordDetails = document.createElement('div');
        recordDetails.className = 'record-details';

        var recordTitle = document.createElement('div');
        recordTitle.className = 'record-title';

        var recordFeatures = document.createElement('div');
        recordFeatures.className = 'record-features';

        var recordDesc = document.createElement('div');
        recordDesc.className = 'record-desc' ;
            var recordDescData = document.createElement('p');
            recordDescData.className = 'record-desc-data';
            recordDesc.appendChild(recordDescData);

        var divider = document.createElement('div');
        divider.className = 'divider';

        var recordPrice = document.createElement('div');
        recordPrice.className = 'record-price';

            var recordPriceData = document.createElement('div');
            recordPriceData.className = 'record-price-data';
            recordPrice.appendChild(recordPriceData);

        recordDetails.appendChild(recordTitle);
        recordDetails.appendChild(recordFeatures);
        recordDetails.appendChild(recordDesc);
        recordDetails.appendChild(divider);
        recordDetails.appendChild(recordPrice);

        recordCell.appendChild(recordDetails);

        recordTitle.textContent = eventPlaceRecords[i].title;
        capacityData.textContent = `${eventPlaceRecords[i].capacity} Pax`;
        locationData.textContent = eventPlaceRecords[i].location;

        eventPlaceRecords[i].packages.forEach(function(package) {
            const div = document.createElement('div');
            div.className = 'feature-tag';
            div.textContent = package;
            recordFeatures.append(div);
        });

        eventPlaceRecords[i].features.forEach(function(feature) {
            const div = document.createElement('div');
            div.className = 'feature-tag';
            div.textContent = feature;
            recordFeatures.append(div);
        });

        recordPriceData.textContent = eventPlaceRecords[i].price;
        recordDescData.textContent = eventPlaceRecords[i].description;


        previewRecords.append(a);

    }

}
    




/*
    document.querySelectorAll('a[data-record]').forEach(function(aLink){
        aLink.addEventListener('click', function(){

            const recordSelect = this.dataset.record;
            localStorage.setItem('recordSelect', recordSelect);
            window.location.href = "{{ url_for('web.display_record') }}";

        });
    });

    */


    document.addEventListener('click', function(event) {
        if (event.target.closest('a[data-record]')) {
            const recordSelect = event.target.closest('a[data-record]').dataset.record;
            localStorage.setItem('recordSelect', recordSelect);
        }
    });




    

});
