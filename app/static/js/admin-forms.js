window.onload = function() {
    var titleElement = document.getElementsByClassName('title')[0];
    if (titleElement) {
        titleElement.classList.add('animate-Up');
    }

    var subtitleElement = document.getElementsByClassName('subtitle')[0];
    if (subtitleElement) {
        subtitleElement.classList.add('animate-Down');
    }
};

var stage1_Form = document.querySelector(".stage.p1");
var stage2_Form = document.querySelector(".stage.p2");
var stage3_Form = document.querySelector(".stage.p3");

var stage1Next = document.getElementById("stage1Next");
var stage2Previous = document.getElementById("stage2Previous");
var stage2Next = document.getElementById("stage2Next");
var stage3Previous = document.getElementById("stage3Previous");
var stage3SubmitButton = document.querySelector(".stage.p3 .submit");

var stage1Icon = document.querySelector(".circle.p1");
var stage2Icon = document.querySelector(".circle.p2");
var stage3Icon = document.querySelector(".circle.p3");


stage1Next.addEventListener('click', function() {

    transitionStages(stage1_Form, stage2_Form, "animate-Left", "animate-Right");
    stage1Icon.classList.remove("active");
    stage2Icon.classList.add("active");
});


stage2Previous.addEventListener('click', function() {
    transitionStages(stage2_Form, stage1_Form, "animate-Right", "animate-Left");
    stage2Icon.classList.remove("active");
    stage1Icon.classList.add("active");
});


stage2Next.addEventListener('click', function() {

    transitionStages(stage2_Form, stage3_Form, "animate-Left", "animate-Right");
    stage2Icon.classList.remove("active");
    stage3Icon.classList.add("active");
});


stage3Previous.addEventListener('click', function() {
    transitionStages(stage3_Form, stage2_Form, "animate-Right", "animate-Left");
    stage3Icon.classList.remove("active");
    stage2Icon.classList.add("active");
});


document.querySelector(".form-main").addEventListener("submit", function(event) {
    
});

function transitionStages(hideStage, showStage, hideAnimation, showAnimation) {
    hideStage.classList.add(hideAnimation);
    showStage.classList.add(showAnimation);

    hideStage.addEventListener('animationend', function onAnimationEnd() {
        hideStage.classList.remove("active", hideAnimation);
        showStage.classList.add("active");
        showStage.classList.remove(showAnimation);

        hideStage.removeEventListener('animationend', onAnimationEnd);
    });
}



