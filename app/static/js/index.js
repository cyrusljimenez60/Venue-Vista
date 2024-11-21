let eventPlaceRecords = []; 

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
            console.log("Hello World");

            // Further operations with eventPlaceRecords can be performed here
        } else {
            console.error('Error fetching venue data:', venues.error);
        }
    } catch (error) {
        console.error('Error fetching venue data:', error);
    }



    var photoElement = document.getElementsByClassName('photo-subj')[0];
    if (photoElement) {
        photoElement.classList.add('animate-Up');
    }

    var titleElement = document.getElementsByClassName('title')[0];
    if (titleElement) {
        setTimeout(function() {
            titleElement.classList.add('animate-Right');
        }, 1200); 
    }

    var subtitleElement = document.getElementsByClassName('subtitle')[0];
    if (subtitleElement) {
        setTimeout(function() {
            subtitleElement.classList.add('animate-Down');
        }, 1000); 
    }




    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('previous');
    const photoContainers = document.getElementsByClassName('photo-container');

    let currentIndex = 0;

    photoContainers[currentIndex].classList.add('active');
    const photoCircles = photoContainers[currentIndex].querySelectorAll('.circle');
    photoCircles[currentIndex].classList.add('active');



    nextButton.addEventListener('click', function(){
        
        photoContainers[currentIndex].classList.remove('active', 'animate-slideOut', 'animate-slideIn');
        const photoCircles = photoContainers[currentIndex].querySelectorAll('.circle');
        photoCircles[currentIndex].classList.remove('active');
    
        currentIndex++;
        if (currentIndex >= photoContainers.length){
            currentIndex = 0;
        }
        
        photoContainers[currentIndex].classList.add('active');
        photoContainers[currentIndex].classList.add('animate-slideIn');
        const newPhotoCircles = photoContainers[currentIndex].querySelectorAll('.circle');
        newPhotoCircles[currentIndex].classList.add('active');

    });
    


    prevButton.addEventListener('click', function(){
        
        photoContainers[currentIndex].classList.remove('active', 'animate-slideOut', 'animate-slideIn');
        const photoCircles = photoContainers[currentIndex].querySelectorAll('.circle');
        photoCircles[currentIndex].classList.remove('active');
    
        currentIndex--;
        if (currentIndex < 0){
            currentIndex = photoContainers.length - 1;
        }
    
        photoContainers[currentIndex].classList.add('active');
        photoContainers[currentIndex].classList.add('animate-slideOut');
        const newPhotoCircles = photoContainers[currentIndex].querySelectorAll('.circle');
        newPhotoCircles[currentIndex].classList.add('active');

    });


    document.querySelectorAll('a[data-event]').forEach(function(aLink){
        aLink.addEventListener('click', function(){
            const eventSelect = this.dataset.event;
            localStorage.setItem('eventSelect', eventSelect);
            window.location.href = './EventType-Page/eventtype-page.html';
        });
    });


    

    document.querySelectorAll('a[data-city]').forEach(function(aLink){
        aLink.addEventListener('click', function(){
            const citySelect = this.dataset.city;
            localStorage.setItem('citySelect', citySelect);
            window.location.href = '../City-Page/city-page.html';
        });
    });











    const searchByPrice = document.getElementById('search-by-price');
    const searchByCapacity = document.getElementById('search-by-capacity');
    const searchBySetting = document.getElementById('search-by-setting');
    const searchByEventtype = document.getElementById('search-by-eventtype');
    const searchByLocation = document.getElementById('search-by-location');
    const searchButton = document.getElementById('search-button');



    var parameter1 = null;
    var parameter2 = null;
    var parameter3 = null;
    var parameter4 = null;
    var parameter5 = null;



    const priceOptions = [];

    for (let i = 1; i <= 7; i++) {
        priceOptions.push(document.getElementById(`p${i}`));
    }
    
    priceOptions.forEach((price, i) => {
        price.addEventListener('click', () => {
            console.log(`Element c${i + 1} clicked`);

            if (priceOptions[i].classList.contains('active')){
                priceOptions[i].classList.remove('active');
                var icon = priceOptions[i].querySelector('i');
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                parameter1 = null;

            }


            else {

                for (let x = 0; x < priceOptions.length; x++) {
                    priceOptions[x].classList.remove('active');
                    var icon = priceOptions[x].querySelector('i');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                }
            
                priceOptions[i].classList.add('active');
                var icon = priceOptions[i].querySelector('i');
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                parameter1 = `p${i+1}`;
                

            }


        });
    });





    const capacityOptions = [];

    for (let i = 1; i <= 7; i++) {
        capacityOptions.push(document.getElementById(`c${i}`));
    }
    
    capacityOptions.forEach((capacity, i) => {
        capacity.addEventListener('click', () => {
            console.log(`Element c${i + 1} clicked`);

            if (capacityOptions[i].classList.contains('active')){
                capacityOptions[i].classList.remove('active');
                var icon = capacityOptions[i].querySelector('i');
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                parameter2 = null;
                

            }

            else {
                for (let x = 0; x < capacityOptions.length; x++) {
                    capacityOptions[x].classList.remove('active');
                    var icon = capacityOptions[x].querySelector('i');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                    
                }
            
                capacityOptions[i].classList.add('active');
                var icon = capacityOptions[i].querySelector('i');
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                parameter2 = `c${i+1}`;
        


            }

            console.log('ETO');
            console.log(parameter2);

        });
    });





    const settingOptions = [];

    for (let i = 1; i <= 2; i++) {
        settingOptions.push(document.getElementById(`s${i}`));
    }
    
    settingOptions.forEach((setting, i) => {
        setting.addEventListener('click', () => {
            console.log(`Element s${i + 1} clicked`);

            if (settingOptions[i].classList.contains('active')){
                settingOptions[i].classList.remove('active');
                var icon = settingOptions[i].querySelector('i');
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                parameter3 = null;

            }

            else {

                for (let x = 0; x < settingOptions.length; x++) {
                    settingOptions[x].classList.remove('active');
                    var icon = settingOptions[x].querySelector('i');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                }
            
                settingOptions[i].classList.add('active');
                var icon = settingOptions[i].querySelector('i');
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                parameter3 = `s${i+1}`;
            }

        });
    });




    const eventtypeOptions = [];

    for (let i = 1; i <= 10; i++) {
        eventtypeOptions.push(document.getElementById(`e${i}`));
    }
    
    eventtypeOptions.forEach((eventtype, i) => {
        eventtype.addEventListener('click', () => {
            console.log(`Element e${i + 1} clicked`);
    
            if (eventtypeOptions[i].classList.contains('active')){
                eventtypeOptions[i].classList.remove('active');
                var icon = eventtypeOptions[i].querySelector('i');
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                parameter4 = null;

            }

            else {
            
                for (let x = 0; x < eventtypeOptions.length; x++) {
                    eventtypeOptions[x].classList.remove('active');
                    var icon = eventtypeOptions[x].querySelector('i');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                }
            
                eventtypeOptions[i].classList.add('active');
                var icon = eventtypeOptions[i].querySelector('i');
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                parameter4 = `e${i+1}`;
            }
        });
    });




    const locationOptions = [];

    for (let i = 1; i <= 16; i++) {
        locationOptions.push(document.getElementById(`l${i}`));
    }
    
    locationOptions.forEach((location, i) => {
        location.addEventListener('click', () => {
            console.log(`Element l${i + 1} clicked`);

            if (locationOptions[i].classList.contains('active')){
                locationOptions[i].classList.remove('active');
                var icon = locationOptions[i].querySelector('i');
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                parameter5 = null;

            }

            else {

                for (let x = 0; x < locationOptions.length; x++) {
                    locationOptions[x].classList.remove('active');
                    var icon = locationOptions[x].querySelector('i');
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                }
            
                locationOptions[i].classList.add('active');
                var icon = locationOptions[i].querySelector('i');
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                parameter5 = `l${i+1}`;

            }

        });
    });

    






    const searchButtons = document.querySelectorAll('.sort-oblong');

    const eventTypeSection = document.getElementsByClassName('event-type-section')[0];

    let sortByChoice = "Name";
    let orderByChoice = "Asc";
    //triggerShakerSort();


    searchButtons.forEach(searchbutton => {

        const searchContainer = searchbutton.querySelector('.search-container');

        if (searchContainer) {
            searchContainer.classList.add('no-pointer');
        }

        
        searchbutton.addEventListener('click', function() {

            console.log("Hello World");
            if (searchbutton.classList.contains('active')) {
                searchbutton.classList.remove('active');
                eventTypeSection.classList.add('no-pointer');
                searchContainer.classList.add('no-pointer');
                
            } else {
                searchbutton.classList.add('active');
                eventTypeSection.classList.remove('no-pointer');
                searchContainer.classList.remove('no-pointer');
            }

            
    
            if (searchContainer.classList.contains('switch-down')) {
                searchContainer.classList.remove('switch-down');
                searchContainer.classList.remove('active');
                searchContainer.classList.add('switch-up');
                eventTypeSection.classList.remove('no-pointer');
            } else if (searchContainer.classList.contains('switch-up')) {
                searchContainer.classList.remove('switch-up');
                searchContainer.classList.add('active');
                searchContainer.classList.add('switch-down');
                eventTypeSection.classList.add('no-pointer');
            } else {
                searchContainer.classList.add('switch-down');
                searchContainer.classList.add('active');
            }
        });
    });






   /* 

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

    */


    /*

    let randomIndices = [];

    for (let i=0; i<5; i++){
        let randomNum = Math.floor(Math.random()*eventPlaceRecords.length);
        randomIndices.push(randomNum);

    }

    console.log(randomIndices);


    const randomRecords = [];
    const previewRecordPhotos = document.getElementsByClassName('preview-records-photos')[0];
        


    for (let i = 0; i < randomIndices.length; i++) {
        let randomIndex = randomIndices[i]; 
        let eventPlaceRecord = eventPlaceRecords[randomIndex]; 
        randomRecords.push(eventPlaceRecord); 
    }


    console.log(randomRecords);

    */
    const previewRecordPhotos = document.getElementsByClassName('preview-records-photos')[0];
    

    let randomIndices = [];

    for (let i = 0; i < 5; i++) {
        let randomNum = Math.floor(Math.random() * eventPlaceRecords.length);
        randomIndices.push(randomNum);
    }

    console.log(randomIndices);

    const randomRecords = [];

    for (let i = 0; i < randomIndices.length; i++) {
        let randomIndex = randomIndices[i];
        let eventPlaceRecord = eventPlaceRecords[randomIndex];
        randomRecords.push(eventPlaceRecord);
    }



    console.log(randomRecords);



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

    shakerSortNameAsc(randomRecords);





    var baseUrlElement = document.getElementById('baseUrl');
    var baseUrl = '';
    
    if (baseUrlElement) {
        baseUrl = baseUrlElement.getAttribute('data-url');
    
        if (baseUrl) {
            // Remove the trailing '0' from the base URL
            baseUrl = baseUrl.replace(/\/0$/, '');
        } else {
            console.error('baseUrl is not defined correctly.');
        }
    } else {
        console.error('baseUrlElement is not found.');
    }



    for (var i = randomRecords.length - 1; i >= 0; i--) {
        console.log(`Processing record ${i}:`, randomRecords[i]);

        var encodedId = encodeURIComponent(randomRecords[i].venueid);



            var a = document.createElement('a');
            a.href = baseUrl + '/' + encodeURIComponent(randomRecords[i].venueid);
            a.dataset.record = randomRecords[i].title;
            




            var recordCell = document.createElement('div');
            recordCell.className = 'record-cell';

            a.appendChild(recordCell);

            var recordPhoto = document.createElement('div');
            recordPhoto.className = 'record-photo';

            recordCell.appendChild(recordPhoto);

                var recordPhotoContainer = document.createElement('div');
                recordPhotoContainer.className = 'record-photo-container';
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

            recordTitle.textContent = randomRecords[i].title;
            capacityData.textContent = `${randomRecords[i].capacity} Pax`;
            locationData.textContent = randomRecords[i].location;

            randomRecords[i].packages.forEach(function(package) {
                const div = document.createElement('div');
                div.className = 'feature-tag';
                div.textContent = package;
                recordFeatures.append(div);
            });

            randomRecords[i].features.forEach(function(feature) {
                const div = document.createElement('div');
                div.className = 'feature-tag';
                div.textContent = feature;
                recordFeatures.append(div);
            });

            recordPriceData.textContent = randomRecords[i].price;
            recordDescData.textContent = randomRecords[i].description;


            previewRecordPhotos.prepend(a);

        }

    



        document.querySelectorAll('a[data-record]').forEach(function(aLink){
            aLink.addEventListener('click', function(){
    
                const recordSelect = this.dataset.record;
                localStorage.setItem('recordSelect', recordSelect);
                window.location.href = "{{ url_for('web.display_record') }}";
            });
        });



        document.querySelectorAll('a[data-event]').forEach(function(aLink){
            aLink.addEventListener('click', function(){
    
                const eventSelect = this.dataset.event;
                localStorage.setItem('eventSelect', eventSelect);
                window.location.href = "{{ url_for('web.event_type') }}";
            });
        });



        document.querySelectorAll('a[data-city]').forEach(function(aLink){
            aLink.addEventListener('click', function(){
    
                const citySelect = this.dataset.city;
                localStorage.setItem('citySelect', citySelect);
                window.location.href = "{{ url_for('web.city_page') }}";
            });
        });


        console.log(`Eto value: ` + parameter1);


        document.querySelectorAll('.search-href').forEach(function(element) {
            element.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
        
                // Set parameters in localStorage
                localStorage.setItem('parameter1', parameter1);
                localStorage.setItem('parameter2', parameter2);
                localStorage.setItem('parameter3', parameter3);
                localStorage.setItem('parameter4', parameter4);
                localStorage.setItem('parameter5', parameter5);
        
                // Redirect to the new page
                const url = this.getAttribute('data-url');
                window.location.href = url;
            });
        });
    






        







});

