function keyCheck(t) {
    if ("" != t && 72 == t.length) {
        var i = "https://api.guildwars2.com/v2/tokeninfo?access_token=" + t;
        $("#loader").addClass("visible"), $("body").addClass("loading"), $("#keySubmit").addClass("shift").attr("disabled", "disabled"), error = !1, $("body > h2, body > aside").removeClass("visible"), $("section").removeClass("visible").removeClass("loading"), $("#mainNav a").removeClass("selected"), setTimeout(function() { $.ajax({ url: i, type: "GET", dataType: "json", cache: !0, timeout: 1e4, success: function(i) { i.id ? (key = t, $("#apiKey").val() != key && $("#apiKey").val(key), createCookie("apiKey", key, 365), getAccount(t)) : (createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error")) }, error: function() { createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error"), error = !0 } }) }, 400)
    }
}

function getAccount(t) {
    var i = "https://api.guildwars2.com/v2/account?access_token=" + t;
    $.ajax({
        url: i,
        type: "GET",
        dataType: "json",
        cache: !0,
        timeout: 1e4,
        success: function(t) {
            if (t.name)
                if ($("#showMenu").addClass("visible"), accountName = t.name, $("#accountName").html('<i class="material-icons">account_circle</i> ' + accountName), getWorld(t.world), guilds = t.guilds, "" != getCookie("startTab")) {
                    var i = getCookie("startTab");
                    $('#mainNav a[data-id="' + i + '"]').trigger("click")
                } else $("#mainNav a[data-id]:first").trigger("click");
            else createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error")
        },
        error: function() { error = !0 }
    })
}
// liste des items stackable par 250
function displayStackedItems() {
    $.ajax({
        type: "GET",
        url: "https://api.guildwars2.com/v2/account/bank?access_token=" + key,
        dataType: "json",
        cache: !1,
        timeout: 1e4,
        success: function (t, i, s) {
            $("#StackedItems .totalitems-value").addClass("visible");
            var a = [],
                e = [],
                n = [],
                r = $("#itemLinks").val(),
                o = "",
                d = 0;

            $.each(t, function () {
                if (this.id) {
                    if (this.count <= 250) {
                        var t = "";
                        this.skin && (t = " data-skin=" + this.skin, -1 == $.inArray(this.skin, n) && n.push(this.skin));
                        var i = "";
                        if (this.upgrades) {
                            var s = 1;
                            $.each(this.upgrades, function () {
                                i += " data-upgrade" + s + '="' + this + '"';
                                s++, a.length > 199 ? -1 == $.inArray(this, e) && e.push(this) : -1 == $.inArray(this, a) && a.push(this)
                            });
                        }
                        var c = "";
                        if (this.infusions) {
                            var s = 1;
                            $.each(this.infusions, function () {
                                c += " data-infusion" + s + '="' + this + '"';
                                s++, a.length > 199 ? -1 == $.inArray(this, e) && e.push(this) : -1 == $.inArray(this, a) && a.push(this)
                            });
                        }
                        var l = "";
                        !this.binding || "Character" != this.binding && "Account" != this.binding || (l = "value-exclude"), o += '<a href="' + r + this.id + '" class="item ' + l + '" data-itemid="' + this.id + '" data-quantity="' + this.count + '"' + t + i + c + ' target="_blank">';
                        o += '<img src="assets/img/gw2-logo.png">';
                        this.count > 1 && (o += "<span>" + this.count + "</span>");
                        o += "</a>";
                        a.length > 199 ? -1 == $.inArray(this.id, e) && e.push(this.id) : -1 == $.inArray(this.id, a) && a.push(this.id);
                    }
                } else o += '<div class="item empty"></div>';
                ++d % 30 == 0 && (o += "<br><br>")
            });

            $("#StackedItems > div.items-sac-list").append(o);
            getBankItemDetails(a, n);
            getPrices(a);
            e.length && (getBankItemDetails(e, n), getPrices(e));
        },
        error: function () {
            $("#StackedItems > div.items-sac-list").html("<p class='error'>Inventories API key permission required.</p>");
            $("#StackedItems .totalitems-value").removeClass("visible");
        },
    });
}
$(document).ready(function () {
    displayStackedItems();
});