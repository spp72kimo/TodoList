"use strict";

function display_count_item() {
  var count = 0;
  var list = load_localStorage();

  for (var i = 0; i < list.length; i++) {
    if (!list[i].complete) count++;
  }

  var span_count = $("<span></span>");
  span_count.text("".concat(count, " items left"));
  $(".count").empty();
  $(".count").append(span_count);
  return count;
}

function load_localStorage() {
  var list = JSON.parse(window.localStorage.getItem("list")) || [];
  return list;
}

function display() {
  var list = load_localStorage();
  $(".list-group").empty();

  for (var i = 0; i < list.length; i++) {
    var _list$i = list[i],
        id = _list$i.id,
        event = _list$i.event,
        complete = _list$i.complete;
    var li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    var html = "\n                <div class=\"content\">\n                <input type=\"hidden\" name=\"id\" value=".concat(id, ">");

    if (complete) {
      html += "\n                    <input class=\"form-check-input me-2\" type=\"checkbox\" checked>\n                    <span class=\"event completed\">".concat(event, "</span>\n                    </div><span class=\"cross\">X</span>");
    } else {
      html += "\n                    <input class=\"form-check-input me-2\" type=\"checkbox\">\n                    <span class=\"event\">".concat(event, "</span>\n                    </div><span class=\"cross\">X</span>");
    }

    li.html(html);
    $(".list-group").append(li);
  }
}

function display_no_check(list) {
  $(".list-group").empty();

  for (var i = 0; i < list.length; i++) {
    var _list$i2 = list[i],
        id = _list$i2.id,
        event = _list$i2.event,
        complete = _list$i2.complete;
    var li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    var html = "\n                  <div class=\"content\">\n                  <input type=\"hidden\" name=\"id\" value=".concat(id, ">");

    if (complete) {
      html += "\n                      <span class=\"completed\">".concat(event, "</span>\n                      </div><span class=\"cross\">X</span>");
    } else {
      html += "\n                      <span>".concat(event, "</span>\n                      </div><span class=\"cross\">X</span>");
    }

    li.html(html);
    $(".list-group").append(li);
  }
}

function display_clear_all() {
  var list = load_localStorage();
  var count = 0;

  for (var i = 0; i < list.length; i++) {
    if (list[i].complete) {
      var span = $("<span></span>");
      span.addClass("clear_btn");
      span.text("Clear completed");
      $(".clear_all").empty();
      $(".clear_all").append(span);
      count++;
      break;
    }
  }

  if (count === 0) $(".clear_all").empty();
}

function display_select_all() {
  var list = load_localStorage();
  if (list.length === 0) $(".select_all").empty();

  if (list.length > 0) {
    var span = $("<span></span>");
    span.addClass("select_btn");
    span.text("Select all");
    $(".select_all").empty();
    $(".select_all").append(span);
  }
} // loading page...


var list = load_localStorage();
display();
display_count_item();
display_clear_all();
display_select_all(); // add event

$("input[type=text]").keypress(function (e) {
  if (e.which === 13) {
    var _list = load_localStorage();

    var id = _list.length + 1;
    var event = e.target.value; // form validation

    if (event === "") return;
    var li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    li.html("\n            <div class=\"content\">\n            <input class=\"form-check-input me-2\" type=\"checkbox\">\n            <input type=\"hidden\" name=\"id\" value=".concat(id, ">\n            <span class=\"event\">").concat(event, "</span>\n            </div>\n            <span class=\"cross\">X</span>\n        "));
    $(".list-group").append(li);
    $(e.target).val(""); // store into LocalStorage

    _list.push({
      id: id,
      complete: false,
      event: event
    });

    window.localStorage.setItem("list", JSON.stringify(_list));
    id++;
    display_count_item(_list);
    display_select_all();
  }
}); // delete event, complete event

$(".list").click(function (e) {
  // delete event
  if ($(e.target).is(".cross")) {
    var _list2 = load_localStorage();

    var id = $(e.target).parent().children(".content").children("input[name=id]").val();

    for (var i = 0; i < _list2.length; i++) {
      if (_list2[i].id == id) {
        _list2.splice(i, 1);

        break;
      }
    }

    window.localStorage.setItem("list", JSON.stringify(_list2));
    $(e.target).parent("li").remove();
    display_count_item();
    display_select_all();
  } // completed event


  if ($(e.target).is("input[type=checkbox]")) {
    var _list3 = load_localStorage();

    var span = $(e.target).siblings("span.event");
    span.toggleClass("completed");

    var _id = span.siblings("input[name=id]").val();

    console.log(_id);

    if (span.hasClass("completed")) {
      for (var _i = 0; _i < _list3.length; _i++) {
        if (_list3[_i].id == _id) _list3[_i].complete = true;
      }
    } else {
      for (var _i2 = 0; _i2 < _list3.length; _i2++) {
        if (_list3[_i2].id == _id) _list3[_i2].complete = false;
      }
    }

    window.localStorage.setItem("list", JSON.stringify(_list3));
    display_count_item();
    display_clear_all(_list3);
  }
}); // Tab_view_display

$(".view_control").click(function (e) {
  if ($(e.target).hasClass("active")) return;else {
    // diaply all items
    if ($(e.target).hasClass("view_all")) {
      display();
      $(e.target).addClass("active");
      $(e.target).parent().siblings("li").children("span").removeClass("active");
    } // display active items


    if ($(e.target).hasClass("view_active")) {
      var act_list = [];

      var _list4 = load_localStorage();

      for (var i = 0; i < _list4.length; i++) {
        if (!_list4[i].complete) act_list.push(_list4[i]);
      }

      display_no_check(act_list);
      $(e.target).addClass("active");
      $(e.target).parent().siblings("li").children("span").removeClass("active");
    } // display complete


    if ($(e.target).hasClass("view_complete")) {
      var complete_list = [];

      var _list5 = load_localStorage();

      for (var _i3 = 0; _i3 < _list5.length; _i3++) {
        if (_list5[_i3].complete) complete_list.push(_list5[_i3]);
      }

      display_no_check(complete_list);
      $(e.target).addClass("active");
      $(e.target).parent().siblings("li").children("span").removeClass("active");
    }
  }
}); // select all and clear all

$(".event_controller").click(function (e) {
  //  clear all
  if ($(e.target).is(".clear_btn")) {
    var count = 0;

    var _list6 = load_localStorage();

    for (var i = 0; i < _list6.length; i++) {
      if (_list6[i].complete) {
        count++;
      }
    }

    while (count > 0) {
      for (var _i4 = 0; _i4 < _list6.length; _i4++) {
        if (_list6[_i4].complete) {
          _list6.splice(_i4, 1);

          count--;
          break;
        }
      }
    }

    window.localStorage.setItem("list", JSON.stringify(_list6));
    display();
    display_clear_all();
    display_select_all();
  } // select all


  if ($(e.target).is(".select_btn")) {
    $("input[type=checkbox]").prop("checked", true);
    $("span.event").addClass("completed");

    var _list7 = load_localStorage();

    for (var _i5 = 0; _i5 < _list7.length; _i5++) {
      _list7[_i5].complete = true;
    }

    window.localStorage.setItem("list", JSON.stringify(_list7));
    display_count_item();
    display_clear_all();
  }
});