(function ($) {
    $.fn.puissance4 = function (options) {
        var settings = $.extend({
            nb_y: 7,
            nb_x: 5,
            colorJ1: 'red',
            colorJ2: 'yellow'
        }, options);

        var countWinJ1 = 0;
        var countWinJ2 = 0;

        if (settings.colorJ1 === settings.colorJ2) {
            alert("Merci de choisir deux couleurs différentes");
        }
        else {
            var player = true;

            function createTable() {
                $('#game').append('<table></table>');
                for (i = 0; i < settings.nb_y; i++) {
                    $('table').append("<tr id='" + i + "'></tr>");
                    for (j = 0; j < settings.nb_x; j++) {
                        $('table tr:last-child').append("<td class='empty' data-y='" + j + "' data-x='" + i + "'></td>");
                    }
                }
            };

            function verifVertical(pos_y = 0, pos_x = 0) {
                var colonne = pos_y;
                var countJ1 = 0;
                var countJ2 = 0;
                var win = 0;
                for (i = settings.nb_y + 1; i >= 0; i--) {
                    var check = $(`td[data-y = ${colonne}][data-x= ${i}]`);
                    if (check.hasClass("full1")) {
                        countJ1 = countJ1 + 1;
                        countJ2 = 0;
                    }
                    if (check.hasClass("full2")) {
                        countJ1 = 0;
                        countJ2 = countJ2 + 1;
                    }
                    if (countJ1 === 4) {
                        alert("Le joueur 1 à gagné en colonne " + pos_y);
                        $("td").removeClass("full1 full2 background-color").removeAttr("style").addClass("empty");
                        $("p").remove("#tourJ2");
                        win = 1;
                        scoreWin(win);
                        return;
                    }
                    if (countJ2 === 4) {
                        alert("Le joueur 2 à gagné en colonne " + pos_y);
                        $("td").removeClass("full1 full2 background-color").removeAttr("style").addClass("empty");
                        $("p").remove("#tourJ1");
                        win = 2;
                        scoreWin(win);
                        return;
                    }
                }
            };

            function verifHorizontal(pos_y = 0, pos_x = 0) {
                var colonne = pos_y;
                var ligne = pos_x;
                var countJ1 = 0;
                var countJ2 = 0;

                for (i = 0; i < settings.nb_x; i++) {
                    var check = $(`td[data-y = ${i}][data-x= ${ligne}]`);
                    if (check.hasClass("full1")) {
                        countJ1 = countJ1 + 1;
                        countJ2 = 0;
                    }
                    if (check.hasClass("full2")) {
                        countJ1 = 0;
                        countJ2 = countJ2 + 1;
                    }
                    if (check.hasClass("empty")) {
                        countJ1 = 0;
                        countJ2 = 0;
                    }
                    if (countJ1 === 4) {
                        alert("Le joueur 1 à gagné en ligne " + pos_x);
                        $("td").removeClass("full1 full2 background-color").removeAttr("style").addClass("empty");
                        $("p").remove("#tourJ2");
                        win = 1;
                        scoreWin(win);
                        return;
                    }
                    if (countJ2 === 4) {
                        alert("Le joueur 2 à gagné en ligne " + pos_x);
                        $("td").removeClass("full1 full2 background-color").removeAttr("style").addClass("empty");
                        $("p").remove("#tourJ1");
                        win = 2;
                        scoreWin(win);
                        return;
                    }

                }
            };

            function matchNull() {
                $("#game").find("table").find("tr").each(function () {
                    if ($("td").hasClass("empty")) {
                        return;
                    }
                    else{
                        $("td").removeClass("full1 full2 background-color").removeAttr("style").addClass("empty");
                    }
                });
            }

            function coloreCase() {
                $("td").click(function () {
                    var pos_x = 0;
                    var colonne = $(this).data('y');
                    for (i = settings.nb_y + 1; i >= 0; i--) {
                        var check = $(`td[data-y = ${colonne}][data-x= ${i}]`);
                        if (check.hasClass('empty')) {
                            if (player === true) {
                                $(check).css("background-color", settings.colorJ1);
                                $(check).removeClass("empty");
                                $(check).addClass("full1");
                                $("#tourJ1").remove();
                                $('#game').append('<p id="tourJ2"> Au tour du joueur 2 </p>');
                                pos_x = i;
                            }
                            else {
                                $(check).css("background-color", settings.colorJ2);
                                $(check).removeClass("empty");
                                $(check).addClass("full2");
                                $("#tourJ2").remove();
                                $('#game').append('<p id="tourJ1"> Au tour du joueur 1 </p>');
                                pos_x = i;
                            }
                            player = !player;
                            break;
                        }
                    }
                    setTimeout(function(){verifVertical(colonne, pos_x)}, 1000);
                    setTimeout(function(){verifHorizontal(colonne, pos_x)}, 1000);
                    matchNull();
                });
            };


            function scoreWin(win){
                if (win === 1){
                    countWinJ1 ++;
                }
                if (win === 2){
                    countWinJ2 ++;
                }
                $('#score').text("Joueur 1 => " + countWinJ1 + " Joueur 2 => " + countWinJ2 + "");
            }

            $(document).ready(function () {
                createTable();
                coloreCase();
            });
        }
        ;
    }

}(jQuery));
$(' #game ').puissance4({ nb_x : 5, nb_y : 7 , colorJ1 : 'pink', colorJ2: 'black'});


