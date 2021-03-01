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
    let beta2 = document.getElementById("beta2").value / 180 * Math.PI;
    let u2 = document.getElementById("u2").value;
    let f = document.getElementById("frequency").value;
    let u1_ = document.getElementById("u1_").value;
    let flowVelocityFactor = document.getElementById("flowVelocityFactor").value;
    let eta_h = document.getElementById("maxHydraulicEfficiency").value;
    let a = 1.10;
    let b = 0.10;

    let vf2 = u2 * Math.tan(beta2); //outlet flow velocity at BEP i.e. when v_u2=0 (no swirl velocity at outlet)
    let NPSH_req = (0.5 / 9.81) * (a * vf2 * vf2 + b * u2 * u2); //net positive suction head required for no cavitation criterion
    let D2 = Math.sqrt(4 * Q / (vf2 * Math.PI)); //outlet diameter of runner
    let N = 60 * u2 / (Math.PI * D2); //runner speed in rpm
    let P = Math.ceil(120 * f / N); //number of generator poles required
    if (P % 2 == 1) //if odd number of poles, make even
        P -= 1;
    let N_syn = 120 * f / P; //synchronous runner speed in rpm
    let D2_k = D2 * Math.pow(N / N_syn, 1 / 3); //corrected outlet diameter of runner (for maintaining the same beta2 before and after the correction)
    let u1 = u1_ * Math.sqrt(2 * 9.81 * H); //runner speed at inlet
    let D1 = 60 * u1 / (Math.PI * N_syn); //runner diameter at inlet
    let vf1 = vf2 / flowVelocityFactor; //flow velocity at inlet
    let B = Q / (Math.PI * D1 * vf1); //height of inlet
    let vu1 = eta_h * 9.81 * H / u1; //swirl/whirl/tangential velocity at inlet
    let beta1 = Math.atan(vf1 / (u1 - vu1)) / Math.PI * 180; //runner blade angle at inlet
    let alpha1 = Math.atan(vf1 / vu1) / Math.PI * 180; //guide vane angle at inlet



    document.getElementById("D1").innerHTML = D1.toFixed(3) + " m";
    document.getElementById("D2").innerHTML = D2_k.toFixed(3) + " m";
    document.getElementById("B").innerHTML = B.toFixed(3) + " m";
    document.getElementById("beta1").innerHTML = beta1.toFixed(3);
    document.getElementById("alpha1").innerHTML = alpha1.toFixed(3);
    document.getElementById("N").innerHTML = N_syn.toFixed(3) + " rpm";
    document.getElementById("P").innerHTML = P.toFixed(3);
    document.getElementById("npsh").innerHTML = NPSH_req.toFixed(3) + " m";

}