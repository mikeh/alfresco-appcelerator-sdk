function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sitesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.sitesTab = Ti.UI.createWindow({
        backgroundColor: "black",
        navBarHidden: true,
        fullscreen: true,
        id: "sitesTab"
    });
    $.__views.sitesTab && $.addTopLevelView($.__views.sitesTab);
    var __alloyId45 = {};
    var __alloyId48 = [];
    var __alloyId49 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId48.push(__alloyId49);
    var __alloyId50 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "18dp",
                fontWeight: "bold"
            },
            left: "60dp",
            top: 0,
            bindId: "info"
        }
    };
    __alloyId48.push(__alloyId50);
    var __alloyId51 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "11dp"
            },
            left: "60dp",
            top: "25dp",
            bindId: "es_info"
        }
    };
    __alloyId48.push(__alloyId51);
    var __alloyId47 = {
        properties: {
            name: "siteTemplate"
        },
        childTemplates: __alloyId48
    };
    __alloyId45["siteTemplate"] = __alloyId47;
    var __alloyId52 = [];
    $.__views.mySites = Ti.UI.createListSection({
        headerTitle: "My Sites",
        id: "mySites"
    });
    __alloyId52.push($.__views.mySites);
    $.__views.allSites = Ti.UI.createListSection({
        headerTitle: "All Sites",
        id: "allSites"
    });
    __alloyId52.push($.__views.allSites);
    $.__views.favSites = Ti.UI.createListSection({
        headerTitle: "Favourite Sites",
        id: "favSites"
    });
    __alloyId52.push($.__views.favSites);
    $.__views.siteList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "45%",
        sections: __alloyId52,
        templates: __alloyId45,
        id: "siteList",
        defaultItemTemplate: "siteTemplate"
    });
    $.__views.sitesTab.add($.__views.siteList);
    $.__views.folderLabel = Ti.UI.createLabel({
        text: "",
        color: "black",
        font: {
            fontFamily: "Arial",
            fontSize: "12dp",
            fontWeight: "bold"
        },
        backgroundColor: "black",
        top: "47%",
        left: 0,
        width: Ti.UI.FILL,
        id: "folderLabel"
    });
    $.__views.sitesTab.add($.__views.folderLabel);
    var __alloyId56 = {};
    var __alloyId59 = [];
    var __alloyId60 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId59.push(__alloyId60);
    var __alloyId61 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "18dp",
                fontWeight: "bold"
            },
            left: "60dp",
            top: 0,
            bindId: "info"
        }
    };
    __alloyId59.push(__alloyId61);
    var __alloyId62 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "11dp"
            },
            left: "60dp",
            top: "25dp",
            bindId: "es_info"
        }
    };
    __alloyId59.push(__alloyId62);
    var __alloyId58 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId59
    };
    __alloyId56["repoTemplate"] = __alloyId58;
    var __alloyId63 = [];
    $.__views.repo = Ti.UI.createListSection({
        headerTitle: "Repository",
        id: "repo"
    });
    __alloyId63.push($.__views.repo);
    $.__views.folderList = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId63,
        templates: __alloyId56,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.sitesTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var documentFolderService;
    var parentFolders = new Array();
    Ti.App.addEventListener("cleartabs", function() {
        $.mySites.deleteItemsAt(0, $.mySites.getItems().length);
        $.allSites.deleteItemsAt(0, $.allSites.getItems().length);
        $.favSites.deleteItemsAt(0, $.favSites.getItems().length);
        $.repo.deleteItemsAt(0, $.repo.getItems().length);
    });
    Ti.App.addEventListener("sitespopulate", function() {
        if (Alloy.Globals.AlfrescoSDKVersion >= 1 && null != Alloy.Globals.repositorySession && 0 == $.allSites.getItems().length) {
            var siteService = Alloy.Globals.SDKModule.createSiteService();
            siteService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            siteService.initialiseWithSession(Alloy.Globals.repositorySession);
            siteService.retrieveSites();
            Alloy.Globals.sitesModelListener(siteService, $.mySites, "mysitesnode");
            siteService.retrieveAllSites();
            Alloy.Globals.sitesModelListener(siteService, $.allSites, "allsitesnode");
            siteService.retrieveFavoriteSites();
            Alloy.Globals.sitesModelListener(siteService, $.favSites, "favsitesnode");
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
            Alloy.Globals.modelListeners(documentFolderService, $.repo);
            $.siteList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                var name = item.properties.name;
                Alloy.Globals.currentNode = item.properties.data;
                Alloy.Globals.nodeJustProperties = true;
                siteService.retrieveDocumentLibraryFolderForSite(name);
            });
            siteService.addEventListener("retrievedDocumentFolder", function(e) {
                $.repo.deleteItemsAt(0, $.repo.getItems().length);
                documentFolderService.setFolder(e.folder);
                documentFolderService.retrieveChildrenInFolder();
            });
            Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders, function(folder) {
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            }, function(document) {
                documentFolderService.saveDocument(document);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;