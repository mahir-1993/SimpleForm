sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast'
], function (Controller, MessageToast) {
    'use strict';

    return Controller.extend("mmr.abap.controller.View1", {
        onInit: function () {
            this.oModel = new sap.ui.model.json.JSONModel();
            this.oModel.setData({
                "productData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "",
                    "CATEGORY": "",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "",
                    "SUPPLIER_NAME": "",
                    "TAX_TARIF_CODE": "",
                    "PRICE": "",
                    "CURRENCY_CODE": "",
                    "DIM_UNIT": ""
                }
            })
            this.getView().setModel(this.oModel, "viewModel");

        },
        getValue: function () {
            var that = this;
            var oSimpleForm = this.getView().byId("idSimpleForm");
            var oProduct = this.getView().byId("idProduct");//.getValue;
            var oProductValue = oProduct.getValue();
            var oDataModel = this.getOwnerComponent().getModel();

            oDataModel.read("/ProductSet('" + oProductValue + "')", {
                success: function (oData, response) {
                    debugger;
                    that.oModel.setProperty("/productData", oData);
                },
                error: function (oError) {
                    debugger;
                }
            });
        },
        delete: function () {
            var that = this;
            var oProduct = this.getView().byId("idProduct");//.getValue;
            var oProductValue = oProduct.getValue();
            var oDataModel = this.getOwnerComponent().getModel();

            oDataModel.remove("/ProductSet('" + oProductValue + "')", {
                success: function (oData, response) {
                    debugger;
                    MessageToast.show("Record Successfully Deleted");
                },
                error: function () {
                    MessageToast.show("Record is not deleted")
                }
            });
        },
        update: function () {
            debugger;
            var that = this;
            var oProduct = this.getView().byId("idProduct");//.getValue;
            var oProductValue = oProduct.getValue();
            var oDataModel = this.getOwnerComponent().getModel();
            var getProperty = that.oModel.getProperty("/productData");

            oDataModel.update("/ProductSet('" + oProductValue + "')", getProperty, {
                success: function (data) {
                    debugger;
                },
                error: function (oError) {
                    debugger;
                }
            })

        },
        create: function () {
            var that = this;
            debugger;
            var getProperty = that.oModel.getProperty("/productData");
            var oDataModel = this.getView().getModel();

            oDataModel.create("/ProductSet", getProperty, {
                success: function (data) {
                    debugger;
                    MessageToast.show("Data Created");
                },
                error: function (oError) {

                }
            })
        }
    })

});