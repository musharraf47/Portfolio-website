
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnime() {
    var t1 = gsap.timeline();

    t1.from(".navElem", {
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
    .to(".boundingElement", {
        y: 0,
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })
    .from(".hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}


function circleMouseFollower() {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
        // console.log(dets.clientX, dets.clientY);
    });
}


circleMouseFollower();
firstPageAnime();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var difference = 0;

    elem.addEventListener("mouseleave", function(details){
        
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top; 
        difference = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, difference * 0.5),
        });
    });
});

document.querySelector(".btn").addEventListener("mouseover", function(){
    this.style.backgroundColor = "whitesmoke";
    this.style.color = "black";
});

document.querySelector(".btn").addEventListener("mouseleave", function(){
    this.style.backgroundColor = "black";
    this.style.color = "whitesmoke";
});


//get current time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    
    return ` ${hours}:${minutes} ${amOrPm} IST`;
}

function updateCurrentTime() {
    const currentTimeElement = document.querySelector('.currentTime');
    if (currentTimeElement) {
      currentTimeElement.textContent = getCurrentTime();
    }
  }

  // Update the current time initially and then every second
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  window.addEventListener("scroll", function(){
    var navBar = this.document.querySelector(".nav");
    navBar.classList.toggle("sticky", window.scrollY > 0);
  })
