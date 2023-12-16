function displayDuplicateItems(duplicateItems) {
    var duplicatesContainer = $("#duplicatesContainer");

    if (duplicateItems.length > 0) {
        $.each(duplicateItems, function(index, itemKey) {
            var itemHtml = '<div class="item-duplicate">' +
                            '<span>Objet en double: ' + itemKey + '</span>' +
                            '</div>';
            duplicatesContainer.append(itemHtml);
        });
    } else {
        // Aucun objet en double
        duplicatesContainer.append('<p>Aucun objet en double détecté.</p>');
    }
}

$(document).ready(function () {
    displayDuplicateItems(duplicateItems)
});
$(window).scroll(function () { lazyLoad() });
var groupsJSON, categoriesJSON, accountAchievementsJSON, achievementsArray = [];
$("body").on("change", "#achievementGroups", function () { getAchievementGroupCategories($(this).val()) }), $("body").on("change", "#achievementCategories", function () { getCategoryAchievements($(this).val()) }), $("body").on("click", ".jq-collapse-achievements", function () { return $(this).toggleClass("collapsed"), $(".achievement-container").toggleClass("collapsed"), !1 });
