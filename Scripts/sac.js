function keyCheck(t) {
    if ("" != t && 72 == t.length) {
        var i = "https://api.guildwars2.com/v2/tokeninfo?access_token=" + t;
        $("#loader").addClass("visible"), $("body").addClass("loading"), $("#keySubmit").addClass("shift").attr("disabled", "disabled"), error = !1, $("body > h2, body > aside").removeClass("visible"), $("section").removeClass("visible").removeClass("loading"), $("#mainNav a").removeClass("selected"), setTimeout(function () { $.ajax({ url: i, type: "GET", dataType: "json", cache: !0, timeout: 1e4, success: function (i) { i.id ? (key = t, $("#apiKey").val() != key && $("#apiKey").val(key), createCookie("apiKey", key, 365), getAccount(t)) : (createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error")) }, error: function () { createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error"), error = !0 } }) }, 400)
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
        success: function (t) {
            if (t.name)
                if ($("#showMenu").addClass("visible"), accountName = t.name, $("#accountName").html('<i class="material-icons">account_circle</i> ' + accountName), getWorld(t.world), guilds = t.guilds, "" != getCookie("startTab")) {
                    var i = getCookie("startTab");
                    $('#mainNav a[data-id="' + i + '"]').trigger("click")
                } else $("#mainNav a[data-id]:first").trigger("click");
            else createCookie("apiKey", "", -1), $("#apiKey").removeClass("success").addClass("error")
        },
        error: function () { error = !0 }
    })
}

function getBankItemDetails(t, i, s) {
    var a = t.toString(),
        e = "";
    i && i.length && (e = i.toString());
    $.ajax({
        type: "GET",
        url: "https://api.guildwars2.com/v2/items?lang=en&ids=" + a,
        dataType: "json",
        cache: !0,
        timeout: 1e4,
        success: function (t) {
            $.each(t, function () {
                var t = this.id;
                $(".item[data-itemid='" + this.id + "'] img").attr("data-src", this.icon), $(".item[data-itemid='" + this.id + "'] .item-name").html(this.name), $(".item[data-itemid='" + this.id + "']").attr("data-name", this.name), $(".item[data-itemid='" + this.id + "']").attr("data-vendorprice", this.vendor_value), $(".item[data-upgrade1='" + this.id + "']").attr("data-upgrade1-vendor", this.vendor_value), $(".item[data-upgrade2='" + this.id + "']").attr("data-upgrade2-vendor", this.vendor_value), $(".item[data-itemid='" + this.id + "']").attr("data-origname", this.name), $(".item[data-itemid='" + this.id + "']").attr("data-description", this.description), $(".item[data-itemid='" + this.id + "']").attr("data-type", this.type), $(".item[data-itemid='" + this.id + "']").attr("data-level", this.level), $(".item[data-itemid='" + this.id + "']").attr("data-rarity", this.rarity), $(".item[data-itemid='" + this.id + "']").addClass(this.rarity), $(".item[data-itemid='" + this.id + "']").attr("data-icon", this.icon);
                var i = '<img src="' + this.icon + '"> ' + this.name,
                    s = '<img src="' + this.icon + '"> ' + this.name;
                if (this.flags) {
                    var a = "";
                    $.each(this.flags, function () { a += this + "," }), $(".item[data-itemid='" + this.id + "']").attr("data-flags", a), $(".item[data-upgrade1='" + this.id + "']").attr("data-upgrade1-flags", a), $(".item[data-upgrade2='" + this.id + "']").attr("data-upgrade2-flags", a)
                }
                if (this.details) {
                    if ($(".item[data-itemid='" + this.id + "']").attr("data-detailstype", this.details.type), $(".item[data-itemid='" + this.id + "']").attr("data-minpower", this.details.min_power), $(".item[data-itemid='" + this.id + "']").attr("data-maxpower", this.details.max_power), $(".item[data-itemid='" + this.id + "']").attr("data-defense", this.details.defense), this.details.infix_upgrade) {
                        if (this.details.infix_upgrade.attributes) {
                            var e = 1;
                            $.each(this.details.infix_upgrade.attributes, function () { $(".item[data-itemid='" + t + "']").attr("data-stat" + e, "+" + this.modifier + " " + this.attribute), e++ })
                        }
                        this.details.infix_upgrade.buff && $(".item[data-itemid='" + t + "']").attr("data-buff", this.details.infix_upgrade.buff.description)
                    }
                    if (this.details.bonuses) {
                        var e = 1;
                        $.each(this.details.bonuses, function () { $(".item[data-itemid='" + t + "']").attr("data-bonus" + e, "(" + e + ") " + this), e++ })
                    }
                    $(".item[data-upgrade1='" + this.id + "']").attr("data-upgrade1-html", i), $(".item[data-upgrade2='" + this.id + "']").attr("data-upgrade2-html", i), $(".item[data-infusion1='" + this.id + "']").attr("data-infusion1-html", s), $(".item[data-infusion2='" + this.id + "']").attr("data-infusion2-html", s)
                }
            }), "" != e && $.ajax({ type: "GET", url: "https://api.guildwars2.com/v2/skins?lang=en&ids=" + e, dataType: "json", cache: !0, timeout: 1e4, success: function (t) { $.each(t, function () { $(".item[data-skin='" + this.id + "'] img").attr("data-src", this.icon), $(".item[data-skin='" + this.id + "'] .item-name").html(this.name), $(".item[data-skin='" + this.id + "']").attr("data-name", this.name) }) }, error: function () { } }), s && s()
        },
        error: function () { }
    })
}

