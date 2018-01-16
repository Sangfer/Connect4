    var initElement = function () {
        alert("coucou");
    };

    var _deviceReadyCallback = function () {
        $(".drawGrid").off("click").on("click", initElement);
    };

    document.addEventListener('deviceready', _deviceReadyCallback, false);
