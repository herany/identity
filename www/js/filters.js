/*jshint smarttabs:true */

;(function (APP_NAME, angular, moment, undefined) {
	"use strict";

	function dataBitsToBarcode (dataBits, type) {
		var barcodeDataBit, i;

		if (!dataBits || !dataBits.length || !type) { return null; }

		for (i = 0; i < dataBits.length; i++) {
			if (dataBits[i].type === type) {
				barcodeDataBit = dataBits[i];
				break;
			}
		}

		return barcodeDataBit;
	}

	angular.module(APP_NAME + ".filters", [])
		.filter("interpolate", ["version", function (version) {
			return function (text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
		}])
		.filter("ageFormatter", function () {
			return function (unformattedDate, emptyStrText) {
				return ViewHelpers.age(unformattedDate);
			};
		})
		.filter("asClassname", function () {
			return function (str) {
				return str.replace(/[^0-9a-z]/gi, "-").toLowerCase();
			};
		})
		.filter("jsonFormatter", function () {
			return function (obj) {
				return JSON.stringify(obj, null, "  ");
			};
		})
		.filter("fullName", function () {
			return function (obj, defaultValue) {
				var bits = [];
				if (!obj) { return defaultValue; }

				if (obj.firstName) { bits.push(obj.firstName); }
				if (obj.lastName) { bits.push(obj.lastName); }
				return bits.length ? bits.join(" ") : defaultValue;
			};
		})
		.filter("findBarcodeDatabit", function () {
			return function (dataBits) {
				return dataBitsToBarcode(dataBits, "BarcodeDataBit");
			};
		})
		.filter("findBarcode", function () {
			return function (dataBits) {
				var barcodeDataBit = dataBitsToBarcode(dataBits, "BarcodeDataBit");
				return barcodeDataBit ? barcodeDataBit.barcode : "";
			};
		})
		.filter("findEncodableBarcode", function () {
			return function (dataBits) {
				var barcodeDataBit = dataBitsToBarcode(dataBits, "BarcodeDataBit");
				return barcodeDataBit ? barcodeDataBit.encodable : "";
			};
		})
		.filter("databitIconClass", function () {
			return function (type) {
				switch (type.toLowerCase()) {
					case "birthday": return "ion-ios7-calendar";
					case "health": return "ion-ios7-medkit";
					case "phone": return "ion-ios7-telephone";
					default: return "ion-ios7-flag";
				}
			};
		})
		.filter("databitVisibilityClass", function () {
			return function (type) {
				switch (type.toLowerCase()) {
					case "private": return "ion-locked";
					case "protected": return "ion-person-stalker";
					default: return "ion-earth";
				}
			};
		})
		.filter("humanReadableDate", function () {
			return function (dateString) {
				return moment(dateString).calendar();
			};
		})
		.filter("humanReadableDateSince", function () {
			return function (dateString) {
				return moment(dateString).fromNow(true);;
			};
		})
		.filter("databitExpirationClassname", function () {
			return function (dateString) {
				return (2 * Math.random() % 2) ? "energized" : "calm";
			};
		})
	;
})("sprtidApp", angular, moment);
