function getCharacterBags(characterName, apiKey) {
    var apiUrl = "https://api.guildwars2.com/v2/characters/" + characterName + "?access_token=" + apiKey;

    $.ajax({
        type: "GET",
        url: apiUrl,
        dataType: "json",
        cache: true,
        timeout: 10000,
        success: function(characterData, textStatus, jqXHR) {
            if (characterData.bags) {
                var bagsContainer = $("#" + characterName + " .bags-container");
                bagsContainer.empty();

                $.each(characterData.bags, function(index, bag) {
                    var bagHtml = '<div class="bag">';
                    bagHtml += '<div class="item" data-itemid="' + bag.id + '"><a href="' + bag.url + '" target="_blank"><img src="assets/social/gw2-logo.png"></a> <strong class="item-name"></strong></div>';
                    
                    if (bag.inventory) {
                        $.each(bag.inventory, function() {
                            if (this.id) {
                                var itemHtml = '<a href="' + this.url + '" class="item" data-itemid="' + this.id + '" target="_blank">';
                                itemHtml += '<img src="assets/img/gw2-logo.png">';
                                this.count > 1 && (itemHtml += "<span>" + this.count + "</span>");
                                itemHtml += "</a>";
                                bagsContainer.append(itemHtml);
                            } else {
                                bagsContainer.append('<div class="item empty"></div>');
                            }
                        });
                    }

                    bagHtml += '</div>';
                    bagsContainer.append(bagHtml);
                });
            } else {
                console.log("Character bags not found for: " + characterName);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching character data:', errorThrown);
        }
    });
}
function displayDuplicateItems(duplicateItems) {
    var duplicatesTable = $(".duplicates.container tbody");

    // Efface le contenu existant du tableau
    duplicatesTable.empty();

    if (duplicateItems.length > 0) {
        $.each(duplicateItems, function(index, itemKey) {
            var rowHtml = '<tr>' +
                          '<td>Objet en double: ' + itemKey + '</td>' +
                          '</tr>';
            duplicatesTable.append(rowHtml);
        });
    } else {
        var noDuplicatesRow = '<tr><td colspan="3">Aucun objet en double détecté.</td></tr>';
        duplicatesTable.append(noDuplicatesRow);
    }
}
var apiKey = key;
getDuplicateItems(characterName, apiKey);
displayDuplicateItems(duplicateItems);

$(window).scroll(function () { lazyLoad() });
var groupsJSON, categoriesJSON, accountAchievementsJSON, achievementsArray = [];
$("body").on("change", "#achievementGroups", function () { getAchievementGroupCategories($(this).val()) }), $("body").on("change", "#achievementCategories", function () { getCategoryAchievements($(this).val()) }), $("body").on("click", ".jq-collapse-achievements", function () { return $(this).toggleClass("collapsed"), $(".achievement-container").toggleClass("collapsed"), !1 });
