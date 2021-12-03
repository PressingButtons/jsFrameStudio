const onPromptNew = ev => {
  $('#prompt').attr('src', '/prompt/new');
}

const onPromptImport = ev => {
  $('#prompt').attr('src', '/prompt/import');
}

const onPromptImportASE = ev => {
  $('#prompt').attr('src', '/prompt/importase');
}


const onPromptExport = ev => {
  $('#prompt').attr('src', '/prompt/export');
}

const onPromptClick = function(ev) {
  let target = $(ev.target);
  if(target.is('body') || target.is('html'))
    $('#prompt').removeClass('show');
}

const onPromptLoad = function(ev) {
  $(ev.target.contentDocument).click(onPromptClick)
  $('form', ev.target.contentDocument.body).submit(onPromptSubmit);
  $('#prompt').addClass('show');
}

const onPromptError = function(ev) {
  onPromptClick( );
}

const onPromptSubmit = function(jqev) {
  jqev.preventDefault();
  $('#prompt').removeClass('show');
  document.dispatchEvent(new CustomEvent('formData', {detail:
    {data: new FormData(jqev.target), id: jqev.target.id}  
  }));
}

export default function( ) {
  $(document).on('promptNew', onPromptNew);
  $(document).on('promptImport', onPromptImport);
  $(document).on('promptImportASE', onPromptImportASE);
  $(document).on('promptExport', onPromptExport);
  $('#prompt').on('load', onPromptLoad);
}
