const pageColor=localStorage.getItem("color-option");


if(pageColor !== null){
    document.documentElement.style.setProperty("--main-color",pageColor);

    document.querySelectorAll(".colors-list li").forEach(e => {
        e.classList.remove("active");
    
        if(e.dataset.color===pageColor){
            e.classList.add("active");
        }
});
}




document.querySelector(".setting-box .fa-gear").onclick=function(){
    //The gear will rotate on its self
    this.classList.toggle("fa-spin");
    // to open setting page
    document.querySelector(".setting-box").classList.toggle("open");
}
   


// Changing The main color of the page

function SetActiveToSpecificElement(e){
    e.target.parentElement.querySelectorAll(".active").forEach(el=>{
        el.classList.remove("active");
    })
    e.target.classList.add("active");
}

document.querySelectorAll(".colors-list li").forEach(li=>{
    li.addEventListener("click",e=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        localStorage.setItem("color-option",e.target.dataset.color);
        SetActiveToSpecificElement(e);
    })
})

// Yes or No options to change the background

// First Check The local Storage 
let backgroundOptions=true;
const RandomBackGround=localStorage.getItem("background-option");

if(RandomBackGround !==null){
    RandomBackGround=="true"?backgroundOptions=true:backgroundOptions=false;

    document.querySelectorAll(".random-background span").forEach(e=>{
        e.classList.remove("active");
    })
    if(RandomBackGround=="true"){
        document.querySelector(".random-background .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-background .no").classList.add("active");

    }
}


let backgroundInterval;
function ChangeBackGroundImage(backgroundOptions){
    if(backgroundOptions==true){
    backgroundInterval=setInterval(()=>{
        const landingPage=document.querySelector(".landing-page");

        let images=["/img/img1.jpg","/img/img2.jpg","/img/img3.jpg"];
        let RandomNumber=Math.floor(Math.random()*images.length)
        landingPage.style.backgroundImage=`url(${images[RandomNumber]})`
    
    },5000);
    }
    
}

// To Activate certain div
function ActivateClass(e){
    e.target.classList.add("active");
}

// To get from the user Yes or No input whater to change the background image every 5 second 
function ToGetUserInputToChangeBackgroundColor(e){
    
    if(e.target.dataset.background==="yes"){
        backgroundOptions=true;
        ChangeBackGroundImage();
        ActivateClass(e)
        localStorage.setItem("background-option",true);
    }
    else{
        backgroundOptions=false;
        ActivateClass(e)
        localStorage.setItem("background-option",false);
        clearInterval(backgroundInterval)
    }

    ChangeBackGroundImage(backgroundOptions);
}

document.querySelectorAll(".option-box span").forEach(li=>{

    li.addEventListener("click",e=>{
        e.target.parentElement.querySelectorAll(".active").forEach(el=>{
            el.classList.remove("active");
        })
        ToGetUserInputToChangeBackgroundColor(e);
    })
})


// Animate Skill section 

let ourSkill=document.querySelector(".skills");

window.onscroll= function(){

    let skillOffset=ourSkill.offsetTop;

    let skillsOuterHeight=ourSkill.offsetHeight;
    let windowheight=this.innerHeight;

    let windowScrollTop=this.pageYOffset;



    if(windowScrollTop> skillOffset -windowheight){
        let skill=document.querySelectorAll(".skills .skill-box .skill-progress span");
        skill.forEach(e=>{
            e.style.width=e.dataset.progress;
        })
    }
    else{
        let skill=document.querySelectorAll(".skills .skill-box .skill-progress span");
        skill.forEach(e=>{
            e.style.width=0;
        })
    }
    
}

// Create Popup With The Image

document.querySelectorAll(".Gallery img").forEach(img=>{

    img.addEventListener("click",e=>{

        let overlay=document.createElement("div");

        overlay.className="pop-overlay";

        let imag=document.createElement("img");

        imag.src=img.src;

        let popupBox=document.createElement("div");

        popupBox.className="popup-Box";

        let heading=document.createElement("h3")
        
        if(img.alt!=null){
        heading.appendChild(document.createTextNode(img.alt))
        popupBox.appendChild(heading);}

        
        popupBox.appendChild(imag);


        // close span
        let closeButton=document.createElement("span")

        closeButton.className="close-button";

        closeButton.appendChild(document.createTextNode("X"));
        

        popupBox.appendChild(closeButton)
        overlay.appendChild(popupBox);

        document.body.appendChild(overlay);

       
    });
})
//Close Popup


document.addEventListener("click",function(e){

    if(e.target.className=='close-button'){
        

        document.querySelector(".pop-overlay").remove()
    }

})


// Go to the Area that are slected by nav bullet 

const AllBullet=document.querySelectorAll(".nav-bullets .bullet");
const Links=document.querySelectorAll(".links a");

function ScrollToThePage(element){
    element.forEach(ele=>{
        ele.addEventListener('click',(e)=>{

            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })

        })
    })
}


ScrollToThePage(AllBullet);
ScrollToThePage(Links);

// Display bullet points 

const navBullet=document.querySelector(".nav-bullets");
const showbullet=document.querySelectorAll(".show-bullet span");
let localBullet=localStorage.getItem('bullet_options');

if(localBullet!==null){
    

    showbullet.forEach(e=>{
        e.classList.remove("active");
    });

    if(localBullet=='block'){
        document.querySelector(".show-bullet .yes").classList.add("active");
        navBullet.style.display='block';

    }
    else{
        document.querySelector(".show-bullet .no").classList.add("active");

        navBullet.style.display='none';

    }

}

showbullet.forEach(ele=>{

    ele.addEventListener('click',e=>{
        if(e.target.dataset.display=="yes"){
            navBullet.style.display='block';
            localStorage.setItem("bullet_options",'block');

        }else{
            navBullet.style.display='none';
            localStorage.setItem("bullet_options",'none');

        }
    SetActiveToSpecificElement(e)

    })
})

// Reset Button

document.querySelector(".reset-option").onclick=function(){

    localStorage.removeItem("bullet_options");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    window.location.reload();

}

// Show menu option for small screen 

const tLinks=document.querySelector(".links")
const menuActive=document.querySelector(".toggle-menu")
menuActive.addEventListener('click',e=>{
    e.stopPropagation();
    tLinks.classList.toggle("open")
    menuActive.classList.toggle("menu-active");
    
})
tLinks.addEventListener("click",(e)=>{
    e.stopPropagation();
})

// Click anywhere outside the menue to close the menu
document.addEventListener('click',function(e){

    if(e.target.className!=="links-container" && e.target.className!=="toggle-menu"){
        tLinks.classList.remove("open")
        menuActive.classList.remove("menu-active");
    }
})