

document.addEventListener('DOMContentLoaded', async () => {
  





    var titleElement = document.getElementsByClassName('page-title')[0];
    if (titleElement) {

        titleElement.textContent = 'VenueVista';
        titleElement.classList.add('animate-Up-Back');
        
    }


        document.querySelectorAll('a[data-city]').forEach(function(aLink){
            aLink.addEventListener('click', function(){
    
                const citySelect = this.dataset.city;
                localStorage.setItem('citySelect', citySelect);
                window.location.href = "{{ url_for('web.city_page') }}";
            });
        });





});

