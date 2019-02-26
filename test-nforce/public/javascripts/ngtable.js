(function() {
  "use strict";

  var app = angular.module("myApp", ["ngTable", "ngTableDemos"]);

  app.controller("demoController", demoController);

  demoController.$inject = ["NgTableParams", "ngTableSimpleMediumList", "ngTableDemoCountries"];

  function demoController(NgTableParams, simpleList, countries) {
    this.countries = countries;
    this.tableParams = new NgTableParams({
      // initial filter
      filter: { name: "T" }
    }, {
      dataset: simpleList
    });
  }


  app.controller("dynamicDemoController", dynamicDemoController);

  dynamicDemoController.$inject = ["NgTableParams", "ngTableSimpleMediumList", "ngTableDemoCountries"];

  function dynamicDemoController(NgTableParams, simpleList, countries) {
    this.cols = [
      { field: "name", title: "Name", filter: { name: "text" }, show: true },
      { field: "age", title: "Age", filter: { age: "number" }, show: true },
      { field: "money", title: "Money", show: true },
      { field: "country", title: "Country", filter: { country: "select" }, filterData: countries, show: true }
    ];

    this.tableParams = new NgTableParams({
      // initial filter
      filter: { country: "Ecuador" }
    }, {
      dataset: simpleList
    });
  }
})();

(function() {
  "use strict";

  angular.module("myApp").run(setRunPhaseDefaults);
  setRunPhaseDefaults.$inject = ["ngTableDefaults"];

  function setRunPhaseDefaults(ngTableDefaults) {
    ngTableDefaults.params.count = 5;
    ngTableDefaults.settings.counts = [];
  }
})();
