

document.addEventListener('DOMContentLoaded', async () => {


    var titleElement = document.getElementsByClassName('page-title')[0];
    if (titleElement) {

        titleElement.textContent = 'VenueVista';
        titleElement.classList.add('animate-Up-Back');
        
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
                window.location.href = "{{ url_for('web.event_type') }}";
            });
        });




});

