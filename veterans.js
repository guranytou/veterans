var A = A || {};

$(document).ready(function () {
    "use strict";

    A.viewModel = new veteransviewModel();

    try {
        ko.applyBindings(A.viewModel);
    } catch (e) {
        console.error(e);
    }
});
