"use strict";

let parameters = document.querySelectorAll(".paramClass");

for (let i = 0; i < parameters.length; i++) {
    let parameter = parameters[i];
    parameter.addEventListener("change", parameterChanged);
}

function parameterChanged(event) {
    design();
}

function design() {
    let Q = document.getElementById("discharge").value;
    let H = document.getElementById("nethead").value;
    let m = document.getElementById("jetratio").value;
    let cv = document.getElementById("coeffvelocity").value;
    let ku = document.getElementById("speedratio").value;
    let nozzles = document.getElementById("numnozzles").value;
    let f = document.getElementById("frequency").value;

    let q = Q / nozzles; //discharge per nozzle
    let v1 = cv * Math.sqrt(2 * 9.81 * H); //velocity of jet
    let u = ku * Math.sqrt(2 * 9.81 * H); //velocity of runner
    let d = Math.sqrt(q / v1 * 4 / Math.PI); //diameter of jet(nozzle)
    let D = m * d; //diameter of runner(Pitch Circle Diameter, PCD)
    let N = 60 * u / (Math.PI * D); //rpm of runner
    let P = Math.ceil(120 * f / N); //number of poles required
    if (P % 2 == 1) //if odd, make even
        P -= 1;
    N = 120 * f / P; //synchronous speed rpm of runner
    D = 60 * u / (Math.PI * N); //corrected diameter of runner
    m = D / d; //new jet ratio
    let Z = Math.ceil(0.5 * m + 17); //number of buckets

    document.getElementById("d").innerHTML = d.toFixed(3) + "m";
    document.getElementById("D").innerHTML = D.toFixed(3)+"m";
    document.getElementById("N").innerHTML = N.toFixed(3)+" rpm";
    document.getElementById("P").innerHTML = P.toFixed(3);
    document.getElementById("Z").innerHTML = Z.toFixed(3);
    document.getElementById("m").innerHTML = m.toFixed(3);

}