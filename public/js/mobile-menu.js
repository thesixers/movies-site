        let menu = document.querySelector('.menu-toggle');
        let sideBar = document.querySelector('.menu');


        menu.addEventListener('click', function(){
            (sideBar.style.display === 'none') ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
            // sideBar.classList.toggle('show')
        })
