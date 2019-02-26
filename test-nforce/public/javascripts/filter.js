$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('.pricebook_table tfoot th').each(function() {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="Search '+title+'" />');
  });

  // Data Table
  var table = $('.pricebook_table').DataTable();

  // Apply the search
  table.columns().every(function() {
    var that = this;
    $('input', this.footer()).on('keyup change', function() {
      if (that.search() !== this.value) {
        that
          .search(this.value)
          .draw();
      }
    });
  });

  $('.pricebook_table tfoot tr').appendTo('.pricebook_table thead');

});

// $("#name_search").keyup(function () {
//     //split the current value of searchInput
//     var data = this.value.toUpperCase().split(" ");
//     //create a jquery object of the rows
//     var jo = $("#record_content").find("tr");
//     if (this.value == "") {
//         jo.show();
//         return;
//     }
//     //hide all the rows
//     jo.hide();
//
//     //Recusively filter the jquery object to get results.
//     jo.filter(function (i, v) {
//         var $t = $(this);
//         for (var d = 0; d < data.length; ++d) {
//             if ($t.text().toUpperCase().indexOf(data[d]) > -1) {
//                 return true;
//             }
//         }
//         return false;
//     })
//     //show the rows that match.
//     .show();
// }).focus(function () {
//     this.value = "";
//     $(this).css({
//         "color": "black"
//     });
//     $(this).unbind('focus');
// }).css({
//     "color": "#C0C0C0"
// });
//
// $("#cable_search").on('input', function() {
//
// 			// Split the current value of searchInput
// 			var data = this.value.split(" "),
// 				inputLength = $("#cable_search").val().length;
//
// 			// Create a jquery object of the rows
// 			var jo = $("table > tbody").find("tr");
//
// 			if (this.value == "") {
// 				jo.show();
// 				return;
// 			}
//
// 			// Hide all the rows
// 			jo.hide();
//
// 			jo.filter(function() {
// 				var textField = $.trim($('#cable_search').val()).split(" ");
//                     var theSearch = textField.join("|");
//                     return (this.textContent || this.innerText).match(theSearch);
//
// 			}).show();
// });
//
// $("#searchInput").keyup(function () {
//     var rows = $("#record_content").find("tr").hide();
//     if (this.value.length) {
//         var data = this.value.split(" ");
//         $.each(data, function (i, v) {
//             rows.filter(":contains('" + v + "')").show();
//         });
//     } else rows.show();
// });

// $(document).ready(function() {
//   $('#name_search').keyup(function() {
//     search_table($(this).val());
//   });
//
//   function search_table(value) {
//     $('#pricebook_table .table_content').each(function() {
//       var found = 'false';
//       $(this).each(function() {
//         if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//           found = 'true';
//         }
//       });
//       if (found == 'true') {
//         $(this).show();
//       } else {
//         $(this).hide();
//       }
//     });
//   }
// });
//
// $(document).ready(function() {
//   $('#cable_search').keyup(function() {
//     search_table($(this).val());
//   });
//
//   function search_table(value) {
//     $('#pricebook_table tr').each(function() {
//       var found = 'false';
//       $(this).each(function() {
//         if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//           found = 'true';
//         }
//       });
//       if (found == 'true') {
//         $(this).show();
//       } else {
//         $(this).hide();
//       }
//     });
//   }
// });
