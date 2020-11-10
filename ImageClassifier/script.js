
const fileBtn = document.getElementById("file-btn");
const imageBox = document.getElementById("image-box");
const urlImage = document.getElementById("url-image");
const btnChooser = document.getElementById("chooser");
const btnUrl = document.getElementById("url");
const output = document.getElementById("output")
const output2 = document.getElementById("output2")
const outputErr = document.getElementById("outputErr")

let flag = false;

function habilitar() {
    if (btnChooser.checked) {
        fileBtn.disabled = false;
        //fileBtn.removeAttribute("disabled")
        urlImage.disabled = true;
        //urlImage.setAttribute("disabled","true")
        flag = false;
        urlImage.value = "";
        //urlImage.src = "";
        resetResults();
    } else if (btnUrl.checked) {
        fileBtn.disabled = true;
        urlImage.disabled = false;
        flag = true;
        resetResults();
    } else {
        fileBtn.disabled = true;
        urlImage.disabled = true;
        flag = false;
        resetResults();
    }

}
function resetResults() {
    output.innerText = "";
    output2.innerText = "";
}

function clearFields(){
    output.innerText = "";
    output2.innerText = "";
    urlImage.value = "";
    urlImage.src = "";
    fileBtn.disabled = true;
    urlImage.disabled = true;
    btnChooser.checked = false;
    btnUrl.checked = false;
}

function  clearURL(){
    output.innerText = "";
    output2.innerText = "";
    urlImage.value = "";
    urlImage.src = "";
}

function fileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    imageBox.title = selectedFile.name;
    reader.onload = function (event) {
        imageBox.src = event.target.result;
    }
    reader.readAsDataURL(selectedFile);
}

//window.addEventListener("load", getPrediction);

function getPrediction() {
    output.innerText = "Loading, please wait...";
    output2.innerText = "";
    var classifier, label, prob;

    function setup() {
        if (flag == true) {
            imageBox.src = urlImage.value;
        }
        classifier = ml5.imageClassifier("MobileNet", modelReady);
    }

    function modelReady() {
        classifier.predict(imageBox, gotResults);
    }
    function gotResults(err, results) {
        console.log(results)
        label = results[0].label;
        prob = (results[0].confidence * 100).toFixed(2) + " %";
        //console.log(label, prob)
        output.innerText = "Prediction: " + label;
        output2.innerText = "Probaility: " + prob;
        //outputErr.innerText = err
    }

    setup();
}

