

function Horn (image_url, title, description, keyword, horns) {
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
  console.log(template);
  const $newSection = $('<section></section>');

  $newSection.html(template);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);

  $('main').append($newSection);
};

let load = () => {

  $.get('./page-1-data.json', (value) => {

    value.forEach( horned => {

      console.log(horned);
      let newHorn = new Horn (horned.image_url, horned.title, horned.description, horned.keyword, horned.horns);
      newHorn.render();

    });

  });

};

load();