function getItemDetails(t) {
    var i = t.toString();
    $.ajax({
        type: "GET",
        url: "https://api.guildwars2.com/v2/items?lang=en&ids=" + i,
        dataType: "json",
        cache: !0,
        timeout: 1e4,
        success: function (t) {
            $.each(t, function () {
                var t = $("#itemLinks").val();
                $("tr[data-itemid='" + this.id + "'] .icon img").attr("data-src", this.icon), $("tr[data-itemid='" + this.id + "'] .item-name").addClass(this.rarity).html('<a href="' + t + this.id + '" target="_blank">' + this.name + "</a>")
            })
        },
        error: function () { }
    })
}

function handlePage(t, i, s) {
    $.ajax({
        type: "GET",
        url: t,
        dataType: "json",
        cache: !1,
        timeout: 1e4,
        success: function (t, a, e) {
            if (!t.text) {
                var n = [],
                    r = 0;
                $.each(t, function () {
                    var t = "t-" + this.id,
                        a = '<tr id="' + t + '" data-itemid="' + this.item_id + '"><td class="icon"><img src="assets/img/gw2-logo.png"></td><td class="item-name">' + this.item_id + "</td><td>" + this.quantity + "</td><td>" + priceFormat(this.price) + "</td><td>" + timeSince(this.created) + "</td><td>" + timeSince(this.purchased) + "</td></tr>";
                    $("#" + i + " ." + s + " tbody").append(a), -1 == $.inArray(this.item_id, n) && n.push(this.item_id), r++
                });
                var o = 38 * r + 25;
                $("#" + i + " ." + s + " .table-overflow").css("min-height", o + "px"), getItemDetails(n)
            }
        },
        error: function () { }
    })
}

function lazyLoad() {
    var t = $("section.visible, section.loading").attr("id"),
        i = $("#" + t),
        s = "#" + t;
    if ("characters" == t) {
        var a = i.find(".char-details > div.visible > .subtabs"),
            e = a.find("nav a.selected").attr("data-class"),
            n = a.children("." + e);
        s += " #" + i.find(".char-details > div.visible").attr("id")
    } else var a = i.find(".subtabs"),
        e = a.find("nav a.selected").attr("data-class"),
        n = i.find(".subtabs > div.visible");
    if (a.length)
        if (n.find(".subtabs").length) {
            var r = n.find(".subtabs"),
                o = (r.find(".subtabs > div.visible"), r.find("nav a.selected").attr("data-class"));
            s += " ." + e + " ." + o
        } else s += " ." + e;
    var d = $(window).scrollTop(),
        c = $(window).height(),
        l = d + c;
    $(s).each(function () {
        $(this).find("img[data-src]").each(function () {
            var t = $(this);
            t.offset().top < l + 20 && t.attr("src", t.attr("data-src")).removeAttr("data-src")
        })
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
$(window).scroll(function () { lazyLoad() });
var groupsJSON, categoriesJSON, accountAchievementsJSON, achievementsArray = [];
$("body").on("change", "#achievementGroups", function () { getAchievementGroupCategories($(this).val()) }), $("body").on("change", "#achievementCategories", function () { getCategoryAchievements($(this).val()) }), $("body").on("click", ".jq-collapse-achievements", function () { return $(this).toggleClass("collapsed"), $(".achievement-container").toggleClass("collapsed"), !1 });
