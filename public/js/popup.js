let popSection = document.querySelector('.pop-up-wrapper');
let popUserImg = document.querySelector('.pop-userImg'); 

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e)=>{
        popSection.style.display = 'flex';
        let user = JSON.parse(e.target.dataset.user);

        let firstname = document.querySelector('.firstname');
        let lastname = document.querySelector('.lastname');
        let middlename = document.querySelector('.middlename');
        let email = document.querySelector('.email');
        let gender = document.querySelector('.gender');
        let status = document.querySelector('.status');
        let dob = document.querySelector('.dob');


        (user.imag) ? popUserImg.src = `/uploads/${user.imag}` : popUserImg.src = '/images/man.png';
        (user.firstname) ? firstname.innerHTML = user.firstname : firstname.innerHTML = 'EMPTY';
        (user.lastname) ? lastname.innerHTML = user.lastname : lastname.innerHTML = 'EMPTY';
        (user.middlename) ? middlename.innerHTML = user.middlename : middlename.innerHTML = 'EMPTY';
        (user.email) ? email.innerHTML = user.email : email.innerHTML = 'EMPTY';
        (user.gender) ? gender.innerHTML = user.gender : gender.innerHTML = 'EMPTY';
        (user.status) ? status.innerHTML = user.status : status.innerHTML = 'EMPTY';
        (user.status) ? dob.innerHTML = user.dob : dob.innerHTML = 'EMPTY';
        
    })
});


function closePop(){
    popSection.style.display = 'none';
}