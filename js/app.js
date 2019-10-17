'use strict'

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

  const template = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.attr('class', this.keyword);
  $newSection.html(template);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);

  $('main').append($newSection);
};

$('select').on('change', function () {
  const selectedEvent = $(this).val();
  if (selectedEvent === 'Filter by Keyword') {
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

let load = () => {

  $.get('./page-1.json', (value) => {

    value.forEach(horned => {

      let newHorn = new Horn(horned.image_url, horned.title, horned.description, horned.keyword, horned.horns);
      newHorn.render();

    });
    $('#photo-template').hide();
    getKeywords();
  });

};

load();
