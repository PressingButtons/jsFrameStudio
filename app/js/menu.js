const onClick = { };

onClick['newProject'] = ev => {
  document.dispatchEvent(new Event('promptNew'));
}

onClick['importProject'] = ev => {
  document.dispatchEvent(new Event('promptImport'));
}

onClick['importAse'] = ev => {
  document.dispatchEvent(new Event('promptImportASE'));
}

onClick['exportPrjoect'] = ev => {
  document.dispatchEvent(new Event('promptExport'));
}

const toggleDropdown = function(ev) {
  $(this).toggleClass('show');
}

const onDocumentClick = function(e) {
  $('.main.menu .dropdown').removeClass('show')
}

export default function( ) {
  $('.main.menu p.option').click(function(ev){onClick[this.id](ev)});
  $('.main.menu .dropdown').click(toggleDropdown);
  $($('#pageContent')[0].contentDocument).click(onDocumentClick);
}
