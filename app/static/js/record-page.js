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
            console.log("Hello World");

            // Further operations with eventPlaceRecords can be performed here
        } else {
            console.error('Error fetching venue data:', venues.error);
        }
    } catch (error) {
        console.error('Error fetching venue data:', error);
    }




const recordSelect = localStorage.getItem('recordSelect');


    var recordIndex = null;


    for (let i=0; i<eventPlaceRecords.length; i++){
        
        if(recordSelect === eventPlaceRecords[i].title){
            recordIndex = i;
            break;
        }

    }

    
    
    var recordPhoto = document.getElementsByClassName('record-photo')[0];
    var title = document.getElementsByClassName("record-title")[0];
    var city = document.getElementsByClassName("record-city")[0];
    var address = document.getElementsByClassName("address-text")[0];
    var desc = document.getElementsByClassName("record-description")[0];
    var price = document.getElementsByClassName("pricing-text")[0];

    var package1 = document.getElementsByClassName("package-cell c1")[0];
    var package2 = document.getElementsByClassName("package-cell c2")[0];
    var package3 = document.getElementsByClassName("package-cell c3")[0];

    var feaureList = document.getElementsByClassName("feature-list")[0];

    var capacity = document.getElementsByClassName('capacity-text')[0];
    var setting = document.getElementsByClassName('setting-text')[0];

    var eventTypeContainer = document.getElementsByClassName('event-types-container')[0];

    var image1 = document.querySelector('.image.p1');
    var image2 = document.querySelector('.image.p2');
    var image3 = document.querySelector('.image.p3');


    

    title.textContent = eventPlaceRecords[recordIndex].title;
    city.textContent = eventPlaceRecords[recordIndex].location;
    address.textContent = eventPlaceRecords[recordIndex].address;
    desc.textContent = eventPlaceRecords[recordIndex].description;
    price.textContent = eventPlaceRecords[recordIndex].price;



    eventPlaceRecords[recordIndex].packages.forEach(package => {
        
        if (package === "Catering Packages"){
            package1.classList.add('active');
        }

        if (package === "Decoration Packages"){
            package2.classList.add('active');
        }

        if (package === "Event Planning Packages"){
            package3.classList.add('active');
        }
    });


    eventPlaceRecords[recordIndex].features.forEach(feature => {
        
        var listElement = document.createElement('li');
        listElement.className = 'features-cell';

        var icon = document.createElement('i');
        icon.className = 'ph ph-check-square';

        var listText = document.createElement('p');
        listText.className = 'features-text';
        listText.textContent = feature;

        listElement.appendChild(icon);
        listElement.appendChild(listText);

        feaureList.append(listElement);

    });


    capacity.textContent = `${eventPlaceRecords[recordIndex].capacity} Pax`;
    //setting.textContent = eventRecords[recordIndex].setting;
    setting.textContent = eventPlaceRecords[recordIndex].setting;


    eventPlaceRecords[recordIndex].eventtypes.forEach(eventtype => {
        var eventTypeCell = document.createElement('div');
        eventTypeCell.className = 'event-type-cell';

        var eventTypeText = document.createElement('p');
        eventTypeText.className = 'event-type-text';
        eventTypeText.textContent = eventtype;

        eventTypeCell.appendChild(eventTypeText);
        eventTypeContainer.appendChild(eventTypeCell);
    });


    var encodedID = encodeURIComponent(eventPlaceRecords[recordIndex].venueid);

    /*

    image1.src = `../static/images/venues/${encodedID}/image1.jpg)`;
    image2.src = `../static/images/venues/${encodedID}/image2.jpg)`;
    image3.src = `../static/images/venues/${encodedID}/image3.jpg)`;

    */

    image1.style.backgroundImage = `url(../static/images/venues/${encodedID}/image1.jpg)`;
    image2.style.backgroundImage = `url(../static/images/venues/${encodedID}/image2.jpg)`;
    image3.style.backgroundImage = `url(../static/images/venues/${encodedID}/image3.jpg)`;


    recordPhoto.style.backgroundImage = `url(../static/images/venues/${encodedID}/image1.jpg)`;


});