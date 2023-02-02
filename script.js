require('ace/ext/language_tools');
window.onload = function () {
    for (var i = 0; i < document.getElementsByClassName("code").length; i++)
        document.getElementsByClassName("edit")[i].style.height = document.querySelector(".code").clientHeight - 40 + "px";
    let htmlEditor = ace.edit("html");
    htmlEditor.setTheme("ace/theme/Merbivore");
    htmlEditor.session.setMode("ace/mode/html");
    if (localStorage.getItem("lc-vamp-html") == null)
        htmlEditor.session.setValue("<html></html>");
    else htmlEditor.session.setValue(localStorage.getItem("lc-vamp-html"))
    htmlEditor.session.setUseWrapMode(true);
    htmlEditor.setShowPrintMargin(false);
    htmlEditor.setHighlightActiveLine(false);
    htmlEditor.session.on('change', function (delta) {
        update();
    });

    let cssEditor = ace.edit("css")
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/Merbivore");
    if (localStorage.getItem("lc-vamp-css") == null)
        cssEditor.session.setValue(".body{    }");
    else cssEditor.session.setValue(localStorage.getItem("lc-vamp-css"))
    cssEditor.setHighlightActiveLine(false);
    cssEditor.session.setUseWrapMode(true);
    cssEditor.setShowPrintMargin(false);
    cssEditor.session.on('change', function (delta) {
        update();
    });

    let jsEditora = ace.edit("js");
    jsEditora.session.setMode("ace/mode/javascript");
    jsEditora.setTheme("ace/theme/Merbivore");
    if (localStorage.getItem("lc-vamp-js") == null)
        jsEditora.session.setValue("");
    else jsEditora.session.setValue(localStorage.getItem("lc-vamp-js"))
    jsEditora.setShowPrintMargin(false);
    jsEditora.setHighlightActiveLine(false);
    jsEditora.session.on('change', function (delta) {
        console.log(jsEditora.getValue())
        update();
    });
    update();
    function update() {
        var disp = document.querySelector(".output .browser-iframe").contentWindow.document;
        console.log(disp);
        disp.open();
        disp.write("<style>" + cssEditor.getValue() + "</style>" + htmlEditor.getValue() + "<script>" + jsEditora.getValue() + "</script>");
        disp.close();
        localStorage.setItem("lc-vamp-html", htmlEditor.getValue());
        localStorage.setItem("lc-vamp-css", cssEditor.getValue());
        localStorage.setItem("lc-vamp-js", jsEditora.getValue());

    }
    window.addEventListener("resize", e => {
        for (var i = 0; i < document.getElementsByClassName("edit").length; i++)
            document.getElementsByClassName("edit")[i].style.height = document.querySelector(".code").clientHeight - 40 + "px";
        htmlEditor.resize();
        cssEditor.resize();
        jsEditora.resize();
    })
    var layout = 0;
    document.querySelector(".change_layout").addEventListener("click", function () {
        layout++;
        if (layout > 1) layout = 0;
        changeLayout();
    })
    function changeLayout() {
        switch (layout) {
            case 0:
                document.querySelector(".writecode").classList.add("view1")
                document.querySelector(".writecode").classList.remove("view2")
                document.querySelector(".container").classList.add("view1")
                document.querySelector(".container").classList.remove("view2")
                for (var i = 0; i < document.getElementsByClassName("edit").length; i++) {
                    document.getElementsByClassName("edit")[i].style.maxHeight = "unset";
                    document.getElementsByClassName("edit")[i].style.height = document.querySelector(".code").clientHeight - 40 + "px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditora.resize();
                break;

            case 1:
                document.querySelector(".writecode").classList.add("view2");
                document.querySelector(".writecode").classList.remove("view1");
                document.querySelector(".container").classList.add("view2");
                document.querySelector(".container").classList.remove("view1");
                for (var i = 0; i < document.getElementsByClassName("edit").length; i++) {
                    document.getElementsByClassName("edit")[i].style.height = document.querySelector(".code").clientHeight - 40 + "px";
                    document.getElementsByClassName("code")[i].style.maxHeight = "224px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditora.resize();
                break;
        }
    }
}
