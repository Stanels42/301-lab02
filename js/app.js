'use strict'

let page1 = true;

function Horn(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  Horn.all.push(this);
}
Horn.all = [];

// photo-template
Horn.prototype.render = function () {

  var source = $("#photo-template").html();
  var template = Handlebars.compile(source);
  $('main').append(template(this));
};

$('#sortSelect').on('change', function () {
  const selectedEvent = $(this).val();
  if (selectedEvent === 'name') {
    Horn.all.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (selectedEvent === 'number') {
    Horn.all.sort((a, b) => {

      if (a.horns > b.horns) {
        return 1;
      } else if (a.horns === b.horns) {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
  }

  // clear display
  let $oldImages = $('section');

  $oldImages.remove();
  // re-display
  Horn.all.forEach(horn => {
    horn.render();
  });
});


$('#keywordSelect').on('change', function () {
  const selectedEvent = $(this).val();
  if (selectedEvent === 'default') {
    $('section').show();
    $('#photo-template').hide();
  } else {
    $('section').hide();
    $(`.${selectedEvent}`).show();
  }
});

function getKeywords() {
  const keywords = [];
  Horn.all.forEach(value => {
    let unique = true;
    keywords.forEach(current => {
      if (value.keyword === current) {
        unique = false;
      }
    });
    if (unique) {
      keywords.push(value.keyword);
    }
  });
  const select = $('#keywordSelect');
  keywords.forEach(currentWord => {
    const $newOption = $('<option></option>');
    $newOption.text(currentWord);
    $newOption.attr('class', 'keywordOption');
    select.append($newOption);
  });
}

$('button').on('click', function () {

  let $oldImages = $('section');

  let $oldOptions = $('.keywordOption');

  $oldImages.remove();
  $oldOptions.remove();

  load();
});

let load = () => {

  Horn.all = [];

  let dataset;

  if (page1) {
    dataset = './page-1.json';
    page1 = false;
  } else {
    dataset = './page-2.json';
    page1 = true;
  }

  $.get(dataset, (value) => {

    value.forEach(horned => {

      let newHorn = new Horn(horned.image_url, horned.title, horned.description, horned.keyword, horned.horns);
      newHorn.render();

    });
    $('#photo-template').hide();
    getKeywords();
  });

};

load();
