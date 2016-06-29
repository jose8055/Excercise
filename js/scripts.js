$( "#entry-form" ).submit(function( event ) {
    var term = $(".term-input").val();
    var type = $(".type-input").val();
    var valid = 1;
    var invMsg;
    var $elem;
    $(".val-msg").remove();
    if (term.length === 0) {
        valid = 0;
        invMsg = "This field is required.";
        $(".term-input").prev("label").append("<span class='val-msg'>" + invMsg + "</span>");
    }
    if (term.length > 50) {
        valid = 0;
        invMsg = "Please enter a valid word.";
        $(".term-input").prev("label").append("<span class='val-msg'>" + invMsg + "</span>");
    }
    if (type.length === 0) {
        valid = 0;
        invMsg = "This field is required.";
        $(".type-input").prev("label").append("<span class='val-msg'>" + invMsg + "</span>");
    }
    if (valid === 0) {
        return false;
    }

    if (type === "negative") {
        $elem = $(".box-negative");
    } else if (type === "positive") {
        $elem = $(".box-positive");
    } else {
        return false;
    }
    var added = false;
    $(".term-input").val("");
    $(".type-input").prop("selectedIndex", 0);

    var listitems = $elem.children(".tag-item");
    //$elem.append('<div class="tag-item"><span>'+term+'</span><a href="#">X</a></div>');
    listitems.each(function () {
        if ($(this).find("span").text().localeCompare(term) > 0) {

            $("<div class='tag-item'><span>" + term + "</span><a href='#' class='glyphicon glyphicon-remove'></a></div>").insertBefore($(this)).hide().slideDown("fast");
            added = true;
            return false;
        }
    });
    if (!added) {
        $("<div class='tag-item'><span>" + term + "</span><a href='#' class='glyphicon glyphicon-remove'></a></div>").appendTo($elem).hide().slideDown("fast");
    }
    event.preventDefault();

});
$(document.body).on("click", ".tag-item a", function (e) {
    $(".term-input").val("");
    $(".val-msg").remove();
    $(".type-input").prop("selectedIndex", 0);
    $(this).parent(".tag-item").slideUp(300, function () {
        $(this).remove();
    });
    e.preventDefault();
});


$(document.body).on("click", ".tag-item span", function () {

    var termval = $(this).text();
    var typeval = "positive";
    if ($(this).parents(".output-box").hasClass("box-negative")) {
        typeval = "negative";

    }

    $(".term-input").val(termval);
    $(".type-input").val(typeval);


});
