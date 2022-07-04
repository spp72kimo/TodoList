function display_count_item() {
  let count = 0;
  let list = load_localStorage();
  for (let i = 0; i < list.length; i++) {
    if (!list[i].complete) count++;
  }

  let span_count = $("<span></span>");
  span_count.text(`${count} items left`);
  $(".count").empty();
  $(".count").append(span_count);
  return count;
}

function load_localStorage() {
  let list = JSON.parse(window.localStorage.getItem("list")) || [];
  return list;
}

function display(list) {
  $(".list-group").empty();
  for (let i = 0; i < list.length; i++) {
    let { id, event, complete } = list[i];
    let li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    let html = `
                <div class="content">
                <input type="hidden" name="id" value=${id}>`;

    if (complete) {
      html += `
                    <input class="form-check-input me-2" type="checkbox" checked>
                    <span class="event completed">${event}</span>
                    </div><span class="cross">X</span>`;
    } else {
      html += `
                    <input class="form-check-input me-2" type="checkbox">
                    <span class="event">${event}</span>
                    </div><span class="cross">X</span>`;
    }
    li.html(html);
    $(".list-group").append(li);
  }
}

function display_no_check(list) {
  $(".list-group").empty();
  for (let i = 0; i < list.length; i++) {
    let { id, event, complete } = list[i];
    let li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    let html = `
                  <div class="content">
                  <input type="hidden" name="id" value=${id}>`;

    if (complete) {
      html += `
                      <span class="completed">${event}</span>
                      </div><span class="cross">X</span>`;
    } else {
      html += `
                      <span>${event}</span>
                      </div><span class="cross">X</span>`;
    }
    li.html(html);
    $(".list-group").append(li);
  }
}

function display_clear_all(list) {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].complete) {
      let span = $("<span></span>");
      span.addClass("clear_btn");
      span.text(`Clear completed`);
      $(".clear_all").empty();
      $(".clear_all").append(span);
      count++;
      break;
    }
  }
  if (count === 0) $(".clear_all").empty();
}

let list = load_localStorage();
display(list);
display_count_item(list);
display_clear_all(list);

// add event
$("input[type=text]").keypress(function (e) {
  if (e.which === 13) {
    let id = list.length + 1;
    let event = e.target.value;
    // form validation
    if (event === "") return;
    let li = $("<li></li>");
    li.addClass("list-group-item d-flex justify-content-between");
    li.html(`
            <div class="content">
            <input class="form-check-input me-2" type="checkbox">
            <input type="hidden" name="id" value=${id}>
            <span class="event">${event}</span>
            </div>
            <span class="cross">X</span>
        `);
    $(".list-group").append(li);
    $(e.target).val("");

    // store into LocalStorage
    list.push({
      id: id,
      complete: false,
      event: event,
    });
    window.localStorage.setItem("list", JSON.stringify(list));
    id++;
    display_count_item(list);
  }
});

// delete event, complete event
$(".list").click(function (e) {
  // delete event
  if ($(e.target).is(".cross")) {
    let id = $(e.target)
      .parent()
      .children(".content")
      .children("input[name=id]")
      .val();
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1);
        break;
      }
    }
    window.localStorage.setItem("list", JSON.stringify(list));
    $(e.target).parent("li").remove();
    display_count_item(list);
  }

  // completed event
  if ($(e.target).is("input[type=checkbox]")) {
    console.log("select here...");
    let span = $(e.target).siblings("span.event");
    console.log(span);
    span.toggleClass("completed");

    let id = span.siblings("input[name=id]").val();
    if (span.hasClass("completed")) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) list[i].complete = true;
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) list[i].complete = false;
      }
    }
    window.localStorage.setItem("list", JSON.stringify(list));
    display_count_item();
    display_clear_all(list);
  }
});

// Tab_view_display
$(".view_control").click(function (e) {
  if ($(e.target).hasClass("active")) return;
  else {
    // diaply all items
    if ($(e.target).hasClass("view_all")) {
      let list = load_localStorage();
      display(list);
      $(e.target).addClass("active");

      $(e.target)
        .parent()
        .siblings("li")
        .children("span")
        .removeClass("active");
    }

    // display active items
    if ($(e.target).hasClass("view_active")) {
      let act_list = [];
      let list = load_localStorage();
      for (let i = 0; i < list.length; i++) {
        if (!list[i].complete) act_list.push(list[i]);
      }
      display_no_check(act_list);
      $(e.target).addClass("active");

      $(e.target)
        .parent()
        .siblings("li")
        .children("span")
        .removeClass("active");
    }

    // display complete
    if ($(e.target).hasClass("view_complete")) {
      let complete_list = [];
      let list = load_localStorage();
      for (let i = 0; i < list.length; i++) {
        if (list[i].complete) complete_list.push(list[i]);
      }
      display_no_check(complete_list);
      $(e.target).addClass("active");

      $(e.target)
        .parent()
        .siblings("li")
        .children("span")
        .removeClass("active");
    }
  }
});

// clear completed
$(".event_controller").click(function (e) {
  //  clear all
  if ($(e.target).is(".clear_btn")) {
    let count = 0;
    let list = load_localStorage();
    for (let i = 0; i < list.length; i++) {
      if (list[i].complete) {
        count++;
      }
    }
    while (count > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].complete) {
          list.splice(i, 1);
          count--;
          break;
        }
      }
    }
    display(list);
    display_clear_all(list);
    window.localStorage.setItem("list", JSON.stringify(list));
  }

  // select all
  if ($(e.target).is(".select_btn")) {
    $("input[type=checkbox]").prop("checked", true);
    $("span.event").addClass("completed");
    let list = load_localStorage();
    for (let i = 0; i < list.length; i++) {
      list[i].complete = true;
    }
    display_count_item();
    display_clear_all(list);
    window.localStorage.setItem("list", JSON.stringify(list));
  }
});
