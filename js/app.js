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

  // const template = $('#photo-template').html();
  // const $newSection = $('<section></section>');
  // $newSection.attr('class', this.keyword);
  // $newSection.html(template);

  // $newSection.find('h2').text(this.title);
  // $newSection.find('p').text(this.description);
  // $newSection.find('img').attr('src', this.image_url);

  // $('main').append($newSection);

  var source   = $("#photo-template").html();
  var template = Handlebars.compile(source);
  $('main').append(template(this));
};

$('select').on('change', function () {
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
  const select = $('select');
  keywords.forEach(currentWord => {
    const $newOption = $('<option></option>');
    $newOption.text(currentWord);
    select.append($newOption);
  });
}

$('button').on('click', function () {

  let $oldImages = $('section');

  let $oldOptions = $('option');
  $oldOptions.splice(0, 1);

  $oldImages.remove();
  $oldOptions.remove();

  load();
});

let load = () => {

  let dataset;

  if(page1) {
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
